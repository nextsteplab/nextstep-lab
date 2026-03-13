import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
{ label: "Home", to: "/" },
{ label: "Services", to: "/services" },
{ label: "Pricing", to: "/pricing" },
{ label: "About", to: "/about" },
{ label: "Contact", to: "/contact" }];


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b border-secondary/80 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-primary" />
          <span className="font-heading font-bold text-lg text-secondary-foreground tracking-tight">
            NextStep Lab & Screening Services LLC      
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-medium transition-colors hover:text-gold ${
            location.pathname === link.to ?
            "text-gold" :
            "text-secondary-foreground/80"}`
            }>
            
              {link.label}
            </Link>
          )}
          <Button variant="cta" size="sm" asChild>
            <Link to="/schedule">Schedule a Test</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-secondary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu">
          
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open &&
      <div className="md:hidden bg-secondary border-t border-secondary/60 animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={`text-sm font-medium py-2 transition-colors hover:text-gold ${
            location.pathname === link.to ?
            "text-gold" :
            "text-secondary-foreground/80"}`
            }>
            
                {link.label}
              </Link>
          )}
            <Button variant="cta" size="sm" asChild>
              <Link to="/schedule" onClick={() => setOpen(false)}>
                Schedule a Test
              </Link>
            </Button>
          </div>
        </div>
      }
    </nav>);

};

export default Navbar;