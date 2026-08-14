import { Link } from "@tanstack/react-router";
import { Instagram, Leaf, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import logo from "@/assets/casa-tapiz-logo.png.asset.json";

export const COMUNAS = [
  { zona: "Santiago Centro y Poniente", lista: ["Santiago", "Estación Central", "Maipú", "Pudahuel", "Quinta Normal", "Lo Prado", "Cerro Navia", "Renca"] },
  { zona: "Santiago Oriente", lista: ["Las Condes", "Vitacura", "Lo Barnechea", "Providencia", "Ñuñoa", "La Reina", "Peñalolén", "Macul"] },
  { zona: "Santiago Sur", lista: ["La Florida", "Puente Alto", "San Bernardo", "La Cisterna", "El Bosque", "San Miguel", "La Pintana", "Pedro Aguirre Cerda"] },
  { zona: "Santiago Norte y alrededores", lista: ["Recoleta", "Independencia", "Conchalí", "Huechuraba", "Quilicura", "Colina", "Lampa"] },
];

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/tapiceria-santiago", label: "Tapicería" },
  { to: "/tapicero-santiago", label: "Tapicero" },
  { to: "/restauracion-de-muebles-santiago", label: "Restauración" },
];

export function SiteNav() {
  return (
    <nav className="border-b border-[var(--gold)]/20 bg-[var(--forest-deep)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 lg:px-8">
        <Link to="/" className="mr-auto">
          <img
            src={logo.url}
            alt="Casa Tapiz"
            width={160}
            height={160}
            className="w-24 mix-blend-lighten"
          />
        </Link>
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{ className: "text-[var(--gold)]" }}
            className="text-sm text-[var(--cream)]/80 transition-colors hover:text-[var(--gold)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--forest)] py-16 text-[var(--cream)]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl lg:text-4xl">Bienvenidos a Casa Tapiz.</h2>
        <p className="mt-4 text-[var(--cream)]/75">
          Cuéntanos qué mueble quieres renovar y te enviamos una propuesta.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/56900000000"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
          >
            <MessageCircle className="size-4" /> Escríbenos por WhatsApp
          </a>
          <a
            href="https://instagram.com"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm transition-colors hover:bg-[var(--gold)]/10"
          >
            <Instagram className="size-4" /> Instagram
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[var(--cream)]/70">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-[var(--gold)]">
              {item.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--cream)]/60">
          <MapPin className="size-3.5" /> Taller en Santiago · Retiro y entrega en toda la Región
          Metropolitana
        </p>
        <p className="mt-2 text-xs text-[var(--cream)]/50">
          © {new Date().getFullYear()} Casa Tapiz · Tapicería de muebles
        </p>
      </div>
    </footer>
  );
}

export function ComunasGrid({ intro }: { intro: string }) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="eyebrow text-[var(--gold)]">Zona de servicio</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">
          Cobertura en Santiago y la{" "}
          <span className="text-[var(--gold)]">Región Metropolitana</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMUNAS.map((grupo) => (
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
      </div>
    </section>
  );
}

export function ServiceHero({
  eyebrow,
  title,
  highlight,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="bg-[var(--forest-deep)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-16 lg:pb-24">
        <div className="text-[var(--cream)]">
          <p className="eyebrow text-[var(--gold)]">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] lg:text-5xl">
            {title} <span className="text-[var(--gold)]">{highlight}</span>
          </h1>
          <span className="rule-gold mt-6" />
          <p className="mt-6 max-w-md leading-relaxed text-[var(--cream)]/80">{text}</p>
          <a
            href="https://wa.me/56900000000"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
          >
            <MessageCircle className="size-4" /> Cotiza por WhatsApp
          </a>
        </div>
        <img
          src={image}
          alt={imageAlt}
          width={1200}
          height={900}
          className="rounded-sm object-cover shadow-2xl"
        />
      </div>
    </header>
  );
}

export function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-b border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl lg:text-4xl">{title}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed">
              <Leaf className="mt-0.5 size-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl">Preguntas frecuentes</h2>
        <dl className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.q} className="border-b border-border pb-6">
              <dt className="text-lg">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

export const SITE = "https://casatapiz.lovable.app";

export function serviceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${SITE}${path}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Casa Tapiz",
      image: logo.url,
      telephone: "+56900000000",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
    },
    areaServed: [
      { "@type": "City", name: "Santiago" },
      { "@type": "AdministrativeArea", name: "Región Metropolitana de Santiago" },
      ...COMUNAS.flatMap((g) => g.lista).map((c) => ({ "@type": "City", name: c })),
    ],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
