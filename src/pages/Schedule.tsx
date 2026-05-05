import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { services } from "@/data/services";
import Layout from "@/components/Layout";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

const Schedule = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", service: "",
    location: "", preferredDate: "", preferredTime: "", notes: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const selectedService = services.find((s) => s.id === form.service);

  const sendBookingEmail = async () => {
    const serviceLabel = selectedService?.title || form.service;
    return supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "booking-request",
        templateData: { ...form, service: serviceLabel },
      },
    });
  };

  const handleRequestOnly = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await sendBookingEmail();
    // Also persist a pending pay-at-visit booking record
    await supabase.from("bookings").insert({
      full_name: form.fullName, phone: form.phone, email: form.email,
      service_id: form.service, service_label: selectedService?.title || form.service,
      location: form.location, preferred_date: form.preferredDate,
      preferred_time: form.preferredTime, notes: form.notes || null,
      payment_mode: "pay_at_visit", payment_status: "pending",
      amount_cents: selectedService?.amountCents ?? null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Submission failed", description: "Please call us at (806) 304-3424.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  const handlePayNow = async () => {
    if (!form.fullName || !form.phone || !form.email || !form.service || !form.location || !form.preferredDate || !form.preferredTime) {
      toast({ title: "Please complete the form first", variant: "destructive" });
      return;
    }
    if (!selectedService?.priceId) {
      toast({ title: "This service is not available for online payment", variant: "destructive" });
      return;
    }
    // Send a "pending payment" notification to admin so you know someone started checkout
    await sendBookingEmail();
    setShowCheckout(true);
  };

  return (
    <Layout>
      <section className="bg-hero text-hero-foreground py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
            Schedule <span className="text-gold">Your Test</span>
          </h1>
          <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
            Book an appointment online. Pay upfront to lock in your slot, or request and pay at the visit.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-xl">
          {submitted ? (
            <div className="text-center animate-fade-in-up">
              <CheckCircle className="h-16 w-16 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-bold mb-2">Appointment Requested!</h2>
              <p className="text-muted-foreground">
                Thank you! We'll reach out shortly to confirm your appointment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestOnly} className="space-y-5 animate-fade-in-up">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <Input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                <Input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(806) 555-0199" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Service Needed</label>
                <select required value={form.service} onChange={(e) => update("service", e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title} — {s.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Testing Location</label>
                <Input required value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Enter address or location for service" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Date</label>
                  <Input required type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Time</label>
                  <Input required type="time" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes (optional)</label>
                <Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any additional details…" />
              </div>

              {selectedService?.priceId && (
                <Button type="button" variant="cta" size="lg" className="w-full" disabled={loading} onClick={handlePayNow}>
                  {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Preparing…</> : `Pay ${selectedService.price} & Book`}
                </Button>
              )}
              <Button type="submit" variant="outline" size="lg" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</> : "Request Appointment (pay at visit)"}
              </Button>
            </form>
          )}
        </div>
      </section>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
          </DialogHeader>
          {showCheckout && selectedService?.priceId && (
            <StripeEmbeddedCheckout
              priceId={selectedService.priceId}
              customerEmail={form.email}
              returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
              booking={{
                fullName: form.fullName,
                phone: form.phone,
                email: form.email,
                serviceId: selectedService.id,
                serviceLabel: selectedService.title,
                location: form.location,
                preferredDate: form.preferredDate,
                preferredTime: form.preferredTime,
                notes: form.notes || undefined,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Schedule;
