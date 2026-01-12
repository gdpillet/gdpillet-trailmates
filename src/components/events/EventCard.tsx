import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  Bike,
  Snowflake,
  Users,
  MapPin,
  Train,
  Bus,
  Car,
  ArrowUpRight,
  MoveHorizontal,
} from "lucide-react";

export interface EventData {
  id: string;
  title: string;
  coverImage: string;
  startTime: string;
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

const activityIcons = {
  hiking: Mountain,
  cycling: Bike,
  "ski-touring": Snowflake,
  bouldering: Mountain,
  social: Users,
};

const activityLabels = {
  hiking: "Hiking",
  cycling: "Cycling",
  "ski-touring": "Ski Touring",
  bouldering: "Bouldering",
  social: "Social",
};

const transportIcons = {
  train: Train,
  bus: Bus,
  carpool: Car,
  none: MapPin,
};

const transportLabels = {
  train: "Train",
  bus: "Bus",
  carpool: "Carpool",
  none: "No transport",
};

interface EventCardProps {
  event: EventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const ActivityIcon = activityIcons[event.activity.type];
  const TransportIcon = transportIcons[event.departure.transport];
  const availableSpots = event.participants.max - event.participants.count;
  const isFull = availableSpots <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60px_80px_180px_140px_1fr_1fr] gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer items-center">
      {/* Time & Duration */}
      <div className="text-left">
        <p className="font-semibold text-foreground">{event.startTime}</p>
        <p className="text-sm text-muted-foreground">{event.duration}</p>
      </div>

      {/* Cover Image */}
      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Organizer */}
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <Avatar className="w-5 h-5">
            <AvatarImage src={event.organizer.avatar} />
            <AvatarFallback className="text-xs bg-muted">
              {event.organizer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground truncate">
            by {event.organizer.name}
          </span>
        </div>
      </div>

      {/* Departure Info */}
      <div className="text-sm">
        <p className="font-medium text-foreground">{event.departure.place}</p>
        <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
          <span>by</span>
          <TransportIcon className="w-3.5 h-3.5" />
          <span>{transportLabels[event.departure.transport]}</span>
        </div>
      </div>

      {/* Activity & Stats */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <ActivityIcon className="w-4 h-4 text-foreground" />
            <span className="font-medium text-foreground">
              {activityLabels[event.activity.type]}
            </span>
          </div>
          {event.activity.difficulty && (
            <Badge
              variant="outline"
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              {event.activity.difficulty}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MoveHorizontal className="w-3.5 h-3.5" />
            {event.stats.distance}
          </span>
          <span>•</span>
          <span>{event.stats.elevation} elevation</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {event.stats.totalHeight}
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center justify-end gap-3">
        <div className="text-right text-sm">
          <span className="font-medium text-foreground">
            {event.participants.count} coming
          </span>
          {isFull ? (
            <span className="text-amber-600"> / {event.participants.waitlist} in waitlist</span>
          ) : (
            <span className="text-primary"> / {availableSpots} available</span>
          )}
        </div>
        <div className="flex -space-x-2">
          {event.participants.avatars.slice(0, 4).map((avatar, idx) => (
            <Avatar key={idx} className="w-7 h-7 border-2 border-background">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-xs bg-muted">U</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
