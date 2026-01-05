import { Users, Heart, Shield } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            Our Mission
          </span>
          <h2 className="heading-lg text-foreground">
            Built by adventurers, for adventurers
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe the outdoors are for everyone. TrailMates is a community-driven platform 
            where hikers, climbers, cyclists, and outdoor enthusiasts connect, share experiences, 
            and explore together — regardless of skill level or background.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Read our community guidelines →
          </a>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Inclusive Community</h3>
            <p className="text-muted-foreground">
              Everyone is welcome — from beginners taking their first steps to seasoned adventurers.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Shared Passion</h3>
            <p className="text-muted-foreground">
              Connect with people who share your love for nature and outdoor adventures.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Safety First</h3>
            <p className="text-muted-foreground">
              We prioritize trail safety, respect for nature, and looking out for one another.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
