import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";

import { CATEGORIES } from "@/data/categories";
import { getPlaceBySlug } from "@/data/places";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/place/$slug")({
  head: () => ({
    meta: [
      { title: "Place details — EasyGo AI" },
      {
        name: "description",
        content: "Preview of a place in EasyGo AI. Full place details arrive in the next phase.",
      },
      { property: "og:title", content: "Place details — EasyGo AI" },
      {
        property: "og:description",
        content: "Preview of a place in EasyGo AI. Full place details arrive in the next phase.",
      },
    ],
  }),
  component: PlaceDetail,
});

function PlaceDetail() {
  const { slug } = Route.useParams();
  const { t, tr } = useAppState();
  const place = getPlaceBySlug(slug);
  const category = place ? CATEGORIES.find((c) => c.id === place.categories[0]) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[560px] px-4 pb-16 pt-4">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-alt-foreground shadow-soft transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backHome")}
        </Link>

        {place ? (
          <article className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <img
              src={place.image}
              alt={tr(place.name)}
              width={800}
              height={600}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <h1 className="font-display text-2xl font-extrabold text-foreground">
                {tr(place.name)}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {category ? tr(category.label) : ""} · {tr(place.city)}, {tr(place.country)}
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-alt-foreground">
                <Star className="h-4 w-4 fill-attention text-attention" aria-hidden="true" />
                {place.rating.toFixed(1)}
                <span className="font-normal text-muted-foreground">
                  · {place.reviewCount} {t("reviews")}
                </span>
              </p>
              <p className="mt-4 text-sm text-alt-foreground">{tr(place.description)}</p>
              <p className="mt-5 rounded-2xl bg-warm p-4 text-sm text-alt-foreground">
                {t("placeDetailSoon")}
              </p>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">{t("demoData")}</p>
            </div>
          </article>
        ) : (
          <div className="mt-5 rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
            <h1 className="font-display text-xl font-bold text-foreground">{t("placeNotFound")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("placeDetailSoon")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
