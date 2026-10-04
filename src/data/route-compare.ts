import type { CityId } from "./types";
import { CITY_OPERATORS, getCityModes, type TransportModeId } from "./travel-options";
import { cityHasTaxi } from "./transport-providers";

/** Demo route comparison — prices/times are illustrative until routing & fare APIs are connected. */
export type Preference = "balanced" | "fastest" | "cheapest" | "leastWalking";
export const PREFERENCES: Preference[] = ["balanced", "fastest", "cheapest", "leastWalking"];

export interface DemoRoute {
  mode: TransportModeId;
  durationMinutes: number;
  price: number;
  currency: string;
  walkingMeters: number;
  transferCount: number;
  distanceKm: number;
}
export type ScoredRoute = DemoRoute & { score: number };

const CURRENCY: Record<CityId, string> = { baku: "AZN", istanbul: "TRY", bratislava: "EUR", vienna: "EUR" };

/** Illustrative fares per city: [base, perKm] or flat. */
const FARES: Record<CityId, { taxi: [number, number]; bus: number; metro: number; scooter: [number, number]; bicycle: [number, number] }> = {
  baku: { taxi: [2, 0.8], bus: 0.6, metro: 0.6, scooter: [0.5, 0.25], bicycle: [0.5, 0.15] },
  istanbul: { taxi: [55, 40], bus: 27, metro: 27, scooter: [10, 7], bicycle: [5, 3] },
  bratislava: { taxi: [2.5, 1.1], bus: 1.1, metro: 1.1, scooter: [1, 0.3], bicycle: [0.5, 0.15] },
  vienna: { taxi: [4.5, 1.6], bus: 2.4, metro: 2.4, scooter: [1, 0.3], bicycle: [0.6, 0.15] },
};

const r1 = (n: number) => Math.round(n * 10) / 10;

export function getDemoRoutes(cityId: CityId, distanceKm: number): DemoRoute[] {
  const d = Math.max(0.3, distanceKm);
  const f = FARES[cityId];
  const currency = CURRENCY[cityId];
  const modes = getCityModes(cityId, cityHasTaxi(cityId));
  const base = { currency, distanceKm: r1(d) };
  const out: DemoRoute[] = [];
  for (const mode of modes) {
    if (mode === "taxi") out.push({ ...base, mode, durationMinutes: Math.round(d * 2.5 + 6), price: r1(f.taxi[0] + f.taxi[1] * d), walkingMeters: 50, transferCount: 0 });
    if (mode === "bus") out.push({ ...base, mode, durationMinutes: Math.round(d * 4 + 10), price: f.bus, walkingMeters: 550, transferCount: d > 4 ? 1 : 0 });
    if (mode === "metro") out.push({ ...base, mode, durationMinutes: Math.round(d * 2.2 + 14), price: f.metro, walkingMeters: 800, transferCount: d > 5 ? 1 : 0 });
    if (mode === "scooter" && CITY_OPERATORS[cityId].scooter.length) out.push({ ...base, mode, durationMinutes: Math.round(d * 4 + 3), price: r1(f.scooter[0] + f.scooter[1] * d * 4), walkingMeters: 200, transferCount: 0 });
    if (mode === "bicycle") out.push({ ...base, mode, durationMinutes: Math.round(d * 4.5 + 4), price: r1(f.bicycle[0] + f.bicycle[1] * d * 4.5), walkingMeters: 250, transferCount: 0 });
    if (mode === "walking" && d <= 6) out.push({ ...base, mode, durationMinutes: Math.round(d * 12), price: 0, walkingMeters: Math.round(d * 1000), transferCount: 0 });
  }
  return out;
}

const WEIGHTS: Record<Preference, { time: number; price: number; walk: number; transfer: number }> = {
  balanced: { time: 0.4, price: 0.3, walk: 0.2, transfer: 0.1 },
  fastest: { time: 0.7, price: 0.1, walk: 0.1, transfer: 0.1 },
  cheapest: { time: 0.15, price: 0.65, walk: 0.1, transfer: 0.1 },
  leastWalking: { time: 0.2, price: 0.15, walk: 0.5, transfer: 0.15 },
};
const norm = (v: number, a: number, b: number) => (b <= a ? 0 : (v - a) / (b - a));

export function scoreRoutes(routes: DemoRoute[], pref: Preference): ScoredRoute[] {
  if (!routes.length) return [];
  const w = WEIGHTS[pref];
  const range = (k: keyof DemoRoute) => {
    const v = routes.map((r) => r[k] as number);
    return [Math.min(...v), Math.max(...v)] as const;
  };
  const t = range("durationMinutes"), p = range("price"), wk = range("walkingMeters"), tr = range("transferCount");
  return routes
    .map((r) => {
      const cost = w.time * norm(r.durationMinutes, ...t) + w.price * norm(r.price, ...p) + w.walk * norm(r.walkingMeters, ...wk) + w.transfer * norm(r.transferCount, ...tr);
      return { ...r, score: Math.round((1 - cost) * 100) };
    })
    .sort((a, b) => b.score - a.score);
}
