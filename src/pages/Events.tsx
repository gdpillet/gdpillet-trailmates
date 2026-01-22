import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventFilters from "@/components/events/EventFilters";
import EventList from "@/components/events/EventList";
import EventSidebar from "@/components/events/EventSidebar";
import { useEvents, getEventGroups } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const [location, setLocation] = useState("all");
  const [activity, setActivity] = useState("all");

  const { data: events, isLoading, error } = useEvents();

  const eventGroups = useMemo(() => {
    if (!events) return [];
    return getEventGroups(events, location, activity);
  }, [events, location, activity]);

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
            {isLoading ? (
              <div className="flex-1 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex-1 text-center py-12">
                <p className="text-destructive">Failed to load events. Please try again.</p>
              </div>
            ) : eventGroups.length === 0 ? (
              <div className="flex-1 text-center py-12">
                <p className="text-muted-foreground">No events found matching your filters.</p>
              </div>
            ) : (
              <EventList eventGroups={eventGroups} />
            )}
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
