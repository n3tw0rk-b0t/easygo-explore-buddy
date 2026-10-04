import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, CarFront, Clock, Route } from "lucide-react";

import { DemoBadge } from "@/components/easygo/place-detail-parts";
import { TransportModeIcon } from "@/components/easygo/transport-mode-icon";
import { Button } from "@/components/ui/button";
import { getTaxiOptions, providerUrl, type TaxiContext, type TaxiQuote, type TransportProvider } from "@/data/transport-providers";
import type { Lang } from "@/data/types";
import { useAppState } from "@/state/app-state";

const AZ = { title: "", demoNote: "", open: "", seePrice: "", noPrice: "", estimate: "", demo: "", min: "", sponsored: "", empty: "", error: "", retry: "", redirect: "", pickup: "", trip: "" };
type Copy = typeof AZ;
const COPY: Record<Lang, Copy> = {
  az: { pickup: "Gəlmə vaxtı", trip: "Səfər", title: "Taksi", demoNote: "Qiymət, gəlmə və səfər vaxtları demo təxminlərdir, canlı məlumat deyil.", open: "Tətbiqdə aç", seePrice: "Tətbiqdə qiymətə bax", noPrice: "Qiymət məlumatı mövcud deyil", estimate: "Təxmini qiymət", demo: "Demo qiymət", min: "dəq", sponsored: "Sponsorlu", empty: "Bu şəhərdə dəstəklənən taksi xidməti tapılmadı.", error: "Taksi xidmətlərini yükləmək mümkün olmadı.", retry: "Yenidən cəhd et", redirect: "Taksi tətbiqinə keçid gələcək inteqrasiya mərhələsində aktiv ediləcək." },
  en: { pickup: "Pickup", trip: "Trip", title: "Taxi", demoNote: "Prices, pickup and trip times are illustrative demo estimates, not live data.", open: "Open in app", seePrice: "See price in app", noPrice: "Price information unavailable", estimate: "Estimated price", demo: "Demo price", min: "min", sponsored: "Sponsored", empty: "No supported taxi service was found in this city.", error: "Couldn't load taxi services.", retry: "Try again", redirect: "Taxi app redirect will be enabled in a future integration stage." },
  ru: { pickup: "Подача", trip: "В пути", title: "Такси", demoNote: "Цена, время подачи и поездки — демо-оценки, не актуальные данные.", open: "Открыть в приложении", seePrice: "Цена в приложении", noPrice: "Информация о цене недоступна", estimate: "Примерная цена", demo: "Демо-цена", min: "мин", sponsored: "Спонсор", empty: "В этом городе не найден поддерживаемый сервис такси.", error: "Не удалось загрузить сервисы такси.", retry: "Повторить", redirect: "Переход в приложение такси будет активирован на следующем этапе интеграции." },
};

export function TaxiProviderCard({ provider, quote, c, destination }: { provider: TransportProvider; quote: TaxiQuote; c: Copy; destination: string }) {
  const hasPrice = quote.priceStatus !== "unavailable" && quote.fareMin != null && quote.currency;
  const url = providerUrl(provider, destination);
  return (
    <article data-mode="taxi" className="transport-tone rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        {provider.logo ? <img src={provider.logo} alt={`${provider.name} logo`} className="h-14 w-14 shrink-0 rounded-xl object-contain" /> : <TransportModeIcon mode="taxi" className="h-14 w-14" />}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-foreground">{provider.name}</h3>
          {quote.priceStatus === "demo" ? <DemoBadge>{c.demo}</DemoBadge> : null}
          {provider.isSponsored ? <span className="ml-2 text-xs text-muted-foreground">{c.sponsored}</span> : null}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">{hasPrice ? c.estimate : c.noPrice}</p>
          {hasPrice ? <p className="mt-1 font-display text-2xl font-extrabold text-foreground">{quote.fareMin}–{quote.fareMax} <span className="text-sm font-semibold text-muted-foreground">{quote.currency}</span></p> : null}
        </div>
        <dl className="flex flex-wrap gap-4">
          {quote.pickupEtaMin != null ? <div><dt className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{c.pickup}</dt><dd className="mt-1 text-sm font-semibold text-foreground">{quote.pickupEtaMin} {c.min}</dd></div> : null}
          {quote.tripDurationMin != null ? <div><dt className="flex items-center gap-1 text-xs text-muted-foreground"><Route className="h-3.5 w-3.5" aria-hidden="true" />{c.trip}</dt><dd className="mt-1 text-sm font-semibold text-foreground">{quote.tripDurationMin} {c.min}</dd></div> : null}
        </dl>
      </div>
      {url ? <Button asChild variant="outline" className="mt-4 min-h-11 w-full rounded-lg border-transport/25 bg-transport-soft text-transport hover:bg-transport/15 hover:text-transport"><a href={url} target="_blank" rel="noopener noreferrer">{hasPrice ? c.open : c.seePrice}<ArrowUpRight aria-hidden="true" /></a></Button> : <Button disabled variant="outline" className="mt-4 min-h-11 w-full">{c.noPrice}</Button>}
    </article>
  );
}

export function TaxiSection({ context }: { context: TaxiContext }) {
  const { lang } = useAppState();
  const c = COPY[lang];
  const q = useQuery({ queryKey: ["taxi", context.cityId, context.destinationSlug, context.distanceKm], queryFn: () => getTaxiOptions(context) });

  return (
    <section aria-labelledby="taxi-title" className="mt-6">
      <h2 id="taxi-title" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        <CarFront className="h-5 w-5 text-primary" aria-hidden="true" />{c.title}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{c.demoNote}</p>
      <div className="mt-3 space-y-3">
        {q.isPending ? (
          Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4" aria-hidden="true">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-secondary" />
              <div className="flex-1 space-y-2"><div className="h-4 w-24 animate-pulse rounded bg-secondary" /><div className="h-3 w-36 animate-pulse rounded bg-secondary" /></div>
              <div className="h-9 w-24 animate-pulse rounded-full bg-secondary" />
            </div>
          ))
        ) : q.isError ? (
          <div className="rounded-2xl border border-border bg-card p-4 text-sm">
            <p className="text-foreground">{c.error}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => q.refetch()}>{c.retry}</Button>
          </div>
        ) : q.data.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">{c.empty}</p>
        ) : (
          q.data.map(({ provider, quote }) => <TaxiProviderCard key={provider.id} provider={provider} quote={quote} c={c} destination={context.destination} />)
        )}
      </div>
    </section>
  );
}
