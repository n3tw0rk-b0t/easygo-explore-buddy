import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_CITY_ID, getCity } from "@/data/cities";
import { DEFAULT_RADIUS, RADIUS_OPTIONS, type RadiusOption } from "@/data/radius";
import type { CityId, Lang, Localized } from "@/data/types";
import { DEFAULT_LANG, translate, type TranslationKey } from "@/i18n/translations";

const STORAGE = {
  lang: "easygo.lang",
  city: "easygo.city",
  customCity: "easygo.customCity",
  radius: "easygo.radius",
  favorites: "easygo.favorites",
  theme: "easygo.theme",
} as const;

export type Theme = "light" | "dark";

interface AppStateValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  tr: (value: Localized) => string;
  cityId: CityId;
  setCityId: (id: CityId) => void;
  customCity: string | null;
  setCustomCity: (name: string | null) => void;
  cityLabel: string;
  countryLabel: string;
  radius: RadiusOption;
  setRadius: (radius: RadiusOption) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
}

const AppStateContext = createContext<AppStateValue | null>(null);

const read = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string | null) => {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [cityId, setCityIdState] = useState<CityId>(DEFAULT_CITY_ID);
  const [customCity, setCustomCityState] = useState<string | null>(null);
  const [radius, setRadiusState] = useState<RadiusOption>(DEFAULT_RADIUS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setThemeState] = useState<Theme>("light");

  // Hydration-safe: read persisted preferences only in the browser.
  useEffect(() => {
    const storedLang = read(STORAGE.lang);
    if (storedLang === "az" || storedLang === "en" || storedLang === "ru") setLangState(storedLang);

    const storedCity = read(STORAGE.city) as CityId | null;
    if (storedCity && ["baku", "istanbul", "bratislava", "vienna"].includes(storedCity)) {
      setCityIdState(storedCity);
    }

    setCustomCityState(read(STORAGE.customCity));

    const storedRadius = Number(read(STORAGE.radius));
    if (RADIUS_OPTIONS.includes(storedRadius as RadiusOption)) {
      setRadiusState(storedRadius as RadiusOption);
    }

    const storedTheme = read(STORAGE.theme);
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ) {
      setThemeState("dark");
    }

    const storedFavorites = read(STORAGE.favorites);
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((v) => typeof v === "string"));
      } catch {
        /* ignore malformed value */
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    write(STORAGE.theme, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      write(STORAGE.theme, next);
      return next;
    });
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    write(STORAGE.lang, next);
  }, []);

  const setCityId = useCallback((next: CityId) => {
    setCityIdState(next);
    setCustomCityState(null);
    write(STORAGE.city, next);
    write(STORAGE.customCity, null);
  }, []);

  const setCustomCity = useCallback((name: string | null) => {
    setCustomCityState(name);
    write(STORAGE.customCity, name);
  }, []);

  const setRadius = useCallback((next: RadiusOption) => {
    setRadiusState(next);
    write(STORAGE.radius, String(next));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    let added = false;
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id];
      added = !prev.includes(id);
      write(STORAGE.favorites, JSON.stringify(next));
      return next;
    });
    return added;
  }, []);

  const value = useMemo<AppStateValue>(() => {
    const city = getCity(cityId);
    return {
      theme,
      setTheme,
      toggleTheme,
      lang,
      setLang,
      t: (key) => translate(lang, key),
      tr: (localized) => localized[lang],
      cityId,
      setCityId,
      customCity,
      setCustomCity,
      cityLabel: customCity ?? city.name[lang],
      countryLabel: customCity ? "" : city.country[lang],
      radius,
      setRadius,
      favorites,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite,
    };
  }, [
    theme,
    setTheme,
    toggleTheme,
    lang,
    setLang,
    cityId,
    setCityId,
    customCity,
    setCustomCity,
    radius,
    setRadius,
    favorites,
    toggleFavorite,
  ]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
