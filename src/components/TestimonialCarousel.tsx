"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialPerson } from "@/lib/testimonials";

type TestimonialCopy = { text: string; role: string };

const AUTO_ADVANCE_MS = 7000;
const DRAG_THRESHOLD_RATIO = 0.15; // fraction of slide width needed to trigger a swipe

export function TestimonialCarousel({
  testimonials,
  people,
  locale,
  prevLabel,
  nextLabel,
}: {
  testimonials: TestimonialCopy[];
  people: TestimonialPerson[];
  locale: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const count = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([locale], { type: "region" });
    } catch {
      return null;
    }
  }, [locale]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % count) + count) % count);
    },
    [count]
  );
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance, unless paused, mid-drag, or there's nothing to slide between
  useEffect(() => {
    if (paused || isDragging || count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, isDragging, count]);

  if (count === 0) return null;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setPaused(true);
    setIsDragging(true);
    dragStartX.current = e.clientX;
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  }

  function finishDrag() {
    const width = viewportRef.current?.offsetWidth ?? 0;
    const threshold = width * DRAG_THRESHOLD_RATIO;
    if (dragOffset > threshold) {
      goPrev();
    } else if (dragOffset < -threshold) {
      goNext();
    }
    setDragOffset(0);
    setIsDragging(false);
    setPaused(false);
    pointerIdRef.current = null;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== null) {
      e.currentTarget.releasePointerCapture(pointerIdRef.current);
    }
    finishDrag();
  }

  // Base position from the current index, plus live drag offset (as a percentage
  // of the viewport width) while the user is actively dragging.
  const width = viewportRef.current?.offsetWidth ?? 1;
  const dragPercent = isDragging ? (dragOffset / width) * 100 : 0;
  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(-${index * 100}% + ${dragPercent}%))`,
    transition: isDragging ? "none" : "transform 500ms ease-out",
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

      <div
        ref={viewportRef}
        className="flex-1 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={(e) => {
          if (isDragging) handlePointerUp(e);
          else setPaused(false);
        }}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex" style={trackStyle}>
          {testimonials.map((t, i) => {
            const person = people[i];
            const countryName = person
              ? regionNames?.of(person.countryCode) ?? person.countryCode
              : null;
            return (
              <div key={t.role + i} className="w-full shrink-0 px-2 text-center">
                <Quote className="h-8 w-8 text-gold mx-auto mb-6" strokeWidth={1.5} />
                <p className="font-display text-xl sm:text-2xl text-ink leading-relaxed min-h-[9rem] sm:min-h-[7rem] flex items-center justify-center">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6">
                  {person && (
                    <p className="text-ink font-medium tracking-wide">
                      {person.name}
                      {countryName ? <span className="text-slate-light font-normal"> — {countryName}</span> : null}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-slate-light tracking-wide">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.role + i}
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
