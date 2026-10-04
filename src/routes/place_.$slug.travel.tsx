import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { TaxiSection } from "@/components/easygo/taxi-section";
import { getCity } from "@/data/cities";
import { useAllPlaces } from "@/hooks/use-all-places";
import { PLACE_DETAIL_COPY } from "@/i18n/place-details";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/place_/$slug/travel")({
  head: () => ({
    meta: [
      { title: "Travel options — EasyGo AI" },
      { name: "description", content: "Ways to get to your chosen place — coming in the next stage of EasyGo AI." },
      { property: "og:title", content: "Travel options — EasyGo AI" },
      { property: "og:description", content: "Ways to get to your chosen place — coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TravelPlaceholder,
});

/** Placeholder only — Travel Options UI is the next stage. */
function TravelPlaceholder() {
  const { slug } = Route.useParams();
  const { tr, lang } = useAppState();
  const c = PLACE_DETAIL_COPY[lang];
  const place = useAllPlaces().find((p) => p.slug === slug);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="mx-auto w-full max-w-[560px] safe-x pt-4">
        <Link
          to="/place/$slug"
          params={{ slug }}
          aria-label={c.back}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-soft"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
          <h1 className="font-display text-2xl font-extrabold text-foreground">{place ? tr(place.name) : c.notFound}</h1>
        </div>
        {place ? (
          <div className="pb-10">
            <TaxiSection
              context={{
                cityId: place.cityId,
                countryCode: getCity(place.cityId).countryCode,
                destinationSlug: place.slug,
                origin: null,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
