/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT CONFIG · Bruno Herrera — Landing
 * ─────────────────────────────────────────────────────────────────────────────
 *  Única fuente de verdad. Todo lo que cambia vive acá.
 *  Reemplazar el contenido real de Bruno NO requiere tocar ningún componente.
 *
 *  Buscá la etiqueta  ⚠ PENDIENTE  para ver qué falta antes de publicar.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── Sitio ───────────────────────────── */

export const site = {
  name: "Bruno Herrera",
  role: "Video & Foto Freelance",
  location: "Montevideo, Uruguay",
  // ⚠ PENDIENTE · actualizar al dominio/subdominio final tras el deploy
  url: "https://bruno-herrera.vercel.app",
  description:
    "Contenido de video para tu negocio, listo para publicar. Grabo reels e historias para Instagram una vez al mes, con calidad cinematográfica. Montevideo, Uruguay.",
} as const;

/* ──────────────────────────── WhatsApp ──────────────────────────── */

export const whatsapp = {
  // ⚠ PENDIENTE · número real en formato internacional sin "+" ni espacios (ej: 59899123456)
  number: "598XXXXXXXX",
  defaultMessage:
    "Hola Bruno, vi tu anuncio y quiero consultar sobre el servicio de video",
} as const;

/** Construye el link de WhatsApp con un mensaje opcional pre-cargado. */
export function waLink(message: string = whatsapp.defaultMessage): string {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** True cuando el número real ya fue cargado (oculta CTAs rotos en preview si se quiere). */
export const whatsappReady = !whatsapp.number.includes("X");

/* ───────────────────────────── Header ───────────────────────────── */

export const nav = {
  brand: site.name,
  links: [
    { label: "Cómo trabajo", href: "#como-trabajo" },
    { label: "Trabajos", href: "#portfolio" },
    { label: "Sobre mí", href: "#sobre-bruno" },
  ],
  cta: { label: "Escribime", message: whatsapp.defaultMessage },
} as const;

/* ────────────────────────────── Hero ────────────────────────────── */

export const hero = {
  eyebrow: "Video & Foto · Montevideo",
  // El acento itálico serif se aplica a las palabras entre *asteriscos*
  headline: "Contenido de video para tu negocio, *listo para publicar.*",
  subheadline:
    "Grabo reels e historias para Instagram una vez al mes. Vos seguís con tu negocio, yo me encargo del contenido.",
  cta: { label: "Escribime por WhatsApp", message: whatsapp.defaultMessage },
  // ⚠ PENDIENTE · video corto en loop (5–10s) con montaje de distintos trabajos
  video: {
    ready: false,
    src: "", // ej: "/media/hero-reel.mp4"
    poster: "", // ej: "/media/hero-poster.jpg"
    alt: "Montaje de trabajos audiovisuales de Bruno Herrera",
  },
} as const;

/* ─────────────────────────── Cómo funciona ───────────────────────── */

export const comoFunciona = {
  eyebrow: "Así funciona",
  title: "Tres pasos, una vez al mes.",
  steps: [
    {
      n: "01",
      title: "Coordinamos un día al mes",
      text: "Elegís el momento que mejor te quede. Yo me adapto a tu agenda.",
    },
    {
      n: "02",
      title: "Grabo en tu local",
      text: "3 a 4 horas grabando contenido real de tu negocio: productos, proceso, equipo, clientes.",
    },
    {
      n: "03",
      title: "Te entrego el contenido",
      text: "Editado y listo para subir a Instagram, en 48 a 72 horas.",
    },
  ],
} as const;

/* ─────────────────────────── Portfolio ───────────────────────────── */

export type RubroMedia = {
  ready: boolean;
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
};

export type Rubro = {
  id: string;
  label: string;
  blurb: string;
  media: RubroMedia;
  testimonial?: { quote: string; author: string };
};

export const portfolio = {
  eyebrow: "Trabajos",
  title: "Trabajo con distintos tipos de negocios.",
  intro:
    "Grabé contenido para rubros como gastronomía, belleza, salud animal y moda. Si tu rubro no está en la lista, también podemos hablar: la cámara se adapta, las ganas de hacer buen contenido son las mismas.",
  // ⚠ PENDIENTE · Bruno selecciona qué mostrar de cada rubro y sube el material.
  // Estructura abierta: sumar rubros (autos, inmobiliario, eventos) es agregar un objeto acá.
  rubros: [
    {
      id: "gastronomia",
      label: "Gastronomía",
      blurb: "Producto, proceso y cocina con textura de cine.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para frigorífico y gastronomía" },
    },
    {
      id: "cosmetologia",
      label: "Cosmetología",
      blurb: "Detalle, piel y resultado con luz cuidada.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para cosmetología" },
    },
    {
      id: "veterinaria",
      label: "Veterinaria",
      blurb: "Cercanía, confianza y el día a día del local.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para veterinaria" },
    },
    {
      id: "moda",
      label: "Moda / Marca personal",
      blurb: "Identidad y ritmo para que la marca se sienta.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para moda y marca personal" },
    },
  ] as Rubro[],
};

/* ────────────────────────── Testimonios ──────────────────────────── */

export type Testimonial = {
  ready: boolean;
  quote: string;
  author: string;
  role?: string;
  handle?: string;
};

export const testimonios = {
  eyebrow: "Lo que dicen",
  title: "Quienes ya trabajaron conmigo.",
  // ⚠ PENDIENTE · Bruno pide estas citas. El bloque escala 1 → N sin rehacer layout.
  items: [
    {
      ready: false,
      quote: "Sumá acá la cita corta del cliente sobre el resultado del contenido.",
      author: "Cliente",
      role: "Frigorífico",
    },
    {
      ready: false,
      quote: "Cita corta sobre el trabajo o el crecimiento de Bruno.",
      author: "Marcia Battaglia",
      role: "Estudio Battaglia",
      handle: "@mbtt_foto",
    },
  ] as Testimonial[],
};

/* ──────────────────────── Cómo trabajo (equipo) ──────────────────── */

export const comoTrabajo = {
  eyebrow: "Cómo trabajo",
  title: "Nivel de cine, adaptado a tu negocio.",
  intro:
    "Trabajo con el mismo nivel de equipo que se usa en producciones de cine y publicidad, adaptado para que tu negocio tenga contenido profesional. No un video casero.",
  gear: [
    {
      title: "Cámara de cine full frame",
      text: "El mismo tipo de sensor que usan los profesionales para esa imagen nítida y con profundidad que se ve en las producciones grandes.",
    },
    {
      title: "Estabilizador gimbal profesional",
      text: "Los movimientos de cámara fluidos y cinematográficos de la publicidad, sin que la imagen tiemble.",
    },
    {
      title: "Audio inalámbrico con cancelación de ruido",
      text: "Un video con audio sucio se nota enseguida. Uno con audio limpio se siente confiable.",
    },
    {
      title: "Edición profesional · Premiere y Lightroom",
      text: "Color, ritmo y montaje pensados para que el contenido se vea cuidado, no improvisado.",
    },
  ],
  outro:
    "Vos no te ocupás de nada de la parte técnica. Yo llevo el equipo, lo armo, grabo y te entrego el resultado.",
  // ⚠ PENDIENTE · clips del detrás de cámara — Bruno grabando, el equipo, la edición
  media: { ready: false, type: "video" as const, src: "", poster: "", alt: "Detrás de cámara de Bruno trabajando" },
} as const;

/* ───────────────────────────── Propuesta ─────────────────────────── */

export const propuesta = {
  eyebrow: "La propuesta",
  title: "Una sesión mensual, simple.",
  text: "Sesión de 3 a 4 horas, una vez al mes. Te entrego los videos editados, listos para publicar en tus redes.",
  note: "El precio se conversa directo por WhatsApp, según tu negocio.",
  cta: {
    label: "Quiero coordinar una sesión",
    message: "Hola Bruno, quiero coordinar una sesión de video para mi negocio.",
  },
} as const;

/* ──────────────────────────── Sobre Bruno ────────────────────────── */

export const sobreBruno = {
  eyebrow: "Sobre mí",
  title: "Quién está detrás de la cámara.",
  paragraphs: [
    "Soy fotógrafo y editor de video profesional. Me formé en la Escuela Uruguaya de Fotografía y Video (EUF), donde hice el curso de fotografía profesional y el de audiovisual, hace más de 4 años, con profesionales del rubro de eventos, bodas y producción audiovisual en Uruguay.",
    "Trabajé en eventos empresariales, con creadores de contenido, en cosmetología, veterinaria, gastronomía, y también con una agencia que produce video para redes con IA. Hoy estoy enfocado en ayudar a negocios locales a tener presencia constante en redes, sin que tengan que ocuparse de la parte audiovisual.",
    "Soy perfeccionista con lo que hago: me adapto a cualquier rubro, trabajo cerca y personalizado con cada cliente, y no entrego nada que no me convenza a mí primero.",
  ],
  highlights: [
    { icon: "grad", label: "+4 años de formación en la EUF" },
    { icon: "handshake", label: "Trato cercano y personalizado" },
    { icon: "film", label: "Calidad cinematográfica en cada entrega" },
  ],
  // ⚠ PENDIENTE · foto de Bruno con el equipo o grabando
  photo: { ready: false, src: "", alt: "Bruno Herrera grabando con su equipo" },
} as const;

/* ──────────────────────────── Credenciales ───────────────────────── */

export const credenciales = {
  eyebrow: "Formación respaldada",
  title: "Aval de la escuela y los profesores.",
  // ⚠ PENDIENTE · escanear el título de la EUF y subirlo
  diploma: { ready: false, src: "", alt: "Título de la Escuela Uruguaya de Fotografía y Video (EUF)" },
  // ⚠ PENDIENTE · citas de profesores / aval institucional. Escala 1 → N.
  quotes: [
    {
      ready: false,
      quote: "Cita corta de la profesora sobre Bruno como alumno y profesional.",
      author: "Marcia Battaglia",
      role: "Estudio Battaglia · @mbtt_foto",
    },
    {
      ready: false,
      quote: "Aval o constancia institucional de la escuela.",
      author: "Escuela Uruguaya de Fotografía y Video",
      role: "EUF",
    },
  ],
} as const;

/* ─────────────────────────────── Cierre ──────────────────────────── */

export const cierre = {
  eyebrow: "¿Hablamos?",
  title: "Contame de tu negocio.",
  text: "Vemos juntos cómo encarar el contenido del mes. Sin compromiso, directo por WhatsApp.",
  cta: { label: "Escribime por WhatsApp", message: whatsapp.defaultMessage },
} as const;

/* ─────────────────────────────── Footer ──────────────────────────── */

export const footer = {
  name: site.name,
  tagline: "Video & Foto · Montevideo, Uruguay",
  // ⚠ PENDIENTE · crear la cuenta de Instagram nueva (separada de RIVARO)
  instagram: { ready: false, handle: "", url: "" },
  location: site.location,
  year: 2026,
} as const;
