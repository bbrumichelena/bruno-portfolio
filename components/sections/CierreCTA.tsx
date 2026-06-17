import { cierre } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Brackets } from "@/components/ui/Brackets";

export function CierreCTA() {
  return (
    <Section id="contacto" bg="void" className="py-24 md:py-36 lg:py-44">
      {/* glows de cierre */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[130px]" />
        <div className="absolute bottom-0 right-[10%] h-[20rem] w-[20rem] rounded-full bg-steel/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <Brackets inset={-2} size={26} className="hidden opacity-40 md:block" />

        <Reveal>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {cierre.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-gradient-ink md:text-5xl lg:text-6xl">
            <AccentText text={cierre.title} />
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
            {cierre.text}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton message={cierre.cta.message} size="lg">
              {cierre.cta.label}
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
