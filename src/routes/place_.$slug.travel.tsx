import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Bike, Bus, Car, Check, Footprints, MapPin, Navigation, TrainFront, Zap, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { DemoBadge } from "@/components/easygo/place-detail-parts";
import { RouteCompare } from "@/components/easygo/route-compare";
import { TaxiSection } from "@/components/easygo/taxi-section";
import { Button } from "@/components/ui/button";
import { getCity } from "@/data/cities";
import { cityHasTaxi } from "@/data/transport-providers";
import {
  CITY_OPERATORS,
  NAVIGATION_APPS,
  directionsUrl,
  getCityModes,
  getDemoTravelSummary,
  type NavMode,
  type TransportModeId,
} from "@/data/travel-options";
import type { Lang, Place } from "@/data/types";
import { useAllPlaces } from "@/hooks/use-all-places";
import { cn } from "@/lib/utils";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/place_/$slug/travel")({
  head: () => ({
    meta: [
      { title: "Travel options — EasyGo AI" },
      { name: "description", content: "Compare taxi, bus, metro, scooter, bicycle and walking options to reach your chosen place." },
      { property: "og:title", content: "Travel options — EasyGo AI" },
      { property: "og:description", content: "How to get to your chosen place: taxi, public transport, micromobility and walking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TravelOptionsPage,
});

const COPY = {
  az: { back: "Məkan səhifəsinə qayıt", notFound: "Məkan tapılmadı", home: "Ana səhifəyə", demo: "Demo məlumat", about: "təxminən", min: "dəq", modes: "Nəqliyyat növü", taxi: "Taksi", bus: "Avtobus", metro: "Metro", scooter: "Skuter", bicycle: "Velosiped", walking: "Piyada", walk: "piyada", stops: "dayanacaq", transfer: "Transfer", transfers: "transfer", noTransfer: "Transfersiz", line: "Xətt", total: "Ümumi", nearest: "Ən yaxın nəqliyyat vasitəsi", noInfo: "Məlumat tətbiqdə göstəriləcək", openApp: "Tətbiqdə aç", openIn: "-də aç", walkingTitle: "Naviqasiya tətbiqi seçin", microSoon: "Mikromobillik tətbiqinə keçid növbəti inteqrasiya mərhələsində aktiv ediləcək.", navSoon: "Naviqasiya tətbiqinə keçid növbəti inteqrasiya mərhələsində aktiv ediləcək.", metroEmpty: "Bu şəhərdə metro xidməti mövcud deyil.", generic: "Bu nəqliyyat növü üçün hazırda məlumat yoxdur.", realNote: "Şəhərin rəsmi operatorları. Canlı marşrut Google Maps-də açılır.", routeGoogle: "Marşrutu Google Maps-də aç" },
  en: { back: "Back to place", notFound: "Place not found", home: "Go home", demo: "Demo data", about: "about", min: "min", modes: "Transport mode", taxi: "Taxi", bus: "Bus", metro: "Metro", scooter: "Scooter", bicycle: "Bicycle", walking: "Walking", walk: "walk", stops: "stops", transfer: "Transfer", transfers: "transfer", noTransfer: "No transfers", line: "Line", total: "Total", nearest: "Nearest vehicle", noInfo: "Details shown in the app", openApp: "Open in app", openIn: "Open in ", walkingTitle: "Choose a navigation app", microSoon: "Micromobility app redirect will be enabled in a later integration stage.", navSoon: "Navigation app redirect will be enabled in a later integration stage.", metroEmpty: "Metro service is not available in this city.", generic: "No information is currently available for this transport mode.", realNote: "Official city operators. Live route opens in Google Maps.", routeGoogle: "Open route in Google Maps" },
  ru: { back: "Назад к месту", notFound: "Место не найдено", home: "На главную", demo: "Демо-данные", about: "около", min: "мин", modes: "Вид транспорта", taxi: "Такси", bus: "Автобус", metro: "Метро", scooter: "Самокат", bicycle: "Велосипед", walking: "Пешком", walk: "пешком", stops: "остановки", transfer: "Пересадка", transfers: "пересадка", noTransfer: "Без пересадок", line: "Линия", total: "Всего", nearest: "Ближайший транспорт", noInfo: "Данные будут в приложении", openApp: "Открыть в приложении", openIn: "Открыть в ", walkingTitle: "Выберите навигатор", microSoon: "Переход в приложение будет добавлен на следующем этапе интеграции.", navSoon: "Переход в навигационное приложение будет добавлен на следующем этапе.", metroEmpty: "В этом городе метро недоступно.", generic: "Для этого вида транспорта пока нет информации.", realNote: "Официальные операторы города. Маршрут открывается в Google Maps.", routeGoogle: "Открыть маршрут в Google Maps" },
} satisfies Record<Lang, Record<string, string>>;
type Copy = (typeof COPY)["en"];

const MODE_ICONS: Record<TransportModeId, LucideIcon> = { taxi: Car, bus: Bus, metro: TrainFront, scooter: Zap, bicycle: Bike, walking: Footprints };

function TravelOptionsPage() {
  const { slug } = Route.useParams();
  const { tr, lang } = useAppState();
  const c = COPY[lang];
  const place = useAllPlaces().find((p) => p.slug === slug);
  const modes = place ? getCityModes(place.cityId, cityHasTaxi(place.cityId)) : [];
  const [chosen, setChosen] = useState<TransportModeId>("taxi");
  const mode = modes.includes(chosen) ? chosen : modes[0];

  if (!place) {
    return (
      <div className="mx-auto w-full max-w-[640px] safe-x py-10 text-center">
        <h1 className="font-display text-2xl font-extrabold text-foreground">{c.notFound}</h1>
        <Button asChild className="mt-4 min-h-12 rounded-full"><Link to="/">{c.home}</Link></Button>
      </div>
    );
  }

  const summary = getDemoTravelSummary(place.distanceKm);
  const city = getCity(place.cityId);
  const destination = `${tr(place.name)}, ${tr(place.city)}, ${tr(city.country)}`;

  return (
    <div className="min-h-[100dvh] bg-background pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[640px] safe-x pt-4">
        <Link to="/place/$slug" params={{ slug }} aria-label={c.back} title={c.back}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>

        <section className="mt-4 flex gap-4 rounded-3xl border border-border bg-card p-3 shadow-soft">
          <img src={place.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1 py-1">
            <h1 className="truncate font-display text-lg font-extrabold text-foreground">{tr(place.name)}</h1>
            <p className="flex items-center gap-1 truncate text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{tr(place.city)}, {tr(city.country)}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-alt-foreground">
              <span>{summary.distanceKm} km</span><span aria-hidden="true">·</span>
              <span>{c.about} {summary.durations[mode ?? "taxi"]} {c.min}</span>
              <DemoBadge>{c.demo}</DemoBadge>
            </div>
          </div>
        </section>

        <RouteCompare cityId={place.cityId} cityName={tr(place.city)} destination={tr(place.name)} distanceKm={place.distanceKm} lang={lang}
          onChoose={(m) => { setChosen(m); document.getElementById("travel-modes")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} />

        <h2 className="sr-only">{c.modes}</h2>
        <div id="travel-modes" role="tablist" aria-label={c.modes} className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
          {modes.map((m) => {
            const Icon = MODE_ICONS[m];
            const active = m === mode;
            return (
              <button key={m} type="button" role="tab" aria-selected={active} onClick={() => setChosen(m)}
                className={cn("inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                  active ? "border-primary bg-warm text-primary" : "border-border bg-card text-alt-foreground hover:bg-secondary")}>
                {active ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
                {c[m]}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="animate-in fade-in duration-200 motion-reduce:animate-none" key={mode}>
          {mode === "taxi" ? (
            <TaxiSection context={{ cityId: place.cityId, countryCode: city.countryCode, destinationSlug: place.slug, destination, origin: null }} />
          ) : mode === "bus" || mode === "metro" ? (
            <OperatorList mode={mode} cityId={place.cityId} destination={destination} c={c} navMode="transit" />
          ) : mode === "scooter" || mode === "bicycle" ? (
            <OperatorList mode={mode} cityId={place.cityId} destination={destination} c={c} navMode={mode === "bicycle" ? "bicycling" : "walking"} />
          ) : mode === "walking" ? (
            <WalkingList c={c} minutes={summary.durations.walking} destination={destination} />
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">{c.generic}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return <h2 className="mt-6 flex items-center gap-2 font-display text-lg font-bold text-foreground"><Icon className="h-5 w-5 text-primary" aria-hidden="true" />{children}</h2>;
}

function OperatorList({ mode, cityId, destination, c, navMode }: { mode: "bus" | "metro" | "scooter" | "bicycle"; cityId: Place["cityId"]; destination: string; c: Copy; navMode: NavMode }) {
  const ops = CITY_OPERATORS[cityId]?.[mode] ?? [];
  const Icon = MODE_ICONS[mode];
  return (
    <section>
      <SectionTitle icon={Icon}>{c[mode]}</SectionTitle>
      <p className="mt-1 text-xs text-muted-foreground">{c.realNote}</p>
      <a href={directionsUrl("google", destination, navMode)} target="_blank" rel="noopener noreferrer"
        className="mt-3 flex min-h-14 items-center gap-3 rounded-2xl border border-primary bg-warm p-4 font-semibold text-primary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Navigation className="h-5 w-5 shrink-0" aria-hidden="true" />{c.routeGoogle}
      </a>
      <div className="mt-3 space-y-3">
        {ops.map((o) => (
          <article key={o.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
            <h3 className="min-w-0 flex-1 truncate font-semibold text-foreground">{o.name}</h3>
            <Button asChild size="sm" className="min-h-11 shrink-0 rounded-full">
              <a href={o.url} target="_blank" rel="noopener noreferrer">{c.openApp}</a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function WalkingList({ c, minutes, destination }: { c: Copy; minutes: number | undefined; destination: string }) {
  return (
    <section>
      <SectionTitle icon={Footprints}>{c.walkingTitle}</SectionTitle>
      {minutes ? <p className="mt-1 text-sm text-muted-foreground">{c.about} {minutes} {c.min} {c.walk}</p> : null}
      <div className="mt-3 space-y-3">
        {NAVIGATION_APPS.map((app) => (
          <a key={app.id} href={directionsUrl(app.id, destination, "walking")} target="_blank" rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Navigation className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1 font-semibold text-foreground">{c.openIn === "-də aç" ? `${app.name}${c.openIn}` : `${c.openIn}${app.name}`}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
