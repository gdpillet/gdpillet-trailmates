import { Calendar, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PastEvent {
  id: string;
  date: string;
  title: string;
  participants: number;
  organizerAvatar: string;
  organizerName: string;
}

interface PastEventsSectionProps {
  events: PastEvent[];
}

const PastEventsSection = ({ events }: PastEventsSectionProps) => {
  if (events.length === 0) return null;

  return (
    <div className="pb-6 border-b border-border">
      <h3 className="text-foreground text-lg font-bold mb-4">Past Events</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div 
            key={event.id}
            className="p-3 rounded-lg bg-background hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <p className="text-foreground font-medium text-sm line-clamp-1 mb-1">
              {event.title}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{event.participants}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Avatar className="w-5 h-5">
                <AvatarImage src={event.organizerAvatar} alt={event.organizerName} />
                <AvatarFallback className="text-[10px]">{event.organizerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">by {event.organizerName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEventsSection;
