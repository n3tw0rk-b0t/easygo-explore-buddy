import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, PenLine, Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { BottomSheet } from "./sheet";
import { ReviewCard } from "./place-detail-parts";
import { Button } from "@/components/ui/button";
import { reviewSchema } from "@/lib/place-input";
import { submitPlaceReview } from "@/lib/reviews.functions";
import { placeReviewsQuery } from "@/lib/reviews-query";
import { cn } from "@/lib/utils";
import { useAppState } from "@/state/app-state";

const COPY = {
  az: { title: "İstifadəçi rəyləri", write: "Rəy yaz", name: "Adınız", rating: "Qiymətləndirmə", text: "Rəyiniz", send: "Rəyi paylaş", close: "Bağla", empty: "Hələ rəy yoxdur.", invalid: "Ad 2–80, rəy 10–1000 simvol olmalıdır; 1–5 ulduz seçin.", error: "Rəy göndərilmədi. Yenidən cəhd edin.", rate: "Yeni rəy üçün 30 saniyə gözləyin.", load: "Rəylər yüklənmədi.", retry: "Yenidən yoxla", count: "rəy", public: "Adınız və rəyiniz hamıya görünəcək." },
  en: { title: "Community reviews", write: "Write a review", name: "Your name", rating: "Rating", text: "Your review", send: "Post review", close: "Close", empty: "No reviews yet.", invalid: "Use 2–80 characters for your name, 10–1000 for your review, and select 1–5 stars.", error: "Could not post your review. Please try again.", rate: "Wait 30 seconds before posting another review.", load: "Could not load reviews.", retry: "Try again", count: "reviews", public: "Your name and review will be public." },
  ru: { title: "Отзывы посетителей", write: "Написать отзыв", name: "Ваше имя", rating: "Оценка", text: "Ваш отзыв", send: "Опубликовать", close: "Закрыть", empty: "Пока нет отзывов.", invalid: "Имя: 2–80 символов, отзыв: 10–1000 символов; выберите 1–5 звёзд.", error: "Не удалось отправить отзыв. Попробуйте снова.", rate: "Подождите 30 секунд перед следующим отзывом.", load: "Не удалось загрузить отзывы.", retry: "Повторить", count: "отзывов", public: "Ваше имя и отзыв будут видны всем." },
};

export function CommunityReviews({ slug }: { slug: string }) {
  const { lang } = useAppState();
  const c = COPY[lang];
  const query = useSuspenseQuery(placeReviewsQuery(slug));
  const reviews = query.data;
  const client = useQueryClient();
  const save = useServerFn(submitPlaceReview);
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [all, setAll] = useState(false);
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const parsed = reviewSchema.safeParse({ slug, author, rating, text });
    if (!parsed.success) return setError(c.invalid);
    setBusy(true); setError("");
    try {
      const result = await save({ data: parsed.data });
      if (!result.ok) { setError(result.reason === "rate" ? c.rate : c.error); return; }
      client.setQueryData(placeReviewsQuery(slug).queryKey, (old: typeof reviews | undefined) => [result.review, ...(old ?? []).filter((r) => r.id !== result.review.id)]);
      setOpen(false); setText(""); setRating(0);
      void client.invalidateQueries({ queryKey: placeReviewsQuery(slug).queryKey });
    } catch { setError(c.error); } finally { setBusy(false); }
  }
  const field = "w-full rounded-lg border border-border bg-background p-3 text-base font-normal text-foreground focus:border-primary outline-none";
  return (
    <section aria-labelledby="community-reviews-h" className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <h2 id="community-reviews-h" className="min-w-0 font-display text-lg font-bold text-foreground">{c.title}</h2>
        <Button variant="outline" className="min-h-11 shrink-0" onClick={() => setOpen(true)}><PenLine aria-hidden="true" />{c.write}</Button>
      </div>
      {reviews.length ? <p className="flex items-center gap-1.5 text-sm text-foreground"><Star className="h-4 w-4 fill-attention text-attention" />{average.toFixed(1)} · {reviews.length} {c.count}</p> : <p className="text-sm text-muted-foreground">{c.empty}</p>}
      <div className="grid gap-3" aria-live="polite">
        {(all ? reviews : reviews.slice(0, 3)).map((r) => <ReviewCard key={r.id} author={r.author_name} rating={r.rating} date={r.created_at.slice(0, 10)} text={r.body} />)}
      </div>
      {reviews.length > 3 ? <Button variant="outline" onClick={() => setAll((v) => !v)} aria-expanded={all}>{all ? c.close : `${c.title} (${reviews.length})`}</Button> : null}
      <BottomSheet open={open} onOpenChange={(value) => { if (!busy) setOpen(value); }} title={c.write} description={c.public} closeLabel={c.close}>
        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1 text-sm font-semibold">{c.name}<input required minLength={2} maxLength={80} value={author} onChange={(e) => setAuthor(e.target.value)} className={field} autoComplete="name" /></label>
          <fieldset><legend className="mb-2 text-sm font-semibold">{c.rating}</legend><div className="flex gap-2">
            {[1,2,3,4,5].map((value) => <Button key={value} type="button" variant="ghost" size="icon" aria-label={`${value} / 5`} aria-pressed={rating === value} onClick={() => setRating(value)}><Star className={cn("h-6 w-6", value <= rating ? "fill-attention text-attention" : "text-muted-foreground")} aria-hidden="true" /></Button>)}
          </div></fieldset>
          <label className="grid gap-1 text-sm font-semibold">{c.text}<textarea required minLength={10} maxLength={1000} rows={4} value={text} onChange={(e) => setText(e.target.value)} className={`${field} resize-none`} /></label>
          {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" disabled={busy} className="min-h-12">{busy ? <Loader2 className="animate-spin" aria-hidden="true" /> : <PenLine aria-hidden="true" />}{c.send}</Button>
        </form>
      </BottomSheet>
    </section>
  );
}