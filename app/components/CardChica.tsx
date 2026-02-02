import { Servicio } from "../model/servicio.type";

interface CardChicaProps {
    servicio: Servicio;
    onClick?: () => void;
}

const CardChica = ({ servicio, onClick }: CardChicaProps) => {
    const { id, name, displayName } = servicio;

    return (
        <button onClick={onClick}>
            <div
                id={`card-${name}`}
                className="
            relative 
            w-36 h-32 
            bg-blanco
            rounded-lg
            z-20
            shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)]
            overflow-visible
            transform
            hover:scale-105 
            hover:shadow-[10px_10px_20px_rgba(16,17,17,0.4)]
            hover:z-30
            transition-transform 
            duration-500 
            ease-[cubic-bezier(0.19,1,0.22,1)]
          "
            >
                <h3 className="absolute left-3 top-6 text-azul text-xl font-normal">
                    {displayName}
                </h3>
                <p className="absolute right-2 -bottom-8 text-center text-gris text-8xl font-normal  [text-shadow:5px_5px_5px_rgb(53_59_66/0.55)]">
                    {id}
                </p>
            </div>
        </button>
    )
}

export default CardChica