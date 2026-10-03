"use client";

import { useId } from "react";
import { Modal } from "./Modal";
import { Servicio } from "@/app/model/servicio.type";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "../config/site";

export const CardGrande = ({
  servicio,
  onClose,
}: {
  servicio: Servicio;
  onClose: () => void;
}) => {
  const titleId = useId();
  const t = useTranslations("common");
  const tWhatsapp = useTranslations("whatsapp");
  const tServices = useTranslations("services");

  const handleWhatsApp = () => {
    const message = tWhatsapp("message", { service: servicio.displayName });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      labelledBy={titleId}
      onClose={onClose}
      className="vhetra-modal-surface flex max-h-[85dvh] w-[min(92vw,800px)] flex-col overflow-hidden p-5 text-[#F9F9F9] sm:p-8"
    >
      <header className="mb-5 flex shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-4 sm:mb-6 sm:pb-5">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-9 bg-[#A82811]" aria-hidden="true" />
            <p className="font-manrope text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
              {tServices("eyebrow")}
            </p>
          </div>
          <h2 id={titleId} className="vhetra-modal-title break-words">
            {servicio.displayName}
          </h2>
        </div>
        <button
          type="button"
          aria-label={t("close")}
          className="vhetra-modal-close"
          onClick={onClose}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="detail-scrollbar min-h-0 flex-1 overflow-y-auto pr-2 font-manrope text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
        {tServices.rich(servicio.descriptionKey, {
          br: () => <br />,
          ul: (chunks) => <ul className="my-3 list-inside list-disc space-y-2 text-white/75">{chunks}</ul>,
          li: (chunks) => <li className="pl-1 marker:text-[#C65037]">{chunks}</li>,
        })}
      </div>

      <footer className="mt-5 flex shrink-0 justify-end border-t border-white/10 pt-4">
        <button type="button" className="vhetra-modal-cta" onClick={handleWhatsApp}>
          <span>{t("contact")}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </footer>
    </Modal>
  );
};
