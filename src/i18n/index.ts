import { createContext, createElement, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './translations/en.json';
import it from './translations/it.json';

export type Language = 'it' | 'en';

export const languages = ['it', 'en'] as const;

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

const translations = {
  it,
  en,
} as const;

type TranslationParams = Record<string, string | number>;

type TranslationContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
};

const defaultValue: TranslationContextValue = {
  language: 'en',
  setLanguage: () => undefined,
  t: (key: string) => key,
};

const TranslationContext = createContext<TranslationContextValue>(defaultValue);

const getNestedValue = (source: Record<string, unknown>, path: string): unknown => {
  return path.split('.').reduce<unknown>((value, key) => {
    if (value && typeof value === 'object' && key in value) {
      return (value as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
};

export const useTranslation = () => useContext(TranslationContext);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'it' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return 'en';
  });

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const translate = useCallback((key: string, params?: TranslationParams) => {
    const currentDictionary = translations[language];
    const fallbackDictionary = translations.en;

    const value =
      (getNestedValue(currentDictionary as Record<string, unknown>, key) as string | undefined) ??
      (getNestedValue(fallbackDictionary as Record<string, unknown>, key) as string | undefined) ??
      key;

    if (!params) {
      return value;
    }

    return value.replace(/\{(\w+)\}/g, (_, paramName: string) => String(params[paramName] ?? `{${paramName}}`));
  }, [language]);

  const value = useMemo<TranslationContextValue>(() => ({ language, setLanguage, t: translate }), [language, setLanguage, translate]);

  return createElement(TranslationContext.Provider, { value }, children);
};
