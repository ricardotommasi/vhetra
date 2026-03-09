import { twMerge } from "tailwind-merge";
import { Proyecto } from "../model/proyecto.type";
import Image from "next/image";

interface CardChicaProps {
  proyecto: Proyecto;
  onClick?: () => void;
  imgClassName?: string;
  priority?: boolean;
}

const CardChica = ({ proyecto, onClick, imgClassName, priority }: CardChicaProps) => {
  const { name, miniTitulo, miniDescripcion, miniatura } = proyecto;

  return (
    <button onClick={onClick} className="z-20">
      <div
        id={`card-${name}`}
        className={twMerge(`w-full xs:w-[400px] h-[120px] p-4 flex flex-row items-start relative bg-card rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-visible gap-6
          transform hover:scale-105 hover:-translate-y-1 hover:shadow-[10px_10px_20px_rgba(16,17,17,0.4)] hover:z-30 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group`,
        )
        }
      >
        <div className={twMerge(imgClassName, "relative overflow-visible")}>
          <Image src={miniatura} alt={miniTitulo} fill className="w-full h-full object-contain" loading={priority ? undefined : "lazy"} priority={priority} />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <h3 className="text-left text-tiza text-lg sm:text-xl font-normal">
            {miniTitulo}
          </h3>
          <p className="font-manrope text-left mt-2 text-tiza text-xs sm:text-sm font-normal opacity-90 line-clamp-2 flex-1 min-h-0">
            {miniDescripcion}
          </p>
        </div>
        <span className="absolute -bottom-1 right-3 text-tiza text-4xl font-light opacity-80 transition-transform duration-300 group-hover:scale-125">+</span>
      </div>
    </button >
  );
};

export default CardChica;
