import { ChevronDown, Crosshair, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CITIES } from "@/data/cities";
import { useAppState } from "@/state/app-state";
import { BottomSheet } from "./sheet";
import { cn } from "@/lib/utils";

export function CitySelector() {
  const { t, tr, cityId, setCityId, cityLabel, countryLabel, setCustomCity } = useAppState();
  const [open, setOpen] = useState(false);
  const [manual, setManual] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t("currentCity")}: ${cityLabel}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-alt-foreground shadow-soft transition-colors hover:bg-secondary"
      >
        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="truncate">
          {cityLabel}
          {countryLabel ? `, ${countryLabel}` : ""}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title={t("chooseCity")}
        closeLabel={t("close")}
      >
        <ul className="space-y-2">
          {CITIES.map((city) => {
            const active = city.id === cityId;
            return (
              <li key={city.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCityId(city.id);
                    setOpen(false);
                  }}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                    active
                      ? "border-primary bg-warm font-semibold text-primary"
                      : "border-border bg-card text-alt-foreground hover:bg-secondary",
                  )}
                >
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 truncate">
                    {tr(city.name)}, {tr(city.country)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();
            const value = manual.trim();
            if (!value) return;
            setCustomCity(value);
            setManual("");
            setOpen(false);
          }}
        >
          <label htmlFor="manual-city" className="text-sm font-semibold text-foreground">
            {t("manualCity")}
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="manual-city"
              value={manual}
              onChange={(event) => setManual(event.target.value)}
              placeholder={t("manualCityPlaceholder")}
              className="min-h-11 min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t("apply")}
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={() => toast(t("detectLocationMessage"))}
          className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3 text-left text-sm font-medium text-alt-foreground transition-colors hover:bg-secondary"
        >
          <Crosshair className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {t("detectLocation")}
        </button>
      </BottomSheet>
    </>
  );
}
