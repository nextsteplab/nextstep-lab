import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import Layout from "@/components/Layout";

const Pricing = () => (
  <Layout>
    <section className="bg-hero text-hero-foreground py-14">
      <div className="container text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
          Transparent <span className="text-gold">Pricing</span>
        </h1>
        <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
          Affordable drug testing, DNA testing, and screening services. No hidden fees.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary text-secondary-foreground">
                <th className="px-6 py-4 font-heading font-semibold text-sm uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 font-heading font-semibold text-sm uppercase tracking-wider">Turnaround</th>
                <th className="px-6 py-4 font-heading font-semibold text-sm uppercase tracking-wider text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr
                  key={service.id}
                  className={`border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-gold shrink-0" />
                      <span className="font-medium text-foreground">{service.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{service.turnaround}</td>
                  <td className="px-6 py-4 text-right font-heading font-bold text-primary text-lg">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <Button variant="cta" size="lg" asChild>
            <Link to="/schedule">Schedule a Test</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Pricing;
