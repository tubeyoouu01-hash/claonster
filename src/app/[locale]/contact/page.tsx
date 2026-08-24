import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  OFFICE_FULL_ADDRESS,
} from "@/lib/site-config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const c = dict.contact;

  const details = [
    { icon: MapPin, label: c.addressLabel, value: OFFICE_FULL_ADDRESS, href: undefined },
    { icon: Mail, label: c.emailLabel, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, label: c.phoneLabel, value: CONTACT_PHONE_DISPLAY, href: `tel:${CONTACT_PHONE_HREF}` },
    { icon: Clock, label: c.hoursLabel, value: c.hours, href: undefined },
  ];

  return (
    <>
      <PageHero title={c.heroTitle} subtitle={c.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-5 gap-14">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl text-ink mb-8">{c.detailsTitle}</h2>
          <ul className="space-y-6 mb-10">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                  <d.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-light">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="text-ink hover:text-gold transition-colors">{d.value}</a>
                  ) : (
                    <p className="text-ink">{d.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="relative h-56 rounded-sm overflow-hidden border border-hairline bg-paper-dim flex items-center justify-center">
            <p className="text-xs text-slate-light">{c.mapNote}</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl text-ink mb-8">{c.formTitle}</h2>
          <ContactForm dict={dict} />
        </div>
      </section>
    </>
  );
}
