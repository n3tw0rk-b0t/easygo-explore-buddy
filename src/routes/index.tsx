import { createFileRoute } from "@tanstack/react-router";
import { Compass, Heart, MapPin } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/places/world-landmarks-hero.png";
import { CitySelector } from "@/components/easygo/city-selector";
import { ExploreSheet } from "@/components/easygo/explore-sheet";
import { HelpFab } from "@/components/easygo/help-fab";
import { Logo } from "@/components/easygo/logo";
import { MenuDrawer } from "@/components/easygo/menu-drawer";
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
    ],
  }),
  component: Home,
});

function Home() {
  const { t, cityLabel, favorites } = useAppState();
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-foreground lg:p-5 dark:bg-background">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[560px] overflow-hidden bg-foreground shadow-2xl lg:min-h-[calc(100dvh-2.5rem)] lg:rounded-[2.75rem] lg:border-[6px] lg:border-primary-foreground/15 dark:bg-background dark:lg:border-foreground/15">
        <div className="pointer-events-none absolute inset-x-0 -top-[10dvh] h-[100dvh] lg:h-[calc(100dvh-3.25rem)]">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/55 to-foreground dark:from-background/20 dark:via-background/60 dark:to-background" />
        </div>

        <div className="relative z-10 safe-x safe-bottom px-4 pb-6 pt-4 lg:px-6 lg:pb-8 lg:pt-5">
          <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div aria-hidden="true" />
            <div className="rounded-full border border-attention/35 bg-foreground/70 px-4 py-2 shadow-soft backdrop-blur-md dark:border-attention/35 dark:bg-background/75">
              <Logo />
            </div>
            <div className="flex justify-end">
              <MenuDrawer />
            </div>
          </header>

          <div className="mt-3 flex justify-center">
            <CitySelector />
          </div>

          <main>
            <section className="flex min-h-[64dvh] flex-col justify-end pb-6 pt-16 lg:min-h-[74dvh]">
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

            <section className="rounded-[2rem] border border-primary-foreground/20 bg-background/95 p-4 shadow-lift backdrop-blur-xl dark:border-foreground/15 lg:p-5">
              <div className="[&>section]:mt-0">
                <SearchPanel onExplore={() => setExploreOpen(true)} />
              </div>
              <div className="mt-4 [&>section]:mt-0">
                <RadiusFilter />
              </div>
            </section>

            <section className="mt-4 rounded-[2rem] border border-primary-foreground/20 bg-background/95 p-4 shadow-lift backdrop-blur-xl dark:border-foreground/15 lg:p-5">
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
      <HelpFab />
    </div>
  );
}
