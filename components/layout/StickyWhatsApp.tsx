"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * CTA de WhatsApp omnipresente: barra inferior en mobile, pill flotante en desktop.
 * Aparece al pasar el hero para no competir con el CTA principal arriba.
 */
export function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:inset-x-auto md:bottom-8 md:right-8",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {/* mobile: barra full-width */}
      <div className="border-t border-line bg-primary/85 p-3 backdrop-blur-xl md:hidden">
        <WhatsAppButton size="md" className="w-full">
          Escribime por WhatsApp
        </WhatsAppButton>
      </div>
      {/* desktop: pill flotante */}
      <div className="hidden md:block">
        <WhatsAppButton size="md" className="shadow-2xl">
          Escribime por WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
