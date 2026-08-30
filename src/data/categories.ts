import type { CategoryId, Localized } from "./types";

export interface Category {
  id: CategoryId;
  label: Localized;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "popular",
    label: { az: "Məşhur", en: "Popular", ru: "Популярное" },
    icon: "Sparkles",
  },
  {
    id: "hotels",
    label: { az: "Hotellər", en: "Hotels", ru: "Отели" },
    icon: "BedDouble",
  },
  {
    id: "restaurants",
    label: { az: "Restoranlar", en: "Restaurants", ru: "Рестораны" },
    icon: "UtensilsCrossed",
  },
  {
    id: "cafes",
    label: { az: "Kafelər", en: "Cafes", ru: "Кафе" },
    icon: "Coffee",
  },
  {
    id: "pubs",
    label: { az: "Publar", en: "Pubs", ru: "Пабы" },
    icon: "Beer",
  },
  {
    id: "malls",
    label: { az: "Mall / AVM", en: "Malls", ru: "Торговые центры" },
    icon: "ShoppingBag",
  },
  {
    id: "entertainment",
    label: { az: "Əyləncə mərkəzləri", en: "Entertainment centres", ru: "Развлекательные центры" },
    icon: "Ticket",
  },
  {
    id: "museums",
    label: { az: "Muzeylər", en: "Museums", ru: "Музеи" },
    icon: "Building2",
  },
  {
    id: "historic",
    label: { az: "Tarixi abidələr", en: "Historic landmarks", ru: "Исторические памятники" },
    icon: "Landmark",
  },
  {
    id: "religious",
    label: { az: "Məscid və kilsələr", en: "Mosques & churches", ru: "Мечети и церкви" },
    icon: "Church",
  },
  {
    id: "bazaars",
    label: { az: "Bazarlar", en: "Bazaars", ru: "Базары" },
    icon: "Store",
  },
  {
    id: "markets",
    label: { az: "Marketlər", en: "Markets", ru: "Магазины" },
    icon: "ShoppingCart",
  },
  {
    id: "parks",
    label: { az: "Parklar", en: "Parks", ru: "Парки" },
    icon: "Trees",
  },
  {
    id: "zoos",
    label: { az: "Zooparklar", en: "Zoos", ru: "Зоопарки" },
    icon: "PawPrint",
  },
  {
    id: "photopoints",
    label: { az: "Fotopointlər", en: "Photo points", ru: "Фототочки" },
    icon: "Camera",
  },
];
