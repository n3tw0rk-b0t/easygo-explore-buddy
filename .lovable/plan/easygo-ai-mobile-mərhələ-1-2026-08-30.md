# EasyGo AI Mobile — Mərhələ 1

Mobile-first prototip: dizayn sistemi, Ana səhifə, axtarış, Kəşf et, lokasiya/radius, mobil menyu, yaxındakı məkanlar, Yardım və AZ/EN/RU dil sistemi. Real API, GPS, taksi, hesab və admin bu mərhələyə daxil deyil.

## Dizayn sistemi

- `src/styles.css`-də brandbook rəngləri semantik token kimi (primary #355070, hover #283E57, coral #E56B6F, yellow #F6BD60, page bg #F8FAFC, warm #FFF8F2, card #FFFFFF, mətn #172033 / #2B2D42 / #667085, border #E2E8F0, success #067647, error #B42318), oklch formatında.
- Şriftlər: Manrope (başlıq), Inter (mətn) — `__root.tsx`-də `<link>` ilə yüklənir.
- Kart stili: 16–24px radius, yumşaq kölgə, açıq sərhəd. Neon/gradient/ağır animasiya yoxdur.
- Məzmun mərkəzdə, desktopda max ~480–560px mobil-tətbiq görünüşü.

## Səhifələr

- `/` — Ana səhifə (placeholder index əvəzlənir): loqo, hamburger, şəhər chip-i, əsas sual + köməkçi mətn, axtarış paneli, radius filtri, Kəşf et, Yaxındakı məkanlar, floating Yardım.
- `/place/$slug` — placeholder Məkan Detalları: ad, placeholder şəkil, “növbəti mərhələdə” mesajı, Ana səhifəyə qayıt.
- Hər ikisində öz `head()` metadata-sı.

## Komponentlər

- `Logo` — EasyGo AI wordmark + kiçik marşrut nöqtəsi detalı, çox yüngül animasiya, `prefers-reduced-motion` ilə dayanır.
- `MenuDrawer` — sağdan açılan drawer (Profil, Dil, Tənzimləmələr, Favorilər, Dəstək, Çıxış), overlay, ESC/kənar klik ilə bağlanma, fokus tələsi. Placeholder bölmələr sadə mesaj göstərir; Çıxış → “Real istifadəçi hesabı bu prototipdə aktiv deyil.”
- `LanguageSwitcher` — drawer daxilində AZ/EN/RU, aktiv dil fərqlənir.
- `CityChip` + `CitySheet` — Bakı/İstanbul/Bratislava/Vyana, manual daxiletmə, “Cari mövqeyimi müəyyən et” → demo mesaj.
- `SearchBar` — görünən label, placeholder, sağda send/arrow düyməsi, Enter dəstəyi, boş axtarışda xəta mesajı, yazarkən autocomplete (şəkil, ad, kateqoriya, şəhər, reytinq).
- `RadiusFilter` — 1/3/5/10/25/50/100 km chip-ləri, default 5 km, horizontal scroll.
- `ExploreSheet` — 10 kateqoriya, seçimdə demo kart siyahısı.
- `NearbyPlaces` — horizontal sürüşən kartlar (şəkil, ad, kateqoriya, reytinq, məsafə, favori ürəyi), “Demo məlumat” badge-i, “Hamısına bax”.
- `HelpFab` + `EmergencySheet` — 112/102/103/101, lokasiya paylaş, dəstək, bağla; zəngdən əvvəl təsdiq modalı, sonra “Real zəng funksiyası prototipdə aktiv deyil.”, ölkə xəbərdarlığı.
- Ortaq `BottomSheet` və `Modal` primitivləri (fokus idarəsi, ESC, overlay).

## Data və state

- `src/data/places.ts` — hər məkan: id, slug, AZ/EN/RU ad və qısa təsvir, ölkə, şəhər, kateqoriya, şəkil, reytinq, rəy sayı, məsafə, koordinat placeholder-i, favori statusu. Hər 4 şəhər üçün nümunələr.
- `src/data/cities.ts`, `src/data/categories.ts`, `src/data/radius.ts`, `src/data/emergency.ts`.
- `src/i18n/` — AZ/EN/RU lüğətləri + `LanguageProvider` konteksti.
- `AppStateProvider` (dil, şəhər, radius, favorilər) → localStorage-da saxlanılır, SSR uyğun (hidrasiyadan sonra oxunur).
- Şəhər dəyişdikdə yaxındakı məkanlar və autocomplete həmin şəhərə uyğunlaşır; radius seçimi siyahını demo şəkildə filtrləyir (real məsafə hesablaması yoxdur).

## Şəkillər

Kartlar və autocomplete üçün bir neçə generasiya edilmiş demo şəkil (şəhər/məkan tipli), `src/assets`-də saxlanılır, alt-mətnlə.

## Əlçatanlıq

Minimum 44px toxunma sahəsi, görünən fokus, klaviatura naviqasiyası, ikon düymələrdə `aria-label`, drawer/sheet-də fokus idarəsi, yalnız rənglə məlumat verilmir, horizontal daşma yoxdur.

## Yoxlama

Preview-də mobil enlərdə (360/390/412/430) və desktopda yoxlanış: dil dəyişməsi, şəhər/radius/favori localStorage, axtarış və autocomplete, Kəşf et, Yardım axını, `/place/:slug` keçidi və geri qayıtma, konsolda xəta olmaması.
