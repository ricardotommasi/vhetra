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
  const targetAngle = useRef(0);
  const redraw = useRef(() => {});
  const camera = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const interaction = useRef({ focus: false, hover: false, visible: false, down: false, pointer: -1, x: 0, y: 0, originX: 0, originAngle: 0, distance: 0 });
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(mobileQuery).matches, () => false);
  const copies = mobile || !projects.length ? 1 : Math.max(1, Math.ceil(20 / projects.length));
  const tiles = Array.from({ length: copies }, () => projects).flat();

  useEffect(() => {
    tilesRef.current.length = tiles.length;
    const element = stage.current;
    if (!element || !tiles.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = element.closest("section") ?? element;
    const content = element.closest(".deck-sheet-content");
    const trackCursor = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = section.getBoundingClientRect();
      camera.current.targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      camera.current.targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      wake();
    };
    const resetCursor = () => { camera.current.targetX = 0; camera.current.targetY = 0; wake(); };
    section.addEventListener("pointermove", trackCursor, { passive: true });
    section.addEventListener("pointerleave", resetCursor);
    let frame = 0;
    let previous = 0;
    const canDraw = () => !paused && !document.hidden && interaction.current.visible && content?.getAttribute("aria-hidden") !== "true";
    function wake() {
      if (!frame && canDraw()) frame = requestAnimationFrame(tick);
    }
    function tick(time: number) {
      frame = 0;
      if (!canDraw()) { previous = 0; return; }
      const state = interaction.current;
      // Inert folders may drop focus without a blur event. Read the actual owner.
      state.focus = !!element?.parentElement?.contains(document.activeElement);
      state.hover = state.hover && !!element?.parentElement?.matches(":hover");
        const delta = previous ? Math.min(time - previous, 40) : 16;
        const view = camera.current;
        // Match the reference's camera parallax with frame-rate independent easing.
        const smoothing = 1 - Math.exp(-delta / 180);
        const targetX = reduce.matches || state.focus || stopped ? 0 : view.targetX;
        const targetY = reduce.matches || state.focus || stopped ? 0 : view.targetY;
        view.x += (targetX - view.x) * smoothing;
        view.y += (targetY - view.y) * smoothing;
        axis.current?.style.setProperty("transform", `translate3d(${-view.x * 32}px, ${-view.y * 20}px, 0) rotateX(${-10 + view.y * 16}deg) rotateY(${-view.x * 18}deg)`);
        const rotating = !reduce.matches && !stopped && !state.focus && !state.hover && !state.down;
        if (rotating) targetAngle.current -= delta * 0.006;
        angle.current = reduce.matches || state.down ? targetAngle.current : angle.current + (targetAngle.current - angle.current) * (1 - Math.exp(-delta / 110));
        if (ring.current) ring.current.style.transform = `rotateY(${angle.current}deg)`;
        // The rear arc dissolves into white; the near arc remains crisp.
        tilesRef.current.forEach((tile, index) => {
          const depth = Math.cos((index * 360 / tilesRef.current.length + angle.current - view.x * 18) * Math.PI / 180);
          const fade = Math.max(0, Math.min(1, (0.18 - depth) / 0.85));
          tile?.style.setProperty("--depth-opacity", String(1 - fade * 0.985));
          tile?.style.setProperty("--depth-blur", `${fade * 12}px`);
        });
        const moving = Math.abs(targetAngle.current - angle.current) > .01 || Math.abs(view.x - targetX) > .001 || Math.abs(view.y - targetY) > .001;
        previous = time;
        if (rotating || moving) wake();
        else previous = 0;
    }
    redraw.current = wake;
    const observer = new IntersectionObserver(([entry]) => { interaction.current.visible = entry.isIntersecting; wake(); }, { threshold: 0.1 });
    observer.observe(element);
    const visibility = () => { previous = 0; wake(); };
    const mutation = new MutationObserver(visibility);
    if (content) mutation.observe(content, { attributes: true, attributeFilter: ["aria-hidden"] });
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", visibility);
    wake();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); mutation.disconnect(); redraw.current = () => {};
      document.removeEventListener("visibilitychange", visibility);
      reduce.removeEventListener("change", visibility);
      section.removeEventListener("pointermove", trackCursor);
      section.removeEventListener("pointerleave", resetCursor);
    };
  }, [paused, stopped, tiles.length]);

  function move(direction: number) {
    if (projects.length < 2) return;
    const next = (active + direction + projects.length) % projects.length;
    select(next);
    setAnnouncement(`${next + 1} / ${projects.length}: ${projects[next].miniTitulo}`);
    if (document.activeElement?.closest(".orbit-tile")) tilesRef.current[next]?.querySelector("button")?.focus({ preventScroll: true });
  }

  function select(index: number) {
    const period = 360 / copies;
    const position = -index * 360 / tiles.length;
    targetAngle.current = position + Math.round((angle.current - position) / period) * period;
    setActive(index % projects.length);
    redraw.current();
  }

  if (!projects.length) return null;

  return (
    <div className="orbit-gallery"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") interaction.current.hover = true; }}
      onPointerLeave={() => { interaction.current.hover = false; redraw.current(); }}
      onFocusCapture={() => { interaction.current.focus = true; redraw.current(); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { interaction.current.focus = false; redraw.current(); } }}>
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
          interaction.current.pointer = event.pointerId;
          interaction.current.x = event.clientX;
          interaction.current.originX = event.clientX;
          interaction.current.y = event.clientY;
          interaction.current.originAngle = angle.current;
          targetAngle.current = angle.current;
          interaction.current.distance = 0;
        }}
        onPointerMove={(event) => {
          const state = interaction.current;
          if (!state.down || event.pointerId !== state.pointer) return;
          if (state.distance <= 5 && Math.abs(event.clientY - state.y) > Math.abs(event.clientX - state.originX) + 5) {
            state.down = false;
            state.distance = 20;
            return;
          }
          const delta = event.clientX - state.x;
          state.distance += Math.abs(delta);
          state.x = event.clientX;
          if (state.distance > 5) {
            stage.current?.setPointerCapture(event.pointerId);
            angle.current += delta * 0.22;
            targetAngle.current = angle.current;
            redraw.current();
          }
        }}
        onPointerUp={(event) => {
          const state = interaction.current;
          if (event.pointerId !== state.pointer) return;
          state.down = false;
          if (state.distance > 5) {
            const next = ((Math.round(-angle.current / (360 / tiles.length)) % projects.length) + projects.length) % projects.length;
            select(next);
            setAnnouncement(`${next + 1} / ${projects.length}: ${projects[next].miniTitulo}`);
          }
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          redraw.current();
        }}
        onPointerCancel={() => { interaction.current.down = false; interaction.current.distance = 20; targetAngle.current = interaction.current.originAngle; redraw.current(); }}
        onLostPointerCapture={(event) => {
          // A card loses its implicit touch capture when the stage takes over.
          // Ignore that bubbling event so the active drag can continue.
          if (event.target !== event.currentTarget || event.pointerId !== interaction.current.pointer) return;
          interaction.current.down = false;
          redraw.current();
        }}
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
                  select(index % projects.length);
                }}
                onClick={(event) => {
                  if ((event.detail !== 0 && interaction.current.distance > 5) || paused) return;
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
        <p className="orbit-caption"><strong>{projects[active].miniTitulo}</strong></p>
        <div className="orbit-controls">
          <button type="button" aria-label={t("previous")} aria-controls={id} onClick={() => move(-1)} disabled={projects.length < 2}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6M8 12h13" /></svg></button>
          <button type="button" aria-label={t(stopped ? "orbit.play" : "orbit.pause")} aria-pressed={stopped} onClick={() => setStopped(!stopped)}><svg viewBox="0 0 24 24" aria-hidden="true">{stopped ? <path d="m9 5 10 7-10 7Z" /> : <path d="M8 5v14M16 5v14" />}</svg></button>
          <button type="button" aria-label={t("next")} aria-controls={id} onClick={() => move(1)} disabled={projects.length < 2}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6M3 12h13" /></svg></button>
        </div>
      </footer>
      <p className="sr-only" role="status">{announcement}</p>
    </div>
  );
}
