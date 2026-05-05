import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const {
      priceId, customerEmail, returnUrl, environment, booking,
    } = body as {
      priceId?: string;
      customerEmail?: string;
      returnUrl?: string;
      environment?: StripeEnv;
      booking?: {
        fullName: string; phone: string; email: string;
        serviceId: string; serviceLabel: string;
        location: string; preferredDate: string; preferredTime: string;
        notes?: string;
      };
    };

    if (!priceId || !/^[a-zA-Z0-9_-]+$/.test(priceId)) throw new Error('Invalid priceId');
    if (!returnUrl) throw new Error('Missing returnUrl');
    if (environment !== 'sandbox' && environment !== 'live') throw new Error('Invalid environment');
    if (!booking) throw new Error('Missing booking details');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const stripe = createStripeClient(environment);
    const prices = await stripe.prices.list({ lookup_keys: [priceId] });
    if (!prices.data.length) throw new Error('Price not found');
    const stripePrice = prices.data[0];
    const amountCents = stripePrice.unit_amount ?? null;

    // 1) Insert pending booking
    const { data: bookingRow, error: insertErr } = await supabase
      .from('bookings')
      .insert({
        full_name: booking.fullName,
        phone: booking.phone,
        email: booking.email,
        service_id: booking.serviceId,
        service_label: booking.serviceLabel,
        location: booking.location,
        preferred_date: booking.preferredDate,
        preferred_time: booking.preferredTime,
        notes: booking.notes || null,
        payment_mode: 'pay_now',
        payment_status: 'pending',
        amount_cents: amountCents,
      })
      .select('id')
      .single();
    if (insertErr) throw new Error(`Booking insert failed: ${insertErr.message}`);

    // 2) Create Stripe session with bookingId in metadata
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: 'payment',
      ui_mode: 'embedded_page',
      return_url: returnUrl,
      ...(customerEmail && { customer_email: customerEmail }),
      metadata: {
        booking_id: bookingRow.id,
        service_id: booking.serviceId,
        service_label: booking.serviceLabel,
        customer_name: booking.fullName,
        customer_phone: booking.phone,
      },
    });

    // 3) Save session id on the booking
    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', bookingRow.id);

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret, bookingId: bookingRow.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('create-checkout error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
