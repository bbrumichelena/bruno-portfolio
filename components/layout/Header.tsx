"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/content.config";
import { Monogram } from "@/components/ui/Monogram";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

function RecordingDot() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setVisible((v) => !v), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed right-5 top-5 z-[60] flex items-center gap-1.5 rounded-sm px-2 py-1 transition-opacity duration-700",
        "border border-red-600/40 bg-red-600/20",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="h-2 w-2 rounded-full bg-red-500/80" />
      <span className="text-[10px] font-medium uppercase tracking-widest text-red-400/90">
        REC
      </span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <RecordingDot />
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-line bg-primary/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="#top" className="flex items-center gap-3" aria-label={site.name}>
          <Monogram size={38} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-ink">
              {site.name}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">
              {site.role}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton
          message={nav.cta.message}
          size="sm"
          variant="ghost"
          showIcon
          className="hidden sm:inline-flex"
        >
          {nav.cta.label}
        </WhatsAppButton>
      </div>
    </header>
    </>
  );
}
