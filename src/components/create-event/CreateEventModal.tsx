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
import { EventDetailsStep } from './EventDetailsStep';
import { DescriptionStep } from './DescriptionStep';
import { TransportationStep } from './TransportationStep';
import { ReviewStep } from './ReviewStep';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ROUTE_BASED_ACTIVITIES } from './types';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setEventName,
    setMaxParticipants,
    setDescription,
    setAddDisclaimer,
    setDisclaimerText,
    setTransportType,
    setPublicTransport,
    setCarTransport,
    getTotalSteps,
    getLogicalStep,
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

    setIsSubmitting(true);

    try {
      // Determine departure info based on transport type
      let departurePlace = 'TBD';
      let departureTransport = 'none';
      let ticketPrice: string | null = null;
      let meetingLocation: string | null = null;
      let meetingNote: string | null = null;

      if (formData.transportType === 'public') {
        departurePlace = formData.publicTransport.meetingPoint || 'TBD';
        departureTransport = 'train'; // Use 'train' as default for public transport
        ticketPrice = formData.publicTransport.ticketCost || null;
        meetingNote = formData.publicTransport.instructions || null;
      } else if (formData.transportType === 'car') {
        departurePlace = formData.carTransport.pickupLocation || 'TBD';
        departureTransport = 'carpool';
        ticketPrice = formData.carTransport.fuelCost || null;
        meetingNote = formData.carTransport.carDescription || null;
      } else if (formData.transportType === 'none') {
        departureTransport = 'none';
      }

      const { error } = await supabase.from('events').insert({
        title: formData.eventName || `New ${formData.activityType.charAt(0).toUpperCase() + formData.activityType.slice(1)} Event`,
        activity_type: formData.activityType,
        event_date: format(formData.date, 'yyyy-MM-dd'),
        start_time: formData.time,
        duration: '1 day',
        cover_image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop',
        organizer_name: 'You',
        organizer_avatar: 'https://i.pravatar.cc/40?img=1',
        departure_place: departurePlace,
        departure_transport: departureTransport,
        meeting_location: meetingLocation,
        meeting_note: meetingNote,
        ticket_price: ticketPrice,
        stats_distance: 'TBD',
        stats_elevation: 'TBD',
        stats_total_height: 'TBD',
        participants_max: formData.maxParticipants,
        description: formData.description || null,
      });

      if (error) throw error;

      toast({
        title: 'Event published!',
        description: 'Your adventure is live. Time to invite your crew! 🎉',
      });
      clearForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create event:', error);
      toast({
        title: 'Something went wrong',
        description: 'Could not publish your event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, clearForm, onOpenChange, toast]);

  const totalSteps = getTotalSteps();
  const logicalStep = getLogicalStep(currentStep);
  const showBackButton = currentStep > 1;

  // Determine which step component to render
  const isRouteBased = formData.activityType && ROUTE_BASED_ACTIVITIES.includes(formData.activityType);
  const finalStep = isRouteBased ? 7 : 6;

  const renderStep = () => {
    // Step 1: Activity Type (always)
    if (currentStep === 1) {
      return (
        <ActivityTypeStep
          selectedActivity={formData.activityType}
          onSelect={setActivityType}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 2: Route Selection (only for route-based activities)
    if (currentStep === 2 && isRouteBased) {
      return (
        <RouteSelectionStep
          selectedRouteId={formData.routeId}
          onSelectRoute={setRouteId}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 3: Date & Time
    if (currentStep === 3) {
      return (
        <DateTimeStep
          selectedDate={formData.date}
          selectedTime={formData.time}
          onDateChange={setDate}
          onTimeChange={setTime}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 4: Event Details
    if (currentStep === 4) {
      return (
        <EventDetailsStep
          eventName={formData.eventName}
          maxParticipants={formData.maxParticipants}
          onEventNameChange={setEventName}
          onMaxParticipantsChange={setMaxParticipants}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 5: Description
    if (currentStep === 5) {
      return (
        <DescriptionStep
          description={formData.description}
          addDisclaimer={formData.addDisclaimer}
          disclaimerText={formData.disclaimerText}
          onDescriptionChange={setDescription}
          onAddDisclaimerChange={setAddDisclaimer}
          onDisclaimerTextChange={setDisclaimerText}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 6: Transportation
    if (currentStep === 6) {
      return (
        <TransportationStep
          transportType={formData.transportType}
          publicTransport={formData.publicTransport}
          carTransport={formData.carTransport}
          onTransportTypeChange={setTransportType}
          onPublicTransportChange={setPublicTransport}
          onCarTransportChange={setCarTransport}
          onContinue={goToNextStep}
        />
      );
    }

    // Step 7 (or 6 for non-route-based): Review
    if (currentStep === finalStep) {
      return (
        <ReviewStep
          formData={formData}
          onPublish={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    }

    return null;
  };

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
              <StepProgress currentStep={logicalStep} totalSteps={totalSteps} />

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
            {renderStep()}
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
