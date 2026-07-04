"use client";

import { useState } from "react";
import { comoFunciona } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ComoFunciona() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section id="como-funciona" bg="secondary">
      <SectionHeading eyebrow={comoFunciona.eyebrow} title={comoFunciona.title} />

      {/* Desktop: grid normal */}
      <div className="mt-14 hidden gap-5 md:mt-16 md:grid md:grid-cols-3 md:gap-6">
        {comoFunciona.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.12}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line/60 bg-primary/60 p-7 transition-colors duration-500 hover:border-gold/30 md:p-8">
              <div className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-gold/[0.06]">
                {step.n}
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-gold">{step.n}</span>
              <h3 className="mt-4 text-xl font-display font-semibold text-gradient-gold">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.text}</p>
              <span className="mt-6 block h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Mobile: carrusel horizontal con expand al tocar */}
      <div
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {comoFunciona.steps.map((step, i) => {
          const isOpen = expanded === i;
          return (
            <div
              key={step.n}
              onClick={() => setExpanded(isOpen ? null : i)}
              className="relative w-[80vw] flex-none snap-center overflow-hidden rounded-2xl border border-line/60 bg-primary/60 p-6 transition-all duration-300 active:border-gold/40"
            >
              <div className="pointer-events-none absolute -right-2 -top-4 font-display text-[6rem] font-bold leading-none text-white/[0.03]">
                {step.n}
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-gold">{step.n}</span>
              <h3 className="mt-3 text-lg font-display font-semibold text-gradient-gold">{step.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed text-muted transition-all duration-300 ${isOpen ? "" : "line-clamp-2"}`}>
                {step.text}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="block h-px w-8 bg-gold/40" />
                <span className="text-xs text-gold/60">{isOpen ? "Cerrar ↑" : "Leer más ↓"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
