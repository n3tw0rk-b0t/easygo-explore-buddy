import {
  Heart,
  Globe,
  LifeBuoy,
  LogOut,
  Menu as MenuIcon,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { LANGUAGES } from "@/i18n/translations";
import { useAppState } from "@/state/app-state";
import { BottomSheet, SideDrawer } from "./sheet";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

type PlaceholderKey = "profile" | "settings" | "favorites" | "support";

export function MenuDrawer() {
  const { t, lang, setLang } = useAppState();
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState<PlaceholderKey | null>(null);

  const items: { key: TranslationKey; icon: typeof User; onClick: () => void }[] = [
    { key: "profile", icon: User, onClick: () => setPlaceholder("profile") },
    { key: "settings", icon: Settings, onClick: () => setPlaceholder("settings") },
    { key: "favorites", icon: Heart, onClick: () => setPlaceholder("favorites") },
    { key: "support", icon: LifeBuoy, onClick: () => setPlaceholder("support") },
  ];

  return (
    <>
      <button
        type="button"
        aria-label={t("openMenu")}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary"
      >
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <SideDrawer open={open} onOpenChange={setOpen} title={t("menu")} closeLabel={t("close")}>
        <nav>
          <ul className="space-y-1">
            <li>
              <div className="rounded-2xl border border-border p-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Globe className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t("language")}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label={t("language")}>
                  {LANGUAGES.map((item) => {
                    const active = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setLang(item.code)}
                        aria-pressed={active}
                        className={cn(
                          "min-h-11 rounded-xl border text-sm font-semibold transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-alt-foreground hover:bg-secondary",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {LANGUAGES.find((l) => l.code === lang)?.native}
                </p>
              </div>
            </li>

            {items.map(({ key, icon: Icon, onClick }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={onClick}
                  className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-alt-foreground transition-colors hover:bg-secondary"
                >
                  <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {t(key)}
                </button>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => toast(t("logoutMessage"))}
                className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-destructive transition-colors hover:bg-secondary"
              >
                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                {t("logout")}
              </button>
            </li>
          </ul>
        </nav>
      </SideDrawer>

      <BottomSheet
        open={placeholder !== null}
        onOpenChange={(next) => !next && setPlaceholder(null)}
        title={placeholder ? t(placeholder) : ""}
        closeLabel={t("close")}
      >
        <p className="pb-4 text-sm text-muted-foreground">
          {placeholder === "support" ? t("supportText") : t("placeholderSection")}
        </p>
      </BottomSheet>
    </>
  );
}
