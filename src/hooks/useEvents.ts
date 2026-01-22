import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

export interface EventData {
  id: string;
  title: string;
  coverImage: string;
  startTime: string;
  eventDate: string;
  duration: string;
  organizer: {
    name: string;
    avatar: string;
  };
  departure: {
    place: string;
    transport: "train" | "bus" | "carpool" | "none";
  };
  activity: {
    type: "hiking" | "cycling" | "ski-touring" | "bouldering" | "social";
    difficulty?: string;
  };
  stats: {
    distance: string;
    elevation: string;
    totalHeight: string;
  };
  participants: {
    count: number;
    max: number;
    waitlist: number;
    avatars: string[];
  };
}

export interface EventDetailData extends EventData {
  description?: string;
  meetingInfo: {
    location?: string;
    time?: string;
    transport?: string;
    ticketPrice?: string;
    note?: string;
  };
  equipment: string[];
  routeDetails: {
    distance?: string;
    ascent?: string;
    descent?: string;
    highestPoint?: string;
    duration?: string;
    rating?: string;
  };
  galleryImages: string[];
}

interface DbEvent {
  id: string;
  title: string;
  cover_image: string;
  start_time: string;
  event_date: string;
  duration: string;
  organizer_name: string;
  organizer_avatar: string;
  departure_place: string;
  departure_transport: "train" | "bus" | "carpool" | "none";
  activity_type: "hiking" | "cycling" | "ski-touring" | "bouldering" | "social";
  activity_difficulty: string | null;
  stats_distance: string;
  stats_elevation: string;
  stats_total_height: string;
  participants_count: number;
  participants_max: number;
  participants_waitlist: number;
  participant_avatars: string[];
  description: string | null;
  meeting_location: string | null;
  meeting_time: string | null;
  meeting_transport: string | null;
  ticket_price: string | null;
  meeting_note: string | null;
  equipment: string[] | null;
  route_distance: string | null;
  route_ascent: string | null;
  route_descent: string | null;
  route_highest_point: string | null;
  route_duration: string | null;
  route_rating: string | null;
  gallery_images: string[] | null;
}

const mapDbEventToEventData = (dbEvent: DbEvent): EventData => ({
  id: dbEvent.id,
  title: dbEvent.title,
  coverImage: dbEvent.cover_image,
  startTime: dbEvent.start_time,
  eventDate: dbEvent.event_date,
  duration: dbEvent.duration,
  organizer: {
    name: dbEvent.organizer_name,
    avatar: dbEvent.organizer_avatar,
  },
  departure: {
    place: dbEvent.departure_place,
    transport: dbEvent.departure_transport,
  },
  activity: {
    type: dbEvent.activity_type,
    difficulty: dbEvent.activity_difficulty ?? undefined,
  },
  stats: {
    distance: dbEvent.stats_distance,
    elevation: dbEvent.stats_elevation,
    totalHeight: dbEvent.stats_total_height,
  },
  participants: {
    count: dbEvent.participants_count,
    max: dbEvent.participants_max,
    waitlist: dbEvent.participants_waitlist,
    avatars: dbEvent.participant_avatars,
  },
});

const mapDbEventToEventDetailData = (dbEvent: DbEvent): EventDetailData => ({
  ...mapDbEventToEventData(dbEvent),
  description: dbEvent.description ?? undefined,
  meetingInfo: {
    location: dbEvent.meeting_location ?? undefined,
    time: dbEvent.meeting_time ?? undefined,
    transport: dbEvent.meeting_transport ?? undefined,
    ticketPrice: dbEvent.ticket_price ?? undefined,
    note: dbEvent.meeting_note ?? undefined,
  },
  equipment: dbEvent.equipment ?? [],
  routeDetails: {
    distance: dbEvent.route_distance ?? undefined,
    ascent: dbEvent.route_ascent ?? undefined,
    descent: dbEvent.route_descent ?? undefined,
    highestPoint: dbEvent.route_highest_point ?? undefined,
    duration: dbEvent.route_duration ?? undefined,
    rating: dbEvent.route_rating ?? undefined,
  },
  galleryImages: dbEvent.gallery_images ?? [],
});

const formatEventDate = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (isToday(date)) {
    return `Today, ${format(date, "EEEE")}`;
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "EEEE")}`;
  }
  return format(date, "MMM d, EEEE");
};

export const formatEventDateDisplay = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "MMM d, EEEE");
};

export interface EventGroup {
  date: string;
  events: EventData[];
}

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) {
        throw error;
      }

      return (data as DbEvent[]).map(mapDbEventToEventData);
    },
  });
};

export const useEvent = (eventId: string | undefined) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      if (!eventId) {
        throw new Error("Event ID is required");
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Event not found");
      }

      return mapDbEventToEventDetailData(data as DbEvent);
    },
    enabled: !!eventId,
  });
};

export const getEventGroups = (
  events: EventData[],
  locationFilter: string,
  activityFilter: string
): EventGroup[] => {
  // Filter events
  const filteredEvents = events.filter((event) => {
    const locationMatch =
      locationFilter === "all" ||
      event.departure.place.toLowerCase().includes(locationFilter.toLowerCase());
    const activityMatch =
      activityFilter === "all" || event.activity.type === activityFilter;
    return locationMatch && activityMatch;
  });

  // Group by date
  const groupedMap = new Map<string, EventData[]>();

  filteredEvents.forEach((event) => {
    const formattedDate = formatEventDate(event.eventDate);
    if (!groupedMap.has(formattedDate)) {
      groupedMap.set(formattedDate, []);
    }
    groupedMap.get(formattedDate)!.push(event);
  });

  return Array.from(groupedMap.entries()).map(([date, events]) => ({
    date,
    events,
  }));
};
