import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { COMUNAS } from "@/components/ServiceLayout";
import { supabase } from "@/integrations/supabase/client";

export const WHATSAPP_NUMBER = "56900000000";

const TIPOS = [
  "Sillón / Sofá",
  "Butaca o poltrona",
  "Sillas de comedor",
  "Respaldo o cabecera de cama",
  "Puff o banqueta",
  "Mueble antiguo (restauración)",
  "Otro",
];

const MATERIALES = [
  "Tela reciclable",
  "Lino / algodón",
  "Chenille",
  "Terciopelo",
  "Cuero o símil cuero",
  "Impermeable / pet friendly",
  "No lo sé, necesito asesoría",
];

const TODAS_LAS_COMUNAS = COMUNAS.flatMap((g) => g.lista).sort((a, b) =>
  a.localeCompare(b, "es"),
);

const schema = z.object({
  nombre: z.string().trim().min(2, "Cuéntanos tu nombre").max(100),
  telefono: z
    .string()
    .trim()
    .min(8, "Ingresa un teléfono válido")
    .max(30)
    .regex(/^[0-9+()\s-]+$/, "Solo números y símbolos telefónicos"),
  tipo_mueble: z.string().trim().min(1, "Selecciona el tipo de mueble").max(60),
  material: z.string().trim().min(1, "Selecciona un material").max(60),
  comuna: z.string().trim().min(1, "Selecciona tu comuna").max(60),
  mensaje: z.string().trim().max(1000).optional(),
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-[var(--gold)]/30 bg-[var(--forest-deep)] px-4 py-3 text-sm text-[var(--cream)] outline-none transition-colors focus:border-[var(--gold)]";

export function PresupuestoForm() {
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrores(next);
      toast.error("Revisa los datos del formulario");
      return;
    }
    setErrores({});
    setEnviando(true);

    const data = parsed.data;
    const { error } = await supabase.from("presupuestos").insert({
      nombre: data.nombre,
      telefono: data.telefono,
      tipo_mueble: data.tipo_mueble,
      material: data.material,
      comuna: data.comuna,
      mensaje: data.mensaje || null,
    });
    setEnviando(false);

    if (error) {
      toast.error("No pudimos registrar tu solicitud. Intenta nuevamente.");
      return;
    }

    const texto = [
      `Hola Casa Tapiz 👋 Quiero un presupuesto rápido.`,
      `Nombre: ${data.nombre}`,
      `Teléfono: ${data.telefono}`,
      `Mueble: ${data.tipo_mueble}`,
      `Material: ${data.material}`,
      `Comuna: ${data.comuna}`,
      data.mensaje ? `Detalle: ${data.mensaje}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    toast.success("¡Listo! Te abrimos WhatsApp con el mensaje preparado.");
    form.reset();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section id="presupuesto" className="bg-[var(--forest)] py-16 text-[var(--cream)] lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="eyebrow text-[var(--gold)]">Presupuesto rápido</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">
          Cotiza tu mueble en <span className="text-[var(--gold)]">un minuto</span>
        </h2>
        <p className="mt-4 text-[var(--cream)]/75">
          Completa estos datos y te dejamos el mensaje listo para enviarnos por WhatsApp. Atendemos
          en Santiago y toda la Región Metropolitana.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="text-sm text-[var(--cream)]/80">
              Nombre
            </label>
            <input id="nombre" name="nombre" maxLength={100} className={fieldClass} placeholder="Tu nombre" />
            {errores['nombre'] && <p className="mt-1 text-xs text-[var(--gold)]">{errores['nombre']}</p>}
          </div>

          <div>
            <label htmlFor="telefono" className="text-sm text-[var(--cream)]/80">
              Teléfono / WhatsApp
            </label>
            <input
              id="telefono"
              name="telefono"
              inputMode="tel"
              maxLength={30}
              className={fieldClass}
              placeholder="+56 9 ..."
            />
            {errores['telefono'] && <p className="mt-1 text-xs text-[var(--gold)]">{errores['telefono']}</p>}
          </div>

          <div>
            <label htmlFor="tipo_mueble" className="text-sm text-[var(--cream)]/80">
              Tipo de mueble
            </label>
            <select id="tipo_mueble" name="tipo_mueble" defaultValue="" className={fieldClass}>
              <option value="">Selecciona…</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errores['tipo_mueble'] && (
              <p className="mt-1 text-xs text-[var(--gold)]">{errores['tipo_mueble']}</p>
            )}
          </div>

          <div>
            <label htmlFor="material" className="text-sm text-[var(--cream)]/80">
              Material o tela
            </label>
            <select id="material" name="material" defaultValue="" className={fieldClass}>
              <option value="">Selecciona…</option>
              {MATERIALES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {errores['material'] && <p className="mt-1 text-xs text-[var(--gold)]">{errores['material']}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="comuna" className="text-sm text-[var(--cream)]/80">
              Comuna
            </label>
            <select id="comuna" name="comuna" defaultValue="" className={fieldClass}>
              <option value="">Selecciona tu comuna…</option>
              {TODAS_LAS_COMUNAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Otra comuna de la Región Metropolitana">
                Otra comuna de la Región Metropolitana
              </option>
            </select>
            {errores['comuna'] && <p className="mt-1 text-xs text-[var(--gold)]">{errores['comuna']}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="mensaje" className="text-sm text-[var(--cream)]/80">
              Cuéntanos más (opcional)
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              maxLength={1000}
              className={fieldClass}
              placeholder="Medidas, estado de la espuma, color que buscas…"
            />
            {errores['mensaje'] && <p className="mt-1 text-xs text-[var(--gold)]">{errores['mensaje']}</p>}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-medium text-[var(--forest-deep)] transition-colors hover:bg-[var(--gold-soft)] disabled:opacity-60"
            >
              <MessageCircle className="size-4" />
              {enviando ? "Enviando…" : "Generar mensaje de WhatsApp"}
            </button>
            <p className="mt-3 text-xs text-[var(--cream)]/60">
              Guardamos tu solicitud para responderte aunque no completes el envío por WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
