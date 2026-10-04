import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { ExploreSheet } from "./explore-sheet";
import { HelpFab } from "./help-fab";
import { MenuDrawer } from "./menu-drawer";
import { SearchPanel } from "./search-panel";

/** Shared controls stay mounted while page content changes. */
export function AppChrome() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-[560px] safe-x safe-top lg:top-[26px] lg:px-6 lg:pt-5">
        <div className="pointer-events-auto ml-auto w-fit">
          <MenuDrawer />
        </div>
      </div>
      {pathname !== "/" ? (
        <header className="relative z-30 border-b border-border bg-background pb-4 pt-20 lg:pt-28">
          <div className="mx-auto w-full max-w-[560px] safe-x [&>section]:mt-0">
            <SearchPanel key={pathname} onExplore={() => setExploreOpen(true)} />
          </div>
        </header>
      ) : null}
      <ExploreSheet open={exploreOpen} onOpenChange={setExploreOpen} />
      <HelpFab />
    </>
  );
}