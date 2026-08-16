# Casa Tapiz — Banner rotativo, árbol por tapizado y más llamados a la acción

## 1. Banner slider inicial (home)
Franja rotativa sobre el hero, en verde bosque con detalles dorados, que cambia sola cada ~5 segundos (con pausa al pasar el mouse y flechas/puntos para navegar):

1. **Un árbol por cada tapizado** — junto a Fundación Reforestemos.
2. **Tapicería verde** — materiales responsables, cero mueble al vertedero.
3. **Huella positiva** — queremos ser la empresa de tapicería más verde de Chile.

Cada slide lleva su propio botón de acción (Cotizar por WhatsApp / Ver el compromiso verde).

## 2. Sección "Un árbol por cada tapizado"
Nueva sección en la home dedicada a la alianza con Fundación Reforestemos:
- Título, explicación del compromiso (cada mueble tapizado = un árbol plantado en Chile).
- Tres puntos: el mueble se salva, la espuma se reutiliza, el árbol se planta.
- Imagen de bosque/plantación nativa generada para la marca.
- Botón "Quiero renovar y plantar mi árbol" hacia el formulario/WhatsApp.

Se resume también en las tres páginas de servicio con una franja compacta, para que el mensaje verde aparezca en todo el sitio.

## 3. Botón flotante de WhatsApp
Botón fijo abajo a la derecha en todas las páginas, con fondo blanco y borde suave para que resalte sobre fondos verdes, ícono de WhatsApp en verde y etiqueta "Cotiza gratis" en escritorio. Accesible (aria-label) y siempre visible al hacer scroll.

## 4. Más llamados a la acción (imán de clientes)
- CTA al cierre de cada sección larga de la home (pilares, proceso, cobertura, antes/después, manifiesto).
- Franja CTA fija de ancho completo antes del footer: "Cotiza sin costo hoy" con WhatsApp + formulario.
- Botón de WhatsApp también en la barra de navegación (escritorio) y en las páginas de servicio, entre los bullets y la cobertura.
- Microcopy de confianza junto a cada CTA (respuesta el mismo día, presupuesto sin costo, retiro en tu comuna).

## Detalles técnicos
- Nuevo `src/components/HeroSlider.tsx` (estado con `useEffect`/`setInterval`, respeta `prefers-reduced-motion`), `src/components/ArbolPorTapizado.tsx`, `src/components/CtaBanda.tsx` y `src/components/WhatsAppFab.tsx`.
- `WhatsAppFab` y la franja CTA se montan en `Page` de `ServiceLayout.tsx` y en `src/routes/index.tsx` para cubrir las 4 rutas.
- Colores solo con tokens existentes (`--forest`, `--gold`, `--cream`); se añade un token blanco para el botón flotante si hace falta.
- Imagen de reforestación generada en `src/assets/`, con `loading="lazy"` y `alt` descriptivo.
- SEO: se añade "Tapicería verde" y la alianza al copy y a las descripciones; el JSON-LD existente se mantiene y se suma la mención en la descripción del negocio.
- El número de WhatsApp sigue siendo el placeholder `56900000000` hasta que lo reemplaces.
