"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import type { Proyecto } from "../model/proyecto.type";

const mobileQuery = "(max-width: 767px)";
function subscribeMobile(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export type ProjectSelection = { id: number; rect: { x: number; y: number; width: number; height: number }; opener: HTMLButtonElement };

export function ProjectCarousel({ projects, onSelect, paused }: { projects: Proyecto[]; onSelect: (selection: ProjectSelection) => void; paused: boolean }) {
  const t = useTranslations("projects");
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const axis = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const angle = useRef(0);
  const camera = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const interaction = useRef({ focus: false, visible: false, down: false, x: 0, distance: 0 });
  const [active, setActive] = useState(0);
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(mobileQuery).matches, () => false);
  const copies = mobile ? 1 : Math.max(1, Math.ceil(20 / projects.length));
  const tiles = Array.from({ length: copies }, () => projects).flat();

  useEffect(() => {
    tilesRef.current.length = tiles.length;
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { interaction.current.visible = entry.isIntersecting; }, { threshold: 0.1 });
    observer.observe(element);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = element.closest("section") ?? element;
    const trackCursor = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = section.getBoundingClientRect();
      camera.current.targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      camera.current.targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    };
    const resetCursor = () => { camera.current.targetX = 0; camera.current.targetY = 0; };
    section.addEventListener("pointermove", trackCursor, { passive: true });
    section.addEventListener("pointerleave", resetCursor);
    let frame = 0;
    let previous = 0;
    function tick(time: number) {
      const state = interaction.current;
      if (previous && !paused && !document.hidden && state.visible) {
        const delta = Math.min(time - previous, 40);
        const view = camera.current;
        // Match the reference's camera parallax with frame-rate independent easing.
        const smoothing = 1 - Math.exp(-delta / 180);
        const targetX = reduce.matches || state.focus ? 0 : view.targetX;
        const targetY = reduce.matches || state.focus ? 0 : view.targetY;
        view.x += (targetX - view.x) * smoothing;
        view.y += (targetY - view.y) * smoothing;
        axis.current?.style.setProperty("transform", `translate3d(${-view.x * 32}px, ${-view.y * 20}px, 0) rotateX(${-10 + view.y * 16}deg) rotateY(${-view.x * 18}deg)`);
        if (!reduce.matches && !state.focus && !state.down) angle.current -= delta * 0.006;
        if (ring.current) ring.current.style.transform = `rotateY(${angle.current}deg)`;
        // The rear arc dissolves into white; the near arc remains crisp.
        tilesRef.current.forEach((tile, index) => {
          const depth = Math.cos((index * 360 / tilesRef.current.length + angle.current - view.x * 18) * Math.PI / 180);
          const fade = Math.max(0, Math.min(1, (0.18 - depth) / 0.85));
          tile?.style.setProperty("--depth-opacity", String(1 - fade * 0.985));
          tile?.style.setProperty("--depth-blur", `${fade * 12}px`);
        });
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      section.removeEventListener("pointermove", trackCursor);
      section.removeEventListener("pointerleave", resetCursor);
    };
  }, [paused, tiles.length]);

  function move(direction: number) {
    angle.current -= direction * 360 / tiles.length;
    ring.current?.style.setProperty("transform", `rotateY(${angle.current}deg)`);
    setActive((index) => (index + direction + projects.length) % projects.length);
  }

  return (
    <div className="orbit-gallery">
      <div ref={stage} id={id} className="orbit-stage" role="region" aria-label={t("eyebrow")} aria-roledescription={t("orbit.carousel")}
        onFocusCapture={(event) => { interaction.current.focus = event.target.matches(":focus-visible"); }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.current.focus = false; }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); move(event.key === "ArrowRight" ? 1 : -1); }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 || paused) return;
          interaction.current.focus = false;
          interaction.current.down = true;
          interaction.current.x = event.clientX;
          interaction.current.distance = 0;
        }}
        onPointerMove={(event) => {
          const state = interaction.current;
          if (!state.down) return;
          const delta = event.clientX - state.x;
          state.distance += Math.abs(delta);
          state.x = event.clientX;
          if (state.distance > 5) {
            stage.current?.setPointerCapture(event.pointerId);
            angle.current += delta * 0.22;
            ring.current?.style.setProperty("transform", `rotateY(${angle.current}deg)`);
          }
        }}
        onPointerUp={() => { interaction.current.down = false; }}
        onPointerCancel={() => { interaction.current.down = false; interaction.current.distance = 20; }}
        onLostPointerCapture={() => { interaction.current.down = false; }}
      >
        <div ref={axis} className="orbit-axis"><div ref={ring} className="orbit-ring">
          {tiles.map((project, index) => (
            <div key={`${project.id}-${index}`} ref={(element) => { tilesRef.current[index] = element; }} className="orbit-tile" data-project-card
              style={{ "--tile-angle": `${index * 360 / tiles.length}deg` } as CSSProperties}>
              <button type="button" tabIndex={index < projects.length ? 0 : -1} aria-hidden={index >= projects.length ? true : undefined}
                aria-label={`${project.miniTitulo}: ${project.miniDescripcion}`} aria-haspopup="dialog"
                onPointerEnter={() => setActive(index % projects.length)}
                onFocus={(event) => {
                  setActive(index % projects.length);
                  if (!event.currentTarget.matches(":focus-visible")) return;
                  angle.current = -index * 360 / tiles.length;
                  ring.current?.style.setProperty("transform", `rotateY(${angle.current}deg)`);
                }}
                onClick={(event) => {
                  if (interaction.current.distance > 5 || paused) return;
                  const rect = event.currentTarget.getBoundingClientRect();
                  onSelect({ id: project.id, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, opener: event.currentTarget });
                }}>
                <Image className="orbit-image" src={project.imagen!.replace(".webp", "-thumb.webp")} alt="" fill sizes="(max-width: 640px) 100px, 170px" draggable={false} unoptimized />
                <span className="orbit-tile-label" aria-hidden="true">{project.miniTitulo} ↗</span>
              </button>
            </div>
          ))}
        </div></div>
      </div>
      <footer className="orbit-footer">
        <p className="orbit-instructions">{t("orbit.drag")}<br /><span>{t("orbit.click")}</span></p>
        <p className="orbit-caption"><span>{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><strong>{projects[active].miniTitulo}</strong></p>
      </footer>
    </div>
  );
}
