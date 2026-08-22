export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {eyebrow && (
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl sm:text-5xl leading-tight max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 text-paper/75 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="brass-rule" />
    </section>
  );
}
