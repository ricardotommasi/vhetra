"use client";

import CardChica from "@/app/components/CardChica";
import { CardGrande } from "@/app/components/CardGrande";
import { Servicio } from "@/app/model/servicio.type";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SERVICE_KEYS = [
  { id: 1, name: "presencia-digital", displayKey: "presenciaDigital", miniKey: "presenciaDigitalMini", fullKey: "presenciaDigitalFull", destacado: true },
  { id: 2, name: "marca-digital", displayKey: "marcaDigital", miniKey: "marcaDigitalMini", fullKey: "marcaDigitalFull", destacado: true },
  { id: 3, name: "presencia-en-redes", displayKey: "presenciaEnRedes", miniKey: "presenciaEnRedesMini", fullKey: "presenciaEnRedesFull", destacado: true },
  { id: 4, name: "landing-page", displayKey: "landingPage", miniKey: "landingPageMini", fullKey: "landingPageFull", destacado: false },
  { id: 5, name: "ecommerce", displayKey: "ecommerce", miniKey: "ecommerceMini", fullKey: "ecommerceFull", destacado: false },
  { id: 6, name: "paginas-personalizadas", displayKey: "paginasPersonalizadas", miniKey: "paginasPersonalizadasMini", fullKey: "paginasPersonalizadasFull", destacado: false },
  { id: 7, name: "manejo-redes", displayKey: "manejoRedes", miniKey: "manejoRedesMini", fullKey: "manejoRedesFull", destacado: false },
  { id: 8, name: "branding-logotipo", displayKey: "brandingLogotipo", miniKey: "brandingLogotipoMini", fullKey: "brandingLogotipoFull", destacado: false },
  { id: 9, name: "mantenimiento-web", displayKey: "mantenimientoWeb", miniKey: "mantenimientoWebMini", fullKey: "mantenimientoWebFull", destacado: false },
  { id: 10, name: "hosting-dominio", displayKey: "hostingDominio", miniKey: "hostingDominioMini", fullKey: "hostingDominioFull", destacado: false },
  { id: 11, name: "automatizaciones", displayKey: "automatizaciones", miniKey: "automatizacionesMini", fullKey: "automatizacionesFull", destacado: false },
] as const;

export default function Servicios() {
  const t = useTranslations("services");
  const [selectedCard, setSelectedCard] = useState<Servicio | null>(null);

  const servicios: Servicio[] = SERVICE_KEYS.map((s) => ({
    id: s.id,
    name: s.name,
    displayName: t(s.displayKey),
    miniDescripcion: t(s.miniKey),
    descripcionCompleta: t.rich(s.fullKey, {
      br: () => <br />,
      ul: (chunks) => <ul className="list-disc list-inside my-2 space-y-1">{chunks}</ul>,
      li: (chunks) => <li>{chunks}</li>,
    }),
    destacado: s.destacado,
  }));

  const gridsClassNames = "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:mx-auto items-center relative";

  return (
    <div className="flex flex-col relative mx-6 gap-10 mt-2">
      <div className={gridsClassNames}>
        {servicios.filter((s) => s.destacado).map((servicio) => (
          <div key={servicio.id} className="card-stagger">
            <CardChica servicio={servicio} onClick={() => setSelectedCard(servicio)} />
          </div>
        ))}
        <div className="card-stagger hidden xs:flex sm:hidden md:hidden xl:flex">
          <Image src="/accent/flechaDerecha.svg" alt="flechaDeco" width={180} height={200} className="flecha-float" />
        </div>
      </div>
      <div className={gridsClassNames}>
        {servicios.filter((s) => !s.destacado).map((servicio) => (
          <div key={servicio.id} className="card-stagger">
            <CardChica servicio={servicio} onClick={() => setSelectedCard(servicio)} />
          </div>
        ))}
      </div>
      {selectedCard && <CardGrande servicio={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  );
}
