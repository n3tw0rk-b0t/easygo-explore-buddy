import baku from "./catalog/baku.json";
import istanbul from "./catalog/istanbul.json";
import bratislava from "./catalog/bratislava.json";
import vienna from "./catalog/vienna.json";
import { CITIES } from "./cities";
import type { CategoryId, CityId, Localized, Place } from "./types";

/**
 * Researched catalog of real places (name, address, categories, coordinates,
 * openly licensed Wikimedia photo). Ratings and reviews are NOT stored here —
 * they load live from Google / Tripadvisor on the place page.
 */
interface CatalogEntry {
  slug: string;
  cityId: CityId;
  categories: CategoryId[];
  name: Localized;
  description: Localized;
  address: string;
  lat: number | null;
  lng: number | null;
  photo: { url: string; author: string; license: string; source: string } | null;
}

const CITY_CENTRE: Record<CityId, [number, number]> = {
  baku: [40.3713, 49.8372],
  istanbul: [41.0086, 28.9802],
  bratislava: [48.1435, 17.1077],
  vienna: [48.2085, 16.3731],
};

function kmFromCentre(cityId: CityId, lat: number | null, lng: number | null): number {
  if (lat == null || lng == null) return 0;
  const [clat, clng] = CITY_CENTRE[cityId];
  const r = Math.PI / 180;
  const a =
    Math.sin(((lat - clat) * r) / 2) ** 2 +
    Math.cos(clat * r) * Math.cos(lat * r) * Math.sin(((lng - clng) * r) / 2) ** 2;
  return Math.round(12742 * Math.asin(Math.sqrt(a)) * 10) / 10;
}

const ENTRIES = [...baku, ...istanbul, ...bratislava, ...vienna] as unknown as CatalogEntry[];

export function buildCatalogPlaces(fallbackImage: (cityId: CityId, cat: CategoryId) => string): Place[] {
  const seen = new Set<string>();
  return ENTRIES.filter((e) => e?.slug && !seen.has(e.slug) && seen.add(e.slug)).map((e) => {
    const city = CITIES.find((c) => c.id === e.cityId)!;
    const image = e.photo?.url ?? fallbackImage(e.cityId, e.categories[0] ?? "popular");
    return {
      id: `cat-${e.slug}`,
      slug: e.slug,
      cityId: e.cityId,
      city: city.name,
      country: city.country,
      name: e.name,
      description: e.description,
      categories: e.categories,
      image,
      images: [image],
      rating: 0,
      reviewCount: 0,
      distanceKm: kmFromCentre(e.cityId, e.lat, e.lng),
      coordinates: { lat: e.lat, lng: e.lng },
      isFavoriteByDefault: false,
      isCatalog: true,
      address: e.address,
      openingHours: null,
    } satisfies Place;
  });
}

export const CATALOG_CREDITS: Record<string, { image: string; artist: string; license: string; source: string }[]> =
  Object.fromEntries(
    ENTRIES.filter((e) => e?.photo).map((e) => [
      e.slug,
      [{ image: e.photo!.url, artist: e.photo!.author, license: e.photo!.license, source: e.photo!.source }],
    ]),
  );
