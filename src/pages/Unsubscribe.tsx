import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<"loading" | "ready" | "done" | "error">("loading");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) { setState("error"); setError("Missing token"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
      headers: { apikey: SUPABASE_KEY },
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.valid) throw new Error(data.error || "Invalid or expired token");
        setEmail(data.email || "");
        setState("ready");
      })
      .catch((e) => { setState("error"); setError(e.message); });
  }, [token]);

  const confirm = async () => {
    setState("loading");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
    if (error || !data?.success) { setState("error"); setError(error?.message || "Failed to unsubscribe"); return; }
    setState("done");
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-md text-center">
          {state === "loading" && <Loader2 className="h-10 w-10 animate-spin mx-auto text-gold" />}
          {state === "ready" && (
            <>
              <h1 className="text-2xl font-heading font-bold mb-3">Confirm Unsubscribe</h1>
              <p className="text-muted-foreground mb-6">
                Unsubscribe <strong>{email}</strong> from NextStep Lab emails?
              </p>
              <Button onClick={confirm} variant="cta" size="lg">Confirm Unsubscribe</Button>
            </>
          )}
          {state === "done" && (
            <>
              <CheckCircle className="h-14 w-14 text-gold mx-auto mb-3" />
              <h1 className="text-2xl font-heading font-bold mb-2">Unsubscribed</h1>
              <p className="text-muted-foreground">You will no longer receive emails from us.</p>
            </>
          )}
          {state === "error" && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto mb-3" />
              <h1 className="text-2xl font-heading font-bold mb-2">Error</h1>
              <p className="text-muted-foreground">{error}</p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Unsubscribe;
