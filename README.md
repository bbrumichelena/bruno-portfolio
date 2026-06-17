# Bruno Herrera — Landing (Video & Foto Freelance)

Landing page one-pager, mobile-first, estética cinematográfica oscura. Capta clientes desde
Meta Ads y los lleva a WhatsApp. Construida con **Next.js 15 + Tailwind v4 + Framer Motion + GSAP**.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Arquitectura

Todo el **contenido editable vive en un solo archivo**: [`lib/content.config.ts`](lib/content.config.ts).
Cambiar textos, links, rubros o assets **no requiere tocar ningún componente**. Buscá la etiqueta
`⚠ PENDIENTE` dentro de ese archivo para ubicar lo que falta.

```
app/                 layout (fuentes, SEO, schema), page (ensamble), globals (tokens), icon/sitemap/robots
components/
  layout/            Header · Footer · StickyWhatsApp
  sections/          Hero · ComoFunciona · Portfolio · Testimonios · ComoTrabajo ·
                     Propuesta · SobreBruno · Credenciales · CierreCTA
  ui/                primitivas (MediaFrame, Brackets, Grain, Monogram, WhatsAppButton, Reveal…)
lib/                 content.config.ts (FUENTE DE VERDAD) · utils · useParallax
public/media/        ← acá van los videos/fotos de Bruno
```

## ✅ Checklist para publicar (qué reemplazar y dónde)

Todo se edita en `lib/content.config.ts` salvo que se indique otra cosa.

| Pendiente | Dónde | Cómo |
|---|---|---|
| **Número de WhatsApp** | `whatsapp.number` | Formato internacional sin `+` (ej. `59899123456`) |
| **Video del Hero** | `hero.video` | Subir a `/public/media/`, poner `ready: true`, `src`, `poster` |
| **Videos/fotos por rubro** | `portfolio.rubros[].media` | Idem por cada rubro. Sumar rubros = agregar un objeto |
| **Testimonios** | `testimonios.items[]` | `ready: true` + `quote`, `author`, `role`. Escala 1 → N solo |
| **Detrás de cámara** | `comoTrabajo.media` | Clip del proceso |
| **Foto de Bruno** | `sobreBruno.photo` | Foto grabando / con el equipo |
| **Título EUF + citas** | `credenciales.diploma` y `credenciales.quotes[]` | Escaneo del título + citas de profesores |
| **Instagram** | `footer.instagram` | `ready: true`, `handle`, `url` |
| **Logo real (vectorial)** | `components/ui/Monogram.tsx` + `app/icon.svg` | Reemplazar el monograma BM placeholder por el vectorial recoloreado azul + dorado |
| **Dominio final** | `site.url` | Tras el deploy, poner la URL real |

> Mientras un asset tenga `ready: false`, se muestra un **placeholder premium enmarcado** en su
> lugar. El sitio se ve terminado desde el día uno; los reemplazos son cuestión de minutos.

## Assets

Poner los videos/fotos en `public/media/` y referenciarlos como `/media/archivo.mp4`.
Comprimir los videos (H.264/H.265, ~720–1080p) y generar un `poster` liviano para carga rápida.

## Deploy (Vercel)

```bash
vercel        # preview
vercel --prod # producción (subdominio .vercel.app gratis o dominio propio)
```

## Paleta

`#0B0E14` fondo · `#161B26` secundario · `#C9A24B` dorado (CTA) · `#3D5A80` azul acero ·
`#F2F0EB` texto · `#8A8F98` texto secundario.
