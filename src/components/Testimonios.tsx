import { MessageCircle, Quote, Star } from "lucide-react";

import { WA_LINK } from "@/components/WhatsAppFab";
import { GOOGLE_REVIEWS_URL, TESTIMONIOS, type Testimonio } from "@/config/site";

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-border"
          }`}
          strokeWidth={1.4}
        />
      ))}
    </div>
  );
}

/**
 * Reseñas de clientes.
 * - Si hay reseñas en `TESTIMONIOS`, se muestran en tarjetas.
 * - Si no hay, se muestra un llamado para que clientes reales dejen la suya.
 * Para desactivar la sección por completo, no cargues reseñas ni configures
 * GOOGLE_REVIEWS_URL y borra el bloque de invitación.
 */
export function Testimonios({ items = TESTIMONIOS }: { items?: Testimonio[] }) {
  const hasReviews = items.length > 0;

  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="eyebrow text-[var(--gold)]">Clientes</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">
          Lo que dicen quienes ya <span className="text-[var(--gold)]">renovaron.</span>
        </h2>

        {hasReviews ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <figure
                key={`${t.nombre}-${t.comuna}`}
                className="flex h-full flex-col rounded-sm border border-border bg-card p-6"
              >
                <Quote className="size-6 text-[var(--gold)]" strokeWidth={1.4} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.texto}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <Stars rating={t.rating} />
                  <p className="mt-2 text-sm font-medium">{t.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.comuna}
                    {t.servicio ? ` · ${t.servicio}` : ""}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4 rounded-sm border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              ¿Ya renovamos tu mueble? Cuéntanos cómo quedó: tu experiencia ayuda a que más personas
              le den una segunda vida a sus muebles.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={WA_LINK}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
              >
                <MessageCircle className="size-4" /> Contar mi experiencia
              </a>
              {GOOGLE_REVIEWS_URL ? (
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--forest)]/25 px-5 py-2.5 text-sm text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
                >
                  <Star className="size-4" /> Reseñar en Google
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
