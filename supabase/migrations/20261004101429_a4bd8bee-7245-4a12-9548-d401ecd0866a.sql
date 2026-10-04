ALTER TABLE public.community_places ADD COLUMN opening_hours text CHECK (opening_hours IS NULL OR char_length(opening_hours) <= 300);
CREATE TABLE public.place_reviews (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 place_slug text NOT NULL CHECK (char_length(place_slug) BETWEEN 1 AND 100),
 author_name text NOT NULL CHECK (char_length(btrim(author_name)) BETWEEN 2 AND 80),
 rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
 body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 10 AND 1000),
 submission_key text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT (id, place_slug, author_name, rating, body, created_at) ON public.place_reviews TO anon, authenticated;
GRANT ALL ON public.place_reviews TO service_role;
ALTER TABLE public.place_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read place reviews" ON public.place_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX place_reviews_slug_date ON public.place_reviews (place_slug, created_at DESC);
CREATE INDEX place_reviews_submission_date ON public.place_reviews (submission_key, created_at DESC);
CREATE FUNCTION public.submit_place_review(p_slug text, p_author text, p_rating integer, p_body text, p_key text) RETURNS public.place_reviews LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE result public.place_reviews;
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(p_key, 0));
 IF EXISTS (SELECT 1 FROM public.place_reviews WHERE submission_key = p_key AND created_at > now() - interval '30 seconds') THEN
   RAISE EXCEPTION 'REVIEW_RATE_LIMIT';
 END IF;
 INSERT INTO public.place_reviews (place_slug, author_name, rating, body, submission_key) VALUES (p_slug, btrim(p_author), p_rating, btrim(p_body), p_key) RETURNING * INTO result;
 RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_place_review(text,text,integer,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_place_review(text,text,integer,text,text) TO service_role;