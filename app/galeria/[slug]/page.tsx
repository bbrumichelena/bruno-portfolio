import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  cookieName,
  galeriaBaseUrl,
  galeriaPassword,
  getGaleria,
  getManifest,
  tokenAcceso,
} from "@/lib/galerias";
import { GaleriaLogin } from "@/components/galeria/GaleriaLogin";
import { GaleriaView } from "@/components/galeria/GaleriaView";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGaleria(slug);
  return {
    title: g ? `${g.titulo} · Galería privada` : "Galería privada",
    robots: { index: false, follow: false },
  };
}

export default async function GaleriaPage({ params }: Props) {
  const { slug } = await params;
  const galeria = getGaleria(slug);
  if (!galeria) notFound();

  const password = galeriaPassword(slug);
  const store = await cookies();
  const autorizado = !!password && store.get(cookieName(slug))?.value === tokenAcceso(slug, password);

  if (!autorizado) {
    return <GaleriaLogin slug={slug} titulo={galeria.titulo} bajada={galeria.bajada} cliente={galeria.cliente} fechas={galeria.fechas} />;
  }

  const manifest = await getManifest(slug);
  const base = galeriaBaseUrl(slug) ?? "";
  return <GaleriaView galeria={galeria} manifest={manifest} base={base} />;
}
