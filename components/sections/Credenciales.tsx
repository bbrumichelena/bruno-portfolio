import { credenciales } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";

export function Credenciales() {
  return (
    <Section id="credenciales" bg="secondary">
      <SectionHeading eyebrow={credenciales.eyebrow} title={credenciales.title} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        {/* Título escaneado */}
        <Reveal>
          <MediaFrame
            media={{
              ready: credenciales.diploma.ready,
              type: "image",
              src: credenciales.diploma.src,
              alt: credenciales.diploma.alt,
            }}
            ratio="4/3"
            label="Título EUF"
          />
          <p className="mt-3 text-center text-xs text-muted/70">
            Escuela Uruguaya de Fotografía y Video
          </p>
        </Reveal>

        {/* Citas / avales */}
        <div className="space-y-5">
          {credenciales.quotes.map((q, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="rounded-2xl border border-line/60 bg-primary/50 p-6 md:p-7">
                <blockquote className="text-[15px] italic leading-relaxed text-ink/85">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2 text-sm">
                  <span className="h-px w-6 bg-gold/50" />
                  <span className="font-medium text-ink">{q.author}</span>
                  <span className="text-muted">· {q.role}</span>
                  {!q.ready && (
                    <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted/70">
                      muestra
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
