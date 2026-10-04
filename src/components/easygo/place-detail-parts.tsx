import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import fallbackImage from "@/assets/places/dagustu-park.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlaceGallery({ images, alt, photoLabel, previousLabel, nextLabel, credits = [] }: {
  images: string[];
  alt: string;
  photoLabel: string;
  previousLabel: string;
  nextLabel: string;
  credits?: { image: string; artist: string; license: string; source: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const visibleImages = images.filter((src) => !failed.includes(src));
  const activeIndex = Math.min(index, Math.max(0, visibleImages.length - 1));
  const credit = credits.find((c) => c.image === visibleImages[activeIndex]);
  const move = (next: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * next, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <div className="relative" role="region" aria-label={`${alt} — ${photoLabel}`} aria-roledescription="carousel">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
            if (el.clientWidth > 0) setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          move(Math.max(0, Math.min(visibleImages.length - 1, activeIndex + (e.key === "ArrowRight" ? 1 : -1))));
        }}
        className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto sm:aspect-[16/10] lg:rounded-lg"
      >
        {(visibleImages.length ? visibleImages : [fallbackImage]).map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${alt} — ${photoLabel} ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            onError={(e) => {
              if (src !== fallbackImage) setFailed((prev) => [...prev, src]);
            }}
            className={cn("h-full w-full shrink-0 snap-center bg-foreground", i === 0 ? "object-cover" : "object-contain")}
          />
        ))}
      </div>
      {visibleImages.length > 1 ? (
        <>
          <Button type="button" variant="ghost" size="icon" aria-label={previousLabel} title={previousLabel} disabled={activeIndex === 0} onClick={() => move(activeIndex - 1)} className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-card/90 text-foreground shadow-soft hover:bg-card">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label={nextLabel} title={nextLabel} disabled={activeIndex === visibleImages.length - 1} onClick={() => move(activeIndex + 1)} className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-card/90 text-foreground shadow-soft hover:bg-card">
            <ChevronRight aria-hidden="true" />
          </Button>
          <span aria-live="polite" aria-atomic="true" className="absolute bottom-3 right-4 rounded-full bg-foreground/70 px-2.5 py-1 text-xs font-semibold text-background">
            {activeIndex + 1} / {visibleImages.length}
          </span>
        </>
      ) : null}
      {credit ? <a href={credit.source} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 left-4 max-w-[calc(100%-6rem)] rounded bg-foreground/70 px-2 py-1 text-[10px] leading-tight text-background underline underline-offset-2">© {credit.artist} · {credit.license}</a> : null}
    </div>
  );
}

export function DemoBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-attention/50 bg-attention/15 px-2.5 py-0.5 text-[11px] font-semibold text-alt-foreground">
      {children}
    </span>
  );
}

export function InfoCard({
  icon,
  label,
  children,
  badge,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <section className="flex gap-3 border-t border-border py-4">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <h2 className="text-xs font-semibold uppercase text-muted-foreground">{label}</h2>
          {badge}
        </div>
        <div className="mt-1 break-words text-sm leading-relaxed text-foreground [overflow-wrap:anywhere]">{children}</div>
      </div>
    </section>
  );
}

/** Static illustrative map — not real map data. */
export function MapPreview({ label, badge }: { label: string; badge: string }) {
  return (
    <div className="relative mt-3 h-32 overflow-hidden rounded-2xl border border-border bg-secondary">
      <svg viewBox="0 0 320 128" className="absolute inset-0 h-full w-full text-border" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M-10 90 L330 60" />
          <path d="M60 -10 L110 140" />
          <path d="M220 -10 L190 140" />
        </g>
        <g stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M-10 30 L330 20" />
          <path d="M150 -10 L160 140" />
          <path d="M-10 120 L330 105" />
        </g>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-primary">
        <MapPin className="h-8 w-8 fill-primary/20" aria-hidden="true" />
      </span>
      <span className="absolute bottom-2 left-2 max-w-[70%] truncate rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground">{label}</span>
      <span className="absolute right-2 top-2"><DemoBadge>{badge}</DemoBadge></span>
    </div>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i < value ? "fill-attention text-attention" : "text-border")} aria-hidden="true" />
      ))}
    </span>
  );
}

export function ReviewCard({ author, rating, date, text }: { author: string; rating: number; date: string; text: string }) {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary" aria-hidden="true">
          {author.slice(-2)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{author}</p>
          <div className="flex items-center gap-2">
            <Stars value={rating} />
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 break-words text-sm leading-relaxed text-alt-foreground [overflow-wrap:anywhere]">“{text}”</p>
    </article>
  );
}
