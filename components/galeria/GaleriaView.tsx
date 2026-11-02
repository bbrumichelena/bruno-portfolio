"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FotoManifest, Galeria, Manifest } from "@/lib/galerias";
import { Monogram } from "@/components/ui/Monogram";

type Props = { galeria: Galeria; manifest: Manifest | null; base: string };
type FotoConDia = FotoManifest & { dia: string };

export function GaleriaView({ galeria, manifest, base }: Props) {
  const [filtro, setFiltro] = useState<string>("todas");
  const [abierta, setAbierta] = useState<number | null>(null);

  const porDia = useMemo(
    () =>
      galeria.dias.map((d) => ({
        ...d,
        fotos: (manifest?.dias[d.id]?.fotos ?? []).map((f) => ({ ...f, dia: d.id })),
        zip: manifest?.dias[d.id]?.zip,
      })),
    [galeria.dias, manifest],
  );
  const total = porDia.reduce((s, d) => s + d.fotos.length, 0);
  const visibles = filtro === "todas" ? porDia : porDia.filter((d) => d.id === filtro);
  const lista: FotoConDia[] = useMemo(() => visibles.flatMap((d) => d.fotos), [visibles]);
  const portada = manifest?.portada ?? porDia.find((d) => d.fotos.length)?.fotos[0]?.f;

  const url = (tipo: "thumb" | "web" | "full", f: string) => `${base}/${tipo}/${f}`;
  const indiceDe = (f: FotoConDia) => lista.findIndex((x) => x.f === f.f);

  return (
    <div className="min-h-[100svh] bg-void text-ink">
      {/* Portada */}
      <header className="relative flex min-h-[62svh] items-end overflow-hidden">
        {portada && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url("web", portada)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8">
          <Monogram size={40} />
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-gold">{galeria.cliente}</p>
          <h1 className="mt-3 font-serif text-6xl leading-[0.95] sm:text-8xl">{galeria.titulo}</h1>
          <p className="mt-4 max-w-xl text-base text-ink/80 sm:text-lg">{galeria.bajada}</p>
          <p className="mt-2 text-sm text-muted">
            {galeria.fechas}
            {total > 0 && <> · {total.toLocaleString("es-UY")} fotos</>}
          </p>
        </div>
      </header>

      {/* Pestañas por día */}
      <nav
        aria-label="Días"
        className="sticky top-0 z-20 border-b border-line bg-void/85 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-8">
          {[{ id: "todas", label: "Todas", n: total }, ...porDia.map((d) => ({ id: d.id, label: d.label, n: d.fotos.length }))].map(
            (t) => (
              <button
                key={t.id}
                onClick={() => setFiltro(t.id)}
                aria-pressed={filtro === t.id}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  filtro === t.id ? "bg-gold text-void font-semibold" : "text-ink/75 hover:bg-secondary"
                }`}
              >
                {t.label}
                <span className={`ml-2 text-xs ${filtro === t.id ? "text-void/70" : "text-muted"}`}>{t.n || "—"}</span>
              </button>
            ),
          )}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        {total === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">Las fotos están en camino</p>
            <p className="mt-3 text-muted">Cada noche del viaje se suman las fotos del día. Volvé a entrar más tarde.</p>
          </div>
        )}

        {visibles.map((d) => (
          <section key={d.id} className="pt-12" aria-labelledby={`t-${d.id}`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  {d.label} · {d.fecha}
                </p>
                <h2 id={`t-${d.id}`} className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                  {d.lugar}
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span>{d.fotos.length ? `${d.fotos.length} fotos` : "Se suben esta noche"}</span>
                {d.zip && (
                  <a
                    href={`${base}/${d.zip}`}
                    className="rounded-full border border-gold/40 px-4 py-2 text-gold transition hover:bg-gold hover:text-void"
                  >
                    Descargar el día
                  </a>
                )}
              </div>
            </div>

            {d.fotos.length > 0 && (
              <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
                {d.fotos.map((f) => (
                  <button
                    key={f.f}
                    onClick={() => setAbierta(indiceDe(f))}
                    className="group relative mb-2 block w-full overflow-hidden rounded-md bg-secondary sm:mb-3"
                    style={{ aspectRatio: `${f.w} / ${f.h}` }}
                    aria-label="Ver foto en grande"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url("thumb", f.f)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-line py-10 text-center text-xs text-muted">
        Fotos de Bruno Michelena Herrera · Filmmaker y fotógrafo · Montevideo
      </footer>

      {abierta !== null && lista[abierta] && (
        <Visor
          fotos={lista}
          indice={abierta}
          onCambiar={setAbierta}
          onCerrar={() => setAbierta(null)}
          url={url}
        />
      )}
    </div>
  );
}

function Visor({
  fotos,
  indice,
  onCambiar,
  onCerrar,
  url,
}: {
  fotos: FotoConDia[];
  indice: number;
  onCambiar: (i: number) => void;
  onCerrar: () => void;
  url: (tipo: "thumb" | "web" | "full", f: string) => string;
}) {
  const foto = fotos[indice];
  const toque = useRef<number | null>(null);
  const ir = useCallback((d: number) => onCambiar((indice + d + fotos.length) % fotos.length), [indice, fotos.length, onCambiar]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [ir, onCerrar]);

  // Precarga la siguiente
  useEffect(() => {
    const sig = fotos[(indice + 1) % fotos.length];
    if (sig) new Image().src = url("web", sig.f);
  }, [indice, fotos, url]);

  const nombre = foto.f.split("/").pop() ?? "foto.jpg";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      className="fixed inset-0 z-50 flex flex-col bg-void/97"
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
        toque.current = null;
      }}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
        style={{ paddingTop: "max(12px, env(safe-area-inset-top, 0px))" }}
      >
        <span className="text-sm tabular-nums text-muted">
          {indice + 1} / {fotos.length}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={url("full", foto.f)}
            download={nombre}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-void transition hover:bg-gold-soft"
          >
            Descargar
          </a>
          <button onClick={onCerrar} className="rounded-full px-4 py-2 text-sm text-ink/80 hover:bg-secondary" aria-label="Cerrar">
            Cerrar ✕
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={foto.f} src={url("web", foto.f)} alt="" className="max-h-full max-w-full object-contain" />
        <button
          onClick={() => ir(-1)}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-secondary/70 px-4 py-3 text-xl hover:bg-elevated sm:block"
        >
          ‹
        </button>
        <button
          onClick={() => ir(1)}
          aria-label="Foto siguiente"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-secondary/70 px-4 py-3 text-xl hover:bg-elevated sm:block"
        >
          ›
        </button>
      </div>
    </div>
  );
}
