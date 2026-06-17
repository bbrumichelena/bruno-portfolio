"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content.config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Brackets } from "@/components/ui/Brackets";

/* Tokeniza el headline respetando el acento entre *asteriscos* y lo revela palabra a palabra. */
function HeadlineWords({ text }: { text: string }) {
  const segments = text.split("*");
  let idx = 0;
  return (
    <h1 className="text-balance font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">
      {segments.map((seg, si) => {
        const accent = si % 2 === 1;
        return seg.split(/(\s+)/).map((token, ti) => {
          if (token.trim() === "") return token;
          const i = idx++;
          return (
            <motion.span
              key={`${si}-${ti}`}
              className="inline-block"
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.085, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={accent ? "font-serif italic font-normal text-gradient-gold" : "text-gradient-ink"}>
                {token}
              </span>
            </motion.span>
          );
        });
      })}
    </h1>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void pt-20"
    >
      {/* ── Fondo: video real o placeholder cinematográfico ── */}
      <div className="absolute inset-0">
        {hero.video.ready ? (
          <video
            className="h-full w-full object-cover"
            src={hero.video.src}
            poster={hero.video.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_30%,#1c2330_0%,#0b0e14_55%,#070910_100%)]" />
        )}

        {/* glows oro + acero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-[8%] h-[28rem] w-[28rem] animate-blob rounded-full bg-gold/10 blur-[120px]" />
          <div className="absolute bottom-[-6rem] left-[2%] h-[26rem] w-[26rem] animate-blob rounded-full bg-steel/20 blur-[130px] [animation-delay:-8s]" />
        </div>

        {/* overlays de legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/55 to-transparent" />
      </div>

      {/* ── Letterbox cinematográfico ── */}
      <motion.div
        className="absolute inset-x-0 top-0 z-20 bg-void"
        initial={{ height: "12vh" }}
        animate={{ height: "0vh" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 bg-void"
        initial={{ height: "12vh" }}
        animate={{ height: "0vh" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <Brackets inset={20} size={30} className="z-20 hidden opacity-50 md:block" />

      {/* ── Contenido ── */}
      <div className="container-site relative z-30">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-line bg-secondary/40 px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/80">
              {hero.eyebrow}
            </span>
          </motion.div>

          <HeadlineWords text={hero.headline} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink/75 md:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <WhatsAppButton message={hero.cta.message} size="lg">
              {hero.cta.label}
            </WhatsAppButton>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              Ver trabajos
              <span className="transition-transform group-hover:translate-x-1">↓</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 md:block">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/25 p-1">
          <span className="h-1.5 w-1 animate-scroll-cue rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
