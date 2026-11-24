"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCarousel, type ProjectSelection } from "../ProjectCarousel";
import ProjectDetail from "../ProjectDetail";
import { PROJECTS } from "@/app/data/projects";
import type { Proyecto } from "@/app/model/proyecto.type";

export function ProyectosSection() {
  const t = useTranslations("projects");
  const [selection, setSelection] = useState<ProjectSelection | null>(null);
  const proyectos = useMemo<Proyecto[]>(() => PROJECTS.map((project) => ({
    ...project,
    name: project.key,
    miniTitulo: project.label,
    titulo: project.contentKey ? t(`${project.contentKey}.titulo`) : project.label,
    miniDescripcion: project.contentKey ? t(`${project.contentKey}.miniDescripcion`) : t("orbit.digitalProject"),
    descripcionCompleta: project.contentKey
      ? (["descripcionP1", "descripcionP2", "descripcionP3", "descripcionP4"] as const).map((key) => t(`${project.contentKey!}.${key}`)) : [],
  })), [t]);
  const selected = proyectos.find((project) => project.id === selection?.id);

  return (
    <section id="proyectos" className="snap-panel projects-orbit-section" aria-labelledby="projects-orbit-heading">
      <div className="section-panel-content">
        <header className="orbit-heading">
          <span className="orbit-eyebrow">{t("orbit.eyebrow")}</span>
          <h2 id="projects-orbit-heading">{t("orbit.title")}</h2>
        </header>
        <ProjectCarousel projects={proyectos} onSelect={setSelection} paused={!!selection} />
      </div>
      {selected && selection && <ProjectDetail project={selected} selection={selection} onClose={() => setSelection(null)} />}
    </section>
  );
}
