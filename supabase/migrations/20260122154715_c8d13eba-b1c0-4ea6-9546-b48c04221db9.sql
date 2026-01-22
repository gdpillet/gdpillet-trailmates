-- Add additional columns for event details
ALTER TABLE public.events
ADD COLUMN description TEXT,
ADD COLUMN meeting_location TEXT,
ADD COLUMN meeting_time TEXT,
ADD COLUMN meeting_transport TEXT,
ADD COLUMN ticket_price TEXT,
ADD COLUMN meeting_note TEXT,
ADD COLUMN equipment TEXT[] DEFAULT '{}',
ADD COLUMN route_distance TEXT,
ADD COLUMN route_ascent TEXT,
ADD COLUMN route_descent TEXT,
ADD COLUMN route_highest_point TEXT,
ADD COLUMN route_duration TEXT,
ADD COLUMN route_rating TEXT,
ADD COLUMN gallery_images TEXT[] DEFAULT '{}';