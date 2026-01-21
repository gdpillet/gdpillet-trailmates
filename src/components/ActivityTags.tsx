import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ActivityTags = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const activities = [
    { name: t.activities.hiking, emoji: "🥾", color: "bg-emerald-100" },
    { name: t.activities.climbing, emoji: "🧗", color: "bg-orange-100" },
    { name: t.activities.cycling, emoji: "🚴", color: "bg-blue-100" },
    { name: t.activities.trailRunning, emoji: "🏃", color: "bg-rose-100" },
    { name: t.activities.waterSports, emoji: "🛶", color: "bg-cyan-100" },
    { name: t.activities.skiing, emoji: "⛷️", color: "bg-indigo-100" },
    { name: t.activities.camping, emoji: "🏕️", color: "bg-amber-100" },
    { name: t.activities.photography, emoji: "📸", color: "bg-purple-100" },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-md text-foreground">{t.activities.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activities.map((activity) => (
            <button
              key={activity.name}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border card-hover cursor-pointer"
            >
              <span className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center text-2xl`}>
                {activity.emoji}
              </span>
              <span className="font-semibold text-foreground whitespace-nowrap">{activity.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityTags;
