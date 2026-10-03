"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { Modal } from "./Modal";
import { useTranslations } from "next-intl";
import { Proyecto } from "@/app/model/proyecto.type";

interface ProyectoCardGrandeProps {
  proyecto: Proyecto;
  onClose: () => void;
}

const ProyectoCardGrande = ({ proyecto, onClose }: ProyectoCardGrandeProps) => {
  const titleId = useId();
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const {
    titulo,
    imagen,
    descripcionCompleta,
    webUrl,
    technologies,
    ctaLabelKey,
    layoutType = "default",
  } = proyecto;
  const ctaLabel = ctaLabelKey ? t(ctaLabelKey) : t("visitWeb");

  const contentArea = (
    <div className="font-manrope text-white/70 text-xs sm:text-sm md:text-base lg:text-lg min-[1800px]:!text-xl font-normal leading-relaxed min-[1800px]:!leading-8">
      {descripcionCompleta.map((paragraph, index) => <p key={index} className="mb-4 last:mb-0">{paragraph}</p>)}
    </div>
  );

  const imageArea = imagen ? (
    <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-black/35 p-2">
      <Image
        src={imagen}
        alt={titulo}
        width={347}
        height={171}
      className="h-auto w-full max-w-sm object-contain min-[1800px]:!max-w-lg"
      />
    </div>
  ) : null;

  return (
    <Modal
      labelledBy={titleId}
      onClose={onClose}
      className="vhetra-modal-surface flex max-h-[90dvh] w-[min(92vw,912px)] flex-col overflow-hidden p-5 text-[#F9F9F9] sm:p-8 min-[1800px]:w-[min(92vw,1180px)] min-[1800px]:p-10"
    >
        <header className="mb-5 flex shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-4 sm:mb-6 sm:pb-5">
          <button
            type="button"
            onClick={onClose}
            className="vhetra-modal-close order-2"
            aria-label={tCommon("close")}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="min-w-0">
            <h2 id={titleId} className="vhetra-modal-title break-words">
              {titulo}
            </h2>
          </div>
        </header>

        {/* Content: flexbox layout */}
        <div className="detail-scrollbar flex-1 min-h-0 overflow-y-auto flex flex-col gap-6 min-[1800px]:!gap-8">
          {layoutType === "textImage" ? (
            <div className="flex flex-col xs:flex-row gap-6 lg:gap-8 min-[1800px]:!gap-10">
              <div className="flex flex-1 min-w-0 order-2 xs:order-1">
                {contentArea}
              </div>
              {imageArea && (
                <div className="flex-shrink-0 lg:basis-[20%] lg:min-w-0 xs:order-1">
                  {imageArea}
                </div>
              )}
            </div>
          ) : (
            <>
              {imageArea}
              {contentArea}
            </>
          )}

          {technologies && technologies.length > 0 && (
            <div className="shrink-0 border-t border-white/10 pt-4">
              <p className="font-manrope text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-xs min-[1800px]:!text-sm">
                {t("technologiesLabel")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 min-[1800px]:!gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-sm border border-white/15 bg-white/[0.04] px-3 py-1 font-manrope text-xs text-white/75 sm:text-sm min-[1800px]:!px-4 min-[1800px]:!py-1.5 min-[1800px]:!text-base"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA button */}
        {webUrl && (
          <footer className="mt-5 flex shrink-0 justify-end border-t border-white/10 pt-4">
            <Link
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vhetra-modal-cta"
            >
              {ctaLabel}
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </footer>
        )}
    </Modal>
  );
};

export default ProyectoCardGrande;
