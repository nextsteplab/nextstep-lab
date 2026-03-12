import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import Layout from "@/components/Layout";

const Services = () => (
  <Layout>
    <section className="bg-hero text-hero-foreground py-14">
      <div className="container text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
          Drug Testing & Screening <span className="text-gold">Services</span>
        </h1>
        <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
          Comprehensive lab testing, DNA testing, and background check services in Lubbock, Texas.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-card border border-border rounded-lg p-8 hover:border-gold/50 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-muted">
                <service.icon className="h-7 w-7 text-gold" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-bold text-xl text-foreground">
                  {service.title}
                </h2>
                <span className="text-xs text-muted-foreground">
                  Turnaround: {service.turnaround}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
              {service.description}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl font-heading font-bold text-primary">
                {service.price}
              </span>
              <Button variant="cta" size="sm" asChild>
                <Link to="/schedule">Book Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
