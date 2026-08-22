import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function ProductCard({
  icon: Icon,
  title,
  body,
  points,
  href,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  points?: string[];
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col border border-hairline bg-white p-8 rounded-sm h-full">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold mb-6">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h3 className="font-display text-2xl text-ink mb-3">{title}</h3>
      <p className="text-slate leading-relaxed mb-5">{body}</p>
      {points && (
        <ul className="space-y-2.5 mb-6 mt-auto">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-slate">
              <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold transition-colors mt-auto pt-2"
      >
        {cta}
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
      </Link>
    </div>
  );
}
