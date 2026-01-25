import { useState, useCallback } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { useCreateEventForm } from './useCreateEventForm';
import { StepProgress } from './StepProgress';
import { ActivityTypeStep } from './ActivityTypeStep';
import { RouteSelectionStep } from './RouteSelectionStep';
import { DateTimeStep } from './DateTimeStep';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  const {
    formData,
    currentStep,
    hasUnsavedChanges,
    clearForm,
    setActivityType,
    setRouteId,
    setDate,
    setTime,
    getTotalSteps,
    goToNextStep,
    goToPreviousStep,
  } = useCreateEventForm();

  const handleClose = useCallback(() => {
    if (hasUnsavedChanges()) {
      setShowConfirmDialog(true);
    } else {
      onOpenChange(false);
    }
  }, [hasUnsavedChanges, onOpenChange]);

  const handleConfirmDiscard = useCallback(() => {
    clearForm();
    setShowConfirmDialog(false);
    onOpenChange(false);
  }, [clearForm, onOpenChange]);

  const handleContinueEditing = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.date || !formData.time || !formData.activityType) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.from('events').insert({
        title: `New ${formData.activityType.charAt(0).toUpperCase() + formData.activityType.slice(1)} Event`,
        activity_type: formData.activityType,
        event_date: format(formData.date, 'yyyy-MM-dd'),
        start_time: formData.time,
        duration: '1 day',
        cover_image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop',
        organizer_name: 'You',
        organizer_avatar: 'https://i.pravatar.cc/40?img=1',
        departure_place: 'TBD',
        departure_transport: 'none',
        stats_distance: 'TBD',
        stats_elevation: 'TBD',
        stats_total_height: 'TBD',
        participants_max: 10,
      });

      if (error) throw error;

      toast({
        title: 'Event created!',
        description: 'Your adventure is ready. Invite your crew!',
      });
      clearForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create event:', error);
      toast({
        title: 'Something went wrong',
        description: 'Could not create your event. Please try again.',
        variant: 'destructive',
      });
    }
  }, [formData, clearForm, onOpenChange, toast]);

  const totalSteps = getTotalSteps();
  const showBackButton = currentStep > 1;

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-none w-full h-full sm:rounded-none border-0 p-0 gap-0 overflow-auto bg-background">
          <VisuallyHidden>
            <DialogTitle>Create Event</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="w-24">
                {showBackButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
              </div>

              {/* Progress */}
              <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

              {/* Close Button */}
              <div className="w-24 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {currentStep === 1 && (
              <ActivityTypeStep
                selectedActivity={formData.activityType}
                onSelect={setActivityType}
                onContinue={goToNextStep}
              />
            )}
            {currentStep === 2 && (
              <RouteSelectionStep
                selectedRouteId={formData.routeId}
                onSelectRoute={setRouteId}
                onContinue={goToNextStep}
              />
            )}
            {currentStep === 3 && (
              <DateTimeStep
                selectedDate={formData.date}
                selectedTime={formData.time}
                onDateChange={setDate}
                onTimeChange={setTime}
                onSubmit={handleSubmit}
              />
            )}
          </main>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={handleContinueEditing}>
              Continue editing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDiscard}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
