import { Link } from "@tanstack/react-router";
import { Plus, Route as RouteIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useAllPlaces } from "@/hooks/use-all-places";
import { useAppState } from "@/state/app-state";
import { PlaceCard } from "./place-card";

export function NearbyPlaces() {
  const { t, cityId, radius, cityLabel, lang } = useAppState();
  const [showAll, setShowAll] = useState(false);
  const all = useAllPlaces();

  // Demo filtering only — real distance calculation comes in a later phase.
  const places = all.filter((place) => place.cityId === cityId && place.distanceKm <= radius);
  const addLabel = lang === "ru" ? "Добавить место" : lang === "en" ? "Add a place" : "Məkan əlavə et";

  return (
    <section aria-labelledby="nearby-heading" className="mt-8 lg:mt-0">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => toast(t("tripPlanningSoon"))}
          className="flex min-h-12 items-center justify-center gap-2 rounded-3xl border border-primary bg-warm px-3 text-sm font-bold text-primary transition-colors hover:bg-secondary"
        >
          <RouteIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">{t("tripPlanning")}</span>
        </button>
        <Link
          to="/add-place"
          className="flex min-h-12 items-center justify-center gap-2 rounded-3xl bg-primary px-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">{addLabel}</span>
        </Link>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 id="nearby-heading" className="truncate font-display text-lg font-bold text-foreground">
            {t("nearby")}
          </h2>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {cityLabel} · {radius} km · <span className="font-semibold">{t("demoData")}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="min-h-11 shrink-0 rounded-full px-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
        >
          {t("seeAll")}
        </button>
      </div>

      {places.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          {t("noResults")}
        </p>
      ) : showAll ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} variant="list" />
          ))}
        </div>
      ) : (
        <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </section>
  );
}
