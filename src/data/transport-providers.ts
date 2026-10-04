import type { CityId } from "./types";

/** Central taxi provider config — UI never hardcodes availability. Replaceable by backend/API later. */
export type ProviderType = "taxi";
export type ServiceAvailability = "available" | "limited" | "unavailable";

export interface TransportProvider {
  id: string;
  name: string;
  /** Optional licensed logo URL; monogram is shown when absent. */
  logo: string | null;
  type: ProviderType;
  supportedCountries: string[];
  supportedCities: CityId[];
  serviceAvailability: ServiceAvailability;
  pricingIntegrationAvailable: boolean;
  etaIntegrationAvailable: boolean;
  deepLink: string | null;
  iosStoreUrl: string | null;
  androidStoreUrl: string | null;
  supportedVehicleTypes: string[];
  isSponsored: boolean;
  isActive: boolean;
}

/** Result of a fare/ETA adapter. All fields null until an official integration exists. */
export interface TaxiQuote {
  providerId: string;
  pickupEtaMin: number | null;
  tripDurationMin: number | null;
  fareMin: number | null;
  fareMax: number | null;
  currency: string | null;
  priceStatus: "estimate" | "demo" | "unavailable";
}

const base = {
  logo: null,
  type: "taxi" as const,
  serviceAvailability: "available" as const,
  pricingIntegrationAvailable: false,
  etaIntegrationAvailable: false,
  deepLink: null,
  iosStoreUrl: null,
  androidStoreUrl: null,
  supportedVehicleTypes: ["standard"],
  isSponsored: false,
  isActive: true,
};

/** Demo mapping — not verified real availability. */
export const TRANSPORT_PROVIDERS: TransportProvider[] = [
  { ...base, id: "bolt", name: "Bolt", supportedCountries: ["AZ", "SK", "AT"], supportedCities: ["baku", "bratislava", "vienna"] },
  { ...base, id: "yango", name: "Yango", supportedCountries: ["AZ"], supportedCities: ["baku"] },
  { ...base, id: "uber", name: "Uber", supportedCountries: ["AZ", "TR", "SK", "AT"], supportedCities: ["baku", "istanbul", "bratislava", "vienna"] },
  { ...base, id: "bitaksi", name: "BiTaksi", supportedCountries: ["TR"], supportedCities: ["istanbul"] },
  { ...base, id: "hopin", name: "Hopin", supportedCountries: ["SK"], supportedCities: ["bratislava"] },
  { ...base, id: "taxi40100", name: "Taxi 40100", supportedCountries: ["AT"], supportedCities: ["vienna"] },
];

export interface TaxiContext {
  cityId: CityId | null;
  countryCode: string | null;
  destinationSlug: string;
  origin: { lat: number; lng: number } | { address: string } | null;
}

/** Availability + quote adapter. Today: config lookup with no fare/ETA (no invented prices). */
export async function getTaxiOptions(ctx: TaxiContext): Promise<{ provider: TransportProvider; quote: TaxiQuote }[]> {
  if (!ctx.cityId) return [];
  return TRANSPORT_PROVIDERS.filter(
    (p) => p.isActive && p.type === "taxi" && p.serviceAvailability !== "unavailable" && p.supportedCities.includes(ctx.cityId as CityId),
  ).map((provider) => ({
    provider,
    quote: { providerId: provider.id, pickupEtaMin: null, tripDurationMin: null, fareMin: null, fareMax: null, currency: null, priceStatus: "unavailable" },
  }));
}
