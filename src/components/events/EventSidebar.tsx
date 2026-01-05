import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Train, MoveHorizontal, ArrowUpRight } from "lucide-react";

interface SidebarEventData {
  id: string;
  date: string;
  dayName: string;
  title: string;
  time: string;
  location: string;
  transport: string;
  activity: string;
  difficulty: string;
  distance: string;
  elevation: string;
  organizer: string;
  participantCount: number;
  isFull?: boolean;
  images?: string[];
  showReview?: boolean;
}

const upcomingEvents: SidebarEventData[] = [
  {
    id: "1",
    date: "Jun 30",
    dayName: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    organizer: "Jean-Christian",
    participantCount: 14,
    isFull: true,
  },
  {
    id: "2",
    date: "Jun 30",
    dayName: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    organizer: "Jean-Christian",
    participantCount: 14,
    isFull: true,
  },
];

const pastEvents: SidebarEventData[] = [
  {
    id: "3",
    date: "Jun 30",
    dayName: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    organizer: "Jean-Christian",
    participantCount: 14,
    showReview: true,
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=80&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=80&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=100&h=80&fit=crop",
    ],
  },
];

const SidebarEventCard = ({ event }: { event: SidebarEventData }) => (
  <div className="py-3 border-b border-border last:border-0">
    <div className="flex gap-3">
      <div className="text-center min-w-[45px]">
        <p className="text-sm font-medium text-foreground">{event.date}</p>
        <p className="text-xs text-muted-foreground">{event.dayName}</p>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground text-sm leading-tight line-clamp-2">
          {event.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          at {event.time} · from {event.location} · by {event.transport}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs bg-muted text-muted-foreground border-0"
          >
            {event.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bike className="w-3 h-3" />
            <span>{event.activity}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MoveHorizontal className="w-3 h-3" />
            {event.distance}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowUpRight className="w-3 h-3" />
            {event.elevation}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <Avatar key={i} className="w-5 h-5 border border-background">
                  <AvatarImage
                    src={`https://i.pravatar.cc/32?img=${20 + i}`}
                  />
                  <AvatarFallback className="text-[10px] bg-muted">
                    U
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              +{event.participantCount}, by {event.organizer}
            </span>
          </div>
          {event.isFull && (
            <span className="text-xs text-muted-foreground">full</span>
          )}
        </div>
        {event.showReview && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2 mr-2"
            >
              Write reviews
            </Button>
            <div className="flex gap-1 mt-2">
              {event.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Event photo"
                  className="w-12 h-10 rounded object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const EventSidebar = () => {
  return (
    <aside className="w-80 flex-shrink-0">
      <Card className="sticky top-24 bg-muted/30 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Your upcoming events
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {upcomingEvents.map((event) => (
            <SidebarEventCard key={event.id} event={event} />
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4 bg-muted/30 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Your past events
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {pastEvents.map((event) => (
            <SidebarEventCard key={event.id} event={event} />
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default EventSidebar;
