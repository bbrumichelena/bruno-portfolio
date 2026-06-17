import { cn } from "@/lib/utils";

/**
 * Monograma "BM" — placeholder premium recoloreado a azul + dorado.
 * ⚠ PENDIENTE · reemplazar por el vectorial real de RIVARO recoloreado.
 * Mantiene la firma de brackets dorados y el split oro/acero.
 */
export function Monogram({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span
      aria-label="Bruno Herrera — monograma BM"
      className={cn(
        "relative inline-flex items-center justify-center rounded-[10px] bg-secondary/70 ring-1 ring-gold/30",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* brackets de esquina */}
      <span className="absolute left-[5px] top-[5px] h-2 w-2 border-l border-t border-gold/70" />
      <span className="absolute bottom-[5px] right-[5px] h-2 w-2 border-b border-r border-gold/70" />
      <span
        className="font-display font-bold leading-none tracking-tight text-gradient-gold"
        style={{ fontSize: size * 0.42 }}
      >
        BM
      </span>
    </span>
  );
}
