import { TreePine, Recycle, Sofa, MessageCircle } from "lucide-react";

import { WA_LINK } from "@/components/WhatsAppFab";
import reforestacion from "@/assets/reforestacion.jpg";

const PUNTOS = [
  { icon: Sofa, title: "El mueble se salva", text: "Recuperamos la estructura en vez de reemplazarla." },
  { icon: Recycle, title: "La espuma se reutiliza", text: "Enviamos las espumas a reutilización, no al vertedero." },
  { icon: TreePine, title: "El árbol se planta", text: "Un árbol nativo por cada tapizado, con Fundación Reforestemos." },
];

export function ArbolPorTapizado() {
  return (
    <section id="arbol" className="border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <img
          src={reforestacion}
          alt="Manos plantando árboles nativos en tierra húmeda, reforestación en Chile"
          width={1200}
          height={900}
          loading="lazy"
          className="rounded-sm object-cover"
        />
        <div>
          <p className="eyebrow text-[var(--gold)]">Con Fundación Reforestemos</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">
            Un árbol por cada <span className="text-[var(--gold)]">mueble tapizado.</span>
          </h2>
          <span className="rule-gold mt-6" />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Queremos ser el taller de tapicería más verde de Chile y dejar una huella positiva como
            empresa. Por eso, junto a Fundación Reforestemos, cada mueble que renovamos en Casa
            Tapiz se traduce en un árbol nativo plantado en el país.
          </p>
          <ul className="mt-8 space-y-4">
            {PUNTOS.map((p) => (
              <li key={p.title} className="flex gap-3">
                <p.icon className="mt-0.5 size-5 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={WA_LINK}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
          >
            <MessageCircle className="size-4" /> Quiero renovar y plantar mi árbol
          </a>
        </div>
      </div>
    </section>
  );
}

export function ArbolFranja() {
  return (
    <section className="bg-[var(--forest)] py-8 text-[var(--cream)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 text-center lg:px-8">
        <TreePine className="size-6 text-[var(--gold)]" strokeWidth={1.5} />
        <p className="text-sm">
          <span className="font-display text-lg text-[var(--gold)]">Un árbol por cada tapizado</span>{" "}
          — junto a Fundación Reforestemos, tapicería verde con huella positiva.
        </p>
        <a
          href={WA_LINK}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-5 py-2 text-xs transition-colors hover:bg-[var(--gold)]/10"
        >
          <MessageCircle className="size-3.5" /> Cotiza tu mueble
        </a>
      </div>
    </section>
  );
}
