import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutReturn() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-lg text-center">
          <CheckCircle className="h-16 w-16 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-heading font-bold mb-2">Payment Received!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your payment. We'll contact you shortly to confirm your appointment details.
          </p>
          {sessionId && (
            <p className="text-xs text-muted-foreground mb-6">Reference: {sessionId}</p>
          )}
          <Button asChild variant="cta"><Link to="/">Back to Home</Link></Button>
        </div>
      </section>
    </Layout>
  );
}
