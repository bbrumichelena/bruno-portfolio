import { comoFunciona } from "@/lib/content.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ComoFunciona() {
  return (
    <Section id="como-funciona" bg="secondary">
      <SectionHeading eyebrow={comoFunciona.eyebrow} title={comoFunciona.title} />

      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
        {comoFunciona.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.12}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line/60 bg-primary/60 p-7 transition-colors duration-500 hover:border-gold/30 md:p-8">
              <div className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-gold/[0.06]">
                {step.n}
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-gold">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-display font-semibold text-gradient-gold">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.text}</p>
              <span className="mt-6 block h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
