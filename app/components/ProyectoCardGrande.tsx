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
    <div className="font-manrope text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg min-[1800px]:!text-xl font-normal leading-relaxed min-[1800px]:!leading-8">
      {descripcionCompleta.map((paragraph, index) => <p key={index} className="mb-4 last:mb-0">{paragraph}</p>)}
    </div>
  );

  const imageArea = imagen ? (
    <div className="flex justify-center items-center shrink-0">
      <Image
        src={imagen}
        alt={titulo}
        width={347}
        height={171}
        className="w-full max-w-sm min-[1800px]:!max-w-lg h-auto object-contain"
      />
    </div>
  ) : null;

  return (
    <Modal labelledBy={titleId} onClose={onClose} className="w-[min(92vw,912px)] min-[1800px]:w-[min(92vw,1180px)] max-h-[90dvh] flex flex-col bg-neutral-900 rounded-sm shadow-xl overflow-hidden p-6 min-[1800px]:p-10">
        {/* Header: close button - responsive size */}
        <div className="flex justify-end shrink-0 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center p-1 hover:opacity-80 transition-opacity"
            aria-label={tCommon("close")}
          >
            <Image
              src="/icons/cerrar.svg"
              alt=""
              width={36}
              height={32}
              className="w-4 sm:w-7 min-[1800px]:!w-9"
            />
          </button>
        </div>

        {/* Title: centered, increases at larger breakpoints */}
        <h2 id={titleId} className="text-center text-zinc-300 text-sm sm:text-base md:text-lg min-[1800px]:!text-2xl font-medium shrink-0 mb-4 sm:mb-6 min-[1800px]:!mb-8">
          {titulo}
        </h2>

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
              <p className="font-manrope text-[0.68rem] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs min-[1800px]:!text-sm">
                {t("technologiesLabel")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 min-[1800px]:!gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-sm border border-zinc-700 bg-zinc-800/70 px-3 py-1 min-[1800px]:!px-4 min-[1800px]:!py-1.5 font-manrope text-xs text-zinc-300 sm:text-sm min-[1800px]:!text-base"
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
          <div className="flex justify-end shrink-0 mt-4 pt-4">
            <Link
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ripple-btn inline-flex h-10 min-w-[7rem] items-center justify-center rounded-sm bg-zinc-300 px-3 py-[5px] text-[clamp(0.85rem,3.6vw,1.05rem)] min-[1800px]:!text-[1.25rem] font-normal text-slate-700/80 transition-colors hover:bg-zinc-200 sm:h-12 sm:min-w-[8rem] sm:px-3.5 min-[1800px]:!h-14 min-[1800px]:!min-w-[10rem]"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
    </Modal>
  );
};

export default ProyectoCardGrande;
