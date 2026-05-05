import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <PaymentTestModeBanner />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
