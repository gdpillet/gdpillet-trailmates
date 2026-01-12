import { Search, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

const HeroSection = () => {
  return (
    <HeroHighlight containerClassName="min-h-[90vh] pt-20">
      <div className="section-container w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
          >
            Join 50,000+ outdoor enthusiasts
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl leading-tight"
          >
            Let the Adventure{" "}
            <Highlight className="text-foreground">Begin</Highlight>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Connect with fellow hikers, discover breathtaking trails, and create unforgettable memories together.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-2xl p-2 shadow-card border border-border w-full max-w-xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search location or trail..."
                  className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary"
                  aria-label="Search location or trail"
                />
              </div>
              <Button size="lg" className="h-12 px-6 gap-2">
                <Search className="w-4 h-4" aria-hidden="true" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 pt-4"
          >
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
          </motion.div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default HeroSection;
