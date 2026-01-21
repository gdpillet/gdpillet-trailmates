import { Users, Heart, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MissionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            {t.mission.badge}
          </span>
          <h2 className="heading-lg text-foreground">
            {t.mission.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.mission.description}
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            {t.mission.guidelinesLink}
          </a>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">{t.mission.inclusiveTitle}</h3>
            <p className="text-muted-foreground">
              {t.mission.inclusiveDescription}
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">{t.mission.passionTitle}</h3>
            <p className="text-muted-foreground">
              {t.mission.passionDescription}
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">{t.mission.safetyTitle}</h3>
            <p className="text-muted-foreground">
              {t.mission.safetyDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
