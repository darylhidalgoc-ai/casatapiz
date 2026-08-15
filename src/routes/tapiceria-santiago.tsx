import { PresupuestoForm } from "@/components/PresupuestoForm";
import { createFileRoute } from "@tanstack/react-router";

import {
  Bullets,
  ComunasGrid,
  Faq,
  Page,
  ServiceHero,
  SITE,
  faqLd,
  serviceLd,
} from "@/components/ServiceLayout";
import heroSillon from "@/assets/hero-sillon.jpg";

const TITLE = "Tapicería en Santiago | Casa Tapiz — Región Metropolitana";
const DESC =
  "Tapicería en Santiago: retapizado de sillones, sofás, sillas y cabeceras con materiales responsables. Retiro y entrega en toda la Región Metropolitana.";
const PATH = "/tapiceria-santiago";

const FAQ = [
  {
    q: "¿Cuánto cuesta tapizar un sillón en Santiago?",
    a: "Depende del tamaño, el estado de la estructura y la tela elegida. Te enviamos un presupuesto sin costo después de ver fotos o revisar el mueble.",
  },
  {
    q: "¿Retiran el mueble a domicilio?",
    a: "Sí. Coordinamos retiro y entrega en Santiago Centro y en las comunas de la Región Metropolitana.",
  },
  {
    q: "¿Cuánto demora el trabajo?",
    a: "La mayoría de los muebles está listo entre 7 y 15 días hábiles, según la complejidad y la disponibilidad de la tela.",
  },
  {
    q: "¿Qué hacen con los materiales que sacan?",
    a: "Tapizar es reciclar: recuperamos la estructura, enviamos las espumas para ser reutilizadas y aprovechamos los retazos de tela en cojines y accesorios.",
  },
];

export const Route = createFileRoute("/tapiceria-santiago")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}${PATH}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceLd({ name: "Tapicería de muebles", description: DESC, path: PATH }),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
    ],
  }),
  component: TapiceriaPage,
});

function TapiceriaPage() {
  return (
    <Page>
      <ServiceHero
        eyebrow="Servicio de tapicería"
        title="Tapicería en Santiago para muebles que merecen"
        highlight="otra vida."
        text="Retapizamos sillones, sofás, sillas de comedor, poltronas y cabeceras con oficio artesanal y materiales de bajo impacto. Trabajamos en Santiago y llegamos a toda la Región Metropolitana."
        image={heroSillon}
        imageAlt="Sillón retapizado en terciopelo verde por Casa Tapiz en Santiago"
      />

      <Bullets
        title="Qué tapizamos"
        items={[
          "Sillones y sofás de 1, 2 y 3 cuerpos",
          "Sillas de comedor y piso de bar",
          "Poltronas, butacas y sillones de lectura",
          "Respaldos y cabeceras de cama a medida",
          "Cojines, banquetas y pufs",
          "Muebles de oficina, cafés y locales comerciales",
        ]}
      />

      <ComunasGrid intro="Retiramos y entregamos tu mueble en Santiago Centro, sector oriente, sur, norte y poniente. Escríbenos con tu comuna y te confirmamos día de retiro." />

      <PresupuestoForm />

      <Faq items={FAQ} />
    </Page>
  );
}
