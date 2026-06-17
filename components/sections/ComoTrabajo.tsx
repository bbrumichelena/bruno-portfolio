import { comoTrabajo } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";

export function ComoTrabajo() {
  return (
    <Section id="como-trabajo" bg="primary">
      <SectionHeading
        eyebrow={comoTrabajo.eyebrow}
        title={comoTrabajo.title}
        intro={comoTrabajo.intro}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
        {/* Lista de equipo */}
        <ul className="divide-y divide-line/50">
          {comoTrabajo.gear.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 0.08}>
              <div className="group flex gap-5 py-6 first:pt-0">
                <span className="font-display text-sm font-bold tabular-nums text-gold/70 transition-colors group-hover:text-gold">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{g.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{g.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Detrás de cámara */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <MediaFrame
            media={comoTrabajo.media}
            ratio="4/5"
            label="Detrás de cámara"
            parallax
          />
        </Reveal>
      </div>

      {/* Outro destacado */}
      <Reveal delay={0.1}>
        <p className="mt-14 max-w-3xl text-pretty text-xl font-medium leading-relaxed text-ink/90 md:text-2xl">
          {comoTrabajo.outro}
        </p>
      </Reveal>
    </Section>
  );
}
