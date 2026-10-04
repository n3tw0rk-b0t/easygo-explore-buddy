import { Link, createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, Heart, Lightbulb, MapPin, Share2, Star, Ticket } from "lucide-react";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  DemoBadge,
  InfoCard,
  PlaceGallery,
} from "@/components/easygo/place-detail-parts";
import { CATEGORIES } from "@/data/categories";
import { PLACE_DETAILS } from "@/data/place-details";
import { PLACE_GALLERY_PHOTOS } from "@/data/place-gallery";
import { getPriceInfo } from "@/data/place-extras";
import { PLACES } from "@/data/places";
import { useAllPlaces } from "@/hooks/use-all-places";
import { PLACE_DETAIL_COPY } from "@/i18n/place-details";
import { cn } from "@/lib/utils";
import { useAppState } from "@/state/app-state";
import { Button } from "@/components/ui/button";
import { CommunityReviews } from "@/components/easygo/community-reviews";
import { placeMapUrl } from "@/lib/place-input";
import { placeReviewsQuery } from "@/lib/reviews-query";

export const Route = createFileRoute("/place/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(placeReviewsQuery(params.slug)),
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
  errorComponent: () => <div className="safe-x py-12 text-center"><p>Rəylər yüklənmədi. / Could not load reviews.</p><Button asChild variant="link"><Link to="/">EasyGo AI</Link></Button></div>,
  notFoundComponent: () => <div className="safe-x py-12 text-center"><Button asChild variant="link"><Link to="/">EasyGo AI</Link></Button></div>,
});

function PlaceDetail() {
  const { slug } = Route.useParams();
  const { tr, lang, isFavorite, toggleFavorite, t } = useAppState();
  const c = PLACE_DETAIL_COPY[lang];
  const router = useRouter();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const place = useAllPlaces().find((p) => p.slug === slug);
  const { data: realReviews } = useSuspenseQuery(placeReviewsQuery(slug));

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
  const address = place.address || (details ? tr(details.address) : "");
  const hours = place.openingHours || (details ? tr(details.hours) : "");
  const realRating = realReviews.length ? realReviews.reduce((sum, r) => sum + r.rating, 0) / realReviews.length : 0;
  const price = getPriceInfo(place);
  const favorite = isFavorite(place.id);
  const images = place.images?.length ? place.images : [place.image];
  const description = tr(place.description);
  const about = details ? tr(details.about) : "";

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
      <div className="relative mx-auto w-full pb-28 sm:max-w-[640px] lg:max-w-[860px] lg:px-8 lg:pt-6">
        {/* Hero + overlay nav */}
        <div className="relative">
          <PlaceGallery key={place.slug} images={images} alt={tr(place.name)} photoLabel={c.photo} previousLabel={c.previousPhoto} nextLabel={c.nextPhoto} credits={PLACE_GALLERY_PHOTOS[place.slug] ?? []} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 safe-x">
            <Button variant="ghost" size="icon" type="button" onClick={goBack} aria-label={c.back} className={iconBtn}>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" type="button" onClick={onShare} aria-label={c.share} className={iconBtn}>
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon"
                type="button"
                onClick={onFavorite}
                aria-label={favorite ? c.favoriteRemove : c.favoriteAdd}
                aria-pressed={favorite}
                className={iconBtn}
              >
                <Heart className={cn("h-5 w-5", favorite && "fill-coral text-coral")} aria-hidden="true" />
              </Button>
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
            <h1 className="mt-3 break-words font-display text-2xl font-extrabold leading-tight text-foreground [overflow-wrap:anywhere] lg:text-4xl">
              {tr(place.name)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {tr(place.city)}, {tr(place.country)}
            </p>
            {realReviews.length > 0 ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"><Star className="h-4 w-4 fill-attention text-attention" aria-hidden="true" />{realRating.toFixed(1)}<span className="font-normal text-muted-foreground">· {realReviews.length} {c.reviewsWord}</span></p>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline"
                type="button"
                onClick={onFavorite}
                aria-pressed={favorite}
                aria-label={favorite ? c.favoriteRemove : c.favoriteAdd}
                title={favorite ? c.favoriteRemove : c.favoriteAdd}
                className="min-h-11 min-w-0 gap-2 rounded-lg px-2 text-sm font-semibold"
              >
                <Heart className={cn("h-4 w-4", favorite && "fill-coral text-coral")} aria-hidden="true" />
                <span>{lang === "az" ? (favorite ? "Saxlanıldı" : "Saxla") : lang === "ru" ? (favorite ? "Сохранено" : "Сохранить") : (favorite ? "Saved" : "Save")}</span>
              </Button>
              <Button variant="outline"
                type="button"
                onClick={onShare}
                className="min-h-11 min-w-0 gap-2 rounded-lg px-2 text-sm font-semibold"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {c.share}
              </Button>
            </div>
          </header>

          {/* About */}
          <section aria-labelledby="about-h">
            <h2 id="about-h" className="font-display text-lg font-bold text-foreground">{c.about}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-alt-foreground">{description}</p>
            {about ? (
              <>
                {expanded ? <p className="mt-2 text-[15px] leading-relaxed text-alt-foreground">{about}</p> : null}
                <Button variant="link"
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="mt-1 min-h-11 px-0 text-sm font-semibold"
                >
                  {expanded ? c.less : c.more}
                </Button>
              </>
            ) : null}
            {details ? (
              <div className="mt-2 flex gap-3 border-l-2 border-attention bg-warm p-4 text-sm text-alt-foreground">
                <Lightbulb className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0 break-words">
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
                  <Button asChild variant="outline" className="mt-3 min-h-11 w-full whitespace-normal text-left">
                    <a href={placeMapUrl(tr(place.name), address, tr(place.city), tr(place.country))} target="_blank" rel="noopener noreferrer">
                    <MapPin className="shrink-0" aria-hidden="true" />{c.viewMap}<ExternalLink className="shrink-0" aria-hidden="true" />
                    </a>
                  </Button>
                </InfoCard>
              </div>
            ) : null}
            {hours ? (
              <InfoCard icon={<Clock className="h-5 w-5" />} label={c.hours}>
                <p className="whitespace-pre-line">{hours}</p>
              </InfoCard>
            ) : null}
            {price ? (
              <InfoCard icon={<Ticket className="h-5 w-5" />} label={c.price} badge={<DemoBadge>{c.demoPrice}</DemoBadge>}>
                <span className="font-semibold">{price.isFree ? c.free : c.ticket}</span>
              </InfoCard>
            ) : null}
          </div>

          {/* Reviews */}
          <CommunityReviews key={slug} slug={slug} />
        </main>
      </div>

      {/* Fixed CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto w-full py-3 pl-4 pr-20 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:max-w-[860px] lg:pl-8">
          <Button asChild className="min-h-12 w-full rounded-lg text-base font-bold shadow-lift">
          <Link
            to="/place/$slug/travel"
            params={{ slug: place.slug }}
          >
            {c.readyToGo}
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
