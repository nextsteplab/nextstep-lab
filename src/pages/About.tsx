import Layout from "@/components/Layout";
import { ShieldCheck, Award, Target, Users } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "HIPAA Compliant", desc: "Every test follows strict privacy and compliance protocols." },
  { icon: Award, title: "Certified Results", desc: "Lab-certified, legally admissible results you can trust." },
  { icon: Target, title: "Accuracy First", desc: "We use the latest equipment and methodologies for precise outcomes." },
  { icon: Users, title: "Community Focused", desc: "Proudly serving Lubbock and the surrounding West Texas region." },
];

const About = () => (
  <Layout>
    <section className="bg-hero text-hero-foreground py-14">
      <div className="container text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
          About <span className="text-gold">NextStep Lab</span>
        </h1>
        <p className="mt-3 text-hero-foreground/70 max-w-xl mx-auto">
          Professional testing services you can count on.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl text-center">
        <h2 className="text-2xl font-heading font-bold mb-6">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          NextStep Lab & Screening Services LLC was founded with one goal: to provide the Lubbock, Texas community with fast, confidential, and accurate laboratory testing. Whether you need a pre-employment drug screen, a court-ordered DNA test, or a DOT-compliant alcohol test, we deliver professional results with the care and discretion you deserve.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We are a fully mobile service — we come to your home, place of business, or wherever fits your needs. No need to drive across town or wait in a lobby. We bring the lab to you.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We serve individuals, employers, schools, legal professionals, and organizations across West Texas. Our team is committed to upholding the highest standards of accuracy, compliance, and customer service.
        </p>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container">
        <h2 className="text-2xl font-heading font-bold text-center mb-12">
          Why Choose <span className="text-gold">Us</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <v.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
