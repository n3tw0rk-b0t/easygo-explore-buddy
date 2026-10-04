import { MapPin, Star } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import fallbackImage from "@/assets/places/dagustu-park.jpg";
import { cn } from "@/lib/utils";

export function PlaceGallery({ images, alt, photoLabel }: { images: string[]; alt: string; photoLabel: string }) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto rounded-b-[2rem] sm:aspect-[16/10] lg:rounded-[2rem]"
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={images.length > 1 ? `${alt} — ${photoLabel} ${i + 1}` : alt}
            loading={i === 0 ? "eager" : "lazy"}
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImage) e.currentTarget.src = fallbackImage;
            }}
            className="h-full w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>
      {images.length > 1 ? (
        <span className="absolute bottom-3 right-4 rounded-full bg-foreground/70 px-2.5 py-1 text-xs font-semibold text-background">
          {index + 1} / {images.length}
        </span>
      ) : null}
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
    <section className="flex gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</h2>
          {badge}
        </div>
        <div className="mt-1 text-sm text-foreground">{children}</div>
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
    <article className="rounded-3xl border border-border bg-card p-4">
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
      <p className="mt-3 text-sm leading-relaxed text-alt-foreground">“{text}”</p>
    </article>
  );
}
