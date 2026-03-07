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
        imgClassName: "w-28 h-40 self-center"
      },
      {
        id: 2,
        name: "EstacionAlemania",
        miniTitulo: t("estacionAlemania.miniTitulo"),
        titulo: t("estacionAlemania.titulo"),
        miniDescripcion: t("estacionAlemania.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("estacionAlemania.descripcionP1")}
            <br />
            <br />
            {t("estacionAlemania.descripcionP2")}
            <br />
            <br />
            {t("estacionAlemania.technologies")}
          </>
        ),
        miniatura: "/projects/estacion1.svg",
        imagen: "/projects/estacion2.svg",
        webUrl: "https://estacionalemania.com.ar/",
        layoutType: "textImage",
        imgClassName: "flex w-40 h-40 self-end -mb-11 -ml-4"
      },
      {
        id: 3,
        name: "FiliSuites",
        miniTitulo: t("filiSuites.miniTitulo"),
        titulo: t("filiSuites.titulo"),
        miniDescripcion: t("filiSuites.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("filiSuites.descripcionP1")}
            <br />
            <br />
            {t("filiSuites.descripcionP2")}
          </>
        ),
        miniatura: "/projects/fili1.svg",
        imagen: "/projects/fili2.svg",
        webUrl: "https://www.instagram.com/filisuites_oax/",
        ctaLabelKey: "visitInstagram",
        imgClassName: "flex w-30 h-30 -mt-3"
      },
    ],
    [t]
  );

  return (
    <div className="flex flex-col relative mx-6 gap-3 text-center">
      <div className="flex flex-row flex-wrap items-baseline gap-2 mx-auto justify-center">
        <h3 className="text-black text-2xl md:text-3xl font-semibold sm:shrink-0 ">
          {t("heading1")}
        </h3>
        <h3 className="text-accent stroke-accent text-3xl md:text-6xl font-semibold font-licorice shrink-0">
          {t("heading2")}
        </h3>
      </div>
      <p className="text-black text-xl md:text-4xl font-medium align-top">
        {t("subtitle")}
      </p>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-auto relative">
        {proyectos.map((proyecto) => (
          <ProyectoCardChica
            key={proyecto.id}
            proyecto={proyecto}
            onClick={() => setSelectedProyecto(proyecto)}
            imgClassName={proyecto.imgClassName}
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
