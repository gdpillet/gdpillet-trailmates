import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";

const events = [
  {
    title: "Summit Sunrise Hike",
    location: "Mount Pilatus, Switzerland",
    date: "Dec 28, 2025",
    image: event1,
    attendees: 24,
  },
  {
    title: "Alpine Mountain Biking",
    location: "Innsbruck, Austria",
    date: "Dec 21, 2025",
    image: event2,
    attendees: 18,
  },
  {
    title: "Rock Climbing Day",
    location: "Fontainebleau, France",
    date: "Dec 14, 2025",
    image: event3,
    attendees: 12,
  },
  {
    title: "Kayaking Adventure",
    location: "Lake Bled, Slovenia",
    date: "Dec 7, 2025",
    image: event4,
    attendees: 16,
  },
];

const PastEvents = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Past Events
            </span>
            <h2 className="heading-lg text-foreground">
              Adventures we've shared
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <article 
              key={event.title}
              className="flex-shrink-0 w-[300px] bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                  {event.attendees} attended
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
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

export default PastEvents;
