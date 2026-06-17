import { cn } from "@/lib/utils";

/**
 * Renderiza texto con acento cinematográfico: las palabras entre *asteriscos*
 * pasan a serif itálica dorada. Ej: "...listo para *publicar.*"
 */
export function AccentText({
  text,
  accentClassName,
}: {
  text: string;
  accentClassName?: string;
}) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em
            key={i}
            className={cn("font-serif italic font-normal text-gradient-gold", accentClassName)}
          >
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
