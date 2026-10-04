import type { CityId } from "./types";

/** Central transport config. Operators are real public services; distances/durations remain estimates. */
export type TransportModeId = "taxi" | "bus" | "metro" | "scooter" | "bicycle" | "walking";

export const TRANSPORT_MODE_ORDER: TransportModeId[] = ["taxi", "bus", "metro", "scooter", "bicycle", "walking"];

export interface TransportOperator {
  id: string;
  name: string;
  /** Official website / app landing page. */
  url: string;
}

type OperatorModes = "bus" | "metro" | "scooter" | "bicycle";

/** Real operators per city (public sources). Empty list = mode hidden for that city. */
export const CITY_OPERATORS: Record<CityId, Record<OperatorModes, TransportOperator[]>> = {
  baku: {
    bus: [{ id: "ayna", name: "AYNA — Bakı avtobusları", url: "https://ayna.gov.az" }, { id: "bakubus", name: "BakuBus", url: "https://bakubus.az" }],
    metro: [{ id: "baku-metro", name: "Bakı Metropoliteni", url: "https://metro.gov.az" }],
    scooter: [],
    bicycle: [],
  },
  istanbul: {
    bus: [{ id: "iett", name: "İETT", url: "https://iett.istanbul" }],
    metro: [{ id: "metro-istanbul", name: "Metro İstanbul", url: "https://www.metro.istanbul" }],
    scooter: [{ id: "marti", name: "Martı", url: "https://www.marti.tech" }, { id: "binbin", name: "BinBin", url: "https://binbin.tech" }],
    bicycle: [{ id: "isbike", name: "İsbike", url: "https://isbike.istanbul" }],
  },
  bratislava: {
    bus: [{ id: "dpb", name: "DPB — Dopravný podnik Bratislava", url: "https://dpb.sk" }],
    metro: [],
    scooter: [{ id: "bolt-scooter", name: "Bolt", url: "https://bolt.eu/en/scooters/" }, { id: "lime", name: "Lime", url: "https://www.li.me" }],
    bicycle: [{ id: "slovnaft-bajk", name: "Slovnaft BAjk", url: "https://slovnaftbajk.sk" }],
  },
  vienna: {
    bus: [{ id: "wiener-linien-bus", name: "Wiener Linien", url: "https://www.wienerlinien.at" }],
    metro: [{ id: "wiener-linien-u", name: "Wiener Linien U-Bahn", url: "https://www.wienerlinien.at" }],
    scooter: [{ id: "lime-wien", name: "Lime", url: "https://www.li.me" }, { id: "bolt-wien", name: "Bolt", url: "https://bolt.eu/en/scooters/" }],
    bicycle: [{ id: "wienmobil-rad", name: "WienMobil Rad", url: "https://www.wienerlinien.at/wienmobil-rad" }],
  },
};

export function getCityModes(cityId: CityId, hasTaxi: boolean): TransportModeId[] {
  const ops = CITY_OPERATORS[cityId];
  return TRANSPORT_MODE_ORDER.filter((m) =>
    m === "walking" ? true : m === "taxi" ? hasTaxi : (ops?.[m]?.length ?? 0) > 0,
  );
}

export type NavMode = "transit" | "walking" | "driving" | "bicycling";

/** Real directions links to the destination (user location is used as origin by the app). */
export function directionsUrl(app: "google" | "apple" | "waze", destination: string, mode: NavMode): string {
  const q = encodeURIComponent(destination);
  if (app === "apple") {
    const flag = mode === "walking" ? "w" : mode === "transit" ? "r" : "d";
    return `https://maps.apple.com/?daddr=${q}&dirflg=${flag}`;
  }
  if (app === "waze") return `https://waze.com/ul?q=${q}&navigate=yes`;
  return `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=${mode}`;
}

export interface NavigationApp {
  id: "google" | "apple" | "waze";
  name: string;
}

export const NAVIGATION_APPS: NavigationApp[] = [
  { id: "google", name: "Google Maps" },
  { id: "apple", name: "Apple Maps" },
  { id: "waze", name: "Waze" },
];

export interface TravelSummary {
  distanceKm: number;
  durations: Partial<Record<TransportModeId, number>>;
}

/** Rough estimate from the place's catalog distance — not real routing. */
export function getDemoTravelSummary(distanceKm: number): TravelSummary {
  const d = Math.max(0.3, distanceKm);
  const r = (n: number) => Math.max(1, Math.round(n));
  return {
    distanceKm: Math.round(d * 10) / 10,
    durations: { taxi: r(d * 2.5 + 3), bus: r(d * 4 + 8), metro: r(d * 3 + 10), scooter: r(d * 4), bicycle: r(d * 4.5), walking: r(d * 12) },
  };
}
