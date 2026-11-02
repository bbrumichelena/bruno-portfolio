// Solo para el servidor: lee variables de entorno privadas. No importar desde componentes "use client".
import { createHash } from "node:crypto";

/**
 * Galerías privadas de entrega de fotos.
 *
 * Lo público (títulos, días) vive acá. Lo privado vive en variables de entorno de Vercel:
 *   GALERIAS_BASE_URL          URL pública del bucket de R2 (ej. https://pub-xxxx.r2.dev)
 *   GALERIA_<ID>_PREFIX        carpeta secreta de la galería dentro del bucket
 *   GALERIA_<ID>_PASSWORD      contraseña que se le pasa al cliente
 * donde <ID> es el slug en mayúsculas con guiones bajos (polo-uruguay → POLO_URUGUAY).
 *
 * Las fotos y el manifest.json los sube scripts/galeria/subir.py; agregar fotos no requiere publicar el sitio.
 */

export type DiaGaleria = {
  id: string; // carpeta en el bucket, ej. "dia-1"
  label: string;
  fecha: string;
  lugar: string;
};

export type Galeria = {
  slug: string;
  titulo: string;
  bajada: string;
  cliente: string;
  fechas: string;
  dias: DiaGaleria[];
};

export const galerias: Galeria[] = [
  {
    slug: "polo-uruguay",
    titulo: "Uruguay",
    bajada: "Arquitectura, encuentros y nuevos paisajes",
    cliente: "Polo Design Alphaville",
    fechas: "3 al 6 de noviembre de 2026",
    dias: [
      { id: "dia-1", label: "Día 1", fecha: "Martes 3", lugar: "Montevideo · Punta del Este" },
      { id: "dia-2", label: "Día 2", fecha: "Miércoles 4", lugar: "Punta del Este · Garzón · Casa Pueblo" },
      { id: "dia-3", label: "Día 3", fecha: "Jueves 5", lugar: "José Ignacio · MACA" },
      { id: "dia-4", label: "Día 4", fecha: "Viernes 6", lugar: "Atlántida · Montevideo" },
    ],
  },
];

export type FotoManifest = { f: string; w: number; h: number };
export type Manifest = {
  actualizado: string;
  portada?: string;
  dias: Record<string, { fotos: FotoManifest[]; zip?: string }>;
};

const envKey = (slug: string) => slug.toUpperCase().replace(/[^A-Z0-9]+/g, "_");

export function getGaleria(slug: string) {
  return galerias.find((g) => g.slug === slug) ?? null;
}

export function galeriaBaseUrl(slug: string) {
  const base = process.env.GALERIAS_BASE_URL?.replace(/\/$/, "");
  const prefix = process.env[`GALERIA_${envKey(slug)}_PREFIX`];
  if (!base || !prefix) return null;
  return `${base}/${prefix}`;
}

export function galeriaPassword(slug: string) {
  return process.env[`GALERIA_${envKey(slug)}_PASSWORD`] ?? null;
}

/** Valor de la cookie de acceso: un hash de la contraseña, nunca la contraseña en sí. */
export function tokenAcceso(slug: string, password: string) {
  return createHash("sha256").update(`galeria:${slug}:${password}`).digest("hex");
}

export const cookieName = (slug: string) => `galeria_${slug}`;

export async function getManifest(slug: string): Promise<Manifest | null> {
  const base = galeriaBaseUrl(slug);
  if (!base) return null;
  try {
    const res = await fetch(`${base}/manifest.json`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Manifest;
  } catch {
    return null;
  }
}
