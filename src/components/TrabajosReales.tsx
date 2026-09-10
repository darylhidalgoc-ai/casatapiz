import { useState } from "react";
import { MoveHorizontal, Sparkles } from "lucide-react";

import antes from "@/assets/antes.jpg";
import despues from "@/assets/despues.jpg";
import heroSillon from "@/assets/hero-sillon.jpg";
import telas from "@/assets/telas.jpg";

const TRABAJOS = [
  {
    src: heroSillon,
    title: "Sillón en terciopelo verde",
    detail: "Retapizado completo con refuerzo de estructura y espuma nueva.",
    tag: "Sillón",
  },
  {
    src: telas,
    title: "Selección de telas",
    detail: "Linos, algodones y tejidos reciclables elegidos con cada cliente.",
    tag: "Materiales",
  },
];

function ComparadorAntesDespues() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative overflow-hidden rounded-sm shadow-2xl ring-1 ring-black/5">
      <div className="relative aspect-[9/7] w-full select-none">
        <img
          src={despues}
          alt="Sofá de cuero retapizado en tela verde oliva por Casa Tapiz"
          width={900}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={antes}
          alt="Sofá de cuero café desgastado antes del trabajo de Casa Tapiz"
          width={900}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-[var(--forest-deep)]/85 px-3 py-1 text-[0.68rem] tracking-[0.2em] text-[var(--cream)] uppercase">
          Antes
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-[var(--gold)] px-3 py-1 text-[0.68rem] tracking-[0.2em] text-[var(--forest-deep)] uppercase">
          Después
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-[var(--gold)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--cream)] text-[var(--forest-deep)] shadow-lg">
            <MoveHorizontal className="size-4" strokeWidth={1.8} />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(event) => setPos(Number(event.target.value))}
          aria-label="Comparar antes y después del mueble"
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>
    </div>
  );
}

export function TrabajosReales() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--gold)]">Trabajos reales</p>
            <h2 className="mt-3 max-w-2xl text-3xl lg:text-4xl">
              El antes y el después <span className="text-[var(--gold)]">hablan por nosotros.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Muebles reales renovados en nuestro taller de Santiago. Desliza para ver el cambio.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <ComparadorAntesDespues />

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 px-3 py-1 text-xs text-[var(--gold)]">
              <Sparkles className="size-3.5" /> Caso destacado
            </span>
            <h3 className="mt-4 text-2xl">Sofá de cuero, segunda vida en verde</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Recuperamos la estructura, reemplazamos espumas y retapizamos con un tejido resistente
              y reciclable. Un mueble que iba a terminar en el vertedero vuelve a ser el centro del
              living.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6">
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Trabajo</dt>
                <dd className="mt-1 text-sm font-medium">Retapizado integral</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Tela</dt>
                <dd className="mt-1 text-sm font-medium">Tejido reciclable</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  Estructura
                </dt>
                <dd className="mt-1 text-sm font-medium">Reforzada</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Residuo</dt>
                <dd className="mt-1 text-sm font-medium">Cero al vertedero</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TRABAJOS.map((t) => (
            <figure
              key={t.title}
              className="group overflow-hidden rounded-sm border border-border bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={t.src}
                  alt={t.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-[var(--cream)]/90 px-3 py-1 text-[0.68rem] tracking-[0.2em] text-[var(--forest-deep)] uppercase">
                  {t.tag}
                </span>
              </div>
              <figcaption className="p-5">
                <h3 className="text-lg">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
