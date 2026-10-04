import type { CityId } from "./types";

/** Central transport config & demo route data. Everything here is demo — replaceable by APIs later. */
export type TransportModeId = "taxi" | "bus" | "metro" | "scooter" | "bicycle" | "walking";

export const TRANSPORT_MODE_ORDER: TransportModeId[] = ["taxi", "bus", "metro", "scooter", "bicycle", "walking"];

/** Demo availability per city (not verified real availability). */
export const CITY_TRANSPORT_MODES: Record<CityId, TransportModeId[]> = {
  baku: ["taxi", "bus", "metro", "scooter", "walking"],
  istanbul: ["taxi", "bus", "metro", "scooter", "bicycle", "walking"],
  bratislava: ["taxi", "bus", "scooter", "bicycle", "walking"],
  vienna: ["taxi", "bus", "metro", "scooter", "bicycle", "walking"],
};

export interface TransitStep {
  kind: "walk" | "ride" | "transfer";
  minutes: number;
  /** Line label (e.g. bus number) for ride steps. */
  line?: string;
  stops?: number;
}

export interface TransitRoute {
  id: string;
  mode: "bus" | "metro";
  line: string;
  totalMinutes: number;
  walkingMinutes: number;
  transferCount: number;
  steps: TransitStep[];
  isDemo: true;
}

export interface MicroMobilityOption {
  id: string;
  mode: "scooter" | "bicycle";
  providerName: string;
  nearestDistanceM: number | null;
  rideMinutes: number | null;
  fareMin: number | null;
  fareMax: number | null;
  currency: string | null;
  isDemo: true;
}

export interface NavigationApp {
  id: "google" | "apple" | "waze";
  name: string;
  platforms: ("ios" | "android" | "web")[];
}

export const NAVIGATION_APPS: NavigationApp[] = [
  { id: "google", name: "Google Maps", platforms: ["ios", "android", "web"] },
  { id: "apple", name: "Apple Maps", platforms: ["ios"] },
  { id: "waze", name: "Waze", platforms: ["ios", "android"] },
];

export interface TravelSummary {
  distanceKm: number;
  /** Rough demo durations per mode, in minutes. */
  durations: Partial<Record<TransportModeId, number>>;
}

/** Demo estimate from the place's demo distance — not real routing. */
export function getDemoTravelSummary(distanceKm: number): TravelSummary {
  const d = Math.max(0.3, distanceKm);
  const r = (n: number) => Math.max(1, Math.round(n));
  return {
    distanceKm: Math.round(d * 10) / 10,
    durations: {
      taxi: r(d * 2.5 + 3),
      bus: r(d * 4 + 8),
      metro: r(d * 3 + 10),
      scooter: r(d * 4),
      bicycle: r(d * 4.5),
      walking: r(d * 12),
    },
  };
}

export function getDemoTransitRoutes(mode: "bus" | "metro", summary: TravelSummary): TransitRoute[] {
  const total = summary.durations[mode] ?? 20;
  const walkA = 4;
  const walkB = 3;
  if (mode === "bus") {
    return [
      { id: "bus-a", mode, line: "5", totalMinutes: total, walkingMinutes: walkA + walkB, transferCount: 0, isDemo: true,
        steps: [{ kind: "walk", minutes: walkA }, { kind: "ride", line: "5", stops: 4, minutes: total - walkA - walkB }, { kind: "walk", minutes: walkB }] },
      { id: "bus-b", mode, line: "12 → 88", totalMinutes: total + 6, walkingMinutes: 5, transferCount: 1, isDemo: true,
        steps: [{ kind: "walk", minutes: 2 }, { kind: "ride", line: "12", stops: 2, minutes: 8 }, { kind: "transfer", minutes: 3 }, { kind: "ride", line: "88", stops: 3, minutes: total - 10 }, { kind: "walk", minutes: 3 }] },
    ];
  }
  return [
    { id: "metro-a", mode, line: "M1", totalMinutes: total, walkingMinutes: 9, transferCount: 1, isDemo: true,
      steps: [{ kind: "walk", minutes: 5 }, { kind: "ride", line: "M1", stops: 3, minutes: 7 }, { kind: "transfer", minutes: 3 }, { kind: "ride", line: "M2", stops: 2, minutes: Math.max(3, total - 19) }, { kind: "walk", minutes: 4 }] },
  ];
}

export function getDemoMicroMobility(mode: "scooter" | "bicycle"): MicroMobilityOption[] {
  return [{ id: `${mode}-demo`, mode, providerName: mode === "scooter" ? "Demo Scooter" : "Demo Bike", nearestDistanceM: null, rideMinutes: null, fareMin: null, fareMax: null, currency: null, isDemo: true }];
}
