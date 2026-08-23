"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" strokeWidth={1.75} />
              +61 2 5550 1234
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" strokeWidth={1.75} />
              hello@fairhavencapital.example
            </span>
          </div>
          <span className="sm:hidden">{dict.footer.location}</span>
          <LanguageSwitcher current={locale} />
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-ink border-b border-gold/30">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
          <Link href={`/${locale}`} className="flex flex-col leading-none group">
            <span className="font-display text-2xl tracking-wide text-paper group-hover:text-gold transition-colors">
              Fairhaven
            </span>
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mt-1">
              Capital Partners
            </span>
          </Link>

          <nav className="hidden lg:flex  items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm  text-paper/85 hover:text-gold transition-colors"
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

      {/* <div className="space-y-4 p-10">
  <div className="bg-ink p-10 text-white">INK</div>
  <div className="bg-ink-deep p-10 text-white">INK DEEP</div>
  <div className="bg-navy p-10 text-white">NAVY</div>
  <div className="bg-navy-light p-10 text-white">NAVY LIGHT</div>
  <div className="bg-gold p-10 text-white">GOLD</div>
  <div className="bg-gold-light p-10 text-white">GOLD LIGHT</div>
  <div className="bg-paper p-10">PAPER</div>
  <div className="bg-paper-dim p-10">PAPER DIM</div>
  <div className="bg-slate p-10 text-white">SLATE</div>
  <div className="bg-slate-light p-10 text-white">SLATE LIGHT</div>
</div> */}

    </header>
  );
}
