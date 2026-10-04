import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const searchGooglePlace = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => z.object({ query: z.string().trim().min(3).max(400), lang: z.enum(["az", "en", "ru"]) }).parse(input))
  .handler(async ({ data }) => {
    const { googlePlacesRequest } = await import("./google-places.server");
    return googlePlacesRequest("/places/v1/places:searchText", "places.id,places.displayName,places.formattedAddress", {
      textQuery: data.query, languageCode: data.lang, pageSize: 3,
    }) as Promise<{ places?: { id: string; displayName?: { text: string }; formattedAddress?: string }[] }>;
  });

export const getGoogleReviews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => z.object({ placeId: z.string().min(5).max(200).regex(/^[A-Za-z0-9_-]+$/), lang: z.enum(["az", "en", "ru"]) }).parse(input))
  .handler(async ({ data }) => {
    const { googlePlacesRequest } = await import("./google-places.server");
    return googlePlacesRequest(`/places/v1/places/${encodeURIComponent(data.placeId)}?languageCode=${data.lang}`, "id,displayName,formattedAddress,googleMapsUri,rating,userRatingCount,reviews,attributions,location") as Promise<GooglePlaceReviews>;
  });

export interface GooglePlaceReviews {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  location?: { latitude: number; longitude: number };
  attributions?: { provider: string; providerUri?: string }[];
  reviews?: {
    name: string;
    rating: number;
    text?: { text: string };
    originalText?: { text: string };
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: { displayName: string; uri?: string };
  }[];
}