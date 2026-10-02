import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Loader2, Sparkles, Star } from "lucide-react";
import { useState } from "react";

import { getPlaceBySlug } from "@/data/places";
import type { Lang } from "@/data/types";
import { getRecommendations } from "@/lib/recommend.functions";
import { useAppState } from "@/state/app-state";

const COPY: Record<Lang, Record<string, string>> = {
  az: {
    title: "AI ilə kəşf et",
    helper: "Nəyi sevdiyinizi yazın — sizə uyğun məkanları seçək.",
    placeholder: "Məs: tarixi yerləri, gözəl mənzərəni və sakit kafeləri sevirəm",
    action: "Tövsiyə al",
    loading: "Hazırlanır…",
    short: "Zəhmət olmasa maraqlarınızı bir az ətraflı yazın.",
    empty: "Uyğun məkan tapılmadı. Başqa sözlərlə yoxlayın.",
  },
  en: {
    title: "Discover with AI",
    helper: "Tell us what you enjoy — we'll pick places that fit you.",
    placeholder: "E.g. I love history, great views and quiet cafés",
    action: "Get suggestions",
    loading: "Thinking…",
    short: "Please describe your interests in a bit more detail.",
    empty: "No matching places found. Try different words.",
  },
  ru: {
    title: "Подбор с ИИ",
    helper: "Опишите, что вам нравится, — подберём подходящие места.",
    placeholder: "Напр.: люблю историю, красивые виды и тихие кафе",
    action: "Получить советы",
    loading: "Подбираем…",
    short: "Пожалуйста, опишите интересы чуть подробнее.",
    empty: "Подходящих мест не найдено. Попробуйте другие слова.",
  },
};

export function AiRecommendations() {
  const { lang, cityId, tr } = useAppState();
  const c = COPY[lang];
  const fetchRecs = useServerFn(getRecommendations);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ slug: string; reason: string }[] | null>(null);

  const submit = async () => {
    if (loading) return;
    if (text.trim().length < 3) {
      setError(c.short);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRecs({ data: { interests: text.trim().slice(0, 500), cityId, lang } });
      if (res.ok) setItems(res.items);
      else setError(res.message);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="ai-recs-heading">
      <h2 id="ai-recs-heading" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
        {c.title}
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{c.helper}</p>
      <textarea
        value={text}
        maxLength={500}
        rows={3}
        onChange={(e) => setText(e.target.value)}
        placeholder={c.placeholder}
        aria-label={c.title}
        className="mt-3 w-full resize-none rounded-2xl border border-border bg-card p-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
      />
      <button
        type="button"
        onClick={submit}
        disabled={loading}
        className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
        {loading ? c.loading : c.action}
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-sm font-medium text-destructive">{error}</p>
      ) : null}
      {items ? (
        items.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{c.empty}</p>
        ) : (
          <ul className="mt-3 grid gap-2" aria-live="polite">
            {items.map((item) => {
              const place = getPlaceBySlug(item.slug);
              if (!place) return null;
              return (
                <li key={item.slug}>
                  <Link
                    to="/place/$slug"
                    params={{ slug: place.slug }}
                    className="flex min-h-16 gap-3 rounded-2xl border border-border bg-card p-2 transition-colors hover:bg-secondary"
                  >
                    <img src={place.image} alt={tr(place.name)} loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-foreground">{tr(place.name)}</span>
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-alt-foreground">
                          <Star className="h-3.5 w-3.5 fill-attention text-attention" aria-hidden="true" />
                          {place.rating.toFixed(1)}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{item.reason}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )
      ) : null}
    </section>
  );
}
