import {
  MessageCircle,
  Clock,
  Truck,
  BadgeCheck,
  ShieldCheck,
  TreePine,
  Phone,
} from "lucide-react";

import { TEL_LINK } from "@/config/site";
import { WA_LINK } from "@/components/WhatsAppFab";

export function CtaInline({
  label = "Cotiza tu mueble por WhatsApp",
  note,
}: {
  label?: string;
  note?: string;
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
      <a
        href={WA_LINK}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)]"
      >
        <MessageCircle className="size-4" /> {label}
      </a>
      <a
        href={TEL_LINK}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--forest)]/25 px-6 py-3 text-sm text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
      >
        <Phone className="size-4" /> Llamar
      </a>
      <span className="text-xs text-muted-foreground">
        {note ?? "Respuesta el mismo día · Presupuesto sin costo"}
      </span>
    </div>
  );
}

const CONFIANZA = [
  { icon: Clock, label: "Respuesta el mismo día" },
  { icon: BadgeCheck, label: "Presupuesto sin costo" },
  { icon: Truck, label: "Retiro y entrega en tu comuna" },
  { icon: ShieldCheck, label: "Garantía en terminaciones y costuras" },
  { icon: TreePine, label: "Un árbol por cada tapizado" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <ul className="mx-auto grid max-w-6xl gap-x-6 gap-y-3 px-6 py-6 text-sm sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {CONFIANZA.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-muted-foreground">
            <item.icon className="size-4 shrink-0 text-[var(--gold)]" strokeWidth={1.6} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CtaBanda() {
  return (
    <section className="bg-[var(--forest-deep)] py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center text-[var(--cream)] lg:px-8">
        <p className="eyebrow text-[var(--gold)]">Tapicería verde en Santiago</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">
          Cotiza sin costo hoy y <span className="text-[var(--gold)]">planta tu árbol.</span>
        </h2>
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
            <Phone className="size-4" /> Llamar ahora
          </a>
          <a
            href="#presupuesto"
            className="inline-flex items-center rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm transition-colors hover:bg-[var(--gold)]/10"
          >
            Pedir presupuesto online
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[var(--cream)]/75">
          <li className="flex items-center gap-2">
            <Clock className="size-3.5 text-[var(--gold)]" /> Respuesta el mismo día
          </li>
          <li className="flex items-center gap-2">
            <BadgeCheck className="size-3.5 text-[var(--gold)]" /> Presupuesto sin costo
          </li>
          <li className="flex items-center gap-2">
            <Truck className="size-3.5 text-[var(--gold)]" /> Retiro en tu comuna
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-[var(--gold)]" /> Garantía en terminaciones
          </li>
        </ul>
      </div>
    </section>
  );
}
