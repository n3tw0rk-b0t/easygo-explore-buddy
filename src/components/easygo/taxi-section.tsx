import { useQuery } from "@tanstack/react-query";
import { Car, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTaxiOptions, providerUrl, type TaxiContext, type TaxiQuote, type TransportProvider } from "@/data/transport-providers";
import type { Lang } from "@/data/types";
import { useAppState } from "@/state/app-state";

const AZ = { title: "", demoNote: "", open: "", seePrice: "", noPrice: "", estimate: "", demo: "", min: "", sponsored: "", empty: "", error: "", retry: "", redirect: "" };
type Copy = typeof AZ;
const COPY: Record<Lang, Copy> = {
  az: { title: "Taksi", demoNote: "Şəhərdə fəaliyyət göstərən xidmətlər. Qiymət və vaxt tətbiqdə göstərilir.", open: "Tətbiqdə aç", seePrice: "Tətbiqdə qiymətə bax", noPrice: "Qiymət məlumatı mövcud deyil", estimate: "Təxmini qiymət", demo: "Demo qiymət", min: "dəq ərzində", sponsored: "Sponsorlu", empty: "Bu şəhərdə dəstəklənən taksi xidməti tapılmadı.", error: "Taksi xidmətlərini yükləmək mümkün olmadı.", retry: "Yenidən cəhd et", redirect: "Taksi tətbiqinə keçid gələcək inteqrasiya mərhələsində aktiv ediləcək." },
  en: { title: "Taxi", demoNote: "Services operating in this city. Price and ETA are shown in the app.", open: "Open in app", seePrice: "See price in app", noPrice: "Price information unavailable", estimate: "Estimated price", demo: "Demo price", min: "min away", sponsored: "Sponsored", empty: "No supported taxi service was found in this city.", error: "Couldn't load taxi services.", retry: "Try again", redirect: "Taxi app redirect will be enabled in a future integration stage." },
  ru: { title: "Такси", demoNote: "Сервисы, работающие в городе. Цена и время — в приложении.", open: "Открыть в приложении", seePrice: "Цена в приложении", noPrice: "Информация о цене недоступна", estimate: "Примерная цена", demo: "Демо-цена", min: "мин до подачи", sponsored: "Спонсор", empty: "В этом городе не найден поддерживаемый сервис такси.", error: "Не удалось загрузить сервисы такси.", retry: "Повторить", redirect: "Переход в приложение такси будет активирован на следующем этапе интеграции." },
};

export function TaxiProviderCard({ provider, quote, c, destination }: { provider: TransportProvider; quote: TaxiQuote; c: Copy; destination: string }) {
  const hasPrice = quote.priceStatus !== "unavailable" && quote.fareMin != null && quote.currency;
  return (
    <article className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
      {provider.logo ? (
        <img src={provider.logo} alt="" className="h-11 w-11 shrink-0 rounded-xl object-contain" />
      ) : (
        <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-primary">
          {provider.name.slice(0, 2)}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-foreground">{provider.name}</h3>
          {provider.isSponsored ? <span className="rounded-full border border-border px-2 text-[11px] text-muted-foreground">{c.sponsored}</span> : null}
        </div>
        {quote.pickupEtaMin != null ? (
          <p className="mt-0.5 flex items-center gap-1 text-sm text-alt-foreground"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{quote.pickupEtaMin} {c.min}</p>
        ) : null}
        <p className="mt-0.5 text-sm text-muted-foreground">
          {hasPrice
            ? `${quote.priceStatus === "demo" ? c.demo : c.estimate} · ${quote.fareMin}–${quote.fareMax} ${quote.currency}`
            : c.noPrice}
        </p>
      </div>
      <Button asChild size="sm" className="min-h-11 w-full shrink-0 rounded-full sm:w-auto">
        <a href={providerUrl(provider, destination) ?? "#"} target="_blank" rel="noopener noreferrer">{hasPrice ? c.open : c.seePrice}</a>
      </Button>
    </article>
  );
}

export function TaxiSection({ context }: { context: TaxiContext }) {
  const { lang } = useAppState();
  const c = COPY[lang];
  const q = useQuery({ queryKey: ["taxi", context.cityId, context.destinationSlug], queryFn: () => getTaxiOptions(context) });

  return (
    <section aria-labelledby="taxi-title" className="mt-6">
      <h2 id="taxi-title" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        <Car className="h-5 w-5 text-primary" aria-hidden="true" />{c.title}
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
