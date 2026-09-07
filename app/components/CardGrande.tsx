"use client";
import { useId } from "react";
import { Modal } from "./Modal";
import { Servicio } from "@/app/model/servicio.type";
import Image from "next/image";
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
    <Modal labelledBy={titleId} onClose={onClose} className="w-[min(92vw,800px)] max-h-[85dvh] flex flex-col bg-card-grande rounded-lg shadow-xl overflow-hidden p-4 sm:p-10">
        <button type="button" aria-label={t("close")} className="ml-auto flex min-h-11 min-w-11 items-center justify-center shrink-0" onClick={onClose}>
          <Image
            className="w-3.5 h-3.5 min-[1800px]:!h-5 min-[1800px]:!w-5"
            src="/icons/cerrar.svg"
            alt=""
            height={14}
            width={14}
          />
        </button>
        <h2 id={titleId} className="text-center text-tiza text-xl sm:text-2xl min-[1800px]:!text-[2.4rem] sm:mb-4 min-[1800px]:!mb-6 font-normal shrink-0">
          {servicio.displayName}
        </h2>
        <div className="detail-scrollbar font-manrope flex-1 min-h-0 overflow-y-auto mt-2 text-tiza text-sm sm:text-lg min-[1800px]:!text-xl min-[1800px]:!leading-8 pr-2">
          {tServices.rich(servicio.descriptionKey, {
            br: () => <br />,
            ul: (chunks) => <ul className="my-2 list-inside list-disc space-y-1">{chunks}</ul>,
            li: (chunks) => <li>{chunks}</li>,
          })}
        </div>
        <button
          className="ripple-btn ml-auto mt-4 w-32 rounded-lg bg-tiza p-2 text-center text-[clamp(1rem,4vw,1.25rem)] min-[1800px]:!text-[1.55rem] font-normal text-azulo shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:w-40 min-[1800px]:!w-52 shrink-0"
          onClick={handleWhatsApp}
        >
          {t("contact")}
        </button>
    </Modal>
  );
};
