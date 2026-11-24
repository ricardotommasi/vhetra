"use client";

import Image from "next/image";
import { useId } from "react";
import { Modal } from "./Modal";
import type { Servicio } from "@/app/model/servicio.type";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "../config/site";

export const CardGrande = ({ servicio, onClose }: { servicio: Servicio; onClose: () => void }) => {
  const titleId = useId();
  const t = useTranslations("common");
  const tWhatsapp = useTranslations("whatsapp");
  const tServices = useTranslations("services");

  return (
    <Modal labelledBy={titleId} onClose={onClose} className="service-grid-modal">
      <header className="service-grid-modal-header">
        <span>{tServices("grid.title")} / VHETRA</span>
        <button type="button" className="service-grid-close" aria-label={t("close")} onClick={onClose}>×</button>
      </header>
      <div className="service-grid-modal-scroll" data-native-scroll>
        <div className="service-grid-modal-title">
          <h2 id={titleId}>{servicio.displayName}</h2>
        </div>
        <div className="service-grid-modal-body">
          <div className="service-grid-modal-art" aria-hidden="true">
            <div><Image src={servicio.texture} alt="" fill sizes="(max-width: 640px) 25vw, 250px" className="object-cover" /></div>
          </div>
          <div className="service-grid-modal-copy">
            {tServices.rich(servicio.descriptionKey, {
              br: () => <br />,
              ul: (chunks) => <ul>{chunks}</ul>,
              li: (chunks) => <li>{chunks}</li>,
            })}
          </div>
        </div>
      </div>
      <footer className="service-grid-modal-footer">
        <button type="button" onClick={() => window.open(whatsappUrl(tWhatsapp("message", { service: servicio.displayName })), "_blank", "noopener,noreferrer")}>
          <span>{t("contact")}</span><span aria-hidden="true">↗</span>
        </button>
      </footer>
    </Modal>
  );
};
