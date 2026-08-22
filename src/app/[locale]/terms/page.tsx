import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.legal.termsTitle} />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-slate leading-relaxed">{dict.legal.termsBody}</p>
      </section>
    </>
  );
}
