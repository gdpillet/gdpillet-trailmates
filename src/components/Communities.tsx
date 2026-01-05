import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const communities = [
  { city: "Munich", country: "Germany", members: 3420, flag: "🇩🇪" },
  { city: "Zurich", country: "Switzerland", members: 2890, flag: "🇨🇭" },
  { city: "Geneva", country: "Switzerland", members: 1950, flag: "🇨🇭" },
  { city: "Vienna", country: "Austria", members: 2340, flag: "🇦🇹" },
  { city: "Denver", country: "USA", members: 4120, flag: "🇺🇸" },
  { city: "Vancouver", country: "Canada", members: 3780, flag: "🇨🇦" },
];

const Communities = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Communities
            </span>
            <h2 className="heading-lg text-foreground">
              Find your local crew
            </h2>
          </div>
          <Button variant="outline" className="self-start sm:self-auto">
            View all communities
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((community) => (
            <article 
              key={community.city}
              className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border card-hover cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl flex-shrink-0">
                {community.flag}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {community.city}
                </h3>
                <p className="text-sm text-muted-foreground">{community.country}</p>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span>{community.members.toLocaleString()}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communities;
