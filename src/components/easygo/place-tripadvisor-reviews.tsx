import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, Loader2, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/state/app-state";
import {
  getTripadvisorReviews,
  searchTripadvisorPlaces,
  selectTripadvisorPlace,
} from "@/lib/tripadvisor.functions";
import { Stars } from "./place-detail-parts";

const storageKey = (slug: string) => `easygo.tripadvisor.${slug}`;

interface StoredSelection {
  id: number;
  name?: string;
  url?: string;
}

export function PlaceTripadvisorReviews({
  slug,
  query,
  geoName,
  category,
}: {
  slug: string;
  query: string;
  geoName?: string;
  category?: "HOTEL" | "RESTAURANT" | "ATTRACTION";
}) {
  const { lang } = useAppState();
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<StoredSelection>();
  const [selectingId, setSelectingId] = useState<number>();
  const search = useServerFn(searchTripadvisorPlaces);
  const reviews = useServerFn(getTripadvisorReviews);
  const select = useServerFn(selectTripadvisorPlacethird);
  const c =
    lang === "az"
      ? {
          load: "Tripadvisor-da məkanı tap",
          choose: "Uyğun məkanı seçin",
          empty: "Tripadvisor kataloqunda uyğun məkan tapılmadı.",
          none: "Tripadvisor bu məkan üçün rəy təqdim etməyib.",
          note: "Tripadvisor-un təqdim etdiyi ən çox 5 rəy · EasyGo rəylərindən ayrıdır",
          source: "Bütün rəylər Tripadvisor-da",
          change: "Başqa məkan seç",
          failure: "Tripadvisor rəyləri yüklənmədi.",
          selecting: "Məkan əlavə olunur…",
        }
      : lang === "ru"
        ? {
            load: "Найти место на Tripadvisor",
            choose: "Выберите нужное место",
            empty: "В каталоге Tripadvisor подходящих мест не найдено.",
            none: "Tripadvisor не предоставил отзывы для этого места.",
            note: "До 5 отзывов от Tripadvisor · отдельно от отзывов EasyGo",
            source: "Все отзывы на Tripadvisor",
            change: "Выбрать другое место",
            failure: "Не удалось загрузить отзывы Tripadvisor.",
            selecting: "Место добавляется…",
          }
        : {
            load: "Find the place on Tripadvisor",
            choose: "Choose the matching place",
            empty: "No matching places found in the Tripadvisor catalog.",
            none: "Tripadvisor has not provided reviews for this place.",
            note: "Up to 5 reviews provided by Tripadvisor · separate from EasyGo reviews",
            source: "All reviews on Tripadvisor",
            change: "Choose another place",
            failure: "Tripadvisor reviews could not load.",
            selecting: "Adding the place…",
          };

  // Restore a previously chosen Tripadvisor place so reviews show automatically.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(slug));
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSelection;
        if (typeof parsed?.id === "number") setSelected(parsed);
      }
    } catch {
      // ignore malformed storage
    }
  }, [slug]);

  const candidates = useQuery({
    queryKey: ["tripadvisor-search", slug, lang],
    queryFn: () => search({ data: { query, geoName, category, lang } }),
    enabled: searching && query.trim().length >= 3,
    staleTime: 600_000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const tripadvisorReviews = useQuery({
    queryKey: ["tripadvisor-reviews", selected?.id, lang],
    queryFn: () => {
      if (!selected) throw new Error("No place selected");
      return reviews({ data: { locationId: selected.id, lang } });
    },
    enabled: Boolean(selected),
    staleTime: 600_000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const onChoose = async (id: number, name?: string, url?: string) => {
    setSelectingId(id);
    try {
      await select({ data: { locationId: id } });
      const stored: StoredSelection = { id, name, url };
      setSelected(stored);
      try {
        window.localStorage.setItem(storageKey(slug), JSON.stringify(stored));
      } catch {
        // storage may be unavailable
      }
      setSearching(false);
    } catch {
      // error surfaced below via the failure notice
    } finally {
      setSelectingId(undefined);
    }
  };

  const clearSelection = () => {
    setSelected(undefined);
    setSearching(false);
    try {
      window.localStorage.removeItem(storageKey(slug));
    } catch {
      // ignore
    }
  };

  const busy = candidates.isFetching || tripadvisorReviews.isFetching || Boolean(selectingId);
  const error = candidates.error || tripadvisorReviews.error;

  return (
    <section className="min-w-0 border-t border-border py-5" aria-labelledby="tripadvisor-reviews-heading">
      <h2 id="tripadvisor-reviews-heading" className="font-display text-lg font-bold">
        Tripadvisor
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
      {!selected ? (
        !searching ? (
          <Button onClick={() => setSearching(true)} variant="outline" className="mt-3 min-h-11 w-full">
            <Search />
            {c.load}
          </Button>
        ) : null
      ) : null}
      {busy ? (
        <div role="status" className="flex justify-center py-5">
          <Loader2 aria-hidden="true" className="animate-spin text-primary" />
          {selectingId ? <span className="ml-2 text-sm text-muted-foreground">{c.selecting}</span> : null}
        </div>
      ) : null}
      {error ? (
        <div role="alert" className="mt-3 break-words text-sm text-destructive">
          <p>{c.failure}</p>
          <details className="mt-2">
            <summary>Tripadvisor</summary>
            <p className="[overflow-wrap:anywhere]">{error.message}</p>
          </details>
        </div>
      ) : null}
      {searching && candidates.data && !selected ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm font-semibold">{candidates.data.length ? c.choose : c.empty}</p>
          {candidates.data.map((entry) => {
            const loc = entry.location;
            const name = loc.names?.find((n) => n.primary)?.value ?? loc.names?.[0]?.value;
            const address = loc.addresses?.[0]?.formatted;
            return (
              <Button
                key={loc.id}
                variant="outline"
                onClick={() => void onChoose(loc.id, name, loc.urls?.official)}
                className="h-auto min-h-14 w-full flex-col items-start whitespace-normal py-3 text-left"
              >
                <span>{name}</span>
                {address ? <span className="text-xs font-normal text-muted-foreground">{address}</span> : null}
                {typeof loc.overall_rating?.rating === "number" ? (
                  <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                    <Star className="h-3 w-3 fill-attention text-attention" />
                    {loc.overall_rating.rating.toFixed(1)}
                    {typeof loc.overall_rating.count === "number" ? ` · ${loc.overall_rating.count}` : ""}
                  </span>
                ) : null}
              </Button>
            );
          })}
        </div>
      ) : null}
      {selected && tripadvisorReviews.data ? (
        <div className="mt-4 space-y-3">
          {selected.name ? <p className="font-semibold">{selected.name}</p> : null}
          {!tripadvisorReviews.data.reviews.length ? (
            <p className="text-sm text-muted-foreground">{c.none}</p>
          ) : (
            tripadvisorReviews.data.reviews.map((r) => (
              <article key={r.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={r.tripadvisorUrl || selected.url || "https://www.tripadvisor.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline underline-offset-2"
                  >
                    Tripadvisor
                  </a>
                  <Stars value={r.rating} />
                </div>
                {r.title ? <p className="mt-1 text-sm font-semibold">{r.title}</p> : null}
                {r.publishedOn ? <p className="mt-1 text-xs text-muted-foreground">{r.publishedOn}</p> : null}
                <p className="mt-3 whitespace-pre-line break-words text-sm [overflow-wrap:anywhere]">{r.text}</p>
              </article>
            ))
          )}
          <Button asChild variant="outline" className="min-h-11 w-full whitespace-normal">
            <a
              href={selected.url || "https://www.tripadvisor.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.source}
              <ExternalLink className="shrink-0" />
            </a>
          </Button>
          <Button variant="link" onClick={clearSelection} className="min-h-11 px-0">
            {c.change}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
