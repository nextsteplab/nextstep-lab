import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string; full_name: string; phone: string; email: string;
  service_label: string; location: string;
  preferred_date: string; preferred_time: string;
  payment_mode: string; payment_status: string;
  amount_cents: number | null; created_at: string; notes: string | null;
}

const Admin = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { nav("/auth", { replace: true }); return; }
      setUserId(sess.session.user.id);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin");
      const isAdmin = (roles?.length ?? 0) > 0;
      setAuthorized(isAdmin);
      if (isAdmin) {
        const { data } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);
        setBookings((data as Booking[]) || []);
      }
      setLoading(false);
    })();
  }, [nav]);

  const signOut = async () => { await supabase.auth.signOut(); nav("/auth"); };

  const filtered = bookings.filter((b) => {
    const q = filter.toLowerCase();
    return !q || b.full_name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.service_label.toLowerCase().includes(q) || b.payment_status.includes(q);
  });

  if (loading) return <Layout><div className="py-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div></Layout>;

  if (!authorized) {
    return (
      <Layout>
        <section className="py-16 container max-w-md text-center">
          <h1 className="text-2xl font-heading font-bold mb-3">Access Pending</h1>
          <p className="text-muted-foreground mb-2">Your account is signed in but doesn't have admin access yet.</p>
          <p className="text-xs text-muted-foreground">Your user id: <code>{userId}</code></p>
          <p className="text-xs text-muted-foreground mt-2">Ask an existing admin (or run the one-time grant in the backend) to add you to <code>user_roles</code>.</p>
          <Button onClick={signOut} variant="outline" className="mt-6"><LogOut className="h-4 w-4 mr-2" />Sign Out</Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-heading font-bold">Bookings</h1>
            <Button onClick={signOut} variant="outline" size="sm"><LogOut className="h-4 w-4 mr-2" />Sign Out</Button>
          </div>
          <Input placeholder="Search by name, email, service, status…" value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-4 max-w-md" />
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="p-3">Created</th><th className="p-3">Customer</th><th className="p-3">Service</th>
                  <th className="p-3">When</th><th className="p-3">Mode</th><th className="p-3">Status</th><th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="p-3 whitespace-nowrap">{new Date(b.created_at).toLocaleString()}</td>
                    <td className="p-3">
                      <div className="font-medium">{b.full_name}</div>
                      <div className="text-xs text-muted-foreground">{b.email} · {b.phone}</div>
                    </td>
                    <td className="p-3">{b.service_label}</td>
                    <td className="p-3 whitespace-nowrap">{b.preferred_date} {b.preferred_time}</td>
                    <td className="p-3">{b.payment_mode === "pay_now" ? "Pay now" : "At visit"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        b.payment_status === "paid" ? "bg-green-100 text-green-800" :
                        b.payment_status === "failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>{b.payment_status}</span>
                    </td>
                    <td className="p-3">{b.amount_cents != null ? `$${(b.amount_cents/100).toFixed(2)}` : "—"}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No bookings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
