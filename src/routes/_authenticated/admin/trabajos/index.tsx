import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ESTADOS, clp, estadoLabel, type Estado } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/trabajos/")({
  component: Lista,
});

function Lista() {
  const [filtro, setFiltro] = useState<Estado | "todos">("todos");
  const { data } = useQuery({
    queryKey: ["trabajos"],
    queryFn: async () => {
      const [t, g] = await Promise.all([
        supabase.from("trabajos").select("*").order("created_at", { ascending: false }),
        supabase.from("gastos").select("trabajo_id, monto"),
      ]);
      return { trabajos: t.data ?? [], gastos: g.data ?? [] };
    },
  });
  const lista = (data?.trabajos ?? []).filter((t) => filtro === "todos" || t.estado === filtro);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-serif text-3xl">Trabajos</h1>
        <Button asChild><Link to="/admin/trabajos/nuevo">Nueva cotización</Link></Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[{ value: "todos" as const, label: "Todos" }, ...ESTADOS].map((e) => (
          <Button key={e.value} size="sm" variant={filtro === e.value ? "default" : "outline"} onClick={() => setFiltro(e.value)}>
            {e.label}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left"><tr>
              <th className="p-3">N°</th><th>Cliente</th><th>Comuna</th><th>Estado</th><th>Valor</th><th>Gastos</th><th>Ganancia</th>
            </tr></thead>
            <tbody>
              {lista.map((t) => {
                const gasto = (data?.gastos ?? []).filter((g) => g.trabajo_id === t.id).reduce((s, g) => s + g.monto, 0);
                return (
                  <tr key={t.id} className="border-t">
                    <td className="p-3"><Link to="/admin/trabajos/$id" params={{ id: t.id }} className="underline">{t.numero}</Link></td>
                    <td>{t.cliente}</td><td>{t.comuna}</td><td>{estadoLabel(t.estado)}</td>
                    <td>{clp(t.valor_total)}</td><td>{clp(gasto)}</td><td>{clp(t.valor_total - gasto)}</td>
                  </tr>
                );
              })}
              {lista.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Sin trabajos.</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
