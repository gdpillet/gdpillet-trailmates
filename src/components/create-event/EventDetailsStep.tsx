import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface EventDetailsStepProps {
  eventName: string;
  maxParticipants: number;
  onEventNameChange: (name: string) => void;
  onMaxParticipantsChange: (count: number) => void;
  onContinue: () => void;
}

export function EventDetailsStep({
  eventName,
  maxParticipants,
  onEventNameChange,
  onMaxParticipantsChange,
  onContinue,
}: EventDetailsStepProps) {
  const [name, setName] = useState(eventName);
  const [participants, setParticipants] = useState(maxParticipants.toString());

  useEffect(() => {
    setName(eventName);
    setParticipants(maxParticipants.toString());
  }, [eventName, maxParticipants]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    onEventNameChange(value);
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParticipants(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      onMaxParticipantsChange(num);
    }
  };

  const isValid = name.trim().length > 0 && parseInt(participants, 10) > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Name your adventure</h2>
        <p className="text-muted-foreground mb-8">
          Give your event a catchy name and set the group size 👥
        </p>

        <div className="space-y-6 mb-10">
          {/* Event Name */}
          <div className="text-left">
            <Label htmlFor="event-name" className="block mb-2">
              Event name
            </Label>
            <Input
              id="event-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g., Sunrise Summit Hike"
              className="text-lg"
              maxLength={100}
              aria-describedby="name-hint"
            />
            <p id="name-hint" className="text-xs text-muted-foreground mt-1">
              Make it memorable and descriptive
            </p>
          </div>

          {/* Max Participants */}
          <div className="text-left">
            <Label htmlFor="max-participants" className="block mb-2">
              Maximum participants
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="max-participants"
                type="number"
                min={1}
                max={100}
                value={participants}
                onChange={handleParticipantsChange}
                className="pl-10 text-lg"
                aria-describedby="participants-hint"
              />
            </div>
            <p id="participants-hint" className="text-xs text-muted-foreground mt-1">
              How many people can join?
            </p>
          </div>
        </div>

        <Button size="lg" onClick={onContinue} disabled={!isValid} className="px-10">
          Continue
        </Button>
      </div>
    </div>
  );
}
