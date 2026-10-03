import { Servicio } from "../model/servicio.type";
import Image from "next/image";

interface CardChicaProps {
  servicio: Servicio;
  onClick?: () => void;
}

const CardChica = ({ servicio, onClick }: CardChicaProps) => {
  const { id, name, displayName } = servicio;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={displayName}
      className="z-20 w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A82811]"
    >
      <div
        id={`card-${name}`}
        className="relative flex w-full flex-col aspect-[3/4.35] max-[767px]:aspect-[1/0.82] overflow-hidden rounded-sm border border-white/20 bg-[#080808] bg-cover bg-center p-3 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group hover:z-30 hover:-translate-y-1 hover:border-[#A82811]/70 sm:p-4 lg:p-5 min-[1800px]:!p-7"
      >
        <Image src={servicio.texture} alt="" fill sizes="(min-width: 1400px) 20vw, (min-width: 650px) 33vw, (min-width: 340px) 50vw, 100vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/24" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),transparent_45%,rgba(0,0,0,0.62))]" />
        <div className="relative z-10 max-w-[88%]">
          <h3 className="text-left font-khanda text-[clamp(0.8rem,1.5vw,1.35rem)] font-light uppercase leading-[0.98] tracking-[-0.035em] text-tiza">
            {displayName}
          </h3>
          <div className="mt-3 h-px w-10 bg-white/40 transition-colors duration-300 group-hover:bg-[#A82811] sm:mt-4 sm:w-12" />
        </div>
        <p
          className="
    absolute z-10 right-3 bottom-[0px] sm:bottom-[-8px]
    text-tiza text-[4rem] sm:text-[5rem] lg:text-[6rem] xl:text-[7rem] min-[1800px]:!text-[8.5rem]
    font-black leading-none select-none opacity-90
    translate-y-8 group-hover:translate-y-0
    transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
    group-hover:scale-105
  "
        >
          {Number(id).toString().padStart(2, "0")}
        </p>
      </div>
    </button>
  );
};

export default CardChica;
