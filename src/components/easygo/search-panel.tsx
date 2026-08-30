import { useNavigate } from "@tanstack/react-router";
import { Compass, SendHorizonal, Star } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { CATEGORIES } from "@/data/categories";
import { getPlacesByCity } from "@/data/places";
import type { Place } from "@/data/types";
import { useAppState } from "@/state/app-state";

export function SearchPanel({ onExplore }: { onExplore: () => void }) {
  const { t, tr, cityId, lang } = useAppState();
  const navigate = useNavigate();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const suggestions = useMemo<Place[]>(() => {
    const value = query.trim().toLocaleLowerCase(lang);
    if (!value) return [];
    return getPlacesByCity(cityId)
      .filter((place) =>
        Object.values(place.name).some((name) => name.toLocaleLowerCase(lang).includes(value)),
      )
      .slice(0, 6);
  }, [query, cityId, lang]);

  const submit = () => {
    if (!query.trim()) {
      setError(t("searchEmptyError"));
      return;
    }
    const target = suggestions[0];
    if (!target) {
      setError(t("noResults"));
      return;
    }
    setError(null);
    navigate({ to: "/place/$slug", params: { slug: target.slug } });
  };

  return (
    <section className="mt-5">
      <label htmlFor={inputId} className="px-1 text-sm font-semibold text-foreground">
        {t("searchLabel")}
      </label>
      <div className="relative mt-2 flex items-start gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-3xl border border-border bg-card p-2 shadow-soft focus-within:border-primary">
          <input
            id={inputId}
            value={query}
            autoComplete="off"
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submit();
              }
            }}
            placeholder={t("searchPlaceholder")}
            className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={submit}
            aria-label={t("searchAction")}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <SendHorizonal className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={onExplore}
          className="inline-flex min-h-[63px] shrink-0 items-center justify-center gap-2 rounded-3xl border border-primary bg-warm px-3 text-sm font-bold text-primary transition-colors hover:bg-secondary"
        >
          <Compass className="h-5 w-5" aria-hidden="true" />
          {t("explore")}
        </button>

        {suggestions.length > 0 ? (
          <ul className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-3xl border border-border bg-card p-2 shadow-lift">
            {suggestions.map((place) => {
              const category = CATEGORIES.find((c) => c.id === place.categories[0]);
              return (
                <li key={place.id}>
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/place/$slug", params: { slug: place.slug } })}
                    className="flex min-h-14 w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-secondary"
                  >
                    <img
                      src={place.image}
                      alt={tr(place.name)}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {tr(place.name)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {category ? tr(category.label) : ""} · {tr(place.city)}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-alt-foreground">
                      <Star className="h-3.5 w-3.5 fill-attention text-attention" aria-hidden="true" />
                      {place.rating.toFixed(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 px-1 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

    </section>
  );
}
