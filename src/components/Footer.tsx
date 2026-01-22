import { forwardRef } from "react";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { t } = useLanguage();

  return (
    <footer ref={ref} className="bg-foreground text-muted py-12">
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
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">{t.footer.platform}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/events" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.nav.events}
                </a>
              </li>
              <li>
                <a href="/routes" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.nav.routes}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.nav.communities}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.nav.addEvent}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-background mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.footer.contactUs}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.footer.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.footer.termsOfService}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground/80 hover:text-background transition-colors">
                  {t.footer.imprint}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/60 text-sm">
            {t.footer.copyright}
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground/60 text-sm">
            {t.footer.madeWith} <Heart className="w-4 h-4 text-primary fill-primary" /> {t.footer.forAdventurers}
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
