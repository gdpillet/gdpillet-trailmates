export type ActivityType = 'hiking' | 'cycling' | 'climbing' | 'skiing' | 'bouldering' | 'social';

export type TransportType = 'public' | 'car' | 'none';

export interface PublicTransportDetails {
  meetingPoint: string;
  ticketCost: string;
  instructions: string;
}

export interface CarTransportDetails {
  pickupLocation: string;
  fuelCost: string;
  carDescription: string;
}

export interface CreateEventFormData {
  activityType: ActivityType | null;
  routeId: string | null;
  date: Date | null;
  time: string | null;
  eventName: string;
  maxParticipants: number;
  description: string;
  addDisclaimer: boolean;
  disclaimerText: string;
  transportType: TransportType | null;
  publicTransport: PublicTransportDetails;
  carTransport: CarTransportDetails;
}

export const ROUTE_BASED_ACTIVITIES: ActivityType[] = ['hiking', 'cycling', 'climbing'];

export const ACTIVITY_OPTIONS: { type: ActivityType; label: string; icon: string }[] = [
  { type: 'hiking', label: 'Hiking', icon: 'Mountain' },
  { type: 'cycling', label: 'Cycling', icon: 'Bike' },
  { type: 'climbing', label: 'Climbing', icon: 'Cable' },
  { type: 'skiing', label: 'Skiing', icon: 'Snowflake' },
  { type: 'bouldering', label: 'Bouldering', icon: 'Grip' },
  { type: 'social', label: 'Social', icon: 'Users' },
];
