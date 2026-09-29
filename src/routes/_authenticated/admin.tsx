import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel | Casa Tapiz" },
      { name: "description", content: "Panel interno de trabajos y gastos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Panel | Casa Tapiz" },
      { property: "og:description", content: "Panel interno de Casa Tapiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const nav = useNavigate();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      return !!data;
    },
  });

  async function salir() {
    await supabase.auth.signOut();
    nav({ to: "/auth" });
  }

  if (isLoading) return <p className="p-8 text-muted-foreground">Cargando…</p>;
  if (!isAdmin)
    return (
      <div className="p-8 space-y-4">
        <p>Tu cuenta ({user.email}) no tiene acceso de administrador.</p>
        <Button variant="outline" onClick={salir}>Salir</Button>
      </div>
    );

  const link = "px-3 py-2 rounded-md text-sm hover:bg-primary-foreground/10";
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-primary text-primary-foreground print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <span className="mr-4 font-serif text-xl">Casa Tapiz</span>
          <Link to="/admin" activeOptions={{ exact: true }} className={link} activeProps={{ className: "bg-primary-foreground/15" }}>Dashboard</Link>
          <Link to="/admin/trabajos" activeOptions={{ exact: true }} className={link} activeProps={{ className: "bg-primary-foreground/15" }}>Trabajos</Link>
          <Link to="/admin/trabajos/nuevo" className={link} activeProps={{ className: "bg-primary-foreground/15" }}>Nueva cotización</Link>
          <button onClick={salir} className={`${link} ml-auto`}>Salir</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 print:p-0 print:max-w-none">
        <Outlet />
      </main>
    </div>
  );
}
