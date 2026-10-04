CREATE TABLE public.community_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  city_id text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  address text,
  category text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.community_places TO anon, authenticated;
GRANT ALL ON public.community_places TO service_role;
ALTER TABLE public.community_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view community places" ON public.community_places FOR SELECT TO anon, authenticated USING (true);