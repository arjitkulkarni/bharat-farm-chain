import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">KisanConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering India's agricultural ecosystem with trust, transparency, and technology.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">For Users</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/farmer" className="hover:text-farmer transition-colors">Farmers</Link></li>
              <li><Link to="/vendor" className="hover:text-vendor transition-colors">Vendors</Link></li>
              <li><Link to="/buyer" className="hover:text-buyer transition-colors">Buyers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Government Schemes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Market Prices</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 KisanConnect. All rights reserved. Built for India's farmers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
