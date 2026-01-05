import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import routeSwissAlps from "@/assets/route-swiss-alps.jpg";
import routeDolomites from "@/assets/route-dolomites.jpg";
import routePyrenees from "@/assets/route-pyrenees.jpg";
import routeScotland from "@/assets/route-scotland.jpg";

const routes = [
  {
    name: "Eiger Trail",
    location: "Swiss Alps, Switzerland",
    image: routeSwissAlps,
    rating: 4.9,
    duration: "6-7 hours",
    difficulty: "Moderate",
  },
  {
    name: "Tre Cime Loop",
    location: "Dolomites, Italy",
    image: routeDolomites,
    rating: 4.8,
    duration: "4-5 hours",
    difficulty: "Moderate",
  },
  {
    name: "Ordesa Valley",
    location: "Pyrenees, Spain",
    image: routePyrenees,
    rating: 4.7,
    duration: "5-6 hours",
    difficulty: "Easy",
  },
  {
    name: "Ben Nevis",
    location: "Scottish Highlands",
    image: routeScotland,
    rating: 4.6,
    duration: "7-8 hours",
    difficulty: "Challenging",
  },
];

const PopularRoutes = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Popular Routes
            </span>
            <h2 className="heading-lg text-foreground">
              Explore iconic trails
            </h2>
          </div>
          <Button variant="outline" className="self-start sm:self-auto">
            View all routes
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <article 
              key={route.name} 
              className="group bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                  {route.difficulty}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {route.name}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{route.location}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium text-foreground">{route.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{route.duration}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
