import { footer, site, waLink } from "@/lib/content.config";
import { Monogram } from "@/components/ui/Monogram";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12 2.5a9.5 9.5 0 00-8.23 14.24L2.5 21.5l4.9-1.28A9.5 9.5 0 1012 2.5zm0 1.7a7.8 7.8 0 11-4.06 14.46l-.3-.18-2.9.76.78-2.83-.2-.31A7.8 7.8 0 0112 4.2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-void">
      <div className="container-site py-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Monogram size={44} />
              <div className="leading-none">
                <p className="font-display text-base font-bold text-ink">{footer.name}</p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-muted">
                  {site.role}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Contenido audiovisual para negocios. Calidad cinematográfica, trato cercano,
              entregas listas para publicar.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contacto
            </span>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <WhatsAppGlyph /> +598 92 328 738
            </a>
            {footer.instagram.ready ? (
              <a
                href={footer.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <InstagramGlyph /> {footer.instagram.handle}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 text-sm text-muted/60">
                <InstagramGlyph /> Instagram · próximamente
              </span>
            )}
            <span className="inline-flex items-center gap-2.5 text-sm text-muted">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                <path
                  d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {footer.location}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted/70 sm:flex-row">
          <span>
            © {footer.year} {footer.name} · {footer.tagline}
          </span>
          <span>Montevideo · Uruguay</span>
        </div>
      </div>
    </footer>
  );
}
