import { createServerFn } from "@tanstack/react-start";
import { communityPlaceSchema } from "./place-input";

export const listCommunityPlaces = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchCommunityPlaces } = await import("./community.server");
  try {
    return await fetchCommunityPlaces();
  } catch (error) {
    console.error("listCommunityPlaces failed", error);
    return [];
  }
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ə/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "mekan";

export const addCommunityPlace = createServerFn({ method: "POST" })
  .validator((data) => communityPlaceSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [meta = "", b64 = ""] = data.image.split(",", 2);
    const mime = meta.slice(5, meta.indexOf(";"));
    const ext = mime.split("/")[1];
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

    const slug = `${slugify(data.name)}-${crypto.randomUUID().slice(0, 6)}`;
    const path = `${data.cityId}/${slug}.${ext}`;

    const upload = await supabaseAdmin.storage
      .from("place-images")
      .upload(path, bytes, { contentType: mime, upsert: false });
    if (upload.error) {
      console.error("upload failed", upload.error);
      return { ok: false as const, message: "Image upload failed." };
    }

    const { error } = await supabaseAdmin.from("community_places").insert({
      slug,
      city_id: data.cityId,
      name: data.name,
      description: data.description,
      address: data.address || null,
      opening_hours: data.openingHours,
      category: data.category,
      image_url: path,
    });
    if (error) {
      console.error("insert failed", error);
      return { ok: false as const, message: "Could not save the place." };
    }
    return { ok: true as const, slug };
  });
