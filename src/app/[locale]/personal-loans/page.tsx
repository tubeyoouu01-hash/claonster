import { ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { personalSectors } from "@/lib/sectors";
import { SectorCard } from "@/components/SectorCard";
import { CtaBand } from "@/components/CtaBand";

export default async function PersonalLoansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const p = dict.personalLoans;

  return (
    <>
      <PageHero eyebrow={dict.meta.subTagline} title={p.heroTitle} subtitle={p.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl mb-14">
          <h2 className="font-display text-3xl text-ink mb-4">{p.introTitle}</h2>
          <p className="text-slate leading-relaxed">{p.introBody}</p>
        </div>

        <h3 className="font-display text-2xl text-ink mb-8">{p.sectorsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalSectors.map((s) => (
            <SectorCard
              key={s.id}
              id={s.id}
              icon={s.icon}
              seed={s.seed}
              name={p.sectorNames[s.id]}
              description={p.sectorDescriptions[s.id]}
            />
          ))}
        </div>
      </section>

      <section className="bg-paper-dim/60 border-y border-hairline py-16">
        <div className="mx-auto max-w-3xl px-6 flex flex-col sm:flex-row items-start gap-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-display text-2xl text-ink mb-3">{p.nonCollateralTitle}</h2>
            <p className="text-slate leading-relaxed">{p.nonCollateralBody}</p>
          </div>
        </div>
      </section>

      <CtaBand
        title={p.ctaTitle}
        body={p.ctaBody}
        buttonLabel={dict.common.applyNow}
        href={`/${locale}/apply`}
      />
    </>
  );
}
