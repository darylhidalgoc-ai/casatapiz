import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, TreePine, Leaf, Sparkles, MessageCircle } from "lucide-react";

import { WA_LINK } from "@/components/WhatsAppFab";

const SLIDES = [
  {
    icon: TreePine,
    eyebrow: "Con Fundación Reforestemos",
    title: "Un árbol por cada tapizado",
    text: "Cada mueble que renovamos se convierte en un árbol nativo plantado en Chile.",
    cta: { label: "Ver el compromiso verde", href: "#arbol" },
  },
  {
    icon: Leaf,
    eyebrow: "Tapicería verde",
    title: "Tapicería verde en Santiago",
    text: "Telas reciclables, espumas reutilizadas y cero muebles al vertedero.",
    cta: { label: "Cotiza por WhatsApp", href: WA_LINK },
  },
  {
    icon: Sparkles,
    eyebrow: "Nuestro propósito",
    title: "Queremos dejar una huella positiva",
    text: "Ser la empresa de tapicería más verde de Chile: menos residuos, más oficio.",
    cta: { label: "Pedir presupuesto", href: "#presupuesto" },
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[index]!;
  const Icon = slide.icon;

  return (
    <section
      aria-label="Compromiso verde de Casa Tapiz"
      className="border-b border-[var(--gold)]/20 bg-[var(--forest)] text-[var(--cream)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 lg:px-8">
        <button
          onClick={prev}
          aria-label="Anterior"
          className="hidden shrink-0 rounded-full border border-[var(--gold)]/40 p-1.5 text-[var(--gold)] transition-colors hover:bg-[var(--gold)]/10 sm:block"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex min-h-16 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center sm:text-left">
          <Icon className="size-6 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
          <div className="min-w-0">
            <p className="eyebrow text-[var(--gold)]">{slide.eyebrow}</p>
            <p className="font-display text-lg leading-tight lg:text-xl">{slide.title}</p>
            <p className="text-xs text-[var(--cream)]/75">{slide.text}</p>
          </div>
          <a
            href={slide.cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
          >
            <MessageCircle className="size-3.5" /> {slide.cta.label}
          </a>
        </div>

        <button
          onClick={next}
          aria-label="Siguiente"
          className="hidden shrink-0 rounded-full border border-[var(--gold)]/40 p-1.5 text-[var(--gold)] transition-colors hover:bg-[var(--gold)]/10 sm:block"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Ir a ${s.title}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-[var(--cream)]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
