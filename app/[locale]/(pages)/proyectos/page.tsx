"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ProyectoCardChica from "@/app/components/ProyectoCardChica";
import ProyectoCardGrande from "@/app/components/ProyectoCardGrande";
import { Proyecto } from "@/app/model/proyecto.type";

export default function Proyectos() {
  const t = useTranslations("projects");
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(
    null
  );

  const proyectos = useMemo<Proyecto[]>(
    () => [
      {
        id: 1,
        name: "Acrodata",
        miniTitulo: t("acrodata.miniTitulo"),
        titulo: t("acrodata.titulo"),
        miniDescripcion: t("acrodata.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("acrodata.descripcionP1")}
            <br />
            <br />
            {t("acrodata.descripcionP2")}
            <br />
            <br />
            {t("acrodata.technologies")}
          </>
        ),
        miniatura: "/projects/acrodata1.svg",
        imagen: "/projects/acrodata2.svg",
        webUrl: "https://acrodata.systemart.com.ar/",
      },
    ],
    [t]
  );

  return (
    <div className="flex flex-col relative mx-6 gap-10 text-center">
      <div className="flex flex-row flex-wrap items-baseline gap-2 mx-auto justify-center">
        <h3 className="text-black text-2xl md:text-3xl font-semibold shrink-0 ">
          {t("heading1")}
        </h3>
        <h3 className="text-accent stroke-accent text-3xl md:text-6xl font-normal font-licorice shrink-0">
          {t("heading2")}
        </h3>
      </div>
      <p className="text-black text-xl md:text-4xl font-medium">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10 items-center mx-auto relative">
        {proyectos.map((proyecto) => (
          <ProyectoCardChica
            key={proyecto.id}
            proyecto={proyecto}
            onClick={() => setSelectedProyecto(proyecto)}
          />
        ))}
      </div>
      {selectedProyecto && (
        <ProyectoCardGrande
          proyecto={
            proyectos.find((p) => p.id === selectedProyecto.id) ??
            selectedProyecto
          }
          onClose={() => setSelectedProyecto(null)}
        />
      )}
    </div>
  );
}
