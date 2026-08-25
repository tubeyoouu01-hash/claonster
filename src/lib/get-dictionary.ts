import "server-only";
import type { Locale } from "./locales";
import { interpolateSiteTokens } from "./interpolate";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
  hi: () => import("./dictionaries/hi.json").then((m) => m.default),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  vi: () => import("./dictionaries/vi.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  const raw = await loader();
  // Swap {{siteName}}, {{shortName}}, {{email}}, etc. for the live
  // values in site-config.ts — applies to every string, in every
  // nested field, across the whole dictionary, automatically.
  return interpolateSiteTokens(raw);
}
