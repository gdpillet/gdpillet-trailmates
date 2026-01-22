import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface RouteSelectionStepProps {
  onContinue: () => void;
}

export function RouteSelectionStep({ onContinue }: RouteSelectionStepProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Pick a route for your group</h2>
        <p className="text-muted-foreground mb-8">
          Find the perfect trail that matches your crew's vibe ✨
        </p>

        {/* Stub content */}
        <div className="border-2 border-dashed border-border rounded-xl p-12 mb-10 bg-muted/30">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Route selection coming soon</p>
            <p className="text-sm max-w-md">
              Browse and select from popular routes, or create a custom one for your adventure.
            </p>
          </div>
        </div>

        <Button size="lg" onClick={onContinue} className="px-10">
          Continue without route
        </Button>
      </div>
    </div>
  );
}
