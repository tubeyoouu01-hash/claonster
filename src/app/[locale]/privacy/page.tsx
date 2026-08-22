import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.legal.privacyTitle} />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-slate leading-relaxed">{dict.legal.privacyBody}</p>
      </section>
    </>
  );
}
