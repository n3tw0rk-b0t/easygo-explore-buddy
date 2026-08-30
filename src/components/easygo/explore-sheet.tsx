import { useState } from "react";

import { CATEGORIES } from "@/data/categories";
import { getPlacesByCity } from "@/data/places";
import type { CategoryId } from "@/data/types";
import { useAppState } from "@/state/app-state";
import { PlaceCard } from "./place-card";
import { BottomSheet } from "./sheet";
import { cn } from "@/lib/utils";

export function ExploreSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, tr, cityId } = useAppState();
  const [selected, setSelected] = useState<CategoryId>("popular");

  const places = getPlacesByCity(cityId).filter((place) => place.categories.includes(selected));

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={t("exploreTitle")}
      closeLabel={t("close")}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("exploreTitle")}>
        {CATEGORIES.map((category) => {
          const active = category.id === selected;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(category.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-alt-foreground hover:bg-secondary",
              )}
            >
              {tr(category.label)}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 pb-4 sm:grid-cols-2">
        {places.length > 0 ? (
          places.map((place) => <PlaceCard key={place.id} place={place} variant="list" />)
        ) : (
          <p className="text-sm text-muted-foreground">{t("noResults")}</p>
        )}
      </div>
    </BottomSheet>
  );
}
