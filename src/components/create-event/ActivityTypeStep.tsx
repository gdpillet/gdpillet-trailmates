import { Mountain, Bike, Cable, Snowflake, Grip, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ActivityType, ACTIVITY_OPTIONS } from './types';

const iconMap = {
  Mountain,
  Bike,
  Cable,
  Snowflake,
  Grip,
  Users,
};

interface ActivityTypeStepProps {
  selectedActivity: ActivityType | null;
  onSelect: (type: ActivityType) => void;
  onContinue: () => void;
}

export function ActivityTypeStep({ selectedActivity, onSelect, onContinue }: ActivityTypeStepProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">What adventure are you planning?</h2>
        <p className="text-muted-foreground mb-8">
          Pick an activity and let's get your crew together! 🎉
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {ACTIVITY_OPTIONS.map(({ type, label, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            const isSelected = selectedActivity === type;

            return (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className={cn(
                  'group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
                  'hover:border-primary hover:bg-primary/5',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border bg-card'
                )}
                aria-pressed={isSelected}
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <span className={cn('font-medium', isSelected && 'text-primary')}>{label}</span>
              </button>
            );
          })}
        </div>

        <Button
          size="lg"
          onClick={onContinue}
          disabled={!selectedActivity}
          className="px-10"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
