/**
 * Site-wide constants.
 *
 * Every piece of "dynamic" identity data — name, domain, contact details,
 * socials, founding year — lives here and ONLY here. Nothing below should
 * ever be hardcoded again in a component or a dictionary file.
 *
 * To reskin this project for a real company: edit this file. That's it.
 */

export const SITE_NAME = "Canster Capital Partners";
export const SITE_SHORT_NAME = "Canster";
export const SITE_SUFFIX = "Capital Partners";
export const SITE_DOMAIN = "fairhavencapital.example";

export const CONTACT_EMAIL = `Credit@canstarloans.com`;
// export const CONTACT_PHONE_DISPLAY = "+61 2 5550 1234";
export const CONTACT_PHONE_DISPLAY = "+61 4 6825 0946";
export const CONTACT_PHONE_HREF = "+61468250946"; // for tel: links

export const OFFICE_ADDRESS_LINE = "";
// export const OFFICE_ADDRESS_LINE = "Level 12, 1 Sample Street";
export const OFFICE_CITY_LINE = "Sydney NSW 2000, Australia";
export const OFFICE_FULL_ADDRESS = `${OFFICE_ADDRESS_LINE}, ${OFFICE_CITY_LINE}`;

export const COMPANY_FOUNDED_YEAR = 2004;

export type SocialPlatform = "youtube" | "facebook" | "linkedin" | "x" | "tiktok";

export const SOCIAL_LINKS: { platform: SocialPlatform; name: string; href: string }[] = [
  { platform: "youtube", name: "YouTube", href: "https://www.youtube.com/@canstar" },
  { platform: "facebook", name: "Facebook", href: "https://web.facebook.com/Canstar/?_rdc=1&_rdr#" },
  { platform: "linkedin", name: "LinkedIn", href: "https://au.linkedin.com/company/canstar" },
  { platform: "x", name: "X", href: "https://x.com/Canstarloans" },
  { platform: "tiktok", name: "TikTok", href: "https://www.tiktok.com/@canstarloans" },
];

/**
 * All values above are intentional placeholders for a portfolio demo:
 * - SITE_DOMAIN uses the .example TLD, reserved by RFC 2606 for documentation/sample use
 * - CONTACT_PHONE_DISPLAY is not a real, dialable number
 * - SOCIAL_LINKS all point to "#" rather than real profiles
 */
