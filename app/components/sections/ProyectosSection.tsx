"use client";

import { ContactLink } from "../ContactLink";
import { SectionHeading } from "../SectionHeading";
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
      className="snap-panel section-render-window relative bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative mx-auto w-full max-w-[1420px]">
        <SectionHeading
          eyebrow={t("viewAll")}
          title={t("portfolioHeading")}
          accent={t("portfolioAccent")}
          description={t("portfolioDescription")}
          className="projects-intro"
        />

        <ProjectCarousel projects={proyectos} onSelect={setSelectedId} />

        <div className="relative mt-6 flex justify-center sm:mt-8">
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
