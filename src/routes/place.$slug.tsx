import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Clock, Lightbulb, MapPin, Star } from "lucide-react";

import { CATEGORIES } from "@/data/categories";
import { PLACE_DETAILS } from "@/data/place-details";
import { useAllPlaces } from "@/hooks/use-all-places";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/place/$slug")({
  head: () => ({
    meta: [
      { title: "Place details — EasyGo AI" },
      {
        name: "description",
        content: "Address, opening hours, history and visitor tips for a place in EasyGo AI.",
      },
      { property: "og:title", content: "Place details — EasyGo AI" },
      {
        property: "og:description",
        content: "Address, opening hours, history and visitor tips for a place in EasyGo AI.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlaceDetail,
});

const LABELS = {
  az: { address: "Ünvan", hours: "İş saatları", about: "Haqqında", tip: "Faydalı məsləhət", community: "İstifadəçi tərəfindən əlavə edilib" },
  en: { address: "Address", hours: "Opening hours", about: "About", tip: "Visitor tip", community: "Added by the community" },
  ru: { address: "Адрес", hours: "Часы работы", about: "О месте", tip: "Полезный совет", community: "Добавлено пользователем" },
} as const;

function PlaceDetail() {
  const { slug } = Route.useParams();
  const { t, tr, lang } = useAppState();
  const place = useAllPlaces().find((p) => p.slug === slug);
  const details = PLACE_DETAILS[slug];
  const L = LABELS[lang];
  const category = place ? CATEGORIES.find((c) => c.id === place.categories[0]) : undefined;
  const address = details ? tr(details.address) : place?.address;

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="mx-auto w-full max-w-[560px] safe-x pb-16 pt-4 lg:max-w-[860px] lg:px-8 lg:pt-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-alt-foreground shadow-soft transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backHome")}
        </Link>

        {place ? (
          <article className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <img
              src={place.image}
              alt={tr(place.name)}
              width={800}
              height={600}
              className="h-56 w-full object-cover lg:h-80"
            />
            <div className="p-5">
              <h1 className="font-display text-2xl font-extrabold text-foreground">{tr(place.name)}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {category ? tr(category.label) : ""} · {tr(place.city)}, {tr(place.country)}
              </p>
              {place.isCommunity ? (
                <p className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {L.community}
                </p>
              ) : (
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-alt-foreground">
                  <Star className="h-4 w-4 fill-attention text-attention" aria-hidden="true" />
                  {place.rating.toFixed(1)}
                  <span className="font-normal text-muted-foreground">
                    · {place.reviewCount.toLocaleString()} {t("reviews")}
                  </span>
                </p>
              )}
              <p className="mt-4 text-sm text-alt-foreground">{tr(place.description)}</p>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {address ? (
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label={L.address} value={address} />
                ) : null}
                {details ? (
                  <InfoRow icon={<Clock className="h-4 w-4" />} label={L.hours} value={tr(details.hours)} />
                ) : null}
              </dl>

              {details ? (
                <>
                  <h2 className="mt-6 font-display text-lg font-bold text-foreground">{L.about}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-alt-foreground">{tr(details.about)}</p>
                  <div className="mt-5 flex gap-3 rounded-2xl bg-warm p-4 text-sm text-alt-foreground">
                    <Lightbulb className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">{L.tip}</p>
                      <p className="mt-1">{tr(details.tip)}</p>
                    </div>
                  </div>
                </>
              ) : null}
              <p className="mt-4 text-xs font-semibold text-muted-foreground">{t("demoData")}</p>
            </div>
          </article>
        ) : (
          <div className="mt-5 rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
            <h1 className="font-display text-xl font-bold text-foreground">{t("placeNotFound")}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border p-3">
      <span className="mt-0.5 text-primary" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
        <dd className="text-sm text-foreground">{value}</dd>
      </div>
    </div>
  );
}
