import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, Recycle, Shirt, Sparkles, TreePine } from "lucide-react";

import { CtaInline } from "@/components/CtaBanda";
import { Page, SITE } from "@/components/ServiceLayout";
import reforestacion from "@/assets/reforestacion.jpg";
import telas from "@/assets/telas.jpg";

const TITLE = "Nuestro compromiso verde | Casa Tapiz — Reforestemos y Ecocitex";
const DESC =
  "En Casa Tapiz plantamos un árbol nativo por cada mueble tapizado con Fundación Reforestemos y enviamos las telas sobrantes a reciclar a Ecocitex. Tapizar es reciclar.";
const PATH = "/compromiso";

const PILARES = [
  {
    icon: TreePine,
    title: "1 árbol por cada mueble",
    text: "Cada mueble que sale de nuestro taller se traduce en un árbol nativo plantado en Chile con Fundación Reforestemos.",
  },
  {
    icon: Shirt,
    title: "La tela vuelve al ciclo",
    text: "Los retazos y telas que sobran del sofá se envían a Ecocitex para transformarse en nueva materia prima.",
  },
  {
    icon: Recycle,
    title: "Cero muebles al vertedero",
    text: "Recuperamos estructura, reutilizamos espumas y aprovechamos los materiales en vez de desecharlos.",
  },
];

export const Route = createFileRoute("/compromiso")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}${PATH}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          description: DESC,
          url: `${SITE}${PATH}`,
          isPartOf: { "@type": "WebSite", name: "Casa Tapiz", url: SITE },
        }),
      },
    ],
  }),
  component: CompromisoPage,
});

function CompromisoPage() {
  return (
    <Page>
      {/* HERO */}
      <header className="bg-[var(--forest-deep)]">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16 lg:px-8 lg:pt-20 lg:pb-24">
          <p className="eyebrow text-[var(--gold)]">Nuestro compromiso</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] text-[var(--cream)] lg:text-5xl">
            Tapizar es <span className="text-[var(--gold)]">reciclar.</span>
          </h1>
          <span className="rule-gold mt-6" />
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--cream)]/80">
            En Casa Tapiz no solo renovamos muebles: le devolvemos valor a lo que otros desechan.
            Para que cada trabajo tenga un impacto real, trabajamos junto a dos aliados que cierran
            el círculo: <span className="text-[var(--gold)]">Fundación Reforestemos</span> y{" "}
            <span className="text-[var(--gold)]">Ecocitex</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#reforestemos"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
            >
              <TreePine className="size-4" /> Reforestemos
            </a>
            <a
              href="#ecocitex"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm text-[var(--cream)] transition-colors hover:bg-[var(--gold)]/10"
            >
              <Shirt className="size-4" /> Ecocitex
            </a>
          </div>
        </div>
      </header>

      {/* PILARES */}
      <section className="border-b border-border bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl lg:text-4xl">
            Un mueble renovado, <span className="text-[var(--gold)]">dos impactos positivos.</span>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {PILARES.map((p) => (
              <div key={p.title}>
                <p.icon className="size-7 text-[var(--gold)]" strokeWidth={1.4} />
                <h3 className="mt-4 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFORESTEMOS */}
      <section id="reforestemos" className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <img
            src={reforestacion}
            alt="Manos plantando árboles nativos en Chile con Fundación Reforestemos"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-sm object-cover shadow-2xl"
          />
          <div>
            <p className="eyebrow text-[var(--gold)]">Con Fundación Reforestemos</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">
              Un árbol nativo por cada <span className="text-[var(--gold)]">mueble tapizado.</span>
            </h2>
            <span className="rule-gold mt-6" />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Trabajamos junto a Fundación Reforestemos, la organización que reforesta Chile con
              especies nativas. Por cada mueble que renovamos en nuestro taller plantamos un árbol:
              lo que era basura se convierte en bosque.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "1 mueble renovado = 1 árbol nativo plantado en Chile",
                "Reforestación con especies nativas, no exóticas",
                "Impacto ambiental medible y verificable",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Leaf className="mt-0.5 size-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://reforestemos.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--gold)] hover:underline"
            >
              Conoce Fundación Reforestemos <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ECOCITEX */}
      <section id="ecocitex" className="border-t border-border bg-secondary py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-[var(--gold)]">Con Ecocitex</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">
              La tela que sobra <span className="text-[var(--gold)]">vuelve al ciclo.</span>
            </h2>
            <span className="rule-gold mt-6" />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Cuando retapizamos un sofá siempre quedan retazos y telas que ya no usamos. En vez de
              botarlos, los enviamos a <strong>Ecocitex</strong>, la empresa chilena que recicla
              textiles y los convierte en nueva materia prima. Así la tela del sofá no termina en la
              basura: vuelve a la cadena productiva.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Enviamos las telas y retazos sobrantes a Ecocitex",
                "Ecocitex las recicla y las transforma en nueva materia prima",
                "Menos residuo textil y más economía circular",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Recycle
                    className="mt-0.5 size-4 shrink-0 text-[var(--gold)]"
                    strokeWidth={1.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.ecocitex.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--gold)] hover:underline"
            >
              Conoce Ecocitex <ArrowRight className="size-4" />
            </a>
          </div>
          <img
            src={telas}
            alt="Telas y retazos que Casa Tapiz envía a reciclar a Ecocitex"
            width={1200}
            height={900}
            loading="lazy"
            className="order-1 rounded-sm object-cover shadow-2xl lg:order-2"
          />
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow text-[var(--gold)]">El ciclo completo</p>
          <h2 className="mt-3 max-w-2xl text-3xl lg:text-4xl">
            Así cerramos el círculo con tu mueble.
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "1. Renovamos",
                text: "Retapizamos tu mueble recuperando estructura y espumas, sin generar un mueble nuevo.",
              },
              {
                icon: Shirt,
                title: "2. Reciclamos la tela",
                text: "Los retazos y telas sobrantes viajan a Ecocitex para volver a ser materia prima.",
              },
              {
                icon: TreePine,
                title: "3. Plantamos un árbol",
                text: "Con Fundación Reforestemos plantamos un árbol nativo por cada mueble renovado.",
              },
            ].map((paso) => (
              <li key={paso.title} className="rounded-sm border border-border p-6">
                <paso.icon className="size-7 text-[var(--forest)]" strokeWidth={1.4} />
                <h3 className="mt-4 text-lg">{paso.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{paso.text}</p>
              </li>
            ))}
          </ol>
          <CtaInline label="Quiero renovar y reciclar mi mueble" />
        </div>
      </section>
    </Page>
  );
}
