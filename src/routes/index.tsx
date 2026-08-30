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
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[560px] px-4 pb-28 pt-4">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 justify-center pl-11">
            <Logo />
          </div>
          <MenuDrawer />
        </header>

        <div className="mt-4 flex justify-center">
          <CitySelector />
        </div>

        <main className="mt-6">
          <h1 className="text-center font-display text-3xl font-extrabold leading-tight text-foreground">
            {t("mainQuestion")}
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-center text-sm text-muted-foreground">
            {t("mainHelper")}
          </p>

          <SearchPanel onExplore={() => setExploreOpen(true)} />
          <RadiusFilter />
          <NearbyPlaces />

          <p className="mt-10 text-center text-xs text-muted-foreground">{t("tagline")}</p>
        </main>
      </div>

      <ExploreSheet open={exploreOpen} onOpenChange={setExploreOpen} />
      <HelpFab />
    </div>
  );
}
