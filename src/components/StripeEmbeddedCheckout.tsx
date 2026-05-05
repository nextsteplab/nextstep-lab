import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

interface BookingPayload {
  fullName: string; phone: string; email: string;
  serviceId: string; serviceLabel: string;
  location: string; preferredDate: string; preferredTime: string;
  notes?: string;
}

interface Props {
  priceId: string;
  customerEmail?: string;
  returnUrl: string;
  booking: BookingPayload;
}

export function StripeEmbeddedCheckout({ priceId, customerEmail, returnUrl, booking }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId, customerEmail, returnUrl, environment: getStripeEnvironment(), booking },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Failed to create checkout session");
    }
    return data.clientSecret;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
