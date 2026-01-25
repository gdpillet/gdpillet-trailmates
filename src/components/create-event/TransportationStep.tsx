import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Train, Car, Footprints } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransportType, PublicTransportDetails, CarTransportDetails } from './types';

interface TransportationStepProps {
  transportType: TransportType | null;
  publicTransport: PublicTransportDetails;
  carTransport: CarTransportDetails;
  onTransportTypeChange: (type: TransportType) => void;
  onPublicTransportChange: (details: Partial<PublicTransportDetails>) => void;
  onCarTransportChange: (details: Partial<CarTransportDetails>) => void;
  onContinue: () => void;
}

const TRANSPORT_OPTIONS: { type: TransportType; label: string; icon: React.ElementType; description: string }[] = [
  { type: 'public', label: 'Public Transport', icon: Train, description: 'Bus, train, or metro' },
  { type: 'car', label: 'Car', icon: Car, description: 'Carpool with the group' },
  { type: 'none', label: 'No Transport Needed', icon: Footprints, description: 'Meet directly at location' },
];

export function TransportationStep({
  transportType,
  publicTransport,
  carTransport,
  onTransportTypeChange,
  onPublicTransportChange,
  onCarTransportChange,
  onContinue,
}: TransportationStepProps) {
  const [selectedType, setSelectedType] = useState<TransportType | null>(transportType);

  const handleTypeSelect = (type: TransportType) => {
    setSelectedType(type);
    onTransportTypeChange(type);
  };

  const isFormValid = () => {
    if (!selectedType) return false;
    if (selectedType === 'none') return true;
    if (selectedType === 'public') {
      return publicTransport.meetingPoint.trim().length > 0;
    }
    if (selectedType === 'car') {
      return carTransport.pickupLocation.trim().length > 0;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">How will everyone get there?</h2>
        <p className="text-muted-foreground mb-8">
          Help participants plan their journey 🚗
        </p>

        {/* Transport Type Selection */}
        <div className="grid gap-3 mb-8">
          {TRANSPORT_OPTIONS.map(({ type, label, icon: Icon, description }) => (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                selectedType === type
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
              aria-pressed={selectedType === type}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full',
                  selectedType === type ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Conditional Forms */}
        {selectedType === 'public' && (
          <div className="space-y-4 mb-8 text-left bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-lg">Public Transport Details</h3>
            <div>
              <Label htmlFor="meeting-point" className="block mb-2">
                Meeting point *
              </Label>
              <Input
                id="meeting-point"
                value={publicTransport.meetingPoint}
                onChange={(e) => onPublicTransportChange({ meetingPoint: e.target.value })}
                placeholder="e.g., Central Station, Platform 5"
              />
            </div>
            <div>
              <Label htmlFor="ticket-cost" className="block mb-2">
                Ticket cost (optional)
              </Label>
              <Input
                id="ticket-cost"
                value={publicTransport.ticketCost}
                onChange={(e) => onPublicTransportChange({ ticketCost: e.target.value })}
                placeholder="e.g., €15 round trip"
              />
            </div>
            <div>
              <Label htmlFor="transport-instructions" className="block mb-2">
                Instructions (optional)
              </Label>
              <Textarea
                id="transport-instructions"
                value={publicTransport.instructions}
                onChange={(e) => onPublicTransportChange({ instructions: e.target.value })}
                placeholder="e.g., Take the 9:15 AM train to..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        )}

        {selectedType === 'car' && (
          <div className="space-y-4 mb-8 text-left bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-lg">Car Details</h3>
            <div>
              <Label htmlFor="pickup-location" className="block mb-2">
                Pick up location *
              </Label>
              <Input
                id="pickup-location"
                value={carTransport.pickupLocation}
                onChange={(e) => onCarTransportChange({ pickupLocation: e.target.value })}
                placeholder="e.g., Parking lot behind the mall"
              />
            </div>
            <div>
              <Label htmlFor="fuel-cost" className="block mb-2">
                Fuel cost per person (optional)
              </Label>
              <Input
                id="fuel-cost"
                value={carTransport.fuelCost}
                onChange={(e) => onCarTransportChange({ fuelCost: e.target.value })}
                placeholder="e.g., €10"
              />
            </div>
            <div>
              <Label htmlFor="car-description" className="block mb-2">
                Car description (optional)
              </Label>
              <Input
                id="car-description"
                value={carTransport.carDescription}
                onChange={(e) => onCarTransportChange({ carDescription: e.target.value })}
                placeholder="e.g., Silver VW Golf, license ABC-123"
              />
            </div>
          </div>
        )}

        {selectedType === 'none' && (
          <div className="mb-8 p-6 bg-muted/50 rounded-xl text-left">
            <p className="text-muted-foreground">
              Participants will make their own way to the event location. Make sure the meeting point is clear in your event description!
            </p>
          </div>
        )}

        <Button size="lg" onClick={onContinue} disabled={!isFormValid()} className="px-10">
          Continue
        </Button>
      </div>
    </div>
  );
}
