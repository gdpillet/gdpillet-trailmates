import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface OrganizerSectionProps {
  name: string;
  role: string;
  avatar: string;
  label?: string; // "Organizer" or "Route Creator"
}

const OrganizerSection = ({ name, role, avatar, label = "Organizer" }: OrganizerSectionProps) => {
  return (
    <div className="pb-6 border-b border-border">
      <h3 className="text-foreground text-lg font-bold mb-4">{label}</h3>
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-semibold">{name}</p>
          <p className="text-muted-foreground text-sm">{role}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full"
      >
        Send a message
      </Button>
    </div>
  );
};

export default OrganizerSection;
