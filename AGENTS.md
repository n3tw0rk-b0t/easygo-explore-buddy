<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Product vision source of truth: docs/EASYGO_AI_PRODUCT_CONTEXT.md — read before any feature work.
- Community places live in Lovable Cloud (`community_places` table + private `place-images` bucket); writes and signed image URLs go through server functions in `src/lib/community.functions.ts` — why: workspace blocks public buckets and anyone may add places without an account.
- UI reads places via `useAllPlaces()` (demo + community) — why: one merged list for cards, detail page and AI catalog.
- Rich per-place info (address, hours, about, tip) lives in `src/data/place-details.ts` keyed by slug.
- Place Details UI pieces live in `src/components/easygo/place-detail-parts.tsx`, its copy in `src/i18n/place-details.ts`, demo price/reviews in `src/data/place-extras.ts` — why: reusable, one data source shared with Home cards.
- Travel Options placeholder is `src/routes/place_.$slug.travel.tsx` (URL `/place/$slug/travel`, not nested) — why: keeps the details page a leaf route.
- SSR-rendered numbers/dates must not use locale formatting (`toLocaleString`) — why: server and browser locales differ and break hydration.
- Additional demo gallery photos and source credits live in `src/data/place-gallery.ts`, imported from Lovable Assets pointers and merged into `Place.images` — why: one shared gallery catalog preserves primary card photos and licensed attribution.
- Shared menu, help and non-home search live in `AppChrome` mounted inside the root providers — why: controls persist across all pages without duplicating drawers, while Home keeps its original search placement.
