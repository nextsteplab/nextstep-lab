import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

type Status = "loading" | "paid" | "pending" | "not_found";

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) { setStatus("not_found"); return; }
    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts++;
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();
      if (cancelled) return;
      if (!data) {
        if (attempts > 8) setStatus("not_found");
        else setTimeout(poll, 1500);
        return;
      }
      setBooking(data);
      if (data.payment_status === "paid") setStatus("paid");
      else if (attempts > 12) setStatus("pending");
      else setTimeout(poll, 1500);
    };
    poll();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-xl text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold">Confirming your payment…</h1>
              <p className="text-muted-foreground mt-2">This usually takes a few seconds.</p>
            </>
          )}
          {status === "paid" && (
            <>
              <CheckCircle className="h-16 w-16 text-gold mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold mb-2">Payment Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you{booking?.full_name ? `, ${booking.full_name}` : ""}. Your appointment for{" "}
                <strong>{booking?.service_label}</strong> on {booking?.preferred_date} at {booking?.preferred_time} is locked in.
                We've emailed your confirmation.
              </p>
              <Button asChild className="mt-6"><Link to="/">Return Home</Link></Button>
            </>
          )}
          {status === "pending" && (
            <>
              <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold mb-2">Payment Processing</h1>
              <p className="text-muted-foreground">Your payment is still processing. We'll email you as soon as it clears.</p>
            </>
          )}
          {status === "not_found" && (
            <>
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold mb-2">No booking found</h1>
              <p className="text-muted-foreground">If you believe this is wrong, please call (806) 304-3424.</p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutReturn;
