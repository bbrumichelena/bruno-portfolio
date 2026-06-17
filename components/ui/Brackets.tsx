import { cn } from "@/lib/utils";

/**
 * Brackets de encuadre tipo visor de cámara — motivo visual recurrente.
 * Se colocan en las 4 esquinas de un contenedor `relative`.
 */
export function Brackets({
  className,
  size = 20,
  inset = 0,
}: {
  className?: string;
  size?: number;
  inset?: number;
}) {
  const base = "absolute border-gold/60";
  const s = { width: size, height: size } as const;
  const off = inset;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "border-l-2 border-t-2")} style={{ ...s, top: off, left: off }} />
      <span className={cn(base, "border-r-2 border-t-2")} style={{ ...s, top: off, right: off }} />
      <span className={cn(base, "border-l-2 border-b-2")} style={{ ...s, bottom: off, left: off }} />
      <span className={cn(base, "border-r-2 border-b-2")} style={{ ...s, bottom: off, right: off }} />
    </div>
  );
}
