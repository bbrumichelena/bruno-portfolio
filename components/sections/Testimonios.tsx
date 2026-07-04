"use client";

import { useRef, useState, useEffect } from "react";
import { testimonios } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

function QuoteMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 fill-gold/25" aria-hidden>
      <path d="M14 36c-3.3 0-6-2.7-6-6 0-7 5-13 12-16l1.6 3.3C13 21 10 24 10 28h4c3.3 0 6 2.7 6 6s-2.7 6-6 6h0zm20 0c-3.3 0-6-2.7-6-6 0-7 5-13 12-16l1.6 3.3C33 21 30 24 30 28h4c3.3 0 6 2.7 6 6s-2.7 6-6 6z" />
    </svg>
  );
}

export function Testimonios() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<Set<number>>(new Set([0]));
  const items = testimonios.items.filter((t) => t.ready);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = parseInt((entry.target as HTMLElement).dataset.index ?? "0");
          setVisible((prev) => {
            const next = new Set(prev);
            entry.isIntersecting ? next.add(i) : next.delete(i);
            return next;
          });
        });
      },
      { root: track, threshold: 0.2 },
    );
    Array.from(track.children).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  function scrollTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(i);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i] as HTMLElement;
      if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
          Math.abs((track.children[closest] as HTMLElement).offsetLeft + (track.children[closest] as HTMLElement).offsetWidth / 2 - center)) {
        closest = i;
      }
    }
    setActive(closest);
  }

  return (
    <Section id="testimonios" bg="secondary">
      <SectionHeading eyebrow={testimonios.eyebrow} title={testimonios.title} />

      {/* Carrusel */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((t, i) => (
          <figure
            key={i}
            data-index={i}
            className="flex w-[85vw] max-w-sm flex-none flex-col snap-center rounded-2xl border border-line/60 bg-primary/50 p-6 md:w-80 transition-all duration-500"
            style={{
              opacity: visible.has(i) ? 1 : 0.25,
              scale: visible.has(i) ? "1" : "0.95",
            }}
          >
            <QuoteMark />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-steel/20 font-display text-sm font-bold text-steel-soft">
                {t.author.charAt(0)}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-ink">{t.author}</span>
                {t.role && <span className="block text-xs text-muted">{t.role}</span>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Testimonio ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-gold" : "w-1.5 bg-muted/40"
            }`}
          />
        ))}
      </div>
    </Section>
  );
}
