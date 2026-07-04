"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Diferencias() {
  return (
    <Section id="diferencias" bg="primary">
      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          El detalle que marca la diferencia
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink md:text-5xl">
          Grabación y edición{" "}
          <span className="text-gradient-gold font-serif italic font-normal">
            Cinematográfica.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/5" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://www.youtube.com/embed/tlbEgUIprDo?rel=0&modestbranding=1&color=white"
            title="Grabación y edición Cinematográfica"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </Reveal>
    </Section>
  );
}
