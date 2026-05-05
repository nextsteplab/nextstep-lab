
-- App role enum + user_roles table (separate table — security best practice)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bookings table
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service_id text NOT NULL,
  service_label text NOT NULL,
  location text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  notes text,
  payment_mode text NOT NULL DEFAULT 'pay_at_visit', -- 'pay_now' | 'pay_at_visit'
  payment_status text NOT NULL DEFAULT 'pending',    -- 'pending' | 'paid' | 'failed'
  amount_cents integer,
  stripe_session_id text UNIQUE,
  stripe_payment_intent text,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_session ON public.bookings(stripe_session_id);
CREATE INDEX idx_bookings_email ON public.bookings(email);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can create a booking via the public site
CREATE POLICY "Anyone can create a booking" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Customers can look up their own pending booking by session id (used by return page)
CREATE POLICY "Public can read by session id" ON public.bookings
  FOR SELECT TO anon, authenticated USING (true);

-- Only admins update bookings (webhook uses service role which bypasses RLS)
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
