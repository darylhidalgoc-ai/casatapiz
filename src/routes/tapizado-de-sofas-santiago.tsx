import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Check, ChevronRight, MessageCircle, Sofa, TreePine, Recycle } from "lucide-react";

import { ComunasGrid, Faq, Page, SITE, faqLd, serviceLd } from "@/components/ServiceLayout";
import { waLink } from "@/config/site";

const TITLE = "Tapizado de Sofás en Santiago | Casa Tapiz";
const DESC =
  "Renueva tu sofá con Casa Tapiz. Servicio de tapizado de sofás en Santiago, retiro y entrega a domicilio, variedad de telas y cotización por WhatsApp.";
const PATH = "/tapizado-de-sofas-santiago";
const WA = waLink("Hola Casa Tapiz 👋 Quiero cotizar el tapizado de mi sofá.");
const WA_TELAS = waLink("Hola Casa Tapiz 👋 Quiero ver opciones de telas para tapizar mi sofá.");

/**
 * Trabajos reales de sofás. Agrega aquí cada caso con sus fotos reales
 * (importa las imágenes desde src/assets). Mientras esté vacío, la sección
 * invita a ver trabajos por WhatsApp/Instagram en vez de mostrar fotos falsas.
 */
type Caso = {
  antes: string;
  despues: string;
  tipo: string;
  trabajo: string;
  tela?: string;
  comuna?: string;
};
const CASOS: Caso[] = [];

const TIPOS = [
  { t: "Sofás de 2 cuerpos", d: "Ideales para departamentos y espacios compactos." },
  { t: "Sofás de 3 cuerpos", d: "El sofá principal del living, renovado a tu gusto." },
  { t: "Sofás seccionales", d: "Formatos en L o esquineros, trabajados por módulo." },
  { t: "Sofás modulares", d: "Piezas independientes con un mismo acabado." },
  { t: "Sofás antiguos", d: "Estructuras de buena factura que vale la pena conservar." },
  { t: "Cojines desmontables", d: "Renovamos fundas, espumas y terminaciones." },
];

const PASOS = [
  { t: "Envíanos fotos", d: "Mándanos fotografías de tu sofá por WhatsApp para evaluar su tamaño y estado." },
  { t: "Recibe tu cotización", d: "Te orientamos sobre telas, materiales y el trabajo necesario." },
  { t: "Retiramos tu sofá", d: "Coordinamos el retiro a domicilio dentro de nuestra cobertura en Santiago." },
  { t: "Lo renovamos", d: "Nuestro equipo realiza el proceso de tapizado y restauración necesario." },
  { t: "Lo entregamos", d: "Tu sofá vuelve renovado y listo para comenzar una nueva historia." },
];

const TELAS = [
  { e: "🐾", t: "Hogares con mascotas", d: "Tejidos más resistentes a uñas y pelos." },
  { e: "👨‍👩‍👧", t: "Hogares con niños", d: "Telas durables que toleran el uso diario." },
  { e: "✨", t: "Fácil limpieza", d: "Alternativas que se mantienen con poco esfuerzo." },
  { e: "🛋️", t: "Alto tráfico", d: "Para el sofá que se usa todos los días." },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta tapizar un sofá?",
    a: "Depende principalmente del tamaño del sofá, el estado de la estructura y la espuma, el diseño y la tela que elijas. Envíanos fotografías por WhatsApp y te preparamos una cotización sin costo.",
  },
  {
    q: "¿Cuánto demora tapizar un sofá?",
    a: "Depende del tipo de sofá y del trabajo que necesite. Al cotizar te indicamos un plazo estimado para tu caso.",
  },
  {
    q: "¿Retiran el sofá a domicilio?",
    a: "Sí. Coordinamos el retiro y la entrega a domicilio dentro de nuestra cobertura en la Región Metropolitana.",
  },
  {
    q: "¿Puedo elegir la tela?",
    a: "Sí. Te orientamos según la estética que buscas, el uso que tendrá el sofá, si hay mascotas o niños en casa y tu presupuesto.",
  },
  {
    q: "¿Cambian también las espumas?",
    a: "Revisamos el estado de las espumas y, cuando es necesario, te recomendamos renovarlas para que el sofá recupere su comodidad.",
  },
  {
    q: "¿Puedo cotizar enviando fotografías?",
    a: "Sí, es la forma más rápida. Envíanos fotos de tu sofá por WhatsApp y cuéntanos qué quieres renovar.",
  },
];

export const Route = createFileRoute("/tapizado-de-sofas-santiago")({
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
        children: JSON.stringify(
          serviceLd({ name: "Tapizado de sofás", description: DESC, path: PATH }),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Tapicería", item: `${SITE}/tapiceria-santiago` },
            { "@type": "ListItem", position: 3, name: "Tapizado de sofás", item: `${SITE}${PATH}` },
          ],
        }),
      },
    ],
  }),
  component: SofasPage,
});

function WaButton({ href = WA, children, big }: { href?: string; children: React.ReactNode; big?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)] ${big ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
    >
      <MessageCircle className="size-4" /> {children}
    </a>
  );
}

function SofasPage() {
  return (
    <Page>
      {/* Hero */}
      <header className="bg-[var(--forest-deep)] text-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-6 pt-6 pb-16 lg:px-8 lg:pb-24">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1 text-xs text-[var(--cream)]/70">
            <Link to="/" className="hover:text-[var(--gold)]">Inicio</Link>
            <ChevronRight className="size-3" />
            <Link to="/tapiceria-santiago" className="hover:text-[var(--gold)]">Tapicería</Link>
            <ChevronRight className="size-3" />
            <span aria-current="page" className="text-[var(--gold)]">Tapizado de sofás</span>
          </nav>
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow text-[var(--gold)]">Renueva tu sofá sin tener que comprar uno nuevo</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.08] lg:text-6xl">
              Tapizado de sofás en <span className="text-[var(--gold)]">Santiago</span>
            </h1>
            <span className="rule-gold mt-6" />
            <p className="mt-6 max-w-xl leading-relaxed text-[var(--cream)]/80">
              Retiramos tu sofá, lo renovamos en nuestro taller y lo entregamos nuevamente en tu hogar.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Retiro y entrega en la Región Metropolitana",
                "Cotización sin costo",
                "Trabajo realizado por tapiceros",
                "Garantía Casa Tapiz",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-[var(--gold)]" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WaButton>Cotizar mi sofá</WaButton>
              <a
                href="#trabajos"
                className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-sm text-[var(--cream)] transition-colors hover:bg-[var(--gold)]/10"
              >
                Ver trabajos realizados
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Antes y después */}
      <section id="trabajos" className="scroll-mt-20 bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow text-[var(--gold)]">Trabajos reales</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">Mira lo que un buen tapizado puede hacer</h2>
          {CASOS.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {CASOS.map((c, i) => (
                <article key={i} className="overflow-hidden rounded-sm border border-border">
                  <div className="grid grid-cols-2">
                    <figure>
                      <img src={c.antes} alt={`${c.tipo} antes del tapizado`} loading="lazy" className="aspect-square w-full object-cover" />
                      <figcaption className="py-1 text-center text-xs text-muted-foreground">Antes</figcaption>
                    </figure>
                    <figure>
                      <img src={c.despues} alt={`${c.tipo} después del tapizado por Casa Tapiz`} loading="lazy" className="aspect-square w-full object-cover" />
                      <figcaption className="py-1 text-center text-xs text-muted-foreground">Después</figcaption>
                    </figure>
                  </div>
                  <div className="p-5 text-sm">
                    <h3 className="text-lg">{c.tipo}</h3>
                    <p className="mt-1 text-muted-foreground">{c.trabajo}</p>
                    {(c.tela || c.comuna) && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {[c.tela && `Tela: ${c.tela}`, c.comuna].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-sm border border-dashed border-border p-8 text-center">
              <Camera className="mx-auto size-8 text-[var(--gold)]" strokeWidth={1.5} />
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Estamos preparando nuestra galería de sofás renovados. Pídenos fotos de trabajos
                similares al tuyo por WhatsApp.
              </p>
              <div className="mt-6"><WaButton>Pedir fotos de trabajos</WaButton></div>
            </div>
          )}
        </div>
      </section>

      {/* Tipos */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl">Tapizamos distintos tipos de sofás</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIPOS.map((x) => (
              <article key={x.t} className="rounded-sm border border-border bg-background p-6">
                <Sofa className="size-6 text-[var(--gold)]" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl">Renovar tu sofá es más simple de lo que parece</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {PASOS.map((p, i) => (
              <li key={p.t} className="border-t-2 border-[var(--gold)] pt-4">
                <span className="font-display text-3xl text-[var(--gold)]">{i + 1}</span>
                <h3 className="mt-2 text-sm font-semibold uppercase tracking-wider">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10"><WaButton>Cotizar por WhatsApp</WaButton></div>
        </div>
      </section>

      {/* Vale la pena */}
      <section className="bg-[var(--forest-deep)] py-16 text-[var(--cream)] lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Recycle className="size-8 text-[var(--gold)]" strokeWidth={1.5} />
          <h2 className="mt-4 text-3xl lg:text-4xl">Antes de botarlo, mira lo que todavía puede ofrecer</h2>
          <p className="mt-6 leading-relaxed text-[var(--cream)]/80">
            Muchos sofás tienen estructuras firmes que pueden seguir usándose durante años. Renovar la
            tela, la espuma o las terminaciones puede darles una nueva vida. Cada sofá es distinto:
            te ayudamos a evaluar si el tuyo vale la pena retapizar.
          </p>
          <p className="mt-6 font-display text-2xl text-[var(--gold)]">
            Renovar también es una forma de reciclar.
          </p>
        </div>
      </section>

      {/* Telas */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl">Elige una tela pensada para tu forma de vivir</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Te orientamos para elegir la alternativa adecuada según el uso, la estética y tu presupuesto.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TELAS.map((x) => (
              <article key={x.t} className="rounded-sm border border-border p-6">
                <span className="text-3xl" aria-hidden>{x.e}</span>
                <h3 className="mt-3 text-lg">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10"><WaButton href={WA_TELAS}>Quiero ver opciones de telas</WaButton></div>
        </div>
      </section>

      {/* Responsable */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <TreePine className="size-8 text-[var(--gold)]" strokeWidth={1.5} />
          <h2 className="mt-4 text-3xl lg:text-4xl">Tu sofá puede comenzar una nueva historia</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Reutilizar el sofá que ya tienes evita que termine como desecho. Plantamos un árbol nativo
            por cada tapizado con <strong>Fundación Reforestemos</strong> y enviamos las telas
            sobrantes a reciclar con <strong>Ecocitex</strong>.
          </p>
          <Link to="/compromiso" className="mt-6 inline-block text-sm text-[var(--forest)] underline underline-offset-4">
            Conoce nuestro compromiso verde
          </Link>
        </div>
      </section>

      <section className="bg-background pt-16 lg:pt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl">Retiro y entrega de sofás en Santiago</h2>
        </div>
      </section>
      <ComunasGrid intro="Retiramos tu sofá y lo entregamos renovado dentro de nuestra cobertura en la Región Metropolitana. Escríbenos tu comuna y coordinamos." />

      <Faq items={FAQ} />

      {/* Enlaces internos */}
      <section className="bg-background py-10">
        <p className="mx-auto max-w-3xl px-6 text-sm text-muted-foreground lg:px-8">
          ¿Tienes otros muebles? Revisa nuestro servicio de{" "}
          <Link to="/tapiceria-santiago" className="text-[var(--forest)] underline underline-offset-4">tapicería en Santiago</Link>{" "}
          o de{" "}
          <Link to="/restauracion-de-muebles-santiago" className="text-[var(--forest)] underline underline-offset-4">restauración de muebles</Link>.
        </p>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--forest-deep)] py-16 text-center text-[var(--cream)] lg:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl lg:text-5xl">¿Tu sofá necesita una segunda oportunidad?</h2>
          <p className="mt-4 text-[var(--cream)]/80">Envíanos unas fotos y cuéntanos qué quieres renovar.</p>
          <div className="mt-8"><WaButton big>COTIZAR MI SOFÁ POR WHATSAPP</WaButton></div>
          <p className="mt-4 text-xs text-[var(--cream)]/60">Envíanos fotos de tu sofá para poder orientarte mejor.</p>
        </div>
      </section>
    </Page>
  );
}
