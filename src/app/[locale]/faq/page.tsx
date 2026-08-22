import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const f = dict.faq;

  return (
    <>
      <PageHero title={f.heroTitle} subtitle={f.heroSubtitle} />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <FaqAccordion items={f.items} />
      </section>
      <CtaBand
        title={dict.howItWorks.ctaTitle}
        body={dict.howItWorks.ctaBody}
        buttonLabel={dict.common.applyNow}
        href={`/${locale}/apply`}
      />
    </>
  );
}
