"use client";

import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import type { Proyecto } from "../model/proyecto.type";
import type { ProjectSelection } from "./ProjectCarousel";

const ease = [0.76, 0, 0.24, 1] as const;

export default function ProjectDetail({ project, selection, onClose }: { project: Proyecto; selection: ProjectSelection; onClose: () => void }) {
  const t = useTranslations("projects");
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const imageSlot = useRef<HTMLDivElement>(null);
  const flyingImage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const surface = dialog.current!;
    surface.showModal();
    document.dispatchEvent(new Event("vhetra:modal-open"));
    const containers = [document.body, ...document.querySelectorAll<HTMLElement>(".snap-page")];
    const overflows = containers.map((container) => container.style.overflow);
    containers.forEach((container) => { container.style.overflow = "hidden"; });
    const clone = flyingImage.current!;
    const target = imageSlot.current!.getBoundingClientRect();
    const source = selection.rect;
    // Enlarge at the clicked position before travelling to the detail image.
    const grow = { width: source.width * 1.22, height: source.height * 1.22, left: source.x - source.width * 0.11, top: source.y - source.height * 0.11 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animation = animate(clone, {
      left: [source.x, grow.left, target.x], top: [source.y, grow.top, target.y],
      width: [source.width, grow.width, target.width], height: [source.height, grow.height, target.height],
    }, { duration: reduced ? 0 : 1.3, times: [0, 0.28, 1], ease, onComplete: () => setReady(true) });
    const backdropAnimation = animate(surface, { backgroundColor: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"] }, { duration: reduced ? 0 : 0.8 });
    return () => {
      animation.stop(); backdropAnimation.stop(); surface.close();
      containers.forEach((container, index) => { container.style.overflow = overflows[index]; });
      if (selection.opener.isConnected) selection.opener.focus({ preventScroll: true });
    };
  }, [selection]);

  return createPortal(
    <dialog ref={dialog} className="project-detail-dialog" aria-labelledby={titleId} aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="project-detail-toolbar">
        <span>VHETRA</span>
        <button type="button" autoFocus onClick={onClose}>{t("orbit.back")} <span aria-hidden="true">↗</span></button>
      </div>
      <div ref={scroll} className="project-detail-scroll" data-native-scroll style={{ overflowY: ready ? "auto" : "hidden" }}>
        <article className={ready ? "project-detail is-ready" : "project-detail"}>
          <div className="project-detail-hero">
            <div className="project-detail-heading">
              <h2 id={titleId} aria-label={project.miniTitulo}>
                {project.miniTitulo.split(" ").map((word, wordIndex) => <span key={wordIndex} className="project-title-word" aria-hidden="true">
                  {Array.from(word).map((letter, index) => <span key={index} style={{ "--letter-delay": `${wordIndex * 0.07 + index * 0.024}s` } as CSSProperties}>{letter}</span>)}
                </span>)}
              </h2>
              <div className="project-detail-meta"><span>{project.miniDescripcion}</span><span>{t("orbit.byVhetra")}</span></div>
              <p className="project-scroll-cue">{t("orbit.scroll")} <span aria-hidden="true">↓</span></p>
            </div>
            <div ref={imageSlot} className="project-detail-image" style={{ opacity: ready ? 1 : 0 }}>
              <Image src={project.imagen!} alt={project.miniTitulo} fill sizes="(max-width: 767px) 92vw, 44vw" unoptimized />
            </div>
          </div>
          <div className="project-detail-story">
            <span className="orbit-eyebrow">01 / {t("orbit.about")}</span>
            <div>
              {project.descripcionCompleta.length > 0 ? <>
                <motion.h3 initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root: scroll, once: true, amount: 0.25 }} transition={{ duration: reduce ? 0 : 0.8 }}>{project.titulo}</motion.h3>
                {project.descripcionCompleta.map((paragraph, index) => <motion.p key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root: scroll, once: true, amount: 0.25 }} transition={{ duration: reduce ? 0 : 0.8 }}>{paragraph}</motion.p>)}
              </> : <p className="project-content-pending">{t("orbit.pending")}</p>}
              {project.technologies?.length ? <div className="project-detail-tech"><span className="orbit-eyebrow">{t("technologiesLabel")}</span><p>{project.technologies.join(" / ")}</p></div> : null}
              {project.webUrl && <a className="project-detail-visit" href={project.webUrl} target="_blank" rel="noopener noreferrer">{t("visitWeb")} <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
          <footer className="project-detail-end"><span>VHETRA®</span><button type="button" onClick={onClose}>{t("orbit.back")} ↗</button></footer>
        </article>
      </div>
      <div ref={flyingImage} className="project-flying-image" aria-hidden="true" style={{ left: selection.rect.x, top: selection.rect.y, width: selection.rect.width, height: selection.rect.height, visibility: ready ? "hidden" : "visible" }}>
        <Image src={project.imagen!} alt="" fill sizes="60vw" unoptimized />
      </div>
    </dialog>, document.body,
  );
}
