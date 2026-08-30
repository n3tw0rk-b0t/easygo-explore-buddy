import { AlertTriangle, LifeBuoy, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EMERGENCY_NUMBERS } from "@/data/emergency";
import { useAppState } from "@/state/app-state";
import { BottomSheet, ConfirmDialog } from "./sheet";

export function HelpFab() {
  const { t, tr, cityId } = useAppState();
  const [open, setOpen] = useState(false);
  const [pendingNumber, setPendingNumber] = useState<string | null>(null);

  const numbers = EMERGENCY_NUMBERS[cityId];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-5 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lift transition-colors hover:bg-primary-hover"
      >
        <LifeBuoy className="h-5 w-5" aria-hidden="true" />
        {t("help")}
      </button>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title={t("emergencyTitle")}
        description={t("emergencyHelper")}
        closeLabel={t("close")}
      >
        <ul className="space-y-2">
          {numbers.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{tr(item.label)}</p>
                <p className="text-xs text-muted-foreground">{item.number}</p>
              </div>
              <button
                type="button"
                onClick={() => setPendingNumber(item.number)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t("call")}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex gap-2 rounded-2xl bg-warm p-3 text-xs text-alt-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0 text-attention" aria-hidden="true" />
          {t("emergencyWarning")}
        </p>

        <div className="mt-4 space-y-2 pb-4">
          <button
            type="button"
            onClick={() => toast(t("shareLocationMessage"))}
            className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-border px-4 text-left text-sm font-medium text-alt-foreground transition-colors hover:bg-secondary"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {t("shareLocation")}
          </button>
          <button
            type="button"
            onClick={() => toast(t("supportText"))}
            className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-border px-4 text-left text-sm font-medium text-alt-foreground transition-colors hover:bg-secondary"
          >
            <LifeBuoy className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {t("goToSupport")}
          </button>
        </div>
      </BottomSheet>

      <ConfirmDialog
        open={pendingNumber !== null}
        onOpenChange={(next) => !next && setPendingNumber(null)}
        title={t("callConfirmTitle")}
        description={pendingNumber ?? undefined}
        confirmLabel={t("call")}
        cancelLabel={t("cancel")}
        onConfirm={() => {
          setPendingNumber(null);
          toast(t("callDemoMessage"));
        }}
      />
    </>
  );
}
