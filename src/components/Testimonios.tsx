import { Quote, Star } from "lucide-react";

import { TESTIMONIOS, type Testimonio } from "@/config/site";

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
 * Testimonios reales de clientes. No se muestra si no hay reseñas cargadas
 * en `TESTIMONIOS` (src/config/site.ts).
 */
export function Testimonios({ items = TESTIMONIOS }: { items?: Testimonio[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="eyebrow text-[var(--gold)]">Clientes</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">
          Lo que dicen quienes ya <span className="text-[var(--gold)]">renovaron.</span>
        </h2>
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
      </div>
    </section>
  );
}
