import { twMerge } from "tailwind-merge";
import { Proyecto } from "../model/proyecto.type";
import Image from "next/image";

interface CardChicaProps {
  proyecto: Proyecto;
  onClick?: () => void;
}

const CardChica = ({ proyecto, onClick }: CardChicaProps) => {
  const { id, name, displayName, miniDescripcion, imagen } = proyecto;

  return (
    <button onClick={onClick} className="z-20">
      <div
        id={`card-${name}`}
        className={twMerge(`w-[384px] h-[180px] p-4 flex flex-row items-center relative bg-black/80 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-visible gap-6
          transform hover:scale-105 hover:shadow-[10px_10px_20px_rgba(16,17,17,0.4)] hover:z-30 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]`,
        )
        }
      >
        <div className="w-36 -mx-4 overflow-visible">
          <Image src={imagen} alt={displayName} width={144} height={288} className="object-cover object-center" />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-left text-tiza text-lg sm:text-xl font-normal">
            {displayName}
          </h3>
          <p className="text-left mt-2 ml-2 text-tiza text-xs sm:text-sm font-normal opacity-90 line-clamp-2 flex-1 min-h-0">
            {miniDescripcion}
          </p>
        </div>
      </div>
    </button >
  );
};

export default CardChica;
