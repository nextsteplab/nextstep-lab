import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";

const Schedule = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="bg-hero text-hero-foreground py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
            Schedule <span className="text-gold">Your Test</span>
          </h1>
          <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
            Book an appointment online. We'll confirm your time within one business day.
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
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <Input required placeholder="Jane Doe" className="focus:border-gold focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                <Input required type="tel" placeholder="(806) 555-0199" className="focus:border-gold focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <Input required type="email" placeholder="jane@example.com" className="focus:border-gold focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Service Needed</label>
                <select
                  required
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
              </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Testing Location</label>
                <Input required placeholder="Enter address or location for service" className="focus:border-gold focus:ring-gold" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Date</label>
                  <Input required type="date" className="focus:border-gold focus:ring-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Time</label>
                  <Input required type="time" className="focus:border-gold focus:ring-gold" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes (optional)</label>
                <Textarea placeholder="Any additional details…" className="focus:border-gold focus:ring-gold" />
              </div>
              <Button type="submit" variant="cta" size="lg" className="w-full">
                Request Appointment
              </Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
