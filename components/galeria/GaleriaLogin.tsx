"use client";

import { useActionState } from "react";
import { entrarGaleria, type LoginState } from "@/app/galeria/actions";
import { Monogram } from "@/components/ui/Monogram";

type Props = { slug: string; titulo: string; bajada: string; cliente: string; fechas: string };

export function GaleriaLogin({ slug, titulo, bajada, cliente, fechas }: Props) {
  const [state, action, pending] = useActionState<LoginState, FormData>(entrarGaleria, {});

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-void px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <Monogram size={48} />
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-gold">{cliente}</p>
          <h1 className="mt-3 font-serif text-5xl leading-none text-ink">{titulo}</h1>
          <p className="mt-3 text-sm text-muted">{bajada}</p>
          <p className="mt-1 text-xs text-muted/80">{fechas}</p>
        </div>

        <form action={action} className="rounded-2xl border border-line bg-secondary/60 p-6">
          <input type="hidden" name="slug" value={slug} />
          <label htmlFor="password" className="block text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Contraseña de la galería
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            className="mt-3 w-full rounded-lg border border-line bg-primary px-4 py-3 text-ink outline-none transition focus:border-gold/60"
          />
          {state.error && (
            <p role="alert" className="mt-3 text-sm text-[#e8a090]">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-void transition hover:bg-gold-soft disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Ver las fotos"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted/70">Galería privada · Bruno Michelena Herrera</p>
      </div>
    </main>
  );
}
