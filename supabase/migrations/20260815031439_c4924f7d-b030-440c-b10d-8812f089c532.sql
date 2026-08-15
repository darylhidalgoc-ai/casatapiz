CREATE TABLE public.presupuestos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  telefono text NOT NULL,
  tipo_mueble text NOT NULL,
  material text NOT NULL,
  comuna text NOT NULL,
  mensaje text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.presupuestos TO anon, authenticated;
GRANT ALL ON public.presupuestos TO service_role;

ALTER TABLE public.presupuestos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar una solicitud"
ON public.presupuestos FOR INSERT TO anon, authenticated
WITH CHECK (
  length(nombre) BETWEEN 1 AND 100
  AND length(telefono) BETWEEN 1 AND 30
  AND length(tipo_mueble) BETWEEN 1 AND 60
  AND length(material) BETWEEN 1 AND 60
  AND length(comuna) BETWEEN 1 AND 60
  AND (mensaje IS NULL OR length(mensaje) <= 1000)
);