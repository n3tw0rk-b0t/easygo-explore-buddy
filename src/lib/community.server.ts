import type { CategoryId, CityId } from "@/data/types";

export interface CommunityPlaceDTO {
  slug: string;
  cityId: CityId;
  name: string;
  description: string;
  address: string | null;
  openingHours: string | null;
  category: CategoryId;
  imageUrl: string;
  createdAt: string;
}

const SIGNED_URL_TTL = 60 * 60 * 24; // 24h

export async function fetchCommunityPlaces(cityId?: CityId): Promise<CommunityPlaceDTO[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  let query = supabaseAdmin
    .from("community_places")
    .select("slug, city_id, name, description, address, opening_hours, category, image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (cityId) query = query.eq("city_id", cityId);
  const { data, error } = await query;
  if (error) throw error;
  const rows = data ?? [];
  if (rows.length === 0) return [];

  const { data: signed } = await supabaseAdmin.storage
    .from("place-images")
    .createSignedUrls(
      rows.map((r) => r.image_url),
      SIGNED_URL_TTL,
    );
  const urlByPath = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));

  return rows.map((r) => ({
    slug: r.slug,
    cityId: r.city_id as CityId,
    name: r.name,
    description: r.description,
    address: r.address,
    openingHours: r.opening_hours,
    category: r.category as CategoryId,
    imageUrl: urlByPath.get(r.image_url) ?? "",
    createdAt: r.created_at,
  }));
}
