import { Link } from "react-router-dom";
import { FlaskConical, Phone, Mail, MapPin } from "lucide-react";

const Footer = () =>
<footer className="bg-secondary text-secondary-foreground">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical className="h-6 w-6 text-gold" />
          <span className="font-heading font-bold text-lg">NextStep Lab</span>
        </div>
        <p className="text-sm text-secondary-foreground/70 leading-relaxed">
          Fast, confidential, and professional lab testing and screening services in Lubbock, Texas and surrounding areas.  
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-heading font-semibold mb-4 text-gold text-sm uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {[
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Pricing", to: "/pricing" },
        { label: "Schedule a Test", to: "/schedule" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" }].
        map((link) =>
        <li key={link.to}>
              <Link to={link.to} className="text-secondary-foreground/70 hover:text-gold transition-colors">
                {link.label}
              </Link>
            </li>
        )}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-heading font-semibold mb-4 text-gold text-sm uppercase tracking-wider">Contact</h4>
        <ul className="space-y-3 text-sm text-secondary-foreground/70">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" />
            (806) 304-3424
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gold" />
            info@nextsteplab.com
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            Lubbock, Texas
          </li>
        </ul>
        {/* Social placeholders */}
        <div className="flex gap-3 mt-4">
          {["Facebook", "Instagram", "LinkedIn"].map((s) =>
        <span
          key={s}
          className="text-xs border border-secondary-foreground/20 rounded px-2 py-1 text-secondary-foreground/50 hover:border-gold hover:text-gold transition-colors cursor-pointer">
          
              {s}
            </span>
        )}
        </div>
      </div>
    </div>

    <div className="border-t border-secondary-foreground/10">
      <div className="container py-4 text-center text-xs text-secondary-foreground/40">
        © {new Date().getFullYear()} NextStep Lab & Screening Services LLC. All rights reserved.
      </div>
    </div>
  </footer>;


export default Footer;