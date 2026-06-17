import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/content.config";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "video para negocios",
    "contenido para Instagram",
    "reels",
    "filmmaker Montevideo",
    "producción audiovisual Uruguay",
    "video marketing",
    "Bruno Herrera",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: site.url,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#0B0E14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  areaServed: { "@type": "City", name: "Montevideo" },
  address: { "@type": "PostalAddress", addressLocality: "Montevideo", addressCountry: "UY" },
  knowsAbout: ["Producción audiovisual", "Fotografía", "Edición de video", "Reels", "Contenido para redes"],
  founder: { "@type": "Person", name: site.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
