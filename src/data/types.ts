export type Lang = "az" | "en" | "ru";

export type Localized = Record<Lang, string>;

export type CategoryId =
  | "popular"
  | "historic"
  | "museums"
  | "parks"
  | "nature"
  | "restaurants"
  | "shopping"
  | "entertainment"
  | "family"
  | "free";

export type CityId = "baku" | "istanbul" | "bratislava" | "vienna";

export interface City {
  id: CityId;
  name: Localized;
  country: Localized;
  countryCode: string;
}

export interface Place {
  id: string;
  slug: string;
  cityId: CityId;
  name: Localized;
  description: Localized;
  country: Localized;
  city: Localized;
  categories: CategoryId[];
  image: string;
  rating: number;
  reviewCount: number;
  /** Demo distance in km — replaced by real geo distance in a later phase. */
  distanceKm: number;
  /** Placeholder coordinates, not used for real calculations yet. */
  coordinates: { lat: number | null; lng: number | null };
  isFavoriteByDefault: boolean;
}
