import { propuesta } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Propuesta() {
  return (
    <Section id="propuesta" bg="secondary">
      {/* glow dorado — momento acento */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {propuesta.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-gradient-ink md:text-4xl lg:text-5xl">
            <AccentText text={propuesta.title} />
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            {propuesta.text}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-3 text-sm text-muted">{propuesta.note}</p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex justify-center">
            <WhatsAppButton message={propuesta.cta.message} size="lg">
              {propuesta.cta.label}
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
