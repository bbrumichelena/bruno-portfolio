"use client";

import { useState } from "react";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }
function trackContact() { if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", "Contact"); }
import { AnimatePresence, motion } from "framer-motion";
import { portfolio, waLink } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [active, setActive] = useState(0);
  const rubro = portfolio.rubros[active];

  return (
    <Section id="portfolio" bg="primary">
      <SectionHeading
        eyebrow={portfolio.eyebrow}
        title={portfolio.title}
        intro={portfolio.intro}
        className="max-w-none"
      />

      {/* Mobile: dropdown */}
      <div className="mt-8 md:hidden">
        <div className="relative">
          <select
            value={active}
            onChange={(e) => setActive(Number(e.target.value))}
            className="w-full appearance-none rounded-xl border border-line/70 bg-secondary/60 px-4 py-3 pr-10 text-sm font-medium text-ink backdrop-blur focus:border-gold/50 focus:outline-none"
          >
            {portfolio.rubros.map((r, i) => (
              <option key={r.id} value={i}>{r.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
            ↓
          </span>
        </div>
      </div>

      {/* Desktop: chips */}
      <div className="mt-10 hidden flex-wrap gap-2.5 md:mt-12 md:flex">
        {portfolio.rubros.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              i === active
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-line/70 text-muted hover:border-ink/25 hover:text-ink",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Panel activo */}
      <div className="mt-8 md:mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={rubro.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={rubro.id === 'mas' ? '' : 'grid items-center gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12'}
          >
            {rubro.id === 'mas' ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-gold/20 bg-secondary/40 px-8 py-14 text-center">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Rubro
                </span>
                <h3 className="mt-5 text-4xl font-bold text-ink md:text-5xl">{rubro.blurb}</h3>
                <a
                  href={waLink('Hola Bruno, quiero consultar sobre contenido para mi negocio.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackContact}
                  className="group mt-10 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-base font-medium text-gold transition-colors hover:bg-gold/20"
                >
                  Quiero algo así para mi negocio
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ) : (
              <>
                <div className="mx-auto w-full max-w-[320px]">
                  <MediaFrame media={rubro.media} ratio={rubro.ratio ?? "9/16"} label={`${rubro.label} · muestra`} />
                </div>

                <div>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Rubro
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-ink md:text-3xl">{rubro.label}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{rubro.blurb}</p>

                  {rubro.testimonial && (
                    <blockquote className="mt-6 border-l-2 border-gold/50 pl-4 text-[15px] italic text-ink/80">
                      &ldquo;{rubro.testimonial.quote}&rdquo;
                      <cite className="mt-2 block text-xs not-italic text-muted">
                        — {rubro.testimonial.author}
                      </cite>
                    </blockquote>
                  )}

                  <a
                    href={waLink(`Hola Bruno, me interesa contenido para mi negocio (rubro ${rubro.label.toLowerCase()}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackContact}
                    className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-soft"
                  >
                    Quiero algo así para mi negocio
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted/80">
        ¿Tu rubro no está en la lista? También podemos hablar: la cámara se adapta, las ganas de
        hacer buen contenido son las mismas.
      </p>
    </Section>
  );
}
