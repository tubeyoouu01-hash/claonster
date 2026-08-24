import {
  SITE_NAME,
  SITE_SHORT_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  OFFICE_FULL_ADDRESS,
} from "./site-config";

/**
 * Tokens that can be used inside any dictionary (translation) string.
 * Example, in a dictionary JSON file:
 *   "welcome": "Welcome to {{siteName}}, call us on {{phone}}"
 *
 * These get swapped for the live values in site-config.ts at load time
 * (see get-dictionary.ts), so the company name/contact info only ever
 * needs to be edited in ONE place and it propagates through every page,
 * in every language.
 */
const TOKENS: Record<string, string> = {
  "{{siteName}}": SITE_NAME,
  "{{shortName}}": SITE_SHORT_NAME,
  "{{email}}": CONTACT_EMAIL,
  "{{phone}}": CONTACT_PHONE_DISPLAY,
  "{{address}}": OFFICE_FULL_ADDRESS,
};

function interpolateString(value: string): string {
  let result = value;
  for (const [token, replacement] of Object.entries(TOKENS)) {
    if (result.includes(token)) {
      result = result.split(token).join(replacement);
    }
  }
  return result;
}

/**
 * Recursively walks a dictionary object (however deeply nested — strings,
 * arrays, objects) and replaces every {{token}} it finds. Safe to run on
 * the whole dictionary once, right after it's loaded.
 */
export function interpolateSiteTokens<T>(value: T): T {
  if (typeof value === "string") {
    return interpolateString(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => interpolateSiteTokens(v)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = interpolateSiteTokens(v);
    }
    return out as T;
  }
  return value;
}
