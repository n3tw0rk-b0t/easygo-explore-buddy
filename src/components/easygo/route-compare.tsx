import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Bike, Bus, Car, Clock, Coins, Footprints, Lightbulb, MapPin, Repeat, Route as RouteIcon, Sparkles, TrainFront, Zap, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { DemoBadge } from "@/components/easygo/place-detail-parts";
import { Button } from "@/components/ui/button";
import { PREFERENCES, getDemoRoutes, scoreRoutes, type Preference, type ScoredRoute } from "@/data/route-compare";
import type { TransportModeId } from "@/data/travel-options";
import type { CityId, Lang } from "@/data/types";
import { fetchRouteAdvice } from "@/lib/route-advice.functions";
import { cn } from "@/lib/utils";

const COPY = {
  az: { title: "Marşrut müqayisəsi", from: "Cari məkanım", demo: "Demo məlumat", ai: "AI tövsiyəsi", priority: "Prioritet", balanced: "Balanslı", fastest: "Ən sürətli", cheapest: "Ən ucuz", leastWalking: "Az piyada", time: "Vaxt", price: "Qiymət", distance: "Məsafə", walking: "Piyada", transfers: "Transfer", score: "Bal", free: "Pulsuz", min: "dəq", recommended: "Tövsiyə", aiBadge: "AI seçimi", choose: "Bu variantı seç", thinking: "AI variantları müqayisə edir…", aiError: "AI tövsiyəsi alınmadı.", retry: "Yenidən cəhd et", disclaimer: "Qiymət və vaxtlar demo təxmindir; real məlumatlar inteqrasiyalardan sonra göstəriləcək. Son qərar sizindir.", taxi: "Taksi", bus: "Avtobus", metro: "Metro", scooter: "Skuter", bicycle: "Velosiped", walkingMode: "Piyada" },
  en: { title: "Route comparison", from: "My location", demo: "Demo data", ai: "AI recommendation", priority: "Priority", balanced: "Balanced", fastest: "Fastest", cheapest: "Cheapest", leastWalking: "Least walking", time: "Time", price: "Price", distance: "Distance", walking: "Walking", transfers: "Transfers", score: "Score", free: "Free", min: "min", recommended: "Recommended", aiBadge: "AI pick", choose: "Choose this option", thinking: "AI is comparing options…", aiError: "Couldn't get AI advice.", retry: "Try again", disclaimer: "Prices and times are demo estimates; real data will appear after integrations. The final choice is yours.", taxi: "Taxi", bus: "Bus", metro: "Metro", scooter: "Scooter", bicycle: "Bicycle", walkingMode: "Walking" },
  ru: { title: "Сравнение маршрутов", from: "Моё местоположение", demo: "Демо-данные", ai: "Рекомендация AI", priority: "Приоритет", balanced: "Баланс", fastest: "Быстрее всего", cheapest: "Дешевле всего", leastWalking: "Меньше пешком", time: "Время", price: "Цена", distance: "Расстояние", walking: "Пешком", transfers: "Пересадки", score: "Балл", free: "Бесплатно", min: "мин", recommended: "Рекомендуем", aiBadge: "Выбор AI", choose: "Выбрать вариант", thinking: "AI сравнивает варианты…", aiError: "Не удалось получить совет AI.", retry: "Повторить", disclaimer: "Цены и время — демо-оценки; реальные данные появятся после интеграций. Решение за вами.", taxi: "Такси", bus: "Автобус", metro: "Метро", scooter: "Самокат", bicycle: "Велосипед", walkingMode: "Пешком" },
} satisfies Record<Lang, Record<string, string>>;
type Copy = (typeof COPY)["en"];

const ICONS: Record<TransportModeId, LucideIcon> = { taxi: Car, bus: Bus, metro: TrainFront, scooter: Zap, bicycle: Bike, walking: Footprints };
const modeLabel = (c: Copy, m: TransportModeId) => (m === "walking" ? c.walkingMode : c[m]);

export function RouteCompare({ cityId, cityName, destination, distanceKm, lang, onChoose }: {
  cityId: CityId; cityName: string; destination: string; distanceKm: number; lang: Lang; onChoose: (m: TransportModeId) => void;
}) {
  const c = COPY[lang];
  const [pref, setPref] = useState<Preference>("balanced");
  const scored = useMemo(() => scoreRoutes(getDemoRoutes(cityId, distanceKm), pref), [cityId, distanceKm, pref]);
  const runAdvice = useServerFn(fetchRouteAdvice);
  const advice = useQuery({
    queryKey: ["route-advice", cityId, destination, pref, lang],
    enabled: scored.length > 0,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: () => runAdvice({ data: { destination, city: cityName, preference: pref, lang, options: scored.map(({ mode, durationMinutes, price, currency, walkingMeters, transferCount }) => ({ mode, durationMinutes, price, currency, walkingMeters, transferCount })) } }),
  });
  const aiMode = advice.data?.ok ? advice.data.advice.mode : null;

  return (
    <section className="mt-5 space-y-4" aria-labelledby="rc-title">
      <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
        <DemoBadge>{c.demo}</DemoBadge>
        <h2 id="rc-title" className="mt-2 font-display text-xl font-extrabold text-foreground">{c.title}</h2>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-alt-foreground">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />{c.from}
          <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" /><span className="break-words">{destination}</span>
        </p>
      </div>

      <div className="rounded-3xl border border-primary/40 bg-warm p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="h-4 w-4" aria-hidden="true" /></span>
          <h3 className="font-display text-lg font-bold text-foreground">{c.ai}</h3>
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.priority}</p>
        <div role="group" aria-label={c.priority} className="mt-2 flex flex-wrap gap-2">
          {PREFERENCES.map((p) => (
            <button key={p} type="button" aria-pressed={pref === p} onClick={() => setPref(p)}
              className={cn("min-h-10 rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                pref === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary hover:bg-secondary")}>
              {c[p]}
            </button>
          ))}
        </div>
        <div className="mt-4" aria-live="polite">
          {advice.isFetching ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />{c.thinking}</p>
          ) : advice.data?.ok ? (
            <>
              <p className="font-display text-lg font-bold text-foreground">{modeLabel(c, advice.data.advice.mode as TransportModeId)}</p>
              <p className="mt-1 text-sm text-alt-foreground">{advice.data.advice.summary}</p>
              {advice.data.advice.tip ? <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{advice.data.advice.tip}</p> : null}
            </>
          ) : advice.data || advice.isError ? (
            <div className="text-sm">
              <p className="text-foreground">{advice.data && !advice.data.ok ? advice.data.message : c.aiError}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => advice.refetch()}>{c.retry}</Button>
            </div>
          ) : null}
        </div>
        <p className="mt-4 rounded-xl bg-card/70 px-3 py-2 text-xs text-muted-foreground">{c.disclaimer}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {scored.map((r, i) => <RouteCard key={r.mode} route={r} c={c} recommended={i === 0} ai={aiMode === r.mode} onChoose={() => onChoose(r.mode)} />)}
      </div>
    </section>
  );
}

function RouteCard({ route, c, recommended, ai, onChoose }: { route: ScoredRoute; c: Copy; recommended: boolean; ai: boolean; onChoose: () => void }) {
  const Icon = ICONS[route.mode];
  const metrics: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: c.time, value: `${route.durationMinutes} ${c.min}` },
    { icon: Coins, label: c.price, value: route.price === 0 ? c.free : `${route.price} ${route.currency}` },
    { icon: RouteIcon, label: c.distance, value: `${route.distanceKm} km` },
    { icon: Footprints, label: c.walking, value: `${route.walkingMeters} m` },
    { icon: Repeat, label: c.transfers, value: String(route.transferCount) },
    { icon: Sparkles, label: c.score, value: `${route.score}/100` },
  ];
  return (
    <article className={cn("flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-4 shadow-soft", ai ? "border-primary ring-2 ring-primary/30" : "border-border")}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
          <div className="min-w-0">
            <h4 className="font-display text-base font-bold text-foreground">{modeLabel(c, route.mode)}</h4>
            <p className="text-xs text-muted-foreground">{c.demo}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {ai ? <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground"><Sparkles className="h-3 w-3" aria-hidden="true" />{c.aiBadge}</span> : null}
          {recommended ? <span className="rounded-full bg-warm px-2.5 py-0.5 text-xs font-semibold text-primary">{c.recommended}</span> : null}
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="min-w-0">
            <dt className="flex items-center gap-1 text-[11px] text-muted-foreground"><m.icon className="h-3 w-3 shrink-0" aria-hidden="true" /><span className="truncate">{m.label}</span></dt>
            <dd className="text-sm font-semibold text-foreground">{m.value}</dd>
          </div>
        ))}
      </dl>
      <Button className="min-h-11 w-full rounded-full" onClick={onChoose}>{c.choose}</Button>
    </article>
  );
}
