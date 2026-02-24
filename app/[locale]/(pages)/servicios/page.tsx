"use client";

import CardChica from "@/app/components/CardChica";
import { CardGrande } from "@/app/components/CardGrande";
import { Servicio } from "@/app/model/servicio.type";
import { useState } from "react";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  { id: 1, name: "paquete-presencia", displayKey: "presencia", descKey: "presenciaDesc", destacado: true },
  { id: 2, name: "paquete-marca-artistica", displayKey: "marcaArtistica", descKey: "marcaArtisticaDesc", destacado: true },
  { id: 3, name: "paquete-ecosistema", displayKey: "ecosistema", descKey: "ecosistemaDesc", destacado: true },
  { id: 4, name: "eco-web", displayKey: "ecoWeb", descKey: "ecoWebDesc", destacado: false },
  { id: 5, name: "landing-page", displayKey: "landingPage", descKey: "landingPageDesc", destacado: false },
  { id: 6, name: "ecommerce", displayKey: "ecommerce", descKey: "ecommerceDesc", destacado: false },
  { id: 7, name: "specific-web", displayKey: "specificWeb", descKey: "specificWebDesc", destacado: false },
  { id: 8, name: "branding-digital", displayKey: "brandingDigital", descKey: "brandingDigitalDesc", destacado: false },
  { id: 9, name: "digital-design", displayKey: "digitalDesign", descKey: "digitalDesignDesc", destacado: false },
  { id: 10, name: "gestion-redes", displayKey: "gestionRedes", descKey: "gestionRedesDesc", destacado: false },
  { id: 11, name: "soporte-tecnico", displayKey: "soporteTecnico", descKey: "soporteTecnicoDesc", destacado: false },
] as const;

export default function Servicios() {
  const t = useTranslations("services");
  const [selectedCard, setSelectedCard] = useState<Servicio | null>(null);

  const servicios: Servicio[] = SERVICE_KEYS.map((s) => ({
    id: s.id,
    name: s.name,
    displayName: t(s.displayKey),
    miniDescripcion: t(s.descKey),
    destacado: s.destacado,
  }));

  const gridsClassNames = "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 items-center mx-auto relative";

  return (<div className="flex flex-col relative mx-6 gap-10 mt-4">
    <div className={gridsClassNames}>
      {servicios.filter((servicio) => servicio.destacado).map((servicio) => (
        <CardChica
          key={servicio.id}
          servicio={servicio}
          onClick={() => setSelectedCard(servicio)}
        />
      ))}
    </div>
    <div className={gridsClassNames}>
      {servicios.filter((servicio) => !servicio.destacado).map((servicio) => (
        <CardChica
          key={servicio.id}
          servicio={servicio}
          onClick={() => setSelectedCard(servicio)}
        />
      ))}
    </div>
    {selectedCard && (
      <CardGrande servicio={selectedCard} onClose={() => setSelectedCard(null)} />
    )}
  </div>);
}
