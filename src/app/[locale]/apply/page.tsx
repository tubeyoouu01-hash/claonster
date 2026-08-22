import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ApplyForm } from "@/components/ApplyForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const a = dict.apply;

  return (
    <>
      <PageHero title={a.heroTitle} subtitle={a.heroSubtitle} />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-2xl text-ink mb-8">{a.formTitle}</h2>
        <ApplyForm dict={dict} />
      </section>
    </>
  );
}
