export const locales = ["en", "es", "fr", "zh", "pt", "de", "ar", "hi", "ja", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "中文",
  pt: "Português",
  de: "Deutsch",
  ar: "العربية",
  hi: "हिन्दी",
  ja: "日本語",
  vi: "Tiếng Việt",
};

// Locales that read right-to-left
export const rtlLocales: readonly Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return (rtlLocales as readonly string[]).includes(locale);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
