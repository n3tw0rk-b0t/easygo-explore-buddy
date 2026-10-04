import { Link, createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, Lightbulb, MapPin, Share2, Star, Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BottomSheet } from "@/components/easygo/sheet";
import {
  DemoBadge,
  InfoCard,
  MapPreview,
  PlaceGallery,
  ReviewCard,
} from "@/components/easygo/place-detail-parts";
import { CATEGORIES } from "@/data/categories";
import { PLACE_DETAILS } from "@/data/place-details";
import { PLACE_GALLERY_PHOTOS } from "@/data/place-gallery";
import { getDemoReviews, getPriceInfo } from "@/data/place-extras";
import { PLACES } from "@/data/places";
import { useAllPlaces } from "@/hooks/use-all-places";
import { PLACE_DETAIL_COPY } from "@/i18n/place-details";
import { cn } from "@/lib/utils";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/place/$slug")({
  head: ({ params }) => {
    const place = PLACES.find((p) => p.slug === params.slug);
    const title = place ? `${place.name.en} — EasyGo AI` : "Place details — EasyGo AI";
    const desc = place ? place.description.en : "Address, opening hours, reviews and visitor tips in EasyGo AI.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PlaceDetail,
});

/** Locale-independent grouping so server and browser render the same text. */
const formatCount = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");

function PlaceDetail() {
  const { slug } = Route.useParams();
  const { tr, lang, isFavorite, toggleFavorite, t } = useAppState();
  const c = PLACE_DETAIL_COPY[lang];
  const router = useRouter();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const place = useAllPlaces().find((p) => p.slug === slug);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else void navigate({ to: "/" });
  };

  if (!place) {
    return (
      <div className="min-h-[100dvh] bg-background">
        <div className="mx-auto flex min-h-[100dvh] max-w-[560px] flex-col items-center justify-center gap-3 safe-x text-center">
          <h1 className="font-display text-xl font-bold text-foreground">{c.notFound}</h1>
          <p className="text-sm text-muted-foreground">{c.notFoundHelp}</p>
          <Link to="/" className="mt-2 inline-flex min-h-12 items-center rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground">
            {c.home}
          </Link>
        </div>
      </div>
    );
  }

  const details = PLACE_DETAILS[slug];
  const category = CATEGORIES.find((cat) => cat.id === place.categories[0]);
  const secondCategory = CATEGORIES.find((cat) => cat.id === place.categories[1]);
  const address = details ? tr(details.address) : place.address;
  const price = getPriceInfo(place);
  const reviews = getDemoReviews(place);
  const favorite = isFavorite(place.id);
  const images = place.images?.length ? place.images : [place.image];
  const description = tr(place.description);
  const about = details ? tr(details.about) : "";
  const fmt = (daysAgo: number) => c.daysAgo.replace("{n}", String(daysAgo));

  const onFavorite = () => {
    const added = toggleFavorite(place.id);
    toast(added ? t("favoriteAdded") : t("favoriteRemoved"));
  };

  const onShare = async () => {
    const url = window.location.href;
    const data = { title: tr(place.name), text: description, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast(c.linkCopied);
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        toast(c.linkCopied);
      } catch {
        toast(c.shareFailed);
      }
    }
  };

  const iconBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-card";

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="relative mx-auto w-full max-w-[560px] pb-32 lg:max-w-[860px] lg:px-8 lg:pt-6">
        {/* Hero + overlay nav */}
        <div className="relative">
          <PlaceGallery key={place.slug} images={images} alt={tr(place.name)} photoLabel={c.photo} previousLabel={c.previousPhoto} nextLabel={c.nextPhoto} credits={PLACE_GALLERY_PHOTOS[place.slug] ?? []} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 safe-x">
            <button type="button" onClick={goBack} aria-label={c.back} className={iconBtn}>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={onShare} aria-label={c.share} className={iconBtn}>
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onFavorite}
                aria-label={favorite ? c.favoriteRemove : c.favoriteAdd}
                aria-pressed={favorite}
                className={iconBtn}
              >
                <Heart className={cn("h-5 w-5", favorite && "fill-coral text-coral")} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="safe-x mt-5 space-y-5 lg:px-0">
          {/* Main info */}
          <header>
            <div className="flex flex-wrap gap-2">
              {category ? (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {tr(category.label)}
                  {secondCategory ? ` • ${tr(secondCategory.label)}` : ""}
                </span>
              ) : null}
              {place.isCommunity ? (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{c.community}</span>
              ) : (
                <DemoBadge>{t("demoData")}</DemoBadge>
              )}
            </div>
            <h1 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight text-foreground lg:text-4xl">
              {tr(place.name)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {tr(place.city)}, {tr(place.country)}
            </p>
            {!place.isCommunity ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Star className="h-4 w-4 fill-attention text-attention" aria-hidden="true" />
                {place.rating.toFixed(1)}
                <span className="font-normal text-muted-foreground">
                  · {formatCount(place.reviewCount)} {c.reviewsWord}
                </span>
              </p>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onFavorite}
                aria-pressed={favorite}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Heart className={cn("h-4 w-4", favorite && "fill-coral text-coral")} aria-hidden="true" />
                <span className="truncate">{favorite ? c.favoriteRemove : c.favoriteAdd}</span>
              </button>
              <button
                type="button"
                onClick={onShare}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {c.share}
              </button>
            </div>
          </header>

          {/* About */}
          <section aria-labelledby="about-h">
            <h2 id="about-h" className="font-display text-lg font-bold text-foreground">{c.about}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-alt-foreground">{description}</p>
            {about ? (
              <>
                {expanded ? <p className="mt-2 text-[15px] leading-relaxed text-alt-foreground">{about}</p> : null}
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="mt-1 min-h-11 text-sm font-semibold text-primary"
                >
                  {expanded ? c.less : c.more}
                </button>
              </>
            ) : null}
            {details ? (
              <div className="mt-2 flex gap-3 rounded-2xl bg-warm p-4 text-sm text-alt-foreground">
                <Lightbulb className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">{c.tip}</p>
                  <p className="mt-1">{tr(details.tip)}</p>
                </div>
              </div>
            ) : null}
          </section>

          <div className="grid gap-3 lg:grid-cols-2">
            {address ? (
              <div className="lg:col-span-2">
                <InfoCard icon={<MapPin className="h-5 w-5" />} label={c.address}>
                  <p>{address}</p>
                  <button type="button" onClick={() => toast(c.mapSoon)} className="mt-1 min-h-11 text-sm font-semibold text-primary">
                    {c.viewMap}
                  </button>
                  <MapPreview label={tr(place.name)} badge={c.demoMap} />
                </InfoCard>
              </div>
            ) : null}
            {details ? (
              <InfoCard icon={<Clock className="h-5 w-5" />} label={c.hours}>
                {tr(details.hours)}
              </InfoCard>
            ) : null}
            {price ? (
              <InfoCard icon={<Ticket className="h-5 w-5" />} label={c.price} badge={<DemoBadge>{c.demoPrice}</DemoBadge>}>
                <span className="font-semibold">{price.isFree ? c.free : c.ticket}</span>
              </InfoCard>
            ) : null}
          </div>

          {/* Reviews */}
          {reviews.length > 0 ? (
            <section aria-labelledby="reviews-h">
              <div className="flex items-center justify-between gap-2">
                <h2 id="reviews-h" className="font-display text-lg font-bold text-foreground">{c.reviews}</h2>
                <DemoBadge>{c.demoReviews}</DemoBadge>
              </div>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-attention text-attention" aria-hidden="true" />
                <span className="font-semibold text-foreground">{place.rating.toFixed(1)}</span>·{" "}
                {formatCount(place.reviewCount)} {c.reviewsWord}
              </p>
              <div className="mt-3 grid gap-3">
                {reviews.slice(0, 3).map((r) => (
                  <ReviewCard key={r.id} author={r.author} rating={r.rating} date={fmt(r.daysAgo)} text={tr(r.text)} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setReviewsOpen(true)}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                {c.allReviews}
              </button>
              <BottomSheet open={reviewsOpen} onOpenChange={setReviewsOpen} title={c.reviews} description={c.demoReviews} closeLabel={c.close}>
                <div className="grid gap-3">
                  {reviews.map((r) => (
                    <ReviewCard key={r.id} author={r.author} rating={r.rating} date={fmt(r.daysAgo)} text={tr(r.text)} />
                  ))}
                </div>
              </BottomSheet>
            </section>
          ) : null}
        </main>
      </div>

      {/* Fixed CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[560px] px-4 pt-3 lg:max-w-[860px] lg:px-8" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
          <Link
            to="/place/$slug/travel"
            params={{ slug: place.slug }}
            className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary px-4 text-base font-bold text-primary-foreground shadow-lift transition-colors hover:bg-primary-hover"
          >
            {c.readyToGo}
          </Link>
        </div>
      </div>
    </div>
  );
}
