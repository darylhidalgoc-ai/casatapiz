/**
 * Datos operativos del sitio en un solo lugar.
 * Cambia aquí el número de WhatsApp, teléfono, correo o Instagram y se
 * actualiza en toda la web.
 */
export const SITE = {
  name: "Casa Tapiz",
  url: "https://casatapiz.cl",
  /** Solo dígitos, con código de país. */
  whatsapp: "56952095972",
  phoneDisplay: "+56 9 5209 5972",
  email: "casatapiz26@gmail.com",
  instagram: "https://www.instagram.com/casatapiz.cl/",
  location: "Taller en Santiago · Retiro y entrega en toda la Región Metropolitana",
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Casa Tapiz 👋 Vi el sitio y quiero cotizar mi mueble.";

export function waLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const TEL_LINK = `tel:+${SITE.whatsapp}`;

/**
 * IDs de analítica. Se leen desde variables de entorno al compilar
 * (VITE_GA4_ID y VITE_META_PIXEL_ID). Si están vacíos, no se carga nada.
 */
export const ANALYTICS = {
  ga4Id: (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() ?? "",
  metaPixelId: (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() ?? "",
};

export type Testimonio = {
  nombre: string;
  comuna: string;
  texto: string;
  /** 1 a 5. Por defecto 5. */
  rating?: number;
  servicio?: string;
  /** Texto relativo, ej: "hace 2 meses". */
  cuando?: string;
  /** true si la persona es Local Guide de Google. */
  localGuide?: boolean;
};

/**
 * Reseñas REALES de clientes (cópialas de tu perfil de Google o de lo que te
 * hayan escrito). Formato de ejemplo:
 *
 * export const TESTIMONIOS: Testimonio[] = [
 *   {
 *     nombre: "María P.",
 *     comuna: "Providencia",
 *     texto: "Quedó como nuevo y retiraron el sillón en mi casa sin que yo moviera nada.",
 *     rating: 5,
 *     servicio: "Sillón de 3 cuerpos",
 *     cuando: "hace 2 meses",
 *   },
 * ];
 */
export const TESTIMONIOS: Testimonio[] = [];

/**
 * Perfil de Google Business de Casa Tapiz. Al completar `mapsUrl` y
 * `writeReviewUrl`, el carrusel de reseñas enlaza a tu ficha y aparece el
 * botón "Escribir una opinión". `rating` y `count` alimentan el badge.
 */
export const GOOGLE = {
  mapsUrl: "https://g.page/r/CbPWIbYsfEscEAE",
  writeReviewUrl: "https://g.page/r/CbPWIbYsfEscEAE/review",
  rating: null as number | null,
  count: null as number | null,
};
