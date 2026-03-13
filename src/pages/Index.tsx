import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ShieldCheck, Award, Clock, Lock } from "lucide-react";
import Layout from "@/components/Layout";

const trustBadges = [
{ icon: ShieldCheck, label: "HIPAA Compliant" },
{ icon: Award, label: "Certified Lab" },
{ icon: Clock, label: "Fast Results" },
{ icon: Lock, label: "100% Confidential" }];


const Index = () =>
<Layout>
    {/* Hero */}
    <section className="bg-hero text-hero-foreground">
      <div className="container py-20 md:py-28 text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold leading-tight animate-fade-in-up max-w-3xl mx-auto">
          Reliable Lab, Drug & DNA Testing <span className="text-gold">​</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-hero-foreground/70 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Fast, confidential screening and testing services for individuals,
          employers, schools, and legal professionals.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button variant="hero" size="lg" asChild>
            <Link to="/schedule">Schedule a Test</Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/services">View Services</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Trust Badges */}
    <section className="border-b border-primary/20 bg-primary/5">
      <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustBadges.map((badge) =>
      <div
        key={badge.label}
        className="flex items-center gap-3 justify-center animate-fade-in-up animation-delay-200">
        
            <badge.icon className="h-6 w-6 text-primary" />
            <span className="text-sm font-heading font-semibold text-foreground">
              {badge.label}
            </span>
          </div>
      )}
      </div>
    </section>

    {/* Service Highlights */}
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
          Our <span className="text-primary">Services</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service, i) =>
        <div
          key={service.id}
          className={`bg-card border border-border rounded-lg p-6 hover:border-gold/50 hover:shadow-md transition-all animate-fade-in-up animation-delay-${i < 4 ? "200" : "400"}`}>
          
              <service.icon className="h-8 w-8 text-gold mb-4" />
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              <p className="mt-3 font-heading font-bold text-primary text-lg">
                {service.price}
              </p>
            </div>
        )}
        </div>
        <div className="text-center mt-10">
          <Button variant="cta" asChild>
            <Link to="/services">View All Services & Pricing</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* CTA Band */}
    <section className="bg-hero text-hero-foreground">
      <div className="container py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
          Ready to Get <span className="text-primary">Tested</span>?{"\n"}
        </h2>
        <p className="text-hero-foreground/70 mb-6 max-w-xl mx-auto">
          Book your appointment online in minutes. 
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/schedule">Schedule Now</Link>
        </Button>
      </div>
    </section>
  </Layout>;


export default Index;