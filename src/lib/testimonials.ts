export type TestimonialPerson = {
  /** Dummy name — for portfolio/demo purposes, not a real person. */
  name: string;
  /** ISO 3166-1 alpha-2 country code, localized at render time via Intl.DisplayNames
   *  so the country name itself doesn't need to be duplicated across every language. */
  countryCode: string;
};

// Order here must match the order of home.testimonials in every dictionary file —
// entry [i] pairs with dictionary testimonial [i] (quote text + job title, which
// DO need translation and live in the dictionaries; name + country do not).
export const testimonialPeople: TestimonialPerson[] = [
  { name: "David Whitfield", countryCode: "AU" },
  { name: "Priya Raman", countryCode: "SG" },
  { name: "Marco Álvarez", countryCode: "ES" },
];
