import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import heroImage from "@/assets/places/world-landmarks-hero.png";
import { ExploreSheet } from "./explore-sheet";
import { HelpFab } from "./help-fab";
import { Logo } from "./logo";
import { MenuDrawer } from "./menu-drawer";
import { SearchPanel } from "./search-panel";

/** Shared controls stay mounted while page content changes. */
export function AppChrome() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <>
      {pathname !== "/" ? (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" data-page-backdrop>
          <img src={heroImage} alt="" className="h-full w-full scale-105 object-cover object-top blur-xl" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto w-full max-w-[1120px] safe-x safe-top lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div aria-hidden="true" />
          <div className="pointer-events-auto rounded-full border border-attention/35 bg-foreground/70 px-4 py-2 shadow-soft backdrop-blur-md dark:bg-background/75">
            <Logo />
          </div>
          <div className="pointer-events-auto min-w-0 justify-self-end">
            <MenuDrawer />
          </div>
        </div>
      </div>
      {pathname !== "/" ? (
        <header className="relative z-30 border-b border-border bg-background/65 pb-4 pt-[calc(max(1rem,env(safe-area-inset-top))+5.625rem)] backdrop-blur-md sm:pt-[calc(max(1rem,env(safe-area-inset-top))+6.125rem)]">
          <div className="mx-auto w-full max-w-[860px] safe-x [&>section]:mt-0">
            <SearchPanel key={pathname} onExplore={() => setExploreOpen(true)} />
          </div>
        </header>
      ) : null}
      <ExploreSheet open={exploreOpen} onOpenChange={setExploreOpen} />
      <HelpFab />
    </>
  );
}