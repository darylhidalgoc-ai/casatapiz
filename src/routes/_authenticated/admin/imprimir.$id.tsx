import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { clp } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/imprimir/$id")({
  component: Imprimir,
});

function Imprimir() {
  const { id } = Route.useParams();
  const { data: t } = useQuery({
    queryKey: ["trabajo-print", id],
    queryFn: async () => (await supabase.from("trabajos").select("*").eq("id", id).single()).data,
  });
  if (!t) return <p className="text-muted-foreground">Cargando…</p>;
  const abono = Math.round(t.valor_total / 2);
  const fecha = t.fecha.split("-").reverse().join("-");

  return (
    <div>
      <div className="mb-4 print:hidden"><Button onClick={() => window.print()}>Imprimir / Guardar PDF</Button></div>
      <article className="mx-auto max-w-3xl space-y-6 bg-background p-10 text-foreground shadow print:shadow-none">
        <header className="border-b-2 border-accent pb-4">
          <h1 className="font-serif text-4xl text-primary">COTIZACIÓN</h1>
          <p className="text-sm">N° {t.numero} | Fecha: {fecha}</p>
        </header>
        <section className="grid gap-3 sm:grid-cols-3 text-sm">
          <div><p className="text-xs uppercase text-muted-foreground">Cliente</p><p>{t.cliente}</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Dirección</p><p>{t.direccion}{t.comuna && `, ${t.comuna}`}</p></div>
          <div><p className="text-xs uppercase text-muted-foreground">Teléfono</p><p>{t.telefono}</p></div>
        </section>
        {t.descripcion && (
          <section><h2 className="font-serif text-xl text-primary">Trabajo a renovar</h2><p className="whitespace-pre-line text-sm">{t.descripcion}</p></section>
        )}
        <section className="rounded bg-primary p-5 text-primary-foreground">
          <h2 className="font-serif text-xl">Inversión</h2>
          <div className="mt-2 space-y-1 text-sm">
            <Row a="Valor total" b={clp(t.valor_total)} strong />
            <Row a="Abono inicial (50%)" b={clp(abono)} />
            <Row a="Saldo contra entrega (50%)" b={clp(t.valor_total - abono)} />
          </div>
          <p className="mt-2 text-xs opacity-80">* Valor no incluye IVA (Exento/Boleta).</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-primary">El servicio incluye</h2>
          <ul className="list-disc pl-5 text-sm">{t.incluye.map((i) => <li key={i}>{i}</li>)}</ul>
        </section>
        <section className="text-sm">
          <h2 className="font-serif text-xl text-primary">Condiciones de pago</h2>
          <p>50% de abono al inicio del trabajo y 50% de saldo al recibir su sofá.</p>
        </section>
        <section className="text-sm">
          <h2 className="font-serif text-xl text-primary">Compromiso sustentable</h2>
          <p>Buscamos el mejor camino para una renovación consciente. Estamos asociados con Reforestemos y Ecocitex para ir generando un cambio real hacia una industria textil más sustentable.</p>
        </section>
        <section className="grid gap-1 rounded border p-4 text-sm sm:grid-cols-2">
          <p><strong>Empresa:</strong> Casa Tapiz SpA</p>
          <p><strong>RUT:</strong> 78.497.685-8</p>
          <p><strong>Medio de pago:</strong> Mercado Pago — Cuenta Vista</p>
          <p><strong>N° de cuenta:</strong> 1072811910</p>
          <p><strong>Correo:</strong> casatapiz26@gmail.com</p>
        </section>
        <footer className="border-t pt-3 text-center text-xs text-muted-foreground">
          Casa Tapiz — Tapicería de muebles · casatapiz26@gmail.com · Esta cotización tiene una validez de 15 días a partir de la fecha de emisión.
        </footer>
      </article>
    </div>
  );
}

function Row({ a, b, strong }: { a: string; b: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "text-lg font-semibold" : ""}`}><span>{a}</span><span>{b}</span></div>;
}
