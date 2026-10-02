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

    const update = () => {
      setEdges({
        start: viewport.scrollLeft <= 2,
        end: viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    viewport.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-project-card]"));
    const firstCardLeft = cards[0]?.offsetLeft ?? 0;
    const positions = cards.map((card) => card.offsetLeft - firstCardLeft);
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextPosition = direction === 1
      ? Math.min(positions.find((position) => position > viewport.scrollLeft + 2) ?? maxScroll, maxScroll)
      : Math.max(positions.filter((position) => position < viewport.scrollLeft - 2).pop() ?? 0, 0);

    viewport.scrollTo({
      left: nextPosition,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return (
    <div className="project-carousel mt-4 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-1 sm:mt-6 sm:grid-cols-[48px_minmax(0,1fr)_48px] sm:gap-2">
      <button
        type="button"
        aria-controls={id}
        aria-label={t("previous")}
        disabled={edges.start}
        onClick={() => move(-1)}
        className="project-carousel-control group flex size-11 items-center justify-center border-0 bg-transparent text-black/65 transition duration-200 hover:text-[#A82811] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82811] disabled:cursor-default disabled:opacity-20"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6 transition-transform group-hover:-translate-x-0.5">
          <path d="M19 12H5m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={id}
        ref={viewportRef}
        data-native-scroll
        role="region"
        aria-label={t("eyebrow")}
        tabIndex={0}
        className="project-carousel-viewport scrollbar-hide relative min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 snap-x snap-mandatory"
      >
        <div className="flex w-max flex-nowrap gap-3 sm:gap-5 lg:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              data-project-card
              className="project-card w-[clamp(160px,24vw,300px)] shrink-0 snap-start min-[1800px]:w-[360px]"
            >
              <ProyectoCardChica proyecto={project} onClick={() => onSelect(project.id)} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-controls={id}
        aria-label={t("next")}
        disabled={edges.end}
        onClick={() => move(1)}
        className="project-carousel-control group flex size-11 items-center justify-center border-0 bg-transparent text-black/65 transition duration-200 hover:text-[#A82811] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82811] disabled:cursor-default disabled:opacity-20"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6 transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
