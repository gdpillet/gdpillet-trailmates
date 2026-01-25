import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Train,
  Car,
  Footprints,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { CreateEventFormData, ACTIVITY_OPTIONS } from './types';

interface ReviewStepProps {
  formData: CreateEventFormData;
  onPublish: () => void;
  isSubmitting?: boolean;
}

export function ReviewStep({ formData, onPublish, isSubmitting }: ReviewStepProps) {
  const activityLabel =
    ACTIVITY_OPTIONS.find((a) => a.type === formData.activityType)?.label || formData.activityType;

  const getTransportIcon = () => {
    switch (formData.transportType) {
      case 'public':
        return Train;
      case 'car':
        return Car;
      default:
        return Footprints;
    }
  };

  const getTransportLabel = () => {
    switch (formData.transportType) {
      case 'public':
        return 'Public Transport';
      case 'car':
        return 'Car';
      default:
        return 'No Transport Needed';
    }
  };

  const TransportIcon = getTransportIcon();

  return (
    <div className="flex flex-col items-center min-h-[60vh] px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Review your event</h2>
          <p className="text-muted-foreground">
            Double-check everything before publishing 🎉
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
            <Badge variant="secondary" className="mb-3">
              {activityLabel}
            </Badge>
            <h3 className="text-2xl font-bold mb-2">
              {formData.eventName || 'Untitled Event'}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {formData.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{format(formData.date, 'EEEE, MMMM d, yyyy')}</span>
                </div>
              )}
              {formData.time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formData.time}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Max {formData.maxParticipants} participants</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Description */}
            {formData.description && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {formData.description}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            {formData.addDisclaimer && formData.disclaimerText && (
              <div className="bg-accent/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-accent-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  Disclaimer
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {formData.disclaimerText}
                </p>
              </div>
            )}

            {/* Transportation */}
            {formData.transportType && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TransportIcon className="w-4 h-4" />
                  {getTransportLabel()}
                </h4>
                {formData.transportType === 'public' && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        <strong>Meeting point:</strong> {formData.publicTransport.meetingPoint}
                      </span>
                    </p>
                    {formData.publicTransport.ticketCost && (
                      <p>
                        <strong>Ticket cost:</strong> {formData.publicTransport.ticketCost}
                      </p>
                    )}
                    {formData.publicTransport.instructions && (
                      <p className="whitespace-pre-wrap">
                        <strong>Instructions:</strong> {formData.publicTransport.instructions}
                      </p>
                    )}
                  </div>
                )}
                {formData.transportType === 'car' && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        <strong>Pick up location:</strong> {formData.carTransport.pickupLocation}
                      </span>
                    </p>
                    {formData.carTransport.fuelCost && (
                      <p>
                        <strong>Fuel cost:</strong> {formData.carTransport.fuelCost}
                      </p>
                    )}
                    {formData.carTransport.carDescription && (
                      <p>
                        <strong>Car:</strong> {formData.carTransport.carDescription}
                      </p>
                    )}
                  </div>
                )}
                {formData.transportType === 'none' && (
                  <p className="text-sm text-muted-foreground">
                    Participants will make their own way to the event location.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Publish Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onPublish}
            disabled={isSubmitting}
            className="px-12 text-lg"
          >
            {isSubmitting ? 'Publishing...' : 'Publish event'}
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Your event will be visible to other users after publishing
          </p>
        </div>
      </div>
    </div>
  );
}
