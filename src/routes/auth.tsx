import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso interno | Casa Tapiz" },
      { name: "description", content: "Acceso privado al panel de trabajos de Casa Tapiz." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acceso interno | Casa Tapiz" },
      { property: "og:description", content: "Acceso privado al panel de Casa Tapiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res =
      modo === "login"
        ? await supabase.auth.signInWithPassword({ email, password: pass })
        : await supabase.auth.signUp({
            email,
            password: pass,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setLoading(false);
    if (res.error) { toast.error(res.error.message); return; }
    if (modo === "registro" && !res.data.session) {
      { toast.success("Revisa tu correo para confirmar la cuenta."); return; }
    }
    nav({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-lg bg-background p-8 shadow-xl">
        <h1 className="font-serif text-3xl text-foreground">Casa Tapiz · Panel</h1>
        <p className="text-sm text-muted-foreground">
          {modo === "login" ? "Ingresa con tu cuenta" : "Crea tu cuenta de administrador"}
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pass">Contraseña</Label>
          <Input id="pass" type="password" minLength={6} required value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {modo === "login" ? "Ingresar" : "Crear cuenta"}
        </Button>
        <button
          type="button"
          className="w-full text-sm text-muted-foreground underline"
          onClick={() => setModo(modo === "login" ? "registro" : "login")}
        >
          {modo === "login" ? "¿No tienes cuenta? Regístrate" : "Ya tengo cuenta"}
        </button>
      </form>
    </main>
  );
}
