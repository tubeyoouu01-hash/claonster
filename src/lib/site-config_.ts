/**
 * Site-wide constants.
 *
 * Every piece of "dynamic" identity data — name, domain, contact details,
 * socials, founding year — lives here and ONLY here. Nothing below should
 * ever be hardcoded again in a component or a dictionary file.
 *
 * To reskin this project for a real company: edit this file. That's it.
 */

export const SITE_NAME = "Fairhaven Capital Partners";
export const SITE_SHORT_NAME = "Fairhaven";
export const SITE_SUFFIX = "Capital Partners";
export const SITE_DOMAIN = "fairhavencapital.example";

export const CONTACT_EMAIL = `hello@${SITE_DOMAIN}`;
export const CONTACT_PHONE_DISPLAY = "+61 2 5550 1234";
export const CONTACT_PHONE_HREF = "+61255501234"; // for tel: links

export const OFFICE_ADDRESS_LINE = "Level 12, 60 Margaret Street";
export const OFFICE_CITY_LINE = "Sydney NSW 2000, Australia";
export const OFFICE_FULL_ADDRESS = `${OFFICE_ADDRESS_LINE}, ${OFFICE_CITY_LINE}`;

export const COMPANY_FOUNDED_YEAR = 2004;

export type SocialPlatform = "youtube" | "facebook" | "linkedin" | "x" | "tiktok";

export const SOCIAL_LINKS: { platform: SocialPlatform; name: string; href: string }[] = [
  { platform: "youtube", name: "YouTube", href: "#" },
  { platform: "facebook", name: "Facebook", href: "#" },
  { platform: "linkedin", name: "LinkedIn", href: "#" },
  { platform: "x", name: "X", href: "#" },
  { platform: "tiktok", name: "TikTok", href: "#" },
];

/**
 * Notes for whoever configures this for a live deployment:
 * - SITE_DOMAIN currently uses the .example TLD (reserved for docs/testing per RFC 2606) — replace with your real domain
 * - CONTACT_PHONE_DISPLAY is a placeholder number — replace with a real, dialable line
 * - SOCIAL_LINKS all point to "#" — replace with real profile URLs
 * - about.licenseNote in each dictionary file contains an "[ACL Number]" placeholder — replace with your real Australian Credit Licence number (or remove if not applicable in your jurisdiction)
 */
