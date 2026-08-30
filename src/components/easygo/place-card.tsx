import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";

import { CATEGORIES } from "@/data/categories";
import type { Place } from "@/data/types";
import { useAppState } from "@/state/app-state";
import { cn } from "@/lib/utils";

export function PlaceCard({ place, variant = "carousel" }: { place: Place; variant?: "carousel" | "list" }) {
  const { t, tr, isFavorite, toggleFavorite } = useAppState();
  const favorite = isFavorite(place.id);
  const category = CATEGORIES.find((c) => c.id === place.categories[0]);

  return (
    <article
      className={cn(
        "relative shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
        variant === "carousel" ? "w-[248px] lg:w-full" : "w-full",
      )}
    >
      <Link
        to="/place/$slug"
        params={{ slug: place.slug }}
        className="block focus-visible:outline-none"
      >
        <img
          src={place.image}
          alt={tr(place.name)}
          loading="lazy"
          width={800}
          height={600}
          className="h-36 w-full object-cover"
        />
        <div className="p-3">
          <h3 className="font-display text-base font-bold leading-snug text-foreground">
            {tr(place.name)}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {category ? tr(category.label) : ""}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-alt-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-attention text-attention" aria-hidden="true" />
              <span className="font-semibold">{place.rating.toFixed(1)}</span>
            </span>
            <span>
              {place.distanceKm} km {t("away")}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={favorite ? t("removeFavorite") : t("addFavorite")}
        aria-pressed={favorite}
        onClick={() => {
          const added = toggleFavorite(place.id);
          toast(added ? t("favoriteAdded") : t("favoriteRemoved"));
        }}
        className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-alt-foreground shadow-soft transition-colors hover:bg-card"
      >
        <Heart
          className={cn("h-5 w-5", favorite && "fill-coral text-coral")}
          aria-hidden="true"
        />
      </button>
    </article>
  );
}
