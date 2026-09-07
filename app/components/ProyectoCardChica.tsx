import { twMerge } from "tailwind-merge";
import { Proyecto } from "../model/proyecto.type";
import Image from "next/image";

interface CardChicaProps {
  proyecto: Proyecto;
  onClick?: () => void;
  imgClassName?: string;
}

const CardChica = ({ proyecto, onClick, imgClassName }: CardChicaProps) => {
  const { miniTitulo, miniDescripcion, miniatura } = proyecto;

  return (
    <button onClick={onClick} className="z-20 w-full text-left">
      <div
        id={`project-${proyecto.id}`}
        className={twMerge(`project-card-surface w-full h-28 sm:h-32 lg:h-36 min-[1800px]:!h-44 p-3 sm:p-4 min-[1800px]:!p-6 flex flex-row items-start relative bg-card rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-visible gap-4 sm:gap-5 lg:gap-6 min-[1800px]:!gap-8
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]`,
        )
        }
      >
        {miniatura && (
          <div className={twMerge(imgClassName, "relative overflow-visible")}>
            <Image
              src={miniatura}
              alt={miniTitulo}
              fill
              sizes="(min-width: 1800px) 200px, 160px"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <h3 className="text-left text-tiza text-[clamp(0.95rem,4.8vw,1.25rem)] min-[1800px]:!text-[1.55rem] font-normal leading-none">
            {miniTitulo}
          </h3>
          <p className="font-manrope text-left mt-2 text-tiza text-[clamp(0.72rem,3.4vw,0.9rem)] min-[1800px]:!text-[1.05rem] min-[1800px]:!leading-6 font-normal opacity-90 line-clamp-2 flex-1 min-h-0">
            {miniDescripcion}
          </p>
        </div>
        <span className="project-card-plus absolute -bottom-1 right-3 text-tiza text-4xl min-[1800px]:!text-5xl font-light opacity-80 transition-transform duration-300">+</span>
      </div>
    </button >
  );
};

export default CardChica;
