import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIAS, ESTADOS, categoriaLabel, clp, type Categoria, type Estado, type Trabajo } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/trabajos/$id")({
  component: Detalle,
});

function Detalle() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const nav = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ["trabajo", id],
    queryFn: async () => {
      const [t, g] = await Promise.all([
        supabase.from("trabajos").select("*").eq("id", id).single(),
        supabase.from("gastos").select("*").eq("trabajo_id", id).order("fecha", { ascending: false }),
      ]);
      return { t: t.data, gastos: g.data ?? [] };
    },
  });
  const [cat, setCat] = useState<Categoria>("espuma");
  const [monto, setMonto] = useState("");
  const [nota, setNota] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

  if (!data) return <p className="text-muted-foreground">Cargando…</p>;
  if (!data.t) return <p>Trabajo no encontrado.</p>;
  const t = data.t;
  const totalGastos = data.gastos.reduce((s, g) => s + g.monto, 0);
  const ganancia = t.valor_total - totalGastos;

  async function update(patch: Partial<Trabajo>) {
    const { error } = await supabase.from("trabajos").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    refetch();
    qc.invalidateQueries({ queryKey: ["trabajos"] });
  }
  async function agregarGasto(e: React.FormEvent) {
    e.preventDefault();
    const m = parseInt(monto.replace(/\D/g, "") || "0", 10);
    if (!m) { toast.error("Ingresa un monto"); return; }
    const { error } = await supabase.from("gastos").insert({ trabajo_id: id, categoria: cat, monto: m, nota: nota || null, fecha });
    if (error) { toast.error(error.message); return; }
    setMonto(""); setNota("");
    refetch();
  }
  async function borrarGasto(gid: string) {
    await supabase.from("gastos").delete().eq("id", gid);
    refetch();
  }
  async function borrarTrabajo() {
    if (!confirm("¿Eliminar este trabajo y sus gastos?")) return;
    await supabase.from("trabajos").delete().eq("id", id);
    nav({ to: "/admin/trabajos" });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">{t.numero} · {t.fecha}</p>
          <h1 className="font-serif text-3xl">{t.cliente}</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/admin/imprimir/$id" params={{ id }}>Ver cotización / PDF</Link></Button>
          <Button variant="ghost" onClick={borrarTrabajo}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Valor cobrado</p><p className="text-2xl font-semibold">{clp(t.valor_total)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Gastos</p><p className="text-2xl font-semibold">{clp(totalGastos)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Ganancia</p><p className={`text-2xl font-semibold ${ganancia < 0 ? "text-destructive" : ""}`}>{clp(ganancia)} <span className="text-base font-normal">({t.valor_total ? Math.round((ganancia / t.valor_total) * 100) : 0}%)</span></p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Estado y pagos</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center gap-6">
          <Select value={t.estado} onValueChange={(v) => update({ estado: v as Estado })}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>{ESTADOS.map((e) => <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>)}</SelectContent>
          </Select>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={t.abono_pagado} onCheckedChange={(v) => update({ abono_pagado: !!v })} />
            Abono recibido ({clp(Math.round(t.valor_total / 2))})
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={t.saldo_pagado} onCheckedChange={(v) => update({ saldo_pagado: !!v })} />
            Saldo recibido ({clp(t.valor_total - Math.round(t.valor_total / 2))})
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Gastos de este trabajo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={agregarGasto} className="grid gap-2 sm:grid-cols-[180px_130px_150px_1fr_auto]">
            <Select value={cat} onValueChange={(v) => setCat(v as Categoria)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIAS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Monto" inputMode="numeric" value={monto} onChange={(e) => setMonto(e.target.value)} />
            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            <Input placeholder="Nota (proveedor, detalle…)" value={nota} onChange={(e) => setNota(e.target.value)} />
            <Button type="submit">Agregar</Button>
          </form>
          <table className="w-full text-sm">
            <tbody>
              {data.gastos.map((g) => (
                <tr key={g.id} className="border-t">
                  <td className="py-2">{g.fecha}</td><td>{categoriaLabel(g.categoria)}</td><td>{g.nota}</td>
                  <td className="text-right">{clp(g.monto)}</td>
                  <td className="w-10 text-right"><Button size="icon" variant="ghost" onClick={() => borrarGasto(g.id)}><Trash2 className="h-4 w-4" /></Button></td>
                </tr>
              ))}
              {data.gastos.length === 0 && <tr><td className="py-4 text-muted-foreground">Aún no hay gastos registrados.</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Datos del cliente</CardTitle></CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p><strong>Dirección:</strong> {t.direccion} {t.comuna && `, ${t.comuna}`}</p>
          <p><strong>Teléfono:</strong> {t.telefono}</p>
          <p className="whitespace-pre-line"><strong>Trabajo:</strong> {t.descripcion}</p>
        </CardContent>
      </Card>
    </div>
  );
}
