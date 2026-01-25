import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface DescriptionStepProps {
  description: string;
  addDisclaimer: boolean;
  disclaimerText: string;
  onDescriptionChange: (desc: string) => void;
  onAddDisclaimerChange: (add: boolean) => void;
  onDisclaimerTextChange: (text: string) => void;
  onContinue: () => void;
}

export function DescriptionStep({
  description,
  addDisclaimer,
  disclaimerText,
  onDescriptionChange,
  onAddDisclaimerChange,
  onDisclaimerTextChange,
  onContinue,
}: DescriptionStepProps) {
  const [desc, setDesc] = useState(description);
  const [hasDisclaimer, setHasDisclaimer] = useState(addDisclaimer);
  const [disclaimer, setDisclaimer] = useState(disclaimerText);

  useEffect(() => {
    setDesc(description);
    setHasDisclaimer(addDisclaimer);
    setDisclaimer(disclaimerText);
  }, [description, addDisclaimer, disclaimerText]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDesc(value);
    onDescriptionChange(value);
  };

  const handleDisclaimerToggle = (checked: boolean) => {
    setHasDisclaimer(checked);
    onAddDisclaimerChange(checked);
  };

  const handleDisclaimerTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDisclaimer(value);
    onDisclaimerTextChange(value);
  };

  const isValid = desc.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Tell us more</h2>
        <p className="text-muted-foreground mb-8">
          Describe your event so others know what to expect 📝
        </p>

        <div className="space-y-6 mb-10 text-left">
          {/* Description */}
          <div>
            <Label htmlFor="event-description" className="block mb-2">
              Event description
            </Label>
            <Textarea
              id="event-description"
              value={desc}
              onChange={handleDescriptionChange}
              placeholder="What's the plan? What should participants bring? Any experience required?"
              className="min-h-[150px] text-base"
              maxLength={2000}
              aria-describedby="description-hint"
            />
            <p id="description-hint" className="text-xs text-muted-foreground mt-1">
              {desc.length}/2000 characters
            </p>
          </div>

          {/* Disclaimer Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="add-disclaimer"
              checked={hasDisclaimer}
              onCheckedChange={handleDisclaimerToggle}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="add-disclaimer" className="cursor-pointer font-medium">
                Add a disclaimer
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Include legal or safety information for participants
              </p>
            </div>
          </div>

          {/* Disclaimer Text */}
          {hasDisclaimer && (
            <div>
              <Label htmlFor="disclaimer-text" className="block mb-2">
                Disclaimer text
              </Label>
              <Textarea
                id="disclaimer-text"
                value={disclaimer}
                onChange={handleDisclaimerTextChange}
                placeholder="e.g., Participants join at their own risk. Organizer is not liable for any injuries or damages..."
                className="min-h-[100px] text-base"
                maxLength={1000}
              />
            </div>
          )}
        </div>

        <Button size="lg" onClick={onContinue} disabled={!isValid} className="px-10">
          Continue
        </Button>
      </div>
    </div>
  );
}
