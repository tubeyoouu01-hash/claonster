import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingDown, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/locales";
import { notFound } from "next/navigation";
import { businessSectors, personalSectors, seedImage } from "@/lib/sectors";
import { StatsBar } from "@/components/StatsBar";
import { ProductCard } from "@/components/ProductCard";
import { SectorCard } from "@/components/SectorCard";
import { StepList } from "@/components/StepList";
import { CtaBand } from "@/components/CtaBand";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { testimonialPeople } from "@/lib/testimonials";
// import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink text-paper overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">{dict.home.heroEyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.1]">{dict.home.heroTitle}</h1>
            <p className="mt-6 text-paper/75 text-lg leading-relaxed max-w-xl">{dict.home.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/apply`}
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium text-ink-deep hover:bg-gold-light transition-colors"
              >
                {dict.home.heroCtaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link
                href={`/${locale}/how-it-works`}
                className="inline-flex items-center gap-2 text-sm font-medium text-paper/85 hover:text-gold transition-colors border-b border-paper/30 hover:border-gold pb-1"
              >
                {dict.home.heroCtaSecondary}
              </Link>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 rounded-sm overflow-hidden border border-gold/30">
            <Image
              src={seedImage("sydney-skyline-finance", 900, 700)}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/60 to-transparent" />
          </div>
        </div>
        <div className="brass-rule" />
      </section>

      <StatsBar stats={dict.home.stats} />

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">{dict.home.productsTitle}</h2>
          <p className="mt-4 text-slate leading-relaxed">{dict.home.productsSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProductCard
            icon={TrendingDown}
            title={dict.home.product1Title}
            body={dict.home.product1Body}
            href={`/${locale}/business-loans`}
            cta={dict.common.learnMore}
          />
          <ProductCard
            icon={ShieldCheck}
            title={dict.home.product2Title}
            body={dict.home.product2Body}
            href={`/${locale}/business-loans`}
            cta={dict.common.learnMore}
          />
        </div>
      </section>

      {/* Business sectors preview */}
      <section className="bg-paper-dim/60 py-20 border-y border-hairline">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl text-ink">{dict.home.sectorsTitle}</h2>
              <p className="mt-4 text-slate leading-relaxed">{dict.home.sectorsSubtitle}</p>
            </div>
            <Link
              href={`/${locale}/business-loans`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold transition-colors shrink-0"
            >
              {dict.common.viewAll}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSectors.slice(0, 4).map((s) => (
              <SectorCard
                key={s.id}
                id={s.id}
                icon={s.icon}
                seed={s.seed}
                name={dict.businessLoans.sectorNames[s.id]}
                description={dict.businessLoans.sectorDescriptions[s.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personal loans preview */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">{dict.home.personalTitle}</h2>
          <p className="mt-4 text-slate leading-relaxed">{dict.home.personalSubtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {personalSectors.map((s) => (
            <SectorCard
              key={s.id}
              id={s.id}
              icon={s.icon}
              seed={s.seed}
              name={dict.personalLoans.sectorNames[s.id]}
              description={dict.personalLoans.sectorDescriptions[s.id]}
            />
          ))}
        </div>
      </section>

      {/* How it works preview */}
      <section className="bg-ink text-paper py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl sm:text-4xl">{dict.home.howTitle}</h2>
            <p className="mt-4 text-paper/70 leading-relaxed">{dict.home.howSubtitle}</p>
          </div>
          <div className="[&_h3]:text-paper [&_p]:text-paper/65 [&_span]:text-gold-light/40">
            <StepList steps={dict.howItWorks.steps} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        {/* <TestimonialCarousel
          testimonials={dict.home.testimonials}
          prevLabel={dict.home.prevTestimonial}
          nextLabel={dict.home.nextTestimonial}
        /> */}

               <TestimonialCarousel
                  testimonials={dict.home.testimonials}
                  people={testimonialPeople}
                  locale={locale}
                  prevLabel={dict.home.prevTestimonial}
                  nextLabel={dict.home.nextTestimonial}
                />
      </section>

      <CtaBand
        title={dict.home.ctaTitle}
        body={dict.home.ctaBody}
        buttonLabel={dict.home.ctaButton}
        href={`/${locale}/apply`}
      />
    </>
  );
}
