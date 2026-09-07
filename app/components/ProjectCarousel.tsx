"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Proyecto } from "../model/proyecto.type";
import ProyectoCardChica from "./ProyectoCardChica";

export function ProjectCarousel({ projects, onSelect }: { projects: Proyecto[]; onSelect: (id: number) => void }) {
  const t = useTranslations("projects");
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const update = () => setEdges({
      start: viewport.scrollLeft <= 2,
      end: viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2,
    });
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    viewport.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); viewport.removeEventListener("scroll", update); };
  }, []);

  function move(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-project-card]"));
    const firstLeft = cards[0]?.offsetLeft ?? 0;
    const positions = cards.map((card) => card.offsetLeft - firstLeft);
    const current = viewport.scrollLeft;
    const left = direction === 1
      ? positions.find((position) => position > current + 2) ?? viewport.scrollWidth
      : positions.filter((position) => position < current - 2).pop() ?? 0;
    viewport.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <div className="project-carousel mt-6">
      <div id={id} ref={viewportRef} data-native-scroll data-project-carousel-viewport
        role="region" aria-label={t("eyebrow")} tabIndex={0}
        className="relative overflow-x-auto overflow-y-hidden overscroll-x-contain px-3 py-8 [scrollbar-width:thin]">
        <div className="flex w-max gap-4 sm:gap-6 lg:gap-8 min-[1800px]:gap-10">
          {projects.map((project) => (
            <div key={project.id} data-project-card className="project-card w-[240px] shrink-0 sm:w-[300px] lg:w-[340px] min-[1800px]:w-[430px]">
              <ProyectoCardChica proyecto={project} onClick={() => onSelect(project.id)} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-3">
        <button type="button" aria-controls={id} aria-label={t("previous")} disabled={edges.start} onClick={() => move(-1)} className="min-h-11 min-w-11 rounded-full border border-black/30 px-4 text-2xl disabled:opacity-30">←</button>
        <button type="button" aria-controls={id} aria-label={t("next")} disabled={edges.end} onClick={() => move(1)} className="min-h-11 min-w-11 rounded-full border border-black/30 px-4 text-2xl disabled:opacity-30">→</button>
      </div>
    </div>
  );
}
