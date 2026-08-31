"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = { text: string; attribution: string };

const AUTO_ADVANCE_MS = 6000;

export function TestimonialCarousel({
  testimonials,
  prevLabel,
  nextLabel,
}: {
  testimonials: Testimonial[];
  prevLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % count) + count) % count);
    },
    [count]
  );
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance, unless paused or there's nothing to slide between
  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  if (count === 0) return null;

  // Pressing on the slide itself pauses autoplay; the arrow buttons sit
  // outside this element so clicking them never triggers a pause.
  const pauseHandlers = {
    onPointerDown: () => setPaused(true),
    onPointerUp: () => setPaused(false),
    onPointerLeave: () => setPaused(false),
    onPointerCancel: () => setPaused(false),
  };

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <button
        type="button"
        onClick={goPrev}
        aria-label={prevLabel}
        className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink hover:border-gold hover:text-gold transition-colors"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <div className="flex-1 overflow-hidden" {...pauseHandlers}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.attribution + t.text.slice(0, 12)} className="w-full shrink-0 px-2 text-center">
              <Quote className="h-8 w-8 text-gold mx-auto mb-6" strokeWidth={1.5} />
              <p className="font-display text-2xl sm:text-3xl text-ink leading-snug min-h-[4.5rem] sm:min-h-[6.5rem] flex items-center justify-center">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-6 text-sm text-slate-light tracking-wide">{t.attribution}</p>
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.attribution + i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-hairline hover:bg-gold-light"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={goNext}
        aria-label={nextLabel}
        className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink hover:border-gold hover:text-gold transition-colors"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}
