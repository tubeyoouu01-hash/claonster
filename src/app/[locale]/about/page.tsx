import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { seedImage } from "@/lib/sectors";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const a = dict.about;

  return (
    <>
      <PageHero title={a.heroTitle} subtitle={a.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div className="relative h-80 lg:h-full min-h-[22rem] rounded-sm overflow-hidden border border-hairline order-2 lg:order-1">
          <Image
            src={seedImage("sydney-office-advisors", 900, 900)}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="font-display text-3xl text-ink mb-5">{a.storyTitle}</h2>
          <p className="text-slate leading-relaxed mb-4">{a.storyBody1}</p>
          <p className="text-slate leading-relaxed mb-4">{a.storyBody2}</p>
          <p className="text-sm text-slate-light italic leading-relaxed border-l-2 border-gold pl-4 mt-6">
            {a.storyBody3}
          </p>
        </div>
      </section>

      <section className="bg-ink text-paper py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl mb-4">{a.missionTitle}</h2>
          <p className="text-paper/75 text-xl leading-relaxed font-display italic">{a.missionBody}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl text-ink mb-12 text-center">{a.valuesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {a.values.map((v, i) => (
            <div key={v.title} className="pt-6 border-t-2 border-gold">
              <span className="font-display text-3xl text-gold-light/50">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl text-ink mt-2 mb-2">{v.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim/60 border-y border-hairline py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl text-ink mb-5">{a.teamTitle}</h2>
          <p className="text-slate leading-relaxed">{a.teamBody}</p>
          <p className="mt-8 text-xs text-slate-light italic">{a.licenseNote}</p>
        </div>
      </section>
    </>
  );
}
