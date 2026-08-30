import { Check } from "lucide-react";

import { RADIUS_OPTIONS, type RadiusOption } from "@/data/radius";
import { useAppState } from "@/state/app-state";
import { cn } from "@/lib/utils";

export function RadiusFilter() {
  const { t, radius, setRadius } = useAppState();

  return (
    <section aria-labelledby="radius-label" className="mt-4">
      <p id="radius-label" className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("radius")}
      </p>
      <div
        role="radiogroup"
        aria-labelledby="radius-label"
        className="no-scrollbar -mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible"
      >
        {RADIUS_OPTIONS.map((option: RadiusOption) => {
          const active = option === radius;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setRadius(option)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-alt-foreground hover:bg-secondary",
              )}
            >
              {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              {option} km
            </button>
          );
        })}
      </div>
    </section>
  );
}
