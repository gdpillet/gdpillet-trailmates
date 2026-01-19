import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface ParticipantsSectionProps {
  count: number;
  max: number;
  avatars: string[];
}

const ParticipantsSection = ({ count, max, avatars }: ParticipantsSectionProps) => {
  const spotsLeft = max - count;

  return (
    <div className="pb-6 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground text-lg font-bold">Participants</h3>
        <p className="text-foreground text-sm text-right">
          {count} out of {max} / <span className="font-bold">{spotsLeft} spots left</span>
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {avatars.slice(0, 7).map((avatar, idx) => (
            <Avatar
              key={idx}
              className="w-8 h-8 border-2 border-muted"
            >
              <AvatarImage src={avatar} alt={`Participant ${idx + 1}`} />
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
          ))}
        </div>
        {spotsLeft > 0 && (
          <button 
            className="ml-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label="Join event"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ParticipantsSection;
