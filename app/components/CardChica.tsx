import { twMerge } from "tailwind-merge";
import { Servicio } from "../model/servicio.type";

interface CardChicaProps {
  servicio: Servicio;
  onClick?: () => void;
}

const CardChica = ({ servicio, onClick }: CardChicaProps) => {
  const { id, name, displayName, destacado } = servicio;

  return (
    <button onClick={onClick} className="z-20">
      <div
        id={`card-${name}`}
        className={twMerge(`relative flex flex-col w-full sm:w-52 h-32 sm:h-44 rounded-lg z-20 shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)] overflow-visible p-4
          transform hover:scale-105 hover:-translate-y-1 hover:shadow-[10px_10px_20px_rgba(16,17,17,0.4)] hover:z-30 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group`,
          destacado ? "bg-card-destacada" : "bg-card")
        }
      >
        <h3 className="text-left text-tiza text-lg sm:text-xl font-normal">
          {displayName}
        </h3>
        <p className="font-manrope text-left mt-2 ml-2 text-tiza text-xs sm:text-sm font-normal opacity-90 line-clamp-2 flex-1 min-h-0">
          {servicio.miniDescripcion}
        </p>
        <p className="absolute right-2 -bottom-8 md:-bottom-10 text-center text-tiza text-6xl md:text-8xl font-normal [text-shadow:5px_5px_5px_rgb(53_59_66/0.55)] transition-transform duration-300 group-hover:scale-110">
          {Number(id).toString().padStart(2, '0')}
        </p>
      </div>
    </button >
  );
};

export default CardChica;
