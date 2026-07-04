import { sobreBruno } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";

function HighlightIcon({ name }: { name: string }) {
  const c = "h-5 w-5";
  if (name === "grad")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
        <path d="M12 4L2 9l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 11.5V16c0 1.3 2.7 3 6 3s6-1.7 6-3v-4.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (name === "handshake")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
        <path d="M8 12l2.5 2.5a1.4 1.4 0 002 0L17 10M3 8l3-2 5 3 3-1 4 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 8v7h2M21 10.5V16h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M7 5l-1 4M12 5l-1 4M17 5l-1 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SobreBruno() {
  return (
    <Section id="sobre-bruno" bg="primary">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
        {/* Foto */}
        <Reveal>
          <MediaFrame
            media={{
              ready: sobreBruno.photo.ready,
              type: "image",
              src: sobreBruno.photo.src,
              alt: sobreBruno.photo.alt,
            }}
            ratio="4/5"
            objectPosition="top"
            label="Bruno · detrás de cámara"
          />
        </Reveal>

        {/* Texto */}
        <div>
          <SectionHeading eyebrow={sobreBruno.eyebrow} title={sobreBruno.title} />
          <p className="mt-2 font-serif italic text-xl text-gradient-gold">{sobreBruno.name}</p>

          <div className="mt-6 space-y-4">
            {sobreBruno.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-relaxed text-muted md:text-base">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {sobreBruno.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.1 + i * 0.08}>
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-line/70 bg-secondary/50 px-4 py-2 text-steel-soft transition-colors duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                >
                  <HighlightIcon name={h.icon} />
                  <span className="text-sm font-medium text-ink/85">{h.label}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
