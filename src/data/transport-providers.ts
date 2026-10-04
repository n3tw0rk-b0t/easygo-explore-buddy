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

/** Real ride-hailing/taxi services per city (public sources). deepLink "{dest}" is replaced with the encoded destination. */
export const TRANSPORT_PROVIDERS: TransportProvider[] = [
  { ...base, id: "bolt", name: "Bolt", deepLink: "https://bolt.eu/en/rides/", supportedCountries: ["AZ", "SK", "AT"], supportedCities: ["baku", "bratislava", "vienna"] },
  { ...base, id: "uber", name: "Uber", deepLink: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]={dest}", supportedCountries: ["AZ", "TR", "SK", "AT"], supportedCities: ["baku", "istanbul", "bratislava", "vienna"] },
  { ...base, id: "yango", name: "Yango", deepLink: "https://yango.com", supportedCountries: ["AZ"], supportedCities: ["baku"] },
  { ...base, id: "bitaksi", name: "BiTaksi", deepLink: "https://www.bitaksi.com", supportedCountries: ["TR"], supportedCities: ["istanbul"] },
  { ...base, id: "hopin", name: "Hopin", deepLink: "https://hopintaxi.com", supportedCountries: ["SK"], supportedCities: ["bratislava"] },
  { ...base, id: "taxi40100", name: "Taxi 40100", deepLink: "https://www.40100.at", supportedCountries: ["AT"], supportedCities: ["vienna"] },
];

export function providerUrl(p: TransportProvider, destination: string): string | null {
  return p.deepLink ? p.deepLink.replace("{dest}", encodeURIComponent(destination)) : null;
}

export function cityHasTaxi(cityId: CityId): boolean {
  return TRANSPORT_PROVIDERS.some((p) => p.isActive && p.supportedCities.includes(cityId));
}

export interface TaxiContext {
  cityId: CityId | null;
  countryCode: string | null;
  destinationSlug: string;
  destination: string;
  distanceKm?: number;
  origin: { lat: number; lng: number } | { address: string } | null;
}

/** Illustrative presentation only; never represent these as live provider quotes. */
const DEMO_FARES: Record<CityId, { currency: string; base: number; perKm: number }> = {
  baku: { currency: "AZN", base: 2, perKm: 0.8 },
  istanbul: { currency: "TRY", base: 55, perKm: 40 },
  bratislava: { currency: "EUR", base: 2.5, perKm: 1.1 },
  vienna: { currency: "EUR", base: 4.5, perKm: 1.6 },
};

/** Availability + demo quote adapter; replace with official integrations later. */
export async function getTaxiOptions(ctx: TaxiContext): Promise<{ provider: TransportProvider; quote: TaxiQuote }[]> {
  if (!ctx.cityId) return [];
  const cityId = ctx.cityId;
  const fare = DEMO_FARES[cityId];
  const distance = Math.max(0.3, ctx.distanceKm ?? 3);
  const round = (value: number) => Math.round(value * 10) / 10;
  return TRANSPORT_PROVIDERS.filter(
    (p) => p.isActive && p.type === "taxi" && p.serviceAvailability !== "unavailable" && p.supportedCities.includes(cityId),
  ).map((provider, index) => ({
    provider,
    quote: { providerId: provider.id, pickupEtaMin: 3 + index * 2, tripDurationMin: Math.round(distance * 2.5 + 6 + index), fareMin: round((fare.base + fare.perKm * distance) * (1 + index * 0.08)), fareMax: round((fare.base + fare.perKm * distance) * (1.25 + index * 0.08)), currency: fare.currency, priceStatus: "demo" },
  }));
}
