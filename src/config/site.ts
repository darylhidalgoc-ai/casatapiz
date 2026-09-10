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
};

/**
 * Reseñas reales de clientes. Mientras esté vacío, la sección de testimonios
 * no se muestra. Agrega aquí las reseñas verdaderas para activarla.
 */
export const TESTIMONIOS: Testimonio[] = [];
