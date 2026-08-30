import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const { t } = useAppState();
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="mx-auto w-full max-w-[560px] safe-x safe-bottom pt-4 lg:max-w-[1120px] lg:px-8 lg:pt-6">
        <header className="sticky top-0 z-30 -mx-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-background/85 px-4 py-2 backdrop-blur-md lg:mx-0 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:rounded-full lg:border lg:border-border lg:bg-card/90 lg:px-6 lg:py-3 lg:shadow-soft">
          <div className="flex min-w-0 justify-center pl-11 lg:justify-start lg:pl-0">
            <Logo />
          </div>
          <div className="hidden lg:flex lg:justify-center">
            <CitySelector />
          </div>
          <MenuDrawer />
        </header>

        <div className="mt-4 flex justify-center lg:hidden">
          <CitySelector />
        </div>

        <main className="mt-6 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10">
          <section className="lg:rounded-4xl lg:border lg:border-border lg:bg-card lg:p-8 lg:shadow-soft">
            <h1 className="text-center font-display text-3xl font-extrabold leading-tight text-foreground lg:text-left lg:text-4xl">
              {t("mainQuestion")}
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-center text-sm text-muted-foreground lg:mx-0 lg:max-w-none lg:text-left lg:text-base">
              {t("mainHelper")}
            </p>

            <SearchPanel onExplore={() => setExploreOpen(true)} />
            <RadiusFilter />
          </section>

          <section className="lg:mt-0">
            <NearbyPlaces />
          </section>
        </main>

        <p className="mt-10 pb-4 text-center text-xs text-muted-foreground">{t("tagline")}</p>
      </div>

      <ExploreSheet open={exploreOpen} onOpenChange={setExploreOpen} />
      <HelpFab />
    </div>
  );
}
