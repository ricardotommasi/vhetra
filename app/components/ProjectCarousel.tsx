"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Proyecto } from "../model/proyecto.type";
import ProyectoCardChica from "./ProyectoCardChica";

export function ProjectCarousel({ projects, onSelect }: { projects: Proyecto[]; onSelect: (id: number) => void }) {
  const t = useTranslations("projects");
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const positionedInitialSlide = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-project-card]"));
      const edgeSpace = Math.max(0, (viewport.clientWidth - (cards[0]?.clientWidth ?? 0)) / 2);
      if (cards[0]) cards[0].style.marginInlineStart = `${edgeSpace}px`;
      if (cards.length > 1) cards[cards.length - 1].style.marginInlineEnd = `${edgeSpace}px`;
      if (!positionedInitialSlide.current && cards.length > 1) {
        const featuredCard = cards[1];
        viewport.scrollLeft = featuredCard.offsetLeft + featuredCard.clientWidth / 2 - viewport.clientWidth / 2;
        positionedInitialSlide.current = true;
      }
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      const centers = cards.map((card) => card.offsetLeft + card.clientWidth / 2);
      const index = centers.reduce((closest, center, current) =>
        Math.abs(center - viewportCenter) < Math.abs(centers[closest] - viewportCenter) ? current : closest,
        0,
      );

      setActiveIndex(index);
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

  function scrollToIndex(index: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-project-card]"));
    const card = cards[index];
    if (!card) return;

    viewport.scrollTo({
      left: card.offsetLeft + card.clientWidth / 2 - viewport.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function move(direction: -1 | 1) {
    scrollToIndex(Math.max(0, Math.min(projects.length - 1, activeIndex + direction)));
  }

  return (
    <div className="project-carousel mt-4 grid grid-cols-1 items-center gap-2 sm:mt-6 md:grid-cols-[48px_minmax(0,1fr)_48px] md:gap-2">
      <button
        type="button"
        aria-controls={id}
        aria-label={t("previous")}
        disabled={edges.start}
        onClick={() => move(-1)}
        className="project-carousel-control group hidden size-11 items-center justify-center rounded-full border border-black/25 bg-transparent text-black/75 transition-colors duration-200 hover:border-[#A82811] hover:text-[#A82811] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82811] disabled:cursor-default disabled:opacity-25 md:flex"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 transition-transform group-hover:-translate-x-0.5">
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
        <div className="flex w-max flex-nowrap gap-3 py-3 sm:gap-4 lg:gap-5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-card
              className="project-card w-[min(84vw,420px)] shrink-0 snap-center md:w-[clamp(260px,30vw,420px)]"
            >
              <ProyectoCardChica
                proyecto={project}
                isActive={activeIndex === index}
                onClick={() => {
                  setActiveIndex(index);
                  onSelect(project.id);
                }}
              />
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
        className="project-carousel-control group hidden size-11 items-center justify-center rounded-full border border-black/25 bg-transparent text-black/75 transition-colors duration-200 hover:border-[#A82811] hover:text-[#A82811] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82811] disabled:cursor-default disabled:opacity-25 md:flex"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 md:col-span-3" role="group" aria-label={t("eyebrow")}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            aria-label={`${project.miniTitulo} ${index + 1} / ${projects.length}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
            className={`project-carousel-indicator h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A82811] ${activeIndex === index ? "w-12 bg-[#A82811] shadow-[0_0_12px_rgba(168,40,17,0.3)]" : "w-10 bg-black/15 hover:bg-black/35"}`}
          />
        ))}
      </div>
    </div>
  );
}
