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
import telas from "@/assets/telas.jpg";

const TITLE = "Tapicero en Santiago a domicilio | Casa Tapiz";
const DESC =
  "Tapicero en Santiago con retiro y entrega a domicilio en toda la Región Metropolitana. Presupuesto sin costo, trabajo artesanal y materiales responsables.";
const PATH = "/tapicero-santiago";

const FAQ = [
  {
    q: "¿Cómo pido un presupuesto con el tapicero?",
    a: "Escríbenos por WhatsApp con fotos del mueble y tu comuna. Te respondemos con un rango de precio y coordinamos la visita o el retiro.",
  },
  {
    q: "¿Atienden a domicilio?",
    a: "Sí, hacemos evaluación a domicilio en la Región Metropolitana y retiramos el mueble para trabajarlo en nuestro taller de Santiago.",
  },
  {
    q: "¿Trabajan con telas del cliente?",
    a: "Sí. Puedes traer tu tela o elegir dentro de nuestro muestrario, que prioriza tejidos duraderos y reciclables.",
  },
];

export const Route = createFileRoute("/tapicero-santiago")({
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
          serviceLd({ name: "Servicio de tapicero a domicilio", description: DESC, path: PATH }),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
    ],
  }),
  component: TapiceroPage,
});

function TapiceroPage() {
  return (
    <Page>
      <ServiceHero
        eyebrow="Tapicero a domicilio"
        title="Un tapicero en Santiago que te acompaña"
        highlight="de principio a fin."
        text="Evaluamos tu mueble, te asesoramos con honestidad sobre telas y estructura, retiramos, trabajamos en taller y devolvemos a tu casa. Cobertura en toda la Región Metropolitana."
        image={telas}
        imageAlt="Muestrario de telas del tapicero de Casa Tapiz en Santiago"
      />

      <Bullets
        title="Cómo trabaja nuestro tapicero"
        items={[
          "Presupuesto sin costo a partir de fotos o visita",
          "Asesoría de telas según uso, mascotas y luz solar",
          "Refuerzo de estructura, resortes y cinchas",
          "Cambio o reutilización de espumas según estado",
          "Retiro y entrega coordinada en tu comuna",
          "Garantía de terminaciones y costuras",
        ]}
      />

      <ComunasGrid intro="Nuestro tapicero se desplaza por Santiago y la Región Metropolitana. Indícanos tu comuna al escribir y agendamos la visita." />

      <PresupuestoForm />

      <Faq items={FAQ} />
    </Page>
  );
}
