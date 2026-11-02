"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName, galeriaPassword, getGaleria, tokenAcceso } from "@/lib/galerias";

export type LoginState = { error?: string };

export async function entrarGaleria(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "").trim();
  const galeria = getGaleria(slug);
  const esperada = galeriaPassword(slug);

  if (!galeria || !esperada) return { error: "Esta galería todavía no está disponible." };
  if (password !== esperada) return { error: "La contraseña no es correcta. Revisala y probá de nuevo." };

  const store = await cookies();
  store.set(cookieName(slug), tokenAcceso(slug, esperada), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/galeria/${slug}`,
    maxAge: 60 * 60 * 24 * 180,
  });
  redirect(`/galeria/${slug}`);
}
