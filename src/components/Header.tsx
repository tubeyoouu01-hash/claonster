"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";
import {
  SITE_SHORT_NAME,
  SITE_SUFFIX,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  OFFICE_CITY_LINE,
} from "@/lib/site-config";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/business-loans`, label: dict.nav.businessLoans },
    { href: `/${locale}/personal-loans`, label: dict.nav.personalLoans },
    { href: `/${locale}/how-it-works`, label: dict.nav.howItWorks },
    { href: `/${locale}/faq`, label: dict.nav.faq },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-ink-deep text-paper/70 text-xs">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-9">
          <div className="hidden sm:flex items-center gap-5">
            <a href={`tel:${CONTACT_PHONE_HREF}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="h-3 w-3" strokeWidth={1.75} />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="h-3 w-3" strokeWidth={1.75} />
              {CONTACT_EMAIL}
            </a>
          </div>
          <span className="sm:hidden">{OFFICE_CITY_LINE}</span>
          <LanguageSwitcher current={locale} />
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-ink border-b border-gold/30">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <LogoMark className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-wide text-paper group-hover:text-gold transition-colors">
                {SITE_SHORT_NAME}
              </span>
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mt-1">
                {SITE_SUFFIX}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-paper/85 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/apply`}
              className="hidden sm:inline-flex items-center rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-ink-deep hover:bg-gold-light transition-colors"
            >
              {dict.nav.apply}
            </Link>
            <button
              type="button"
              className="lg:hidden text-paper"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-gold/20 bg-ink-deep px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-paper/85 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/apply`}
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-ink-deep"
            >
              {dict.nav.apply}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
