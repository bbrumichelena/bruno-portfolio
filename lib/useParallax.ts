"use client";

import { useRef, useEffect } from "react";

/**
 * Parallax sutil ligado al scroll con GSAP ScrollTrigger.
 * SSR-safe: registra el plugin en cliente, scope con context y cleanup.
 * Respeta prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { yPercent: -strength / 10 },
          {
            yPercent: strength / 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    })();

    return () => ctx?.revert();
  }, [strength]);

  return ref;
}
