"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Proyecto } from "@/app/model/proyecto.type";

interface ProyectoCardGrandeProps {
  proyecto: Proyecto;
  onClose: () => void;
}

const ProyectoCardGrande = ({ proyecto, onClose }: ProyectoCardGrandeProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const { titulo, imagen, descripcionCompleta, webUrl, ctaLabelKey, layoutType = "default" } = proyecto;
  const ctaLabel = ctaLabelKey ? t(ctaLabelKey) : t("visitWeb");

  const contentArea = (
    <div className="font-manrope flex-1 min-h-0 text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg font-normal">
      {descripcionCompleta}
    </div>
  );

  const imageArea = (
    <div className="flex justify-center items-center shrink-0">
      <Image
        src={imagen}
        alt={titulo}
        width={347}
        height={171}
        className="w-full max-w-sm h-auto object-contain"
      />
    </div>
  );

  return (
    <div
      className={`w-full h-full fixed inset-0 z-60 flex justify-center items-center bg-black/50 p-4 modal-overlay ${isClosing ? "closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-[912px] max-h-[90vh] flex flex-col bg-neutral-900 rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-6 modal-content ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: close button - responsive size */}
        <div className="flex justify-end shrink-0 mb-4">
          <button
            onClick={handleClose}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label={tCommon("close")}
          >
            <Image
              src="/icons/cerrar.svg"
              alt={tCommon("close")}
              width={36}
              height={32}
              className="w-4 sm:w-7"
            />
          </button>
        </div>

        {/* Title: centered, increases at larger breakpoints */}
        <h2 className="text-center text-zinc-300 text-sm sm:text-base md:text-lg font-medium shrink-0 mb-4 sm:mb-6">
          {titulo}
        </h2>

        {/* Content: flexbox layout */}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-6">
          {layoutType === "textImage" ? (
            <div className="flex flex-col xs:flex-row gap-6 lg:gap-8">
              <div className="flex flex-1 min-w-0 order-2 xs:order-1">
                {contentArea}
              </div>
              <div className="flex-shrink-0 lg:basis-[40%] lg:min-w-0 xs:order-1">
                {imageArea}
              </div>
            </div>
          ) : (
            <>
              {imageArea}
              {contentArea}
            </>
          )}
        </div>

        {/* CTA button */}
        {webUrl && (
          <div className="flex justify-end shrink-0 mt-4 pt-4">
            <Link
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ripple-btn inline-flex justify-center items-center px-3.5 py-[5px] min-w-[8rem] h-10 sm:h-12 bg-zinc-300 rounded-lg text-slate-700/80 text-sm sm:text-base md:text-lg font-normal hover:bg-zinc-200 transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectoCardGrande;
