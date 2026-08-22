import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/get-dictionary";
import { businessSectors } from "@/lib/sectors";
import { socialLinks } from "@/lib/social-links";
import { YoutubeIcon, FacebookIcon, LinkedinIcon, XIcon, TikTokIcon } from "./SocialIcons";

const iconMap = {
  Youtube: YoutubeIcon,
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Twitter: XIcon,
  TikTok: TikTokIcon,
};

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-paper/70">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl text-paper">Fairhaven</span>
          <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-gold mt-1 mb-4">
            Capital Partners
          </span>
          <p className="text-sm leading-relaxed">{dict.footer.description}</p>
          <div className="flex items-center gap-4 mt-5">
            {socialLinks.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="text-paper/60 hover:text-gold transition-colors"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-base text-paper mb-4">{dict.footer.quickLinks}</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href={`/${locale}/about`} className="hover:text-gold transition-colors">{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/how-it-works`} className="hover:text-gold transition-colors">{dict.nav.howItWorks}</Link></li>
            <li><Link href={`/${locale}/business-loans`} className="hover:text-gold transition-colors">{dict.nav.businessLoans}</Link></li>
            <li><Link href={`/${locale}/personal-loans`} className="hover:text-gold transition-colors">{dict.nav.personalLoans}</Link></li>
            <li><Link href={`/${locale}/faq`} className="hover:text-gold transition-colors">{dict.nav.faq}</Link></li>
            <li><Link href={`/${locale}/apply`} className="hover:text-gold transition-colors">{dict.nav.apply}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-paper mb-4">{dict.footer.sectors}</h3>
          <ul className="space-y-2.5 text-sm grid grid-cols-1">
            {businessSectors.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link href={`/${locale}/business-loans#${s.id}`} className="hover:text-gold transition-colors">
                  {dict.businessLoans.sectorNames[s.id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-paper mb-4">{dict.footer.getInTouch}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" strokeWidth={1.75} />
              <span>{dict.contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span>{dict.contact.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span>{dict.contact.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="brass-rule" />

      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-paper/50">
        <p>© {year} Fairhaven Capital Partners. {dict.footer.rights}</p>
        <div className="flex gap-5">
          <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">{dict.footer.privacy}</Link>
          <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">{dict.footer.terms}</Link>
        </div>
      </div>
      <div className="bg-ink-deep border-t border-navy-light/30">
        <p className="mx-auto max-w-7xl px-6 py-3 text-[0.7rem] text-paper/40 italic">
          {dict.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
