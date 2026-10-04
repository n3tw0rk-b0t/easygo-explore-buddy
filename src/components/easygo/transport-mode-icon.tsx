import { Bike, BusFront, CarTaxi, PersonStanding, TramFront, Zap } from "lucide-react";
import type { TransportModeId } from "@/data/travel-options";
import { cn } from "@/lib/utils";

const ICONS = { taxi: CarTaxi, bus: BusFront, metro: TramFront, scooter: Zap, bicycle: Bike, walking: PersonStanding };

export function TransportModeIcon({ mode, className }: { mode: TransportModeId; className?: string }) {
  const Icon = ICONS[mode];
  return <span aria-hidden="true" data-mode={mode} className={cn("transport-tone grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-current/10 bg-transport-soft text-transport", className)}><Icon className="h-7 w-7 fill-current/10" strokeWidth={1.8} /></span>;
}