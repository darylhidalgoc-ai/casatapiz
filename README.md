# Tapiceria eco

Cree casa tapiz y quiero ser el primer taller ecosustenable o tratando de ser lo más verde posible. Además de posicionarlo en lo más alto de la categoría

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://casatapiz.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4435ee97-4967-45cf-8d1d-7c1cc8b3b2a9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Personalización rápida

Todos los datos operativos están en `src/config/site.ts`:

- **WhatsApp, teléfono, email, Instagram**: cambia ahí y se actualiza en todo el sitio.
- **Reseñas de clientes**: pega reseñas reales en el arreglo `TESTIMONIOS`. Si además
  completas `GOOGLE_REVIEWS_URL`, aparece un botón para que los clientes reseñen en Google.
- **Analítica (GA4 / Meta Pixel)**: define `VITE_GA4_ID` y/o `VITE_META_PIXEL_ID`
  (ver `.env.example`). Si están vacíos no se carga nada. Se registran los eventos
  `click_whatsapp`, `click_llamar`, `click_email`, `submit_presupuesto` y `page_view`.

## Despliegue en cPanel

Cada push a `main` ejecuta el workflow `.github/workflows/cpanel.yml`, que compila el
sitio, genera la versión estática y la sube por FTP a `public_html` (secrets
`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`). También queda un artefacto
`casatapiz-cpanel.zip` descargable por si se necesita subir a mano.
