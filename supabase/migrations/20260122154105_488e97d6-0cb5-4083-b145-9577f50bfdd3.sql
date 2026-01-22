-- Create events table with JSONB columns for nested data
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  start_time TEXT NOT NULL,
  event_date DATE NOT NULL,
  duration TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_avatar TEXT NOT NULL,
  departure_place TEXT NOT NULL,
  departure_transport TEXT NOT NULL CHECK (departure_transport IN ('train', 'bus', 'carpool', 'none')),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('hiking', 'cycling', 'ski-touring', 'bouldering', 'social')),
  activity_difficulty TEXT,
  stats_distance TEXT NOT NULL,
  stats_elevation TEXT NOT NULL,
  stats_total_height TEXT NOT NULL,
  participants_count INTEGER NOT NULL DEFAULT 0,
  participants_max INTEGER NOT NULL,
  participants_waitlist INTEGER NOT NULL DEFAULT 0,
  participant_avatars TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public)
CREATE POLICY "Events are publicly readable" 
ON public.events 
FOR SELECT 
USING (true);

-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();