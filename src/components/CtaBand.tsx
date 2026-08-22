import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand({
  title,
  body,
  buttonLabel,
  href,
}: {
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
}) {
  return (
    <section className="bg-ink-deep text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl mb-3">{title}</h2>
          <p className="text-paper/70">{body}</p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium text-ink-deep hover:bg-gold-light transition-colors whitespace-nowrap"
        >
          {buttonLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
