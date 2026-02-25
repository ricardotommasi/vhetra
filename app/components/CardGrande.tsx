"use client";
import { Servicio } from "@/app/model/servicio.type";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const CardGrande = ({
  servicio,
  onClose,
}: {
  servicio: Servicio;
  onClose: () => void;
}) => {
  const t = useTranslations("common");
  const tWhatsapp = useTranslations("whatsapp");

  const handleWhatsApp = () => {
    const phoneNumber = "5493876836037";
    const message = tWhatsapp("message", { service: servicio.displayName });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-center items-center" onClick={onClose} >
      <div id={`detalle-${servicio.name}`} className="mx-auto z-40 w-[80%] h-[60%] sm:h-[40%] flex flex-col bg-card-grande rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-4">
        <button className="ml-auto" onClick={onClose}>
          <Image
            className="w-3.5 h-3.5"
            src="/icons/cerrar.svg"
            alt={t("close")}
            height={14}
            width={14}
          />
        </button>
        <h2 className="text-center text-tiza text-xl font-normal">
          {servicio.displayName}
        </h2>
        <p className="flex-2 text-tiza text-xl font-normal mt-4 mb-auto">
          {servicio.miniDescripcion}
        </p>
        <button
          className="ml-auto w-40 p-2 bg-tiza rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-center text-azulo text-xl font-normal"
          onClick={handleWhatsApp}
        >
          {t("contact")}
        </button>
      </div>
    </div>
  );
};
