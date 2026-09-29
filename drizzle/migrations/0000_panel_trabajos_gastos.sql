CREATE TYPE public.app_role AS ENUM ('admin','user');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- First registered user becomes admin automatically
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

CREATE TYPE public.trabajo_estado AS ENUM ('cotizacion','aprobada','en_taller','terminada','entregada','cancelada');
CREATE TYPE public.gasto_categoria AS ENUM ('espuma','tela','retiro','tapicero','costurera','otros');

CREATE TABLE public.trabajos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL,
  cliente text NOT NULL,
  direccion text,
  comuna text,
  telefono text,
  descripcion text,
  incluye text[] NOT NULL DEFAULT '{}',
  valor_total integer NOT NULL DEFAULT 0,
  abono_pagado boolean NOT NULL DEFAULT false,
  saldo_pagado boolean NOT NULL DEFAULT false,
  estado public.trabajo_estado NOT NULL DEFAULT 'cotizacion',
  presupuesto_id uuid,
  fecha date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trabajos TO authenticated;
GRANT ALL ON public.trabajos TO service_role;
ALTER TABLE public.trabajos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin all trabajos" ON public.trabajos FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gastos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trabajo_id uuid NOT NULL REFERENCES public.trabajos(id) ON DELETE CASCADE,
  categoria public.gasto_categoria NOT NULL,
  monto integer NOT NULL DEFAULT 0,
  fecha date NOT NULL DEFAULT current_date,
  nota text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gastos TO authenticated;
GRANT ALL ON public.gastos TO service_role;
ALTER TABLE public.gastos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin all gastos" ON public.gastos FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX gastos_trabajo_idx ON public.gastos(trabajo_id);

GRANT SELECT ON public.presupuestos TO authenticated;
CREATE POLICY "admin read presupuestos" ON public.presupuestos FOR SELECT TO authenticated
USING (public.has_role(auth.uid(),'admin'));