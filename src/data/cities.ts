import type { City, CityId } from "./types";

export const CITIES: City[] = [
  {
    id: "baku",
    name: { az: "Bakı", en: "Baku", ru: "Баку" },
    country: { az: "Azərbaycan", en: "Azerbaijan", ru: "Азербайджан" },
    countryCode: "AZ",
  },
  {
    id: "istanbul",
    name: { az: "İstanbul", en: "Istanbul", ru: "Стамбул" },
    country: { az: "Türkiyə", en: "Türkiye", ru: "Турция" },
    countryCode: "TR",
  },
  {
    id: "bratislava",
    name: { az: "Bratislava", en: "Bratislava", ru: "Братислава" },
    country: { az: "Slovakiya", en: "Slovakia", ru: "Словакия" },
    countryCode: "SK",
  },
  {
    id: "vienna",
    name: { az: "Vyana", en: "Vienna", ru: "Вена" },
    country: { az: "Avstriya", en: "Austria", ru: "Австрия" },
    countryCode: "AT",
  },
];

export const DEFAULT_CITY_ID: CityId = "baku";

export const getCity = (id: CityId): City =>
  CITIES.find((c) => c.id === id) ?? (CITIES[0] as City);
