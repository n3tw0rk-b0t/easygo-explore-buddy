import { createFileRoute } from "@tanstack/react-router";
import { Compass, Heart, MapPin } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/places/world-landmarks-hero.png";
import { AiRecommendations } from "@/components/easygo/ai-recommendations";
import { CitySelector } from "@/components/easygo/city-selector";
import { ExploreSheet } from "@/components/easygo/explore-sheet";
import { NearbyPlaces } from "@/components/easygo/nearby-places";
import { RadiusFilter } from "@/components/easygo/radius-filter";
import { SearchPanel } from "@/components/easygo/search-panel";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EasyGo AI — Hara gedirsən?" },
      {
        name: "description",
        content:
          "EasyGo AI helps locals and travellers find places nearby and spend their time at the destination, not on the road.",
      },
      { property: "og:title", content: "EasyGo AI — Hara gedirsən?" },
      {
        property: "og:description",
        content: "Find places nearby, explore your city and plan your trip with EasyGo AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, cityLabel, favorites } = useAppState();
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-foreground dark:bg-background">
      <div className="relative mx-auto min-h-[100dvh] w-full overflow-hidden bg-foreground dark:bg-background">
        <div className="pointer-events-none absolute inset-x-0 -top-[10dvh] h-[100dvh] sm:top-0">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain object-top sm:object-cover sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/55 to-foreground dark:from-background/20 dark:via-background/60 dark:to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1120px] safe-x safe-bottom pt-4 lg:px-8 lg:pt-5">
          <div aria-hidden="true" className="h-[74px] sm:h-[82px]" />

          <div className="mt-3 flex justify-center">
            <CitySelector />
          </div>

          <main>
            <section className="mx-auto flex min-h-[38dvh] max-w-[720px] flex-col justify-end pb-6 pt-12 lg:min-h-[42dvh]">
              <h1 className="text-center font-display text-3xl font-extrabold leading-tight text-attention drop-shadow-lg lg:text-4xl">
                {t("mainQuestion")}
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-center text-base text-attention/85 drop-shadow-md">
                {t("mainHelper")}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-attention">
                <div className="min-w-0">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-attention/45 bg-attention/15 text-attention backdrop-blur-md">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block truncate text-xs font-semibold">{cityLabel}</span>
                </div>
                <div className="min-w-0">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-attention/45 bg-attention/15 text-attention backdrop-blur-md">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block truncate text-xs font-semibold">{t("explore")}</span>
                </div>
                <div className="min-w-0">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-attention/45 bg-attention/15 text-attention backdrop-blur-md">
                    <Heart className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block truncate text-xs font-semibold">
                    {t("favorites")} · {favorites.length}
                  </span>
                </div>
              </div>
            </section>

            <section className="-mx-4 bg-background px-4 py-5 lg:mx-auto lg:max-w-[720px] lg:rounded-lg lg:px-6">
              <div className="[&>section]:mt-0">
                <SearchPanel onExplore={() => setExploreOpen(true)} />
              </div>
              <div className="mt-4 [&>section]:mt-0">
                <RadiusFilter />
              </div>
            </section>

            <section className="-mx-4 border-t border-border bg-background px-4 py-5 lg:mx-0 lg:px-6">
              <AiRecommendations />
            </section>

            <section className="-mx-4 border-t border-border bg-background px-4 py-5 lg:mx-0 lg:px-6">
              <div className="[&>section]:mt-0">
                <NearbyPlaces />
              </div>
            </section>
          </main>

          <p className="mt-6 text-center text-xs text-attention/70">
            {t("tagline")}
          </p>
        </div>
      </div>

      <ExploreSheet open={exploreOpen} onOpenChange={setExploreOpen} />
    </div>
  );
}
