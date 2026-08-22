import { CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { StepList } from "@/components/StepList";
import { CtaBand } from "@/components/CtaBand";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const h = dict.howItWorks;

  return (
    <>
      <PageHero title={h.heroTitle} subtitle={h.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <StepList steps={h.steps} />
      </section>

      <section className="bg-paper-dim/60 border-y border-hairline py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h2 className="font-display text-2xl text-ink mb-4">{h.timelineTitle}</h2>
            <p className="text-slate leading-relaxed">{h.timelineBody}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink mb-4">{h.documentsTitle}</h2>
            <ul className="space-y-3">
              {h.documents.map((d) => (
                <li key={d} className="flex items-start gap-3 text-slate">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="text-center text-sm text-slate-light py-10">{h.faqNote}</p>

      <CtaBand
        title={h.ctaTitle}
        body={h.ctaBody}
        buttonLabel={dict.common.applyNow}
        href={`/${locale}/apply`}
      />
    </>
  );
}
