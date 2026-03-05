"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Proyecto } from "@/app/model/proyecto.type";

interface ProyectoCardGrandeProps {
  proyecto: Proyecto;
  onClose: () => void;
}

const ProyectoCardGrande = ({ proyecto, onClose }: ProyectoCardGrandeProps) => {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const { titulo, imagen, descripcionCompleta, webUrl } = proyecto;
  return (
    <div
      className="fixed inset-0 z-30 flex justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-[912px] max-h-[90vh] flex flex-col bg-neutral-900 rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: close button */}
        <div className="flex justify-end shrink-0 mb-4">
          <button
            onClick={onClose}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label={tCommon("close")}
          >
            <Image
              src="/icons/cerrar.svg"
              alt={tCommon("close")}
              width={36}
              height={32}
              className="w-9 h-8"
            />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-center text-zinc-300 text-xl font-medium shrink-0 mb-6">
          {titulo}
        </h2>

        {/* Main picture */}
        <div className="flex justify-center shrink-0 mb-6">
          <Image
            src={imagen}
            alt={titulo}
            width={347}
            height={171}
            className="w-80 h-44 object-cover object-center rounded shadow-[0px_4px_4px_0px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Description */}
        <div className="flex-1 min-h-0 overflow-y-auto text-center text-zinc-300 text-xl font-normal mb-6">
          {descripcionCompleta}
        </div>

        {/* CTA button */}
        {webUrl && (
          <div className="flex justify-end shrink-0">
            <Link
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-3.5 py-[5px] min-w-[8rem] h-12 bg-zinc-300 rounded-lg text-slate-700/80 text-lg font-normal hover:bg-zinc-200 transition-colors"
            >
              {t("visitWeb")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectoCardGrande;
