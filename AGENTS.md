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
- Rich per-place info (address, hours, about, tip, optional official source) lives in `src/data/place-details.ts` keyed by slug; unverified schedules are disclosed instead of estimated — why: visitors need traceable facts, not invented opening hours.
- Place Details UI pieces live in `src/components/easygo/place-detail-parts.tsx`, its copy in `src/i18n/place-details.ts`, demo price/reviews in `src/data/place-extras.ts` — why: reusable, one data source shared with Home cards.
- Travel Options placeholder is `src/routes/place_.$slug.travel.tsx` (URL `/place/$slug/travel`, not nested) — why: keeps the details page a leaf route.
- SSR-rendered numbers/dates must not use locale formatting (`toLocaleString`) — why: server and browser locales differ and break hydration.
- Additional demo gallery photos and source credits live in `src/data/place-gallery.ts`, imported from Lovable Assets pointers and merged into `Place.images` — why: one shared gallery catalog preserves primary card photos and licensed attribution.
- Shared menu, help and non-home search live in `AppChrome` mounted inside the root providers — why: controls persist across all pages without duplicating drawers, while Home keeps its original search placement.
- Community address and opening hours use the shared client/server place schema and persisted place fields — why: entered venue facts must survive reloads without substituting demo details.
- Real reviews use public reads and validated server-only writes with transactional rate limiting; never mix them with demo reviews — why: anonymous contributions appear immediately while keeping demo data and private abuse-control identifiers separate.
- Place addresses render Google Maps Embed with encoded venue/address queries and external Maps fallback; selected Google place IDs render exact matched maps — why: show real maps without trusting placeholder catalog coordinates or exposing credential-bearing preview hosts.
- Place details keep EasyGo visitor reviews separate from attributed Google review samples; never display invented reviews — why: review sources and counts must remain honest.
- Google Places functions require validated user authentication, bounded searches, explicit field masks and user-triggered cached requests without polling or retries — why: protect metered Maps access and prevent arbitrary public proxy use.
- ReviewAuthProvider owns the root identity subscription and Google broker sign-in; server calls reuse the existing auth attacher — why: avoid duplicate auth listeners and unauthenticated Places requests.
- Tripadvisor reviews use the Terra API through `src/lib/tripadvisor.server.ts` (X-API-KEY, 30-min in-memory review cache); choosing a place appends its location ID to the account allowlist and the choice persists per slug in localStorage — why: Terra content endpoints are allowlist-licensed and its caching policy requires short-lived caching.
- Home and public forms use full-width mobile bands with bounded desktop content — why: phones must not inherit a decorative desktop device frame.
- Travel route comparison uses demo estimates in `src/data/route-compare.ts` scored client-side; AI advice comes from `src/lib/route-advice.*` and may only pick from the provided options — why: swap demo numbers for routing/fare APIs later without touching UI.
- Transport mode visuals use one shared icon component and mode-scoped semantic CSS tokens — why: comparison cards, tabs and operator lists keep consistent identity in both themes.
