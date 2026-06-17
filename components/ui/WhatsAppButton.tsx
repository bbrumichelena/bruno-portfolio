import { cn } from "@/lib/utils";
import { waLink } from "@/lib/content.config";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 004.64 1.21h.01c5.24 0 9.5-4.25 9.5-9.5 0-2.54-.99-4.93-2.78-6.72A9.43 9.43 0 0012.04 2.5z" />
    </svg>
  );
}

type Props = {
  message?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "ghost";
  showIcon?: boolean;
  className?: string;
};

/**
 * CTA a WhatsApp — la acción principal del sitio.
 * Server-safe: shimmer y hover en CSS puro. Usable en cualquier sección.
 */
export function WhatsAppButton({
  message,
  children = "Escribime por WhatsApp",
  size = "md",
  variant = "gold",
  showIcon = true,
  className,
}: Props) {
  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-[15px] gap-2",
    lg: "px-8 py-4 text-base md:text-lg gap-2.5",
  };

  const variants = {
    gold:
      "bg-gold text-void shadow-[0_10px_30px_-10px_rgba(201,162,75,0.6)] hover:shadow-[0_18px_45px_-12px_rgba(201,162,75,0.75)] hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:ring-gold/60 hover:text-gold",
  };

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {variant === "gold" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent [animation:shimmer_3.2s_infinite] group-hover:[animation-duration:1.6s]" />
      )}
      {showIcon && <WhatsAppGlyph className="relative h-[1.15em] w-[1.15em]" />}
      <span className="relative">{children}</span>
    </a>
  );
}
