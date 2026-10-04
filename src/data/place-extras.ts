import type { CategoryId, Localized, Place } from "./types";

/** Demo entry-price info. Returns null when we have nothing to show. */
export type PriceInfo = { isFree: true } | { isFree: false };

const FREE: CategoryId[] = ["parks", "photopoints", "religious", "bazaars", "markets"];
const TICKET: CategoryId[] = ["museums", "zoos", "entertainment"];

export function getPriceInfo(place: Place): PriceInfo | null {
  if (place.isCommunity) return null;
  const main = place.categories.find((c) => c !== "popular") ?? place.categories[0];
  if (!main) return null;
  if (FREE.includes(main)) return { isFree: true };
  if (TICKET.includes(main)) return { isFree: false };
  return null;
}

export interface DemoReview {
  id: string;
  author: string;
  rating: number;
  /** Days ago — rendered as a demo date. */
  daysAgo: number;
  text: Localized;
}

const POOL: Localized[] = [
  { az: "Axşam saatlarında mənzərə çox gözəldir.", en: "The view is lovely in the evening.", ru: "Вечером здесь очень красивый вид." },
  { az: "Rahat gəzinti üçün ideal yerdir, təmiz və səliqəlidir.", en: "Great for a relaxed walk, clean and well kept.", ru: "Отличное место для спокойной прогулки, чисто и ухоженно." },
  { az: "Həftəsonu bir az izdihamlı olur, səhər gəlməyi məsləhət görürəm.", en: "A bit crowded at weekends — I'd recommend coming in the morning.", ru: "В выходные людно, советую приходить утром." },
  { az: "Şəkil çəkmək üçün çox maraqlı bucaqlar var.", en: "Lots of interesting angles for photos.", ru: "Много интересных ракурсов для фото." },
  { az: "Ailəliklə gəldik, hamı məmnun qaldı.", en: "We came as a family and everyone enjoyed it.", ru: "Были всей семьёй, всем понравилось." },
  { az: "Yaxınlıqda kafelər var, uzun qalmaq rahatdır.", en: "There are cafés nearby, so it's easy to stay longer.", ru: "Рядом есть кафе, удобно задержаться подольше." },
  { az: "Tarixi atmosferi çox xoşuma gəldi.", en: "I really liked the historic atmosphere.", ru: "Очень понравилась историческая атмосфера." },
  { az: "Gözlədiyimdən kiçik idi, amma yenə də baxmağa dəyər.", en: "Smaller than I expected, but still worth a visit.", ru: "Меньше, чем ожидал, но всё равно стоит увидеть." },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic mock reviews per place — clearly labelled as demo in the UI. */
export function getDemoReviews(place: Place): DemoReview[] {
  if (place.isCommunity) return [];
  const seed = hash(place.slug);
  return Array.from({ length: 6 }, (_, i) => {
    const idx = (seed + i * 3) % POOL.length;
    return {
      id: `${place.slug}-r${i}`,
      author: `Demo User ${String(i + 1).padStart(2, "0")}`,
      rating: (seed >> i) % 4 === 0 ? 4 : 5,
      daysAgo: 3 + ((seed >> (i + 2)) % 60),
      text: POOL[idx]!,
    };
  });
}
