import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AccentText } from "./AccentText";

/**
 * Encabezado de sección: eyebrow dorado + título display + intro opcional.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  introClassName,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  introClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-bold leading-[1.08] text-gradient-ink md:text-4xl lg:text-[2.9rem]">
          <AccentText text={title} />
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={cn("mt-5 text-base leading-relaxed text-muted md:text-lg", introClassName)}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
