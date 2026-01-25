-- Allow anyone to insert events (will be restricted when auth is added)
CREATE POLICY "Anyone can create events"
ON public.events
FOR INSERT
WITH CHECK (true);