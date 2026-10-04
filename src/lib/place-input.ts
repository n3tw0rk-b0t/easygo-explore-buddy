import { z } from "zod";
import { CATEGORIES } from "@/data/categories";

const categories = CATEGORIES.map((c) => c.id).filter((id) => id !== "popular") as [string, ...string[]];
export const communityPlaceSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(600),
  address: z.string().trim().min(5).max(160),
  openingHours: z.string().trim().min(3).max(300),
  cityId: z.enum(["baku", "istanbul", "bratislava", "vienna"]),
  category: z.enum(categories),
  image: z.string().max(4_000_000).regex(/^data:image\/(jpeg|png|webp);base64,/),
});

export const reviewSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  author: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(10).max(1000),
});

export function placeMapUrl(name: string, address: string, city: string, country: string) {
  const query = z.string().trim().min(1).max(500).parse([name, address, city, country].filter(Boolean).join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}