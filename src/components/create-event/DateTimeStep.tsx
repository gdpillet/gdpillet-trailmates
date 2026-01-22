import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface DateTimeStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onSubmit: () => void;
}

export function DateTimeStep({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onSubmit,
}: DateTimeStepProps) {
  const [timeValue, setTimeValue] = useState(selectedTime || '');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeValue(value);
    onTimeChange(value);
  };

  const isValid = selectedDate && timeValue;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">When are you heading out?</h2>
        <p className="text-muted-foreground mb-8">
          Lock in the date and time — your adventure awaits! 🚀
        </p>

        <div className="flex flex-col items-center gap-8 mb-10">
          {/* Calendar */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={onDateChange}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className={cn('pointer-events-auto')}
              initialFocus
            />
          </div>

          {/* Time Picker */}
          <div className="w-full max-w-xs">
            <Label htmlFor="event-time" className="text-left block mb-2">
              Start time
            </Label>
            <Input
              id="event-time"
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="text-center text-lg"
              aria-describedby="time-hint"
            />
            <p id="time-hint" className="text-xs text-muted-foreground mt-1">
              When should everyone meet up?
            </p>
          </div>
        </div>

        <Button
          size="lg"
          onClick={onSubmit}
          disabled={!isValid}
          className="px-10"
        >
          Create Event
        </Button>
      </div>
    </div>
  );
}
