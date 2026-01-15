import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-muted py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl text-background">TrailMates</span>
            </div>
            <p className="text-muted-foreground/80 max-w-sm">
              Connecting outdoor enthusiasts worldwide. Find your adventure, meet your crew.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Routes
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Communities
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Add Event
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  Imprint
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/60 text-sm">
            © 2026 TrailMates. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground/60 text-sm">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for adventurers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
