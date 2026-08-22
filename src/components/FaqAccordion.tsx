"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-t border-b border-hairline">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-ink">{item.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-gold">
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            {isOpen && (
              <p className="pb-6 text-slate leading-relaxed max-w-3xl">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
