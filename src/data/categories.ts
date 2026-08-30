import type { CategoryId, Localized } from "./types";

export interface Category {
  id: CategoryId;
  label: Localized;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: "popular", label: { az: "Məşhur", en: "Popular", ru: "Популярное" }, icon: "Sparkles" },
  {
    id: "historic",
    label: { az: "Tarixi məkanlar", en: "Historic places", ru: "Исторические места" },
    icon: "Landmark",
  },
  { id: "museums", label: { az: "Muzeylər", en: "Museums", ru: "Музеи" }, icon: "Building2" },
  { id: "parks", label: { az: "Parklar", en: "Parks", ru: "Парки" }, icon: "Trees" },
  { id: "nature", label: { az: "Təbiət", en: "Nature", ru: "Природа" }, icon: "Mountain" },
  {
    id: "restaurants",
    label: { az: "Restoranlar", en: "Restaurants", ru: "Рестораны" },
    icon: "UtensilsCrossed",
  },
  { id: "shopping", label: { az: "Ticarət", en: "Shopping", ru: "Шопинг" }, icon: "ShoppingBag" },
  {
    id: "entertainment",
    label: { az: "Əyləncə", en: "Entertainment", ru: "Развлечения" },
    icon: "Ticket",
  },
  { id: "family", label: { az: "Ailə üçün", en: "For family", ru: "Для семьи" }, icon: "Users" },
  {
    id: "free",
    label: { az: "Pulsuz məkanlar", en: "Free places", ru: "Бесплатные места" },
    icon: "BadgeCheck",
  },
];
