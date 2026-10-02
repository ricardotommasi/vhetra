import { Servicio } from "../model/servicio.type";
import Image from "next/image";

interface CardChicaProps {
  servicio: Servicio;
  onClick?: () => void;
}

const CardChica = ({ servicio, onClick }: CardChicaProps) => {
  const { id, name, displayName } = servicio;

  return (
    <button onClick={onClick} className="z-20 w-full text-left">
      <div
        id={`card-${name}`}
        className="relative flex flex-col w-full aspect-[3/4.35] max-[767px]:aspect-[1/0.82] bg-black bg-cover bg-center rounded border border-zinc-700
          hover:border-zinc-500 hover:-translate-y-1 hover:z-30
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group p-3 sm:p-4 lg:p-5 min-[1800px]:!p-7 overflow-hidden"
      >
        <Image src={servicio.texture} alt="" fill sizes="(min-width: 1400px) 20vw, (min-width: 650px) 33vw, (min-width: 340px) 50vw, 100vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/24" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),transparent_45%,rgba(0,0,0,0.62))]" />
        <h3 className="relative z-10 text-left text-tiza text-sm sm:text-base md:text-lg lg:text-[1.45rem] xl:text-[1.6rem] min-[1800px]:!text-[2rem] font-extralight tracking-[0.12em] uppercase leading-[1.05] max-w-[82%]">
          {displayName}
        </h3>
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
