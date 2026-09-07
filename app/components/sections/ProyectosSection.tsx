"use client";

import { ContactLink } from "../ContactLink";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCarousel } from "@/app/components/ProjectCarousel";
import { PROJECTS } from "@/app/data/projects";
import { whatsappUrl } from "@/app/config/site";
import { Proyecto } from "@/app/model/proyecto.type";

const ProyectoCardGrande = dynamic(
  () => import("@/app/components/ProyectoCardGrande"),
  { ssr: false },
);

export function ProyectosSection() {
  const t = useTranslations("projects");
  const whatsappHref = whatsappUrl(t("whatsappMessage"));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const proyectos = useMemo<Proyecto[]>(() => PROJECTS.map((project) => ({
    ...project,
    name: project.key,
    miniTitulo: t(`${project.key}.miniTitulo`),
    titulo: t(`${project.key}.titulo`),
    miniDescripcion: t(`${project.key}.miniDescripcion`),
    descripcionCompleta: (["descripcionP1", "descripcionP2", "descripcionP3", "descripcionP4"] as const).map((key) => t(`${project.key}.${key}`)),
  })), [t]);
  const selectedProyecto = proyectos.find((project) => project.id === selectedId);

  return (
    <section
      id="proyectos"
      className="snap-panel section-render-window relative overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative min-[1800px]:!mx-auto min-[1800px]:!max-w-[1900px]">
        <div className="relative max-w-6xl sm:mb-10 lg:mb-12 min-[1800px]:!mb-16 min-[1800px]:!max-w-[1500px]">
          <div className="mb-4 h-px w-20 origin-left bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:!mb-8 min-[1800px]:!w-32" />

          <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4 min-[1800px]:!text-sm">
            {t("eyebrow")}
          </p>

          <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
            {t("spaHeading")}
          </h2>

          <h2 className="mt-1 w-fit font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-[#A82811] sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
            {t("spaAccent")}
          </h2>

          <p className="mt-6 max-w-3xl font-manrope text-sm leading-relaxed text-black/65 sm:text-base lg:text-lg min-[1800px]:!mt-8 min-[1800px]:!max-w-5xl min-[1800px]:!text-xl min-[1800px]:!leading-8">
            {t("salesIntro")}
          </p>
        </div>

        <ProjectCarousel projects={proyectos} onSelect={setSelectedId} />

        <div className="relative mt-6 mb-24 flex justify-center sm:mt-8 sm:mb-0">
          <ContactLink href={whatsappHref} >{t("spaCta")}</ContactLink>
        </div>
      </div>

      {selectedProyecto && (
        <ProyectoCardGrande
          proyecto={selectedProyecto}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}
