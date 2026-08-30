import type { CityId, Localized } from "./types";

export interface EmergencyNumber {
  id: string;
  label: Localized;
  number: string;
}

const AZ_NUMBERS: EmergencyNumber[] = [
  {
    id: "general",
    label: { az: "Ümumi təcili yardım", en: "General emergency", ru: "Общая экстренная служба" },
    number: "112",
  },
  { id: "police", label: { az: "Polis", en: "Police", ru: "Полиция" }, number: "102" },
  { id: "ambulance", label: { az: "Ambulans", en: "Ambulance", ru: "Скорая помощь" }, number: "103" },
  {
    id: "fire",
    label: { az: "Yanğın xidməti", en: "Fire service", ru: "Пожарная служба" },
    number: "101",
  },
];

const EU_NUMBERS: EmergencyNumber[] = [
  {
    id: "general",
    label: { az: "Ümumi təcili yardım", en: "General emergency", ru: "Общая экстренная служба" },
    number: "112",
  },
  { id: "police", label: { az: "Polis", en: "Police", ru: "Полиция" }, number: "158" },
  { id: "ambulance", label: { az: "Ambulans", en: "Ambulance", ru: "Скорая помощь" }, number: "155" },
  {
    id: "fire",
    label: { az: "Yanğın xidməti", en: "Fire service", ru: "Пожарная служба" },
    number: "150",
  },
];

const TR_NUMBERS: EmergencyNumber[] = [
  {
    id: "general",
    label: { az: "Ümumi təcili yardım", en: "General emergency", ru: "Общая экстренная служба" },
    number: "112",
  },
  { id: "police", label: { az: "Polis", en: "Police", ru: "Полиция" }, number: "155" },
  { id: "ambulance", label: { az: "Ambulans", en: "Ambulance", ru: "Скорая помощь" }, number: "112" },
  {
    id: "fire",
    label: { az: "Yanğın xidməti", en: "Fire service", ru: "Пожарная служба" },
    number: "110",
  },
];

export const EMERGENCY_NUMBERS: Record<CityId, EmergencyNumber[]> = {
  baku: AZ_NUMBERS,
  istanbul: TR_NUMBERS,
  bratislava: EU_NUMBERS,
  vienna: EU_NUMBERS,
};
