import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORIAS, ESTADOS, clp } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [t, g, p] = await Promise.all([
        supabase.from("trabajos").select("*").order("created_at", { ascending: false }),
        supabase.from("gastos").select("*"),
        supabase.from("presupuestos").select("*").order("created_at", { ascending: false }).limit(10),
      ]);
      return { trabajos: t.data ?? [], gastos: g.data ?? [], leads: p.data ?? [] };
    },
  });
  if (!data) return <p className="text-muted-foreground">Cargando…</p>;

  const mes = new Date().toISOString().slice(0, 7);
  const activos = data.trabajos.filter((t) => t.estado !== "cotizacion" && t.estado !== "cancelada");
  const ingresosMes = activos.filter((t) => t.fecha.startsWith(mes)).reduce((s, t) => s + t.valor_total, 0);
  const gastosMes = data.gastos.filter((g) => g.fecha.startsWith(mes)).reduce((s, g) => s + g.monto, 0);
  const porCat = CATEGORIAS.map((c) => ({
    ...c,
    total: data.gastos.filter((g) => g.categoria === c.value).reduce((s, g) => s + g.monto, 0),
  }));
  const maxCat = Math.max(1, ...porCat.map((c) => c.total));
  const margenes = activos
    .map((t) => {
      const gasto = data.gastos.filter((g) => g.trabajo_id === t.id).reduce((s, g) => s + g.monto, 0);
      return { t, gasto, ganancia: t.valor_total - gasto };
    })
    .sort((a, b) => b.ganancia - a.ganancia)
    .slice(0, 8);
  const usados = new Set(data.trabajos.map((t) => t.presupuesto_id).filter(Boolean));

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi title="Ingresos del mes" value={clp(ingresosMes)} />
        <Kpi title="Gastos del mes" value={clp(gastosMes)} />
        <Kpi title="Ganancia del mes" value={clp(ingresosMes - gastosMes)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Trabajos por estado</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm">
            {ESTADOS.map((e) => (
              <div key={e.value} className="flex justify-between rounded bg-muted px-3 py-2">
                <span>{e.label}</span>
                <strong>{data.trabajos.filter((t) => t.estado === e.value).length}</strong>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Gasto por categoría</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {porCat.map((c) => (
              <div key={c.value}>
                <div className="flex justify-between"><span>{c.label}</span><span>{clp(c.total)}</span></div>
                <div className="h-2 rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${(c.total / maxCat) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Margen por trabajo</CardTitle></CardHeader>
        <CardContent>
          {margenes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no hay trabajos aprobados.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground"><tr><th>Trabajo</th><th>Cobrado</th><th>Gastos</th><th>Ganancia</th></tr></thead>
              <tbody>
                {margenes.map(({ t, gasto, ganancia }) => (
                  <tr key={t.id} className="border-t">
                    <td className="py-2"><Link to="/admin/trabajos/$id" params={{ id: t.id }} className="underline">{t.numero} · {t.cliente}</Link></td>
                    <td>{clp(t.valor_total)}</td><td>{clp(gasto)}</td>
                    <td className={ganancia < 0 ? "text-destructive" : ""}>{clp(ganancia)} ({t.valor_total ? Math.round((ganancia / t.valor_total) * 100) : 0}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Leads del sitio web</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {data.leads.length === 0 && <p className="text-muted-foreground">Sin leads todavía.</p>}
          {data.leads.map((l) => (
            <div key={l.id} className="flex flex-wrap items-center justify-between gap-2 border-t pt-2">
              <span><strong>{l.nombre}</strong> · {l.tipo_mueble} · {l.material} · {l.comuna} · {l.telefono}</span>
              {usados.has(l.id) ? (
                <span className="text-muted-foreground">Cotizado</span>
              ) : (
                <Button asChild size="sm" variant="outline">
                  <Link to="/admin/trabajos/nuevo" search={{ lead: l.id }}>Crear cotización</Link>
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm font-normal text-muted-foreground">{title}</CardTitle></CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  );
}
