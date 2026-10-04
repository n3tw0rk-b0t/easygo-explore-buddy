import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const searchTripadvisorPlaces = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) =>
    z
      .object({
        query: z.string().trim().min(3).max(400),
        geoName: z.string().trim().max(100).optional(),
        category: z.enum(["HOTEL", "RESTAURANT", "ATTRACTION"]).optional(),
        lang: z.enum(["az", "en", "ru"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { searchTerraCatalog } = await import("./tripadvisor.server");
    // Locale for localized catalog fields: az falls back to en.
    const locale = data.lang === "ru" ? "ru" : "en";
    return searchTerraCatalog({
      query: data.query,
      geoName: data.geoName || undefined,
      category: data.category,
      locale,
    }) as Promise<import("./tripadvisor.server").TerraSearchResult[]>;
  });

export const selectTripadvisorPlace = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => z.object({ locationId: z.number().int().min(1).max(2_000_000_000) }).parse(input))
  .handler(async ({ data }) => {
    const { appendTerraAllowlist } = await import("./tripadvisor.server");
    // Selecting a place licenses it: the ID is appended to the account allowlist,
    // after which the content endpoints may return it.
    await appendTerraAllowlist([data.locationId]);
    return { ok: true };
  });

export const getTripadvisorReviews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) =>
    z.object({ locationId: z.number().int().min(1).max(2_000_000_000), lang: z.enum(["az", "en", "ru"]) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { getTerraReviews } = await import("./tripadvisor.server");
    return getTerraReviews(data.locationId, data.lang) as Promise<import("./tripadvisor.server").TerraReviewsResult>;
  });
