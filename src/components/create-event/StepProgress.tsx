import { cn } from '@/lib/utils';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            step === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30',
            step < currentStep && 'bg-primary/60'
          )}
          aria-label={`Step ${step} of ${totalSteps}`}
        />
      ))}
      <span className="ml-3 text-sm text-muted-foreground">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}
