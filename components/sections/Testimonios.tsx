import { testimonios } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function QuoteMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9 fill-gold/25" aria-hidden>
      <path d="M14 36c-3.3 0-6-2.7-6-6 0-7 5-13 12-16l1.6 3.3C13 21 10 24 10 28h4c3.3 0 6 2.7 6 6s-2.7 6-6 6h0zm20 0c-3.3 0-6-2.7-6-6 0-7 5-13 12-16l1.6 3.3C33 21 30 24 30 28h4c3.3 0 6 2.7 6 6s-2.7 6-6 6z" />
    </svg>
  );
}

export function Testimonios() {
  return (
    <Section id="testimonios" bg="secondary">
      <SectionHeading eyebrow={testimonios.eyebrow} title={testimonios.title} />

      <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
        {testimonios.items.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure className="relative h-full overflow-hidden rounded-2xl border border-line/60 bg-primary/50 p-7 md:p-8">
              <QuoteMark />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-steel/20 font-display text-sm font-bold text-steel-soft">
                  {t.author.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-ink">{t.author}</span>
                  {(t.role || t.handle) && (
                    <span className="block text-xs text-muted">
                      {[t.role, t.handle].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
                {!t.ready && (
                  <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted/70">
                    muestra
                  </span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
