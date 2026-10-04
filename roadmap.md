# Photo galleries
- [x] Download and validate distinct real place photos; preserve source credits.
- [x] Connect photo arrays to existing details galleries; add accessible previous/next controls.
- [x] Verify image loading and gallery navigation on mobile and desktop: all 41 added photos load; navigation and counters work without runtime errors.
- [ ] Seaside pubs and Seaside hotel: blocked by unspecified actual venues; retain original photo rather than invent gallery photos.

# Small place maps and Google reviews
- [x] Add an embedded Google map below each available address, with external map fallback on non-authorized origins.
- [x] Add authenticated, bounded Google place matching and attributed review samples; keep EasyGo reviews separate; add Booking search links for hotels.
- [x] Verify signed-out review state, map fallback and mobile layout at 320/628/1280px; Google search and review API returned HTTP 200; build OK.
- [ ] Verify Google reviews after sign-in: blocked because no app user exists yet; a first Google sign-in is required.
- [ ] Verify live embedded map rendering: requires an authorized Lovable app origin; local preview only verifies the fallback.

# Shared page controls
- [x] Mount one persistent menu and help control in the root layout.
- [x] Show existing search and Explore above every non-home page; preserve Home search.
- [x] Reserve bottom space so the place travel action never overlaps Help.
- [x] Verify search, menu, help and page transitions in the running app; all four pages show one search, and travel CTA does not overlap Help.

# Addresses, opening hours and community reviews
- [x] Save and display entered addresses and opening hours; open the place in Google Maps.
- [x] Add validated public review submissions, real ratings and separate demo reviews.
- [x] Verify immediate review visibility and reload persistence, saved address/hours, encoded maps links, desktop and mobile layouts; remove temporary test records.

# Existing place facts and full-screen mobile pages
- [x] Verify available official venue sources; replace confirmed address/hours, link sources, and disclose unknown schedules and unspecified venues.
- [x] Use only submitted visitor reviews and working Google Maps links on existing place pages.
- [x] Adapt Home, place details, add-place fields and review forms to full-width phones; verified at 320, 390, 628 and 1280px without horizontal overflow or page errors.
