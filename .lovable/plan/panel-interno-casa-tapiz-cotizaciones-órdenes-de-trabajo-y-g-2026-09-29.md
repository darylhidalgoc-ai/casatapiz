# Panel interno Casa Tapiz: cotizaciones, órdenes de trabajo y gastos

## Qué vas a tener
- **Acceso privado** (`/admin`) con correo y contraseña. Solo usuarios con rol administrador ven el panel; el sitio público no cambia.
- **Cotizaciones**: formulario con cliente, dirección, comuna, teléfono, descripción del mueble, lo que incluye el servicio, valor total. Calcula automáticamente abono 50% y saldo 50%, y genera número tipo `CT-20260929-OO` (fecha + iniciales), igual que tu PDF actual.
- **Vista imprimible / PDF** de la cotización con el formato de tu documento (datos de empresa, RUT, cuenta Mercado Pago, condiciones, compromiso sustentable con Reforestemos y Ecocitex, validez 15 días).
- **Estados del trabajo**: Cotización → Aprobada (orden de trabajo) → En taller → Terminada → Entregada. Marcar abono y saldo recibidos.
- **Gastos por trabajo (por sofá)**: agregar en cualquier momento líneas con categoría, monto, fecha y nota. Categorías: Espuma, Tela, Retiro/Despacho, Pago tapicero, Pago costurera, Otros.
- **Margen por trabajo**: valor cobrado − gastos = ganancia y % de margen, visible en cada orden.
- **Dashboard**: ingresos del mes, gastos del mes, ganancia, trabajos por estado, gasto por categoría (gráfico), ranking de trabajos por margen, y leads del formulario web para convertirlos en cotización con un clic.

## Pantallas
```text
/admin/login          ingreso
/admin                dashboard
/admin/trabajos       lista con filtros por estado
/admin/trabajos/nuevo nueva cotización
/admin/trabajos/:id   detalle: datos, estado, pagos, gastos, margen
/admin/trabajos/:id/imprimir  cotización para PDF
```

## Detalles técnicos
- Tablas: `trabajos` (cliente, contacto, comuna, descripción, incluye[], valor_total, abono_pagado, saldo_pagado, estado, numero), `gastos` (trabajo_id, categoria enum, monto, fecha, nota), `user_roles` + `has_role()` para rol admin. RLS: solo admin lee/escribe; se reutiliza `presupuestos` (leads) con lectura solo admin.
- Rutas protegidas bajo `_authenticated/admin/...`; login email/contraseña (Google opcional). El primer admin lo asigno yo a tu correo tras que te registres.
- Montos en CLP enteros, sin IVA (boleta exenta), formato `$369.500`.
- PDF vía impresión del navegador (Guardar como PDF), sin librerías pesadas.
- Nota: el despliegue por cPanel estático no soporta el panel (necesita servidor); el panel funcionará en la versión publicada de Lovable.

## Pregunta abierta
- ¿Qué correo usarás como administrador? (se puede agregar más adelante a la costurera/tapicero con acceso limitado si quieres).
