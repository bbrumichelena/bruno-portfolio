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
  name: "Bruno Michelena Herrera",
  role: "Filmmaker, fotógrafo y editor profesional",
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
  eyebrow: "Video & Foto",
  // El acento itálico serif se aplica a las palabras entre *asteriscos*
  headline: "Contenido de video para tu negocio, *listo para publicar.*",
  subheadline:
    "Te grabo y edito el contenido del mes para tu negocio de manera *PROFESIONAL*. Vos seguís con tu negocio, yo me encargo del contenido.",
  cta: { label: "Escribime por WhatsApp", message: whatsapp.defaultMessage },
  // ⚠ PENDIENTE · video corto en loop (5–10s) con montaje de distintos trabajos
  video: {
    ready: true,
    src: "/hero-bg.mp4",
    poster: "",
    alt: "Fondo cinematográfico de estudio",
  },
} as const;

/* ─────────────────────────── Cómo funciona ───────────────────────── */

export const comoFunciona = {
  eyebrow: "Así funciona",
  title: "Tres pasos, así de simple.",
  steps: [
    {
      n: "01",
      title: "Coordinamos el momento",
      text: "Elegís el día, hora y lugar que mejor te queden. Yo me adapto a tu agenda.",
    },
    {
      n: "02",
      title: "Grabo donde lo necesites",
      text: "Productos, procesos, clientes satisfechos, antes y después, reels informativos, de entretenimiento... Grabamos lo que tu negocio necesita mostrar. El contenido sirve tanto para tus redes como para tus anuncios. Me adapto a lo que necesitás.",
    },
    {
      n: "03",
      title: "Te entrego el contenido",
      text: "Editado y listo para publicar lo antes posible, para que lo uses rápido. ¿Preferís editarlo vos? También entrego los videos con corrección de color y recorte básico para que los trabajes como vos quieras.",
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
    "Grabé y fotografié contenido para rubros como gastronomía, belleza, veterinaria, automotriz, moda y muchos más. Si tu rubro no está en mi lista, podemos hablar y con gusto me adapto para que logremos el mejor contenido profesional. Cuento con el equipo profesional para lograrlo.",
  rubros: [
    {
      id: "gastronomia",
      label: "Gastronomía",
      blurb: "Producto, proceso y cocina con textura de cine.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para gastronomía" },
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
    {
      id: "agencia-ia",
      label: "Agencia de IA",
      blurb: "Innovación y tecnología con imagen de futuro.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para agencia de IA" },
    },
    {
      id: "automotriz",
      label: "Automotriz",
      blurb: "Movimiento, detalle y potencia en cada plano.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para automotriz" },
    },
    {
      id: "deporte",
      label: "Boxeo / Deporte",
      blurb: "Intensidad y acción con ritmo cinematográfico.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para boxeo y deporte" },
    },
    {
      id: "inmobiliario",
      label: "Inmobiliario",
      blurb: "Espacios que se venden antes de la visita.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para inmobiliario" },
    },
    {
      id: "alimentacion",
      label: "Alimentación / Carnicería",
      blurb: "Frescura, producto y confianza en cada toma.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para alimentación y carnicería" },
    },
    {
      id: "eventos",
      label: "Eventos empresariales",
      blurb: "El momento capturado con presencia profesional.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Contenido para eventos empresariales" },
    },
    {
      id: "documental",
      label: "Documental / Reportaje",
      blurb: "Historias reales contadas con mirada de autor.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Documental y reportaje" },
    },
    {
      id: "mas",
      label: "Muchos más",
      blurb: "Si tu rubro no está acá, hablemos igual.",
      media: { ready: false, type: "video", src: "", poster: "", alt: "Otros rubros" },
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
      title: "Cámara profesional Sony de cine",
      text: "Cámara Sony Alpha 7V — un equipo profesional para lograr una imagen única, nítida y con esa profundidad que se ve en las producciones más grandes.",
    },
    {
      title: "Estabilizador gimbal profesional",
      text: "Para obtener movimientos de cámara fluidos y cinematográficos que elevan el resultado final.",
    },
    {
      title: "Audio profesional de alta calidad · Hollyland Lark M2",
      text: "El audio malo arruina hasta el mejor video. Con micrófonos profesionales, cada palabra y sonido se escucha con una calidad que transmite seriedad y confianza desde el primer segundo.",
    },
    {
      title: "Iluminación profesional",
      text: "Creamos un entorno de luz pensado para que lo que grabamos se vea exactamente como tiene que verse. Cada detalle iluminado, cada toma bajo control.",
    },
    {
      title: "Edición profesional · Adobe Premiere y Lightroom",
      text: "Color, ritmo y montaje pensado en su totalidad para que el contenido se vea cuidado, especial y con identidad propia.",
    },
  ],
  outro:
    "Vos no te ocupás de nada de la parte técnica. *Yo llevo el equipo, lo armo, grabo y te entrego el resultado.*",
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
  name: "Bruno Michelena",
  title: "Quién está detrás de la cámara.",
  paragraphs: [
    "Soy fotógrafo, filmmaker y editor de video profesional. Me formé en la Escuela Uruguaya de Fotografía y Video (EUF), donde hice la carrera de fotografía profesional y el curso de audiovisual, donde estudié 3 años con profesionales de varios rubros. Películas de Netflix, eventos, bodas, deportes en la televisión y producciones audiovisuales en general.",
    "Tuve la oportunidad de trabajar en eventos empresariales, con creadores de contenido, en cosmetología, veterinaria, gastronomía, inmobiliarias, moda y muchos más. Hoy estoy enfocado en ayudar a negocios a tener una presencia constante y profesional en redes, sin que tengan que ocuparse de la parte audiovisual, y que puedan diferenciarse con contenido diferente y calidad de cine.",
    "Soy perfeccionista con lo que hago, me adapto a cualquier rubro, trabajo cerca y personalizado con cada cliente, y no entrego nada que no me convenza a mí primero.",
  ],
  highlights: [
    { icon: "grad", label: "+3 años de formación en la EUF", href: "/diploma-euf.jpg" },
    { icon: "handshake", label: "Trato cercano y personalizado", href: "/foto-cliente.jpg" },
    { icon: "film", label: "Calidad cinematográfica en cada entrega", href: "/foto-camara.jpg" },
  ],
  // ⚠ PENDIENTE · foto de Bruno con el equipo o grabando
  photo: { ready: false, src: "", alt: "Bruno Michelena grabando con su equipo" },
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
