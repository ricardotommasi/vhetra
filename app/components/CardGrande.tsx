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
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5216242661967";
    const message = tWhatsapp("message", { service: servicio.displayName });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-center items-center mt-10" onClick={onClose} >
      <div id={`detalle-${servicio.name}`} className="mx-auto z-40 w-[80%] sm:w-[60%] max-h-[80vh] flex flex-col bg-card-grande sm:bg-card-grande-transparente  rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-4 sm:p-10">
        <button className="ml-auto shrink-0" onClick={onClose}>
          <Image
            className="w-3.5 h-3.5"
            src="/icons/cerrar.svg"
            alt={t("close")}
            height={14}
            width={14}
          />
        </button>
        <h2 className="text-center text-tiza text-xl sm:text-2xl sm:mb-4 font-normal shrink-0">
          {servicio.displayName}
        </h2>
        <div className="font-manrope flex-1 min-h-0 overflow-y-auto mt-2 text-tiza text-sm sm:text-lg pr-2">
          {servicio.descripcionCompleta}
        </div>
        <button
          className="ml-auto mt-4 w-40 p-2 bg-tiza rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-center text-azulo text-xl font-normal shrink-0"
          onClick={handleWhatsApp}
        >
          {t("contact")}
        </button>
      </div>
    </div>
  );
};
