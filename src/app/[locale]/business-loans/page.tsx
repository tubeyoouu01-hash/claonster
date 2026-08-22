import { TrendingDown, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { businessSectors } from "@/lib/sectors";
import { SectorCard } from "@/components/SectorCard";
import { CtaBand } from "@/components/CtaBand";

export default async function BusinessLoansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const b = dict.businessLoans;

  return (
    <>
      <PageHero eyebrow={dict.meta.tagline} title={b.heroTitle} subtitle={b.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl mb-14">
          <h2 className="font-display text-3xl text-ink mb-4">{b.introTitle}</h2>
          <p className="text-slate leading-relaxed">{b.introBody}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border border-hairline bg-white rounded-sm p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold mb-6">
              <TrendingDown className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-2xl text-ink mb-3">{b.product1Title}</h3>
            <p className="text-slate leading-relaxed mb-5">{b.product1Body}</p>
            <ul className="space-y-2.5">
              {b.product1Points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-hairline bg-white rounded-sm p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold mb-6">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-2xl text-ink mb-3">{b.product2Title}</h3>
            <p className="text-slate leading-relaxed mb-5">{b.product2Body}</p>
            <ul className="space-y-2.5">
              {b.product2Points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim/60 border-y border-hairline py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl text-ink mb-4">{b.sectorsTitle}</h2>
            <p className="text-slate leading-relaxed">{b.sectorsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessSectors.map((s) => (
              <SectorCard
                key={s.id}
                id={s.id}
                icon={s.icon}
                seed={s.seed}
                name={b.sectorNames[s.id]}
                description={b.sectorDescriptions[s.id]}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={b.ctaTitle}
        body={b.ctaBody}
        buttonLabel={dict.common.applyNow}
        href={`/${locale}/apply`}
      />
    </>
  );
}
