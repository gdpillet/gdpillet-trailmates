import { Link } from "react-router-dom";
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
import { EventData } from "@/hooks/useEvents";

export type { EventData } from "@/hooks/useEvents";

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
    <Link
      to={`/events/${event.id}`}
      className="block md:grid md:grid-cols-[60px_80px_180px_140px_1fr_1fr] gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer md:items-center"
    >
      {/* Mobile Card Layout */}
      <div className="md:hidden">
        {/* Cover Image - Full Width */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4">
          <img
            src={event.coverImage}
            alt={event.title}
            width={400}
            height={225}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Activity Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight flex-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full flex-shrink-0">
            <ActivityIcon className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              {activityLabels[event.activity.type]}
            </span>
          </div>
        </div>

        {/* Time, Duration & Difficulty */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="font-semibold text-foreground">{event.startTime}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{event.duration}</span>
          {event.activity.difficulty && (
            <>
              <span className="text-muted-foreground">•</span>
              <Badge
                variant="outline"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                {event.activity.difficulty}
              </Badge>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MoveHorizontal className="w-4 h-4" />
            {event.stats.distance}
          </span>
          <span className="flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            {event.stats.totalHeight}
          </span>
          <span>{event.stats.elevation} elev.</span>
        </div>

        {/* Departure Info */}
        <div className="flex items-center gap-2 text-sm mb-4 bg-muted/50 rounded-lg px-3 py-2">
          <TransportIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{event.departure.place}</span>
          <span className="text-muted-foreground">by {transportLabels[event.departure.transport]}</span>
        </div>

        {/* Footer: Organizer & Participants */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={event.organizer.avatar} />
              <AvatarFallback className="text-xs bg-muted">
                {event.organizer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              by {event.organizer.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.participants.avatars.slice(0, 3).map((avatar, idx) => (
                <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-xs bg-muted">U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm">
              <span className="font-medium text-foreground">{event.participants.count}</span>
              {isFull ? (
                <span className="text-amber-600"> / {event.participants.waitlist} waitlist</span>
              ) : (
                <span className="text-primary"> / {availableSpots} spots</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:contents">
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
            width={64}
            height={48}
            loading="lazy"
            decoding="async"
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
    </Link>
  );
};

export default EventCard;
