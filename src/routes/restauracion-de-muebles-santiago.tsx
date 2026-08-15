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
import despues from "@/assets/despues.jpg";

const TITLE = "Restauración de muebles en Santiago | Casa Tapiz";
const DESC =
  "Restauración de muebles antiguos y sillones en Santiago: estructura, madera, espumas y tapiz. Taller ecosustentable con retiro en la Región Metropolitana.";
const PATH = "/restauracion-de-muebles-santiago";

const FAQ = [
  {
    q: "¿Vale la pena restaurar un mueble antiguo?",
    a: "Casi siempre: las estructuras antiguas son de mejor madera que las actuales. Si no conviene, te lo decimos antes de cobrarte nada.",
  },
  {
    q: "¿Restauran también la madera?",
    a: "Sí. Reparamos, lijamos y protegemos la madera además del tapiz, para entregar el mueble completo y listo para usar.",
  },
  {
    q: "¿Por qué la restauración es más ecológica?",
    a: "Restaurar evita fabricar un mueble nuevo y que el antiguo llegue al vertedero. Las espumas se envían a reutilización y las telas que usamos son reciclables.",
  },
];

export const Route = createFileRoute("/restauracion-de-muebles-santiago")({
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
          serviceLd({ name: "Restauración de muebles", description: DESC, path: PATH }),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
    ],
  }),
  component: RestauracionPage,
});

function RestauracionPage() {
  return (
    <Page>
      <ServiceHero
        eyebrow="Restauración"
        title="Restauración de muebles en Santiago,"
        highlight="con historia intacta."
        text="Recuperamos sillones, poltronas y muebles antiguos: estructura, madera, espumas y tapiz. Restaurar es la opción más verde y en Casa Tapiz la hacemos con estándar de taller."
        image={despues}
        imageAlt="Sofá restaurado y retapizado en tela verde oliva por Casa Tapiz"
      />

      <Bullets
        title="Qué incluye la restauración"
        items={[
          "Diagnóstico de estructura y encolado de uniones",
          "Reparación, lijado y protección de la madera",
          "Recambio de cinchas, resortes y amarres",
          "Espumas nuevas o reacondicionadas según estado",
          "Tapiz completo con tela a elección",
          "Gestión responsable de todos los residuos del proceso",
        ]}
      />

      <ComunasGrid intro="Restauramos muebles de clientes de todo Santiago: desde Providencia y Las Condes hasta La Florida, Maipú, Puente Alto y comunas del norte de la Región Metropolitana." />

      <PresupuestoForm />

      <Faq items={FAQ} />
    </Page>
  );
}
