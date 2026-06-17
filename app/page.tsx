import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { Grain } from "@/components/ui/Grain";

import { Hero } from "@/components/sections/Hero";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonios } from "@/components/sections/Testimonios";
import { ComoTrabajo } from "@/components/sections/ComoTrabajo";
import { Propuesta } from "@/components/sections/Propuesta";
import { SobreBruno } from "@/components/sections/SobreBruno";
import { Credenciales } from "@/components/sections/Credenciales";
import { CierreCTA } from "@/components/sections/CierreCTA";

export default function Home() {
  return (
    <>
      <Grain />
      <Header />
      <main>
        <Hero />
        <ComoFunciona />
        <Portfolio />
        <Testimonios />
        <ComoTrabajo />
        <Propuesta />
        <SobreBruno />
        <Credenciales />
        <CierreCTA />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
