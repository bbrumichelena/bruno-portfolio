"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Brackets } from "./Brackets";
import { useParallax } from "@/lib/useParallax";

type Media = {
  ready: boolean;
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
};

/**
 * Marco de media cinematográfico.
 * - media.ready → renderiza el video/foto real.
 * - si falta     → placeholder premium enmarcado (brackets + glow + play).
 */
export function MediaFrame({
  media,
  ratio = "16/9",
  label,
  className,
  parallax = false,
  priority = false,
}: {
  media: Media;
  ratio?: string;
  label?: string;
  className?: string;
  parallax?: boolean;
  priority?: boolean;
}) {
  const pRef = useParallax<HTMLDivElement>(parallax ? 36 : 0);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-secondary ring-1 ring-white/5",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div ref={parallax ? pRef : undefined} className="absolute inset-0 scale-110">
        {media.ready && media.type === "video" ? (
          <video
            className="h-full w-full object-cover"
            src={media.src}
            poster={media.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : media.ready && media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <Placeholder label={label} />
        )}
      </div>

      {/* viñeta + brackets de encuadre */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
      <Brackets inset={14} size={22} className="opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function Placeholder({ label }: { label?: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#1c2330_0%,#0b0e14_70%)]">
      {/* glow dorado */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      {/* play */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-gold/40">
        <span className="absolute inset-0 animate-[float_7s_ease-in-out_infinite] rounded-full ring-1 ring-gold/20" />
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-gold">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {label && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-px rounded-full bg-gold/80" />
          {label}
        </span>
      )}
    </div>
  );
}
