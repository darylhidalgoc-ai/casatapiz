import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { INCLUYE_DEFAULT, clp, generarNumero } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/trabajos/nuevo")({
  validateSearch: z.object({ lead: z.string().optional() }),
  component: Nuevo,
});

function Nuevo() {
  const { lead } = Route.useSearch();
  const nav = useNavigate();
  const [f, setF] = useState({ cliente: "", direccion: "", comuna: "", telefono: "", descripcion: "", valor: "" });
  const [incluye, setIncluye] = useState(INCLUYE_DEFAULT.join("\n"));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!lead) return;
    supabase.from("presupuestos").select("*").eq("id", lead).maybeSingle().then(({ data }) => {
      if (data)
        setF((p) => ({
          ...p,
          cliente: data.nombre,
          comuna: data.comuna,
          telefono: data.telefono,
          descripcion: `${data.tipo_mueble} · ${data.material}${data.mensaje ? `\n${data.mensaje}` : ""}`,
        }));
    });
  }, [lead]);

  const valor = parseInt(f.valor.replace(/\D/g, "") || "0", 10);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!f.cliente.trim()) { toast.error("Falta el nombre del cliente"); return; }
    setSaving(true);
    const { data, error } = await supabase
      .from("trabajos")
      .insert({
        numero: generarNumero(f.cliente),
        cliente: f.cliente.trim(),
        direccion: f.direccion || null,
        comuna: f.comuna || null,
        telefono: f.telefono || null,
        descripcion: f.descripcion || null,
        incluye: incluye.split("\n").map((s) => s.trim()).filter(Boolean),
        valor_total: valor,
        presupuesto_id: lead ?? null,
      })
      .select("id")
      .single();
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Cotización creada");
    nav({ to: "/admin/trabajos/$id", params: { id: data.id } });
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <h1 className="font-serif text-3xl">Nueva cotización</h1>
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Field label="Cliente"><Input value={f.cliente} onChange={set("cliente")} required /></Field>
          <Field label="Teléfono"><Input value={f.telefono} onChange={set("telefono")} /></Field>
          <Field label="Dirección"><Input value={f.direccion} onChange={set("direccion")} /></Field>
          <Field label="Comuna"><Input value={f.comuna} onChange={set("comuna")} /></Field>
          <div className="sm:col-span-2"><Field label="Trabajo a renovar"><Textarea value={f.descripcion} onChange={set("descripcion")} rows={3} /></Field></div>
          <div className="sm:col-span-2"><Field label="El servicio incluye (uno por línea)"><Textarea value={incluye} onChange={(e) => setIncluye(e.target.value)} rows={6} /></Field></div>
          <Field label="Valor total (CLP)"><Input inputMode="numeric" value={f.valor} onChange={set("valor")} placeholder="369500" /></Field>
          <div className="text-sm text-muted-foreground self-end">
            Total {clp(valor)} · Abono 50% {clp(valor / 2)} · Saldo {clp(valor - Math.round(valor / 2))}
          </div>
        </CardContent>
      </Card>
      <Button type="submit" disabled={saving}>Guardar cotización</Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>;
}
