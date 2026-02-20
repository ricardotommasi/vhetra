"use client";

import CardChica from "@/app/components/CardChica";
import { CardGrande } from "@/app/components/CardGrande";
import { Servicio } from "@/app/model/servicio.type";
import { useState } from "react";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  { id: 1, name: "landing-page", displayKey: "landingPage", descKey: "landingPageDesc" },
  { id: 2, name: "ecommerce", displayKey: "ecommerce", descKey: "ecommerceDesc" },
  { id: 3, name: "specific-web", displayKey: "specificWeb", descKey: "specificWebDesc" },
  { id: 4, name: "eco-web", displayKey: "ecoWeb", descKey: "ecoWebDesc" },
  { id: 5, name: "digital-design", displayKey: "digitalDesign", descKey: "digitalDesignDesc" },
] as const;

export default function Servicios() {
  const t = useTranslations("services");
  const [selectedCard, setSelectedCard] = useState<Servicio | null>(null);

  const servicios: Servicio[] = SERVICE_KEYS.map((s) => ({
    id: s.id,
    name: s.name,
    displayName: t(s.displayKey),
    miniDescripcion: t(s.descKey),
  }));

  return (
    <div className="grid grid-cols-2 gap-10 items-center mx-auto relative">
      {servicios.map((servicio) => (
        <CardChica
          key={servicio.id}
          servicio={servicio}
          onClick={() => setSelectedCard(servicio)}
        />
      ))}
      {selectedCard && (
        <CardGrande servicio={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
}
