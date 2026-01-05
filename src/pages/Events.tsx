import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventFilters from "@/components/events/EventFilters";
import EventList from "@/components/events/EventList";
import EventSidebar from "@/components/events/EventSidebar";
import { EventData } from "@/components/events/EventCard";

// Sample event data
const sampleEvents: EventData[] = [
  {
    id: "1",
    title: "A very long event name bla second line",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop",
    startTime: "6:45",
    duration: "3 days",
    organizer: {
      name: "Jessica",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    departure: {
      place: "Munich Hbf, pl 29",
      transport: "train",
    },
    activity: {
      type: "hiking",
      difficulty: "T3",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "1800 total height",
    },
    participants: {
      count: 12,
      max: 16,
      waitlist: 0,
      avatars: [
        "https://i.pravatar.cc/32?img=1",
        "https://i.pravatar.cc/32?img=2",
        "https://i.pravatar.cc/32?img=3",
        "https://i.pravatar.cc/32?img=4",
      ],
    },
  },
  {
    id: "2",
    title: "Rofanspitze",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    startTime: "6:45",
    duration: "12 hours",
    organizer: {
      name: "Helena",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    departure: {
      place: "Munich",
      transport: "carpool",
    },
    activity: {
      type: "cycling",
      difficulty: "T3",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "1800 descent",
    },
    participants: {
      count: 20,
      max: 20,
      waitlist: 20,
      avatars: [
        "https://i.pravatar.cc/32?img=6",
        "https://i.pravatar.cc/32?img=7",
        "https://i.pravatar.cc/32?img=8",
        "https://i.pravatar.cc/32?img=9",
      ],
    },
  },
  {
    id: "3",
    title: "Tannheimer Berge",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=150&fit=crop",
    startTime: "6:45",
    duration: "1 day",
    organizer: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=10",
    },
    departure: {
      place: "Munich",
      transport: "bus",
    },
    activity: {
      type: "hiking",
      difficulty: "T3",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "2234 total height",
    },
    participants: {
      count: 12,
      max: 16,
      waitlist: 0,
      avatars: [
        "https://i.pravatar.cc/32?img=11",
        "https://i.pravatar.cc/32?img=12",
        "https://i.pravatar.cc/32?img=13",
        "https://i.pravatar.cc/32?img=14",
      ],
    },
  },
  {
    id: "4",
    title: "Event name bla second line",
    coverImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=200&h=150&fit=crop",
    startTime: "8:00",
    duration: "12 days",
    organizer: {
      name: "Freddy",
      avatar: "https://i.pravatar.cc/40?img=15",
    },
    departure: {
      place: "Munich Hbf",
      transport: "none",
    },
    activity: {
      type: "hiking",
      difficulty: "T3",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "1800 descent",
    },
    participants: {
      count: 20,
      max: 20,
      waitlist: 20,
      avatars: [
        "https://i.pravatar.cc/32?img=16",
        "https://i.pravatar.cc/32?img=17",
        "https://i.pravatar.cc/32?img=18",
        "https://i.pravatar.cc/32?img=19",
      ],
    },
  },
  {
    id: "5",
    title: "Event name bla second line",
    coverImage: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=150&fit=crop",
    startTime: "6:45",
    duration: "12 hours",
    organizer: {
      name: "Larissa",
      avatar: "https://i.pravatar.cc/40?img=20",
    },
    departure: {
      place: "Zurich Hbf",
      transport: "bus",
    },
    activity: {
      type: "hiking",
      difficulty: "T3",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "2234 total height",
    },
    participants: {
      count: 12,
      max: 16,
      waitlist: 0,
      avatars: [
        "https://i.pravatar.cc/32?img=21",
        "https://i.pravatar.cc/32?img=22",
        "https://i.pravatar.cc/32?img=23",
        "https://i.pravatar.cc/32?img=24",
      ],
    },
  },
  {
    id: "6",
    title: "Hiking the highest peak",
    coverImage: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=200&h=150&fit=crop",
    startTime: "6:45",
    duration: "1 day",
    organizer: {
      name: "Laurence",
      avatar: "https://i.pravatar.cc/40?img=25",
    },
    departure: {
      place: "Munich deutsches...",
      transport: "none",
    },
    activity: {
      type: "hiking",
    },
    stats: {
      distance: "18km",
      elevation: "1982",
      totalHeight: "1800 descent",
    },
    participants: {
      count: 20,
      max: 20,
      waitlist: 20,
      avatars: [
        "https://i.pravatar.cc/32?img=26",
        "https://i.pravatar.cc/32?img=27",
        "https://i.pravatar.cc/32?img=28",
        "https://i.pravatar.cc/32?img=29",
      ],
    },
  },
];

const Events = () => {
  const [location, setLocation] = useState("all");
  const [activity, setActivity] = useState("all");

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      const locationMatch =
        location === "all" ||
        event.departure.place.toLowerCase().includes(location.toLowerCase());
      const activityMatch =
        activity === "all" || event.activity.type === activity;
      return locationMatch && activityMatch;
    });
  }, [location, activity]);

  const eventGroups = useMemo(() => {
    // Group events by date (for demo, we use static dates)
    return [
      {
        date: "Tomorrow, Saturday",
        events: filteredEvents.slice(0, 4),
      },
      {
        date: "Jun 23, Sunday",
        events: filteredEvents.slice(4),
      },
    ].filter((group) => group.events.length > 0);
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          <h1 className="heading-xl mb-8">Events</h1>

          <EventFilters
            location={location}
            activity={activity}
            onLocationChange={setLocation}
            onActivityChange={setActivity}
          />

          <div className="flex gap-8 mt-6">
            <EventList eventGroups={eventGroups} />
            <div className="hidden lg:block">
              <EventSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
