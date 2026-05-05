import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/admin", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) nav("/admin", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    const { error } = await fn;
    setLoading(false);
    if (error) {
      toast({ title: "Authentication failed", description: error.message, variant: "destructive" });
    } else if (mode === "signup") {
      toast({ title: "Account created", description: "Ask an admin to grant you access." });
    }
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-sm">
          <h1 className="text-2xl font-heading font-bold text-center mb-6">
            {mode === "signin" ? "Staff Sign In" : "Create Account"}
          </h1>
          <form onSubmit={submit} className="space-y-4">
            <Input type="email" placeholder="you@nextsteplab.org" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            <Button type="submit" variant="cta" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signin" ? "Sign In" : "Sign Up")}
            </Button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="block mx-auto mt-4 text-sm text-muted-foreground underline">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
          <p className="text-xs text-muted-foreground text-center mt-6">
            <Link to="/">← Back to site</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
