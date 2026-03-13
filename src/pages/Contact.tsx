import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <section className="bg-hero text-hero-foreground py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
            Contact <span className="text-gold">Us</span>
          </h1>
          <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
            Have questions? We're here to help. Reach out today.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold">Get in Touch</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <span>(806) 555-0199</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <span>info@nextsteplab.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" />
                <span>Lubbock, Texas</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold" />
              <div className="text-sm">
                  <p>Mon: 8:00 AM – 7:00 PM</p>
                  <p>Tue: 8:00 AM – 7:00 PM</p>
                  <p>Wed: 8:00 AM – 7:00 PM</p>
                  <p>Thu: 8:00 AM – 7:00 PM</p>
                  <p>Fri: 8:00 AM – 7:00 PM</p>
                  <p>Sat: By Appointment</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="text-center animate-fade-in-up py-12">
                <CheckCircle className="h-14 w-14 text-gold mx-auto mb-3" />
                <h3 className="text-xl font-heading font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <Input required placeholder="Your Name" className="focus:border-gold focus:ring-gold" />
                <Input required type="email" placeholder="Email Address" className="focus:border-gold focus:ring-gold" />
                <Input type="tel" placeholder="Phone Number (optional)" className="focus:border-gold focus:ring-gold" />
                <Textarea required placeholder="How can we help?" rows={5} className="focus:border-gold focus:ring-gold" />
                <Button type="submit" variant="cta" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
