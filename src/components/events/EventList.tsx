import EventCard from "./EventCard";
import { EventGroup } from "@/hooks/useEvents";

interface EventListProps {
  eventGroups: EventGroup[];
}

const EventList = ({ eventGroups }: EventListProps) => {
  return (
    <div className="flex-1">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[60px_80px_180px_140px_1fr_1fr] gap-4 py-3 text-sm text-muted-foreground border-b border-border">
        <div />
        <div />
        <div />
        <div>Departing from</div>
        <div>Activity</div>
        <div className="text-right">Participants</div>
      </div>

      {eventGroups.map((group) => (
        <div key={group.date}>
          <h2 className="font-semibold text-foreground py-4 mt-4 first:mt-0">
            {group.date}
          </h2>
          {group.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventList;
