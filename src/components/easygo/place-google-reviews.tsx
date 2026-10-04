import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, Loader2, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/state/app-state";
import { useReviewAuth } from "./review-auth";
import { getGoogleReviews, searchGooglePlace } from "@/lib/google-places.functions";
import { Stars } from "./place-detail-parts";
import { PlaceMiniMap } from "./place-mini-map";

export function PlaceGoogleReviews({ slug, query }: { slug: string; query: string }) {
  const { lang } = useAppState();
  const { userId, signIn, signingIn, authError } = useReviewAuth();
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<string>();
  const search = useServerFn(searchGooglePlace);
  const details = useServerFn(getGoogleReviews);
  const c = lang === "az" ? { login: "Google ilə daxil ol", load: "Google-da məkanı tap", choose: "Uyğun məkanı seçin", empty: "Uyğun məkan tapılmadı.", none: "Google bu məkan üçün rəy təqdim etməyib.", samples: "Google-un təqdim etdiyi ən çox 5 rəy · EasyGo rəylərindən ayrıdır", source: "Google Maps-də bütün rəylər", change: "Başqa məkan seç", failure: "Google rəyləri yüklənmədi.", reviews: "rəy" } : lang === "ru" ? { login: "Войти через Google", load: "Найти место в Google", choose: "Выберите нужное место", empty: "Место не найдено.", none: "Google не предоставил отзывы.", samples: "До 5 отзывов от Google · отдельно от отзывов EasyGo", source: "Все отзывы в Google Maps", change: "Выбрать другое место", failure: "Отзывы Google не загрузились.", reviews: "отзывов" } : { login: "Sign in with Google", load: "Find place on Google", choose: "Choose the matching place", empty: "No matching places found.", none: "Google has not provided reviews for this place.", samples: "Up to 5 reviews provided by Google · separate from EasyGo reviews", source: "All reviews on Google Maps", change: "Choose another place", failure: "Google reviews could not load.", reviews: "reviews" };
  const candidates = useQuery({ queryKey: ["google-place-search", userId, slug, lang], queryFn: () => search({ data: { query, lang } }), enabled: Boolean(userId && searching), staleTime: 600_000, retry: false, refetchOnWindowFocus: false });
  const reviews = useQuery({ queryKey: ["google-place-reviews", userId, selected, lang], queryFn: () => { if (!selected) throw new Error("No place selected"); return details({ data: { placeId: selected, lang } }); }, enabled: Boolean(userId && selected), staleTime: 600_000, retry: false, refetchOnWindowFocus: false });
  const result = userId ? reviews.data : undefined;
  const error = candidates.error || reviews.error;
  return (
    <section className="min-w-0 border-t border-border py-5" aria-labelledby="google-reviews-heading">
      <h2 id="google-reviews-heading" className="font-display text-lg font-bold">Google Maps</h2>
      <p className="mt-1 text-xs text-muted-foreground">{c.samples}</p>
      {!userId ? <Button onClick={() => void signIn()} disabled={signingIn} variant="outline" className="mt-3 min-h-11 w-full">{signingIn && <Loader2 className="animate-spin" />}{c.login}</Button> : !searching ? <Button onClick={() => setSearching(true)} variant="outline" className="mt-3 min-h-11 w-full"><Search />{c.load}</Button> : null}
      {authError ? <p role="alert" className="mt-3 text-sm text-destructive">{authError}</p> : null}
      {userId && (candidates.isFetching || reviews.isFetching) ? <div role="status" className="flex justify-center py-5"><Loader2 aria-label={c.load} className="animate-spin text-primary" /></div> : null}
      {userId && error ? <div role="alert" className="mt-3 break-words text-sm text-destructive"><p>{c.failure}</p><details className="mt-2"><summary>Google Maps</summary><p className="[overflow-wrap:anywhere]">{error.message}</p></details></div> : null}
      {userId && searching && candidates.data && !selected ? <div className="mt-3 space-y-2"><p className="text-sm font-semibold">{candidates.data.places?.length ? c.choose : c.empty}</p>{candidates.data.places?.map((p) => <Button key={p.id} variant="outline" onClick={() => setSelected(p.id)} className="h-auto min-h-14 w-full flex-col items-start whitespace-normal py-3 text-left"><span>{p.displayName?.text}</span><span className="text-xs font-normal text-muted-foreground">{p.formattedAddress}</span></Button>)}</div> : null}
      {result ? <div className="mt-4 space-y-3">
        <p className="font-semibold">{result.displayName?.text}</p><p className="text-xs text-muted-foreground">{result.formattedAddress}</p>
        {typeof result.rating === "number" ? <p className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 fill-attention text-attention" />{result.rating.toFixed(1)} · {result.userRatingCount ?? 0} {c.reviews}</p> : null}
        {result.googleMapsUri ? <PlaceMiniMap query={query} label={result.displayName?.text || "Google Maps"} href={result.googleMapsUri} lang={lang} placeId={result.id} /> : null}
        {!result.reviews?.length ? <p className="text-sm text-muted-foreground">{c.none}</p> : result.reviews.slice(0, 5).map((r) => <article key={r.name} className="rounded-lg border border-border bg-card p-4"><div className="flex flex-wrap items-center justify-between gap-2"><a href={r.authorAttribution?.uri || r.googleMapsUri || result.googleMapsUri} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-2">{r.authorAttribution?.displayName || "Google Maps"}</a><Stars value={r.rating} /></div><p className="mt-1 text-xs text-muted-foreground">{r.relativePublishTimeDescription}</p><p className="mt-3 whitespace-pre-line break-words text-sm [overflow-wrap:anywhere]">{r.text?.text || r.originalText?.text}</p>{r.googleMapsUri ? <a href={r.googleMapsUri} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-1 text-xs text-primary underline">Google Maps<ExternalLink className="h-3 w-3" /></a> : null}</article>)}
        {result.attributions?.map((a) => <a key={a.provider} href={a.providerUri} target="_blank" rel="noopener noreferrer" className="block text-xs text-muted-foreground">{a.provider}</a>)}
        {result.googleMapsUri ? <Button asChild variant="outline" className="min-h-11 w-full whitespace-normal"><a href={result.googleMapsUri} target="_blank" rel="noopener noreferrer">{c.source}<ExternalLink className="shrink-0" /></a></Button> : null}
        <Button variant="link" onClick={() => setSelected(undefined)} className="min-h-11 px-0">{c.change}</Button>
      </div> : null}
    </section>
  );
}