import { useState } from "react";

import { getPlacesByCity } from "@/data/places";
import { useAppState } from "@/state/app-state";
import { PlaceCard } from "./place-card";

export function NearbyPlaces() {
  const { t, cityId, radius, cityLabel } = useAppState();
  const [showAll, setShowAll] = useState(false);

  // Demo filtering only — real distance calculation comes in a later phase.
  const places = getPlacesByCity(cityId).filter((place) => place.distanceKm <= radius);

  return (
    <section aria-labelledby="nearby-heading" className="mt-8">
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
        <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </section>
  );
}
