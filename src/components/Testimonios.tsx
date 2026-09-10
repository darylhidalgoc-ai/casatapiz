import type { ReactNode } from "react";
import { MessageCircleHeart, Star } from "lucide-react";

import { WA_LINK } from "@/components/WhatsAppFab";
import { GOOGLE, TESTIMONIOS, type Testimonio } from "@/config/site";

const AVATAR_COLORS = [
  "bg-[var(--forest)] text-[var(--cream)]",
  "bg-[var(--gold)] text-[var(--forest-deep)]",
  "bg-[var(--forest-deep)] text-[var(--gold)]",
  "bg-[var(--gold-soft)] text-[var(--forest-deep)]",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h11.8c-.5 2.7-2 5-4.3 6.6v5.5h7C42.6 37 45.1 31.3 45.1 24.5z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.4l-7-5.5c-1.9 1.3-4.5 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.1h-7.2v5.7C7.9 40.9 15.3 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.6 28.1c-.4-1.3-.7-2.7-.7-4.1s.3-2.8.7-4.1v-5.7H4.4C3 17 2.2 20.4 2.2 24s.8 7 2.2 9.8z"
      />
      <path
        fill="#EA4335"
        d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.2-6.2C34.9 4.3 29.9 2 24 2 15.3 2 7.9 7.1 4.4 14.2l7.2 5.7c1.7-5.2 6.6-9.1 12.4-9.1z"
      />
    </svg>
  );
}

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-[var(--gold)] text-[var(--gold)]" : "fill-transparent text-border"}`}
          strokeWidth={1.4}
        />
      ))}
    </div>
  );
}

function CardShell({ children }: { children: ReactNode }) {
  const className =
    "flex w-[300px] shrink-0 flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-[var(--gold)] md:w-[340px]";
  if (GOOGLE.mapsUrl) {
    return (
      <a href={GOOGLE.mapsUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

function ReviewCard({ r }: { r: Testimonio }) {
  return (
    <CardShell>
      <div className="flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-semibold ${colorFor(r.nombre)}`}
        >
          {initials(r.nombre)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{r.nombre}</div>
          <div className="text-xs text-muted-foreground">
            {r.comuna}
            {r.cuando ? ` · ${r.cuando}` : ""}
            {r.localGuide ? " · Local Guide" : ""}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Stars rating={r.rating} />
      </div>
      <blockquote className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        “{r.texto}”
      </blockquote>
      {r.servicio ? <p className="mt-2 text-xs text-muted-foreground">{r.servicio}</p> : null}
      <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-[11px] tracking-wider text-muted-foreground uppercase">
        <GoogleG className="h-3.5 w-3.5" />
        {GOOGLE.mapsUrl ? "Reseña verificada en Google" : "Reseña de cliente"}
      </div>
    </CardShell>
  );
}

/**
 * Reseñas de clientes con formato de carrusel (estilo Google Reviews).
 * - Con reseñas en `TESTIMONIOS`: se muestra la marquesina y, si hay datos en
 *   `GOOGLE`, el badge de nota y el botón "Escribir una opinión".
 * - Sin reseñas: se muestra un llamado a que clientes reales dejen la suya.
 */
export function Testimonios({ items = TESTIMONIOS }: { items?: Testimonio[] }) {
  const hasReviews = items.length > 0;
  const track = hasReviews && items.length > 1 ? [...items, ...items] : items;

  return (
    <section id="resenas" className="overflow-hidden bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[var(--gold)]">Lo que dicen</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">
              Nuestra <span className="text-[var(--gold)]">comunidad.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {GOOGLE.rating ? (
              <a
                href={GOOGLE.mapsUrl || undefined}
                target={GOOGLE.mapsUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3"
              >
                <GoogleG className="h-5 w-5" />
                <span className="font-display text-2xl text-[var(--forest)]">{GOOGLE.rating}</span>
                <Star className="size-4 fill-[var(--gold)] text-[var(--gold)]" />
                {GOOGLE.count ? (
                  <span className="text-sm text-muted-foreground">
                    ({GOOGLE.count} reseñas en Google)
                  </span>
                ) : null}
              </a>
            ) : null}
            {GOOGLE.writeReviewUrl ? (
              <a
                href={GOOGLE.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
              >
                <MessageCircleHeart className="size-4" /> Escribir una opinión
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {hasReviews ? (
        <div className="mt-12">
          <div className="reviews-track flex w-max gap-5 px-6 lg:px-8">
            {track.map((r, i) => (
              <ReviewCard key={`${r.nombre}-${i}`} r={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-sm border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              ¿Ya renovamos tu mueble? Cuéntanos cómo quedó: tu experiencia ayuda a que más personas
              le den una segunda vida a sus muebles.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={WA_LINK}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
              >
                <MessageCircleHeart className="size-4" /> Contar mi experiencia
              </a>
              {GOOGLE.writeReviewUrl ? (
                <a
                  href={GOOGLE.writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--forest)]/25 px-5 py-2.5 text-sm text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
                >
                  <GoogleG className="size-4" /> Reseñar en Google
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
