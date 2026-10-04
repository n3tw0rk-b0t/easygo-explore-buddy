import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { reviewSchema } from "./place-input";

export const listPlaceReviews = createServerFn({ method: "GET" })
  .validator((data) => z.object({ slug: reviewSchema.shape.slug }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.from("place_reviews")
      .select("id, author_name, rating, body, created_at")
      .eq("place_slug", data.slug).order("created_at", { ascending: false });
    if (error) throw new Error("Could not load reviews");
    return rows ?? [];
  });

export const submitPlaceReview = createServerFn({ method: "POST" })
  .validator((data) => reviewSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { PLACES } = await import("@/data/places");
    if (!PLACES.some((p) => p.slug === data.slug)) {
      const { data: place, error } = await supabaseAdmin.from("community_places").select("id").eq("slug", data.slug).maybeSingle();
      if (error || !place) return { ok: false as const, reason: "place" };
    }
    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`easygo-review:${ip.slice(0, 100)}`));
    const key = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
    const { data: row, error } = await supabaseAdmin.rpc("submit_place_review", {
      p_slug: data.slug, p_author: data.author, p_rating: data.rating, p_body: data.text, p_key: key,
    });
    if (error) return { ok: false as const, reason: error.message.includes("REVIEW_RATE_LIMIT") ? "rate" : "save" };
    // Never expose the private submission key in RPC responses.
    return { ok: true as const, review: { id: row.id, author_name: row.author_name, rating: row.rating, body: row.body, created_at: row.created_at } };
  });