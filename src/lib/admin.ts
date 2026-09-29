import type { Database } from "@/integrations/supabase/types";

export type Trabajo = Database["public"]["Tables"]["trabajos"]["Row"];
export type Gasto = Database["public"]["Tables"]["gastos"]["Row"];
export type Estado = Database["public"]["Enums"]["trabajo_estado"];
export type Categoria = Database["public"]["Enums"]["gasto_categoria"];

export const clp = (n: number) => "$" + Math.round(n || 0).toLocaleString("es-CL");

export const ESTADOS: { value: Estado; label: string }[] = [
  { value: "cotizacion", label: "Cotización" },
  { value: "aprobada", label: "Aprobada" },
  { value: "en_taller", label: "En taller" },
  { value: "terminada", label: "Terminada" },
  { value: "entregada", label: "Entregada" },
  { value: "cancelada", label: "Cancelada" },
];
export const estadoLabel = (e: Estado) => ESTADOS.find((x) => x.value === e)?.label ?? e;

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: "espuma", label: "Compra de espuma" },
  { value: "tela", label: "Compra de tela" },
  { value: "retiro", label: "Retiro / despacho" },
  { value: "tapicero", label: "Pago tapicero" },
  { value: "costurera", label: "Pago costurera" },
  { value: "otros", label: "Otros" },
];
export const categoriaLabel = (c: Categoria) => CATEGORIAS.find((x) => x.value === c)?.label ?? c;

export const INCLUYE_DEFAULT = [
  "Tapiz a elección",
  "Cambio de espuma de asiento",
  "Refuerzo de relleno",
  "Refuerzo de huinchas",
  "Respaldo con costura moderna",
  "Retiro y entrega gratis",
];

export function generarNumero(cliente: string, fecha = new Date()) {
  const ymd = fecha.toISOString().slice(0, 10).replace(/-/g, "");
  const ini = cliente
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return `CT-${ymd}-${ini || "XX"}`;
}
