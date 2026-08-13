import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";

import logo from "@/assets/casa-tapiz-logo.png.asset.json";
import heroSillon from "@/assets/hero-sillon.jpg";
import telas from "@/assets/telas.jpg";
import antes from "@/assets/antes.jpg";
import despues from "@/assets/despues.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Tapiz | Tapicería de muebles ecosustentable" },
      {
        name: "description",
        content:
          "El primer taller de tapicería que renueva tus muebles con materiales responsables y cero mueble al vertedero.",
      },
      { property: "og:title", content: "Casa Tapiz | Tapicería ecosustentable" },
      {
        property: "og:description",
        content: "Renovamos lo que amas con oficio, telas responsables y cero desperdicio.",
      },
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

function Index() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <header className="relative overflow-hidden bg-[var(--forest-deep)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-16 lg:grid-cols-2 lg:items-center lg:gap-4 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="text-[var(--cream)]">
            <img
              src={logo.url}
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
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--cream)]/80">
              En Casa Tapiz transformamos, renovamos y damos nueva vida a lo que hace de tu hogar{" "}
              <span className="text-[var(--gold)]">tu lugar</span>. Somos un taller que trabaja lo
              más verde posible: menos residuos, mejores materiales, muebles que duran.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/56900000000"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
              >
                <MessageCircle className="size-4" /> Cotiza tu mueble
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
        </div>
      </section>

      {/* ANTES / DESPUÉS */}
      <section className="bg-[var(--forest-deep)] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-3xl text-[var(--cream)] lg:text-4xl">
            Renovamos lo que amas.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { src: antes, label: "Antes", alt: "Sofá de cuero café desgastado antes del trabajo" },
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
              continúe. Para nosotros tapizar es reciclar: restauramos antes de reemplazar,
              elegimos materiales con menor huella y gestionamos cada residuo de forma responsable.
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
          </div>
        </div>
      </section>

      {/* CONTACTO */}
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
          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-[var(--cream)]/60">
            <MapPin className="size-3.5" /> Taller con retiro y entrega a domicilio
          </p>
          <p className="mt-2 text-xs text-[var(--cream)]/50">
            © {new Date().getFullYear()} Casa Tapiz · Tapicería de muebles
          </p>
        </div>
      </footer>
    </div>
  );
}
