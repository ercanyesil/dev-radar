"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

// ============================================================
// Context
// ============================================================

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "dev-radar-locale";

// ============================================================
// Provider
// ============================================================

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default: English. Hydrate from localStorage on mount.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "tr") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggle = () => setLocale(locale === "en" ? "tr" : "en");

  const value: LanguageContextValue = {
    locale,
    t: translations[locale] as unknown as Translations,
    setLocale,
    toggle,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useT must be used inside <LanguageProvider>");
  }
  return ctx;
}
