import { Servicio } from "@/app/model/servicio.type";
import Image from "next/image";

export const CardGrande = ({
  servicio,
  onClose,
}: {
  servicio: Servicio;
  onClose: () => void;
}) => {
  const handleWhatsApp = () => {
    const phoneNumber = "5493876836037";
    const message = `Hola! Te contacto por el servicio de ${servicio.displayName} que vi en tu pagina web.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="fixed inset-0 z-10 bg-[#FCC47D]/50" onClick={onClose} />
      <div
        id={`detalle-${servicio.name}`}
        className="w-80 h-96 absolute rounded-lg z-40"
      >
        <div className="w-80 h-96 flex flex-col bg-azulc rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-4">
          <button className="ml-auto" onClick={onClose}>
            <Image
              className="w-3.5 h-3.5"
              src="/img/cerrar.svg"
              alt="Cerrar"
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
            className="mx-auto mb-10 p-4 w-36 h-7 bg-tiza rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-center  text-azulo text-xl font-normal"
            onClick={handleWhatsApp}
          >
            CONTACTAR
          </button>
        </div>
        <div className="w-24 h-32 -right-4 -bottom-18 absolute text-center justify-start text-tiza text-8xl font-normal  [text-shadow:5px_5px_5px_rgb(53_59_66/0.55)]">
          {servicio.id}
        </div>
      </div>
    </>
  );
};
