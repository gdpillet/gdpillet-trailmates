import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-hiking.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                Join 50,000+ outdoor enthusiasts
              </span>
              <h1 className="heading-xl text-foreground">
                Let the Adventure{" "}
                <span className="text-primary">Begin</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Connect with fellow hikers, discover breathtaking trails, and create unforgettable memories together.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-card rounded-2xl p-2 shadow-card border border-border max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search location or trail..."
                    className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
                <Button size="lg" className="h-12 px-6 gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">2,500+</p>
                <p className="text-muted-foreground text-sm">Active Routes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">180+</p>
                <p className="text-muted-foreground text-sm">Communities</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">12K+</p>
                <p className="text-muted-foreground text-sm">Events Hosted</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src={heroImage}
                alt="Hikers on mountain trail at sunrise"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-card rounded-xl p-4 shadow-card-hover border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-2xl">🏔️</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Next Adventure</p>
                  <p className="text-sm text-muted-foreground">Swiss Alps, Jan 15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
