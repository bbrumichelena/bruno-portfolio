"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";

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
        <MediaFrame
          media={{
            ready: true,
            type: "video",
            src: "/diferencias.mp4",
            alt: "Diferencias cinematográficas",
          }}
          ratio="16/9"
          label="Grabación y edición cinematográfica"
        />
      </Reveal>
    </Section>
  );
}
