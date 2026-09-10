import { createFileRoute, Link } from "@tanstack/react-router";

import { PresupuestoForm } from "@/components/PresupuestoForm";
import { Faq, SiteNav, faqLd } from "@/components/ServiceLayout";
import { HeroSlider } from "@/components/HeroSlider";
import { ArbolPorTapizado } from "@/components/ArbolPorTapizado";
import { CtaBanda, CtaInline, TrustStrip } from "@/components/CtaBanda";
import { WhatsAppFab, WA_LINK } from "@/components/WhatsAppFab";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Testimonios } from "@/components/Testimonios";
import { SITE as SITE_INFO, TEL_LINK } from "@/config/site";

import {
  Leaf,
  Recycle,
  Hammer,
  MessageCircle,
  Ruler,
  Palette,
  Sofa,
  Scissors,
  Instagram,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import logo from "@/assets/casa-tapiz-logo.png";
import arbolFooter from "@/assets/arbol-footer.png";
import heroSillon from "@/assets/hero-sillon.jpg";
import telas from "@/assets/telas.jpg";
import antes from "@/assets/antes.jpg";
import despues from "@/assets/despues.jpg";

const FAQ_HOME = [
  {
    q: "¿Cuánto cuesta tapizar un sillón en Santiago?",
    a: "El valor depende del tamaño del mueble, el estado de la estructura y la tela que elijas. Envíanos fotos por WhatsApp y te damos un presupuesto sin costo el mismo día.",
  },
  {
    q: "¿Retiran y entregan el mueble a domicilio?",
    a: "Sí. Coordinamos retiro y entrega en Santiago y comunas de la Región Metropolitana, para que no tengas que mover el mueble.",
  },
  {
    q: "¿Cuánto demora el trabajo?",
    a: "La mayoría de los muebles está listo entre 7 y 15 días hábiles, según la complejidad y la disponibilidad de la tela.",
  },
  {
    q: "¿Tienen garantía?",
    a: "Sí, garantizamos terminaciones y costuras. Trabajamos con materiales duraderos y telas reciclables para que el mueble dure otra década.",
  },
  {
    q: "¿Qué pasa con los materiales que sacan?",
    a: "Tapizar es reciclar: recuperamos la estructura, enviamos las espumas a reutilización y aprovechamos los retazos de tela en cojines y accesorios.",
  },
  {
    q: "¿Puedo elegir mi propia tela?",
    a: "Sí. Puedes traer tu tela o elegir dentro de nuestro muestrario, que prioriza tejidos duraderos y reciclables.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tapicería en Santiago | Casa Tapiz — Región Metropolitana" },
      {
        name: "description",
        content:
          "Tapicería verde en Santiago y toda la Región Metropolitana. Renovamos sillones, sillas y cabeceras con materiales responsables y plantamos un árbol por cada tapizado con Fundación Reforestemos.",
      },
      {
        property: "og:title",
        content: "Tapicería en Santiago | Casa Tapiz — Región Metropolitana",
      },
      {
        property: "og:description",
        content:
          "Tapicería verde en Santiago y toda la Región Metropolitana. Renovamos sillones, sillas y cabeceras con materiales responsables y plantamos un árbol por cada tapizado con Fundación Reforestemos.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Casa Tapiz",
          description:
            "Taller de tapicería verde en Santiago y la Región Metropolitana: un árbol plantado por cada mueble tapizado, junto a Fundación Reforestemos.",
          url: "/",
          telephone: `+${SITE_INFO.whatsapp}`,
          image: `${SITE_INFO.url}/og-casatapiz.jpg`,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Santiago",
            addressRegion: "Región Metropolitana",
            addressCountry: "CL",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -33.4489,
            longitude: -70.6693,
          },
          areaServed: [
            {
              "@type": "City",
              name: "Santiago",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Región Metropolitana",
                addressCountry: "CL",
              },
            },
            {
              "@type": "AdministrativeArea",
              name: "Región Metropolitana de Santiago",
              addressCountry: "CL",
            },
          ],
          serviceType: "Tapicería de muebles",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ_HOME)) },
    ],
  }),
  component: Index,
});

const pilares = [
  {
    icon: Recycle,
    title: "Tapizar es reciclar",
    text: "Recuperamos estructuras, reutilizamos espumas y evitamos que un mueble termine en el vertedero.",
  },
  {
    icon: Leaf,
    title: "Telas que reciclan",
    text: "Linos, algodones y tejidos reciclados que, al final de su vida, pueden volver a reciclarse.",
  },
  {
    icon: Hammer,
    title: "Oficio que dura",
    text: "Trabajo manual pensado para que tu mueble viva otra década, no otra temporada.",
  },
];

const pasos = [
  { icon: MessageCircle, title: "Cuéntanos", text: "Hablemos de tu idea y lo que necesitas." },
  { icon: Ruler, title: "Evaluamos", text: "Revisamos tu mueble y te asesoramos." },
  { icon: Palette, title: "Eliges", text: "Telas y materiales que reflejan tu estilo." },
  { icon: Scissors, title: "Renovamos", text: "Trabajamos con dedicación y detalle." },
  { icon: Sofa, title: "Disfrutas", text: "Tu mueble, como nuevo, de vuelta en casa." },
];

const comunas = [
  {
    zona: "Santiago Centro",
    lista: ["Santiago", "Estación Central", "Maipú", "Pudahuel", "Quilicura"],
  },
  {
    zona: "Santiago Oriente",
    lista: ["Las Condes", "Vitacura", "Providencia", "Ñuñoa", "La Reina", "Peñalolén", "Macul"],
  },
  {
    zona: "Santiago Sur",
    lista: ["La Florida", "Puente Alto", "San Bernardo", "La Pintana", "El Bosque", "San Miguel"],
  },
  {
    zona: "Santiago Norte / Poniente",
    lista: [
      "Recoleta",
      "Independencia",
      "Quinta Normal",
      "Lo Prado",
      "Cerro Navia",
      "Renca",
      "Huechuraba",
    ],
  },
];

const servicios = [
  {
    to: "/tapiceria-santiago" as const,
    title: "Tapicería en Santiago",
    text: "Retapizado de sillones, sofás, sillas y cabeceras con telas duraderas y reciclables.",
  },
  {
    to: "/tapicero-santiago" as const,
    title: "Tapicero a domicilio",
    text: "Evaluación, retiro y entrega en tu comuna de la Región Metropolitana.",
  },
  {
    to: "/restauracion-de-muebles-santiago" as const,
    title: "Restauración de muebles",
    text: "Estructura, madera, espumas y tapiz para muebles antiguos con historia.",
  },
];

function Index() {
  return (
    <div className="bg-background pb-16 lg:pb-0">
      <SiteNav />
      <HeroSlider />
      <WhatsAppFab />
      <MobileCtaBar />

      {/* HERO */}
      <header className="relative overflow-hidden bg-[var(--forest-deep)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-16 lg:grid-cols-2 lg:items-center lg:gap-4 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="text-[var(--cream)]">
            <img
              src={logo}
              alt="Casa Tapiz, tapicería de muebles"
              width={320}
              height={320}
              className="-ml-2 w-48 mix-blend-lighten lg:w-60"
            />
            <h1 className="mt-4 font-display text-5xl leading-[1.05] lg:text-6xl">
              Comienza una
              <br />
              <span className="text-[var(--gold)]">nueva historia.</span>
            </h1>
            <span className="rule-gold mt-6" />
            <p className="mt-2 inline-flex items-center rounded-full border border-[var(--gold)]/40 px-3 py-1 text-xs text-[var(--gold)]">
              Tapicero en Santiago y toda la Región Metropolitana
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--cream)]/80">
              En Casa Tapiz transformamos, renovamos y damos nueva vida a lo que hace de tu hogar{" "}
              <span className="text-[var(--gold)]">tu lugar</span>. Somos un taller de tapicería en
              Santiago y la Región Metropolitana que trabaja lo más verde posible: menos residuos,
              mejores materiales, muebles que duran.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA_LINK}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
              >
                <MessageCircle className="size-4" /> Cotiza tu mueble
              </a>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm text-[var(--cream)] transition-colors hover:bg-[var(--gold)]/10"
              >
                <Phone className="size-4" /> {SITE_INFO.phoneDisplay}
              </a>
              <a
                href="#proceso"
                className="inline-flex items-center rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm text-[var(--cream)] transition-colors hover:bg-[var(--gold)]/10"
              >
                Cómo trabajamos
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroSillon}
              alt="Sillón renovado en terciopelo verde sobre pared verde bosque"
              width={1408}
              height={1200}
              className="h-full w-full rounded-sm object-cover shadow-2xl"
            />
          </div>
        </div>
      </header>

      <TrustStrip />

      {/* PILARES ECO */}
      <section className="border-b border-border bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow text-[var(--gold)]">Taller ecosustentable</p>
          <h2 className="mt-3 max-w-2xl text-3xl lg:text-4xl">
            Renovar es la decisión más verde que puedes tomar por tu casa.
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.title}>
                <p.icon className="size-7 text-[var(--gold)]" strokeWidth={1.4} />
                <h3 className="mt-4 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
          <CtaInline label="Cotiza tu tapizado verde" />
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-3xl lg:text-4xl">Así renovamos tus muebles</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {pasos.map((paso, i) => (
              <li key={paso.title} className="text-center">
                <paso.icon
                  className="mx-auto size-9 text-[var(--forest)]"
                  strokeWidth={1.2}
                  aria-hidden
                />
                <span className="mt-4 inline-flex size-6 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-medium text-[var(--forest-deep)]">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-lg">{paso.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{paso.text}</p>
              </li>
            ))}
          </ol>
          <div className="flex justify-center">
            <CtaInline label="Empieza tu proyecto" />
          </div>
        </div>
      </section>

      {/* COBERTURA */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow text-[var(--gold)]">Zona de servicio</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">
            Tapicero en Santiago y toda la{" "}
            <span className="text-[var(--gold)]">Región Metropolitana</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Retiramos y entregamos a domicilio en Santiago Centro y comunas de la Región
            Metropolitana. Si no encuentras la tuya, escríbenos y te confirmamos disponibilidad.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {comunas.map((grupo) => (
              <div key={grupo.zona} className="rounded-sm border border-border p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--forest)]">
                  {grupo.zona}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {grupo.lista.join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <CtaInline
            label="Consulta por tu comuna"
            note="Retiro y entrega en toda la Región Metropolitana"
          />
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-t border-border bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow text-[var(--gold)]">Nuestros servicios</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">En qué te podemos ayudar</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {servicios.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="rounded-sm border border-border bg-background p-6 transition-colors hover:border-[var(--gold)]"
              >
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <span className="mt-4 inline-block text-sm text-[var(--gold)]">Ver más →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ArbolPorTapizado />

      <PresupuestoForm />

      {/* ANTES / DESPUÉS */}
      <section className="bg-[var(--forest-deep)] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-3xl text-[var(--cream)] lg:text-4xl">
            Renovamos lo que amas.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                src: antes,
                label: "Antes",
                alt: "Sofá de cuero café desgastado antes del trabajo",
              },
              {
                src: despues,
                label: "Después",
                alt: "El mismo sofá retapizado en tela verde oliva",
              },
            ].map((img) => (
              <figure key={img.label} className="relative overflow-hidden rounded-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={700}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <figcaption
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs tracking-widest uppercase ${
                    img.label === "Antes"
                      ? "bg-[var(--forest-deep)]/85 text-[var(--cream)]"
                      : "bg-[var(--gold)] text-[var(--forest-deep)]"
                  }`}
                >
                  {img.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Testimonios />

      {/* MANIFIESTO */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <img
            src={telas}
            alt="Muestras de telas en tonos tierra sobre mesa de taller"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-sm object-cover"
          />
          <div>
            <p className="eyebrow text-[var(--gold)]">Nuestro compromiso</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">
              Más que tapicería,
              <br />
              <span className="text-[var(--gold)]">creamos hogares.</span>
            </h2>
            <span className="rule-gold mt-6" />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Cada mueble cuenta una historia, y en Casa Tapiz nos encargamos de que la tuya
              continúe. Para nosotros tapizar es reciclar: restauramos antes de reemplazar, elegimos
              materiales con menor huella y gestionamos cada residuo de forma responsable.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Muebles rescatados en vez de desechados",
                "Espumas enviadas para ser reutilizadas",
                "Telas reciclables y retazos reutilizados en cojines y accesorios",
                "Asesoría honesta: si no vale la pena renovarlo, te lo decimos",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Leaf className="mt-0.5 size-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <CtaInline label="Renueva tu mueble con nosotros" />
          </div>
        </div>
      </section>

      <Faq items={FAQ_HOME} />

      <CtaBanda />

      {/* CONTACTO */}
      <footer className="relative overflow-hidden bg-[var(--forest)] py-16 text-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <img
            src={arbolFooter}
            alt="Árbol ilustrado que representa el compromiso de Casa Tapiz: un árbol por cada tapizado"
            width={320}
            height={320}
            loading="lazy"
            className="mx-auto h-40 w-auto drop-shadow-lg"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
            Un árbol por cada tapizado
          </p>
          <h2 className="mt-4 text-3xl lg:text-4xl">Bienvenidos a Casa Tapiz.</h2>
          <p className="mt-4 text-[var(--cream)]/75">
            Cuéntanos qué mueble quieres renovar y te enviamos una propuesta.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WA_LINK}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
            >
              <MessageCircle className="size-4" /> Escríbenos por WhatsApp
            </a>
            <a
              href={TEL_LINK}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm transition-colors hover:bg-[var(--gold)]/10"
            >
              <Phone className="size-4" /> {SITE_INFO.phoneDisplay}
            </a>
            <a
              href={SITE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm transition-colors hover:bg-[var(--gold)]/10"
            >
              <Instagram className="size-4" /> Instagram
            </a>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[var(--cream)]/70">
            <a href={TEL_LINK} className="inline-flex items-center gap-2 hover:text-[var(--gold)]">
              <Phone className="size-3.5" /> {SITE_INFO.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="inline-flex items-center gap-2 hover:text-[var(--gold)]"
            >
              <Mail className="size-3.5" /> {SITE_INFO.email}
            </a>
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-[var(--cream)]/60">
            <MapPin className="size-3.5" /> Taller en Santiago · Retiro y entrega en toda la Región
            Metropolitana
          </p>
          <p className="mt-2 text-xs text-[var(--cream)]/50">
            © {new Date().getFullYear()} Casa Tapiz · Tapicería de muebles
          </p>
        </div>
      </footer>
    </div>
  );
}
