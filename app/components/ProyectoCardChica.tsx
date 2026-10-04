import type { Proyecto } from "../model/proyecto.type";

interface ProyectoCardChicaProps {
  proyecto: Proyecto;
  isActive: boolean;
  onClick: () => void;
}

export default function ProyectoCardChica({ proyecto, isActive, onClick }: ProyectoCardChicaProps) {
  const { miniTitulo, miniDescripcion } = proyecto;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`${miniTitulo}: ${miniDescripcion}`}
      className={`project-card-surface group relative isolate flex aspect-[1.5/1] min-h-[180px] w-full flex-col overflow-hidden rounded-sm border bg-[#080808] text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A82811] sm:min-h-[200px] lg:min-h-[220px] ${isActive ? "border-[#A82811] shadow-[0_0_28px_rgba(168,40,17,0.12)]" : "border-white/20 hover:border-[#A82811]/70"}`}
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-4 sm:p-5 lg:p-6">
        <div>
          <h3 className="line-clamp-2 max-w-full break-words font-khanda text-[clamp(1.45rem,2.5vw,2.15rem)] font-light uppercase leading-[0.98] tracking-[-0.045em] text-white">
            {miniTitulo}
          </h3>

          <div className={`mt-3 h-px w-12 transition-colors sm:mt-4 ${isActive ? "bg-[#A82811]" : "bg-white/35 group-hover:bg-[#A82811]"}`} />
        </div>

        <div className="mt-4 flex min-w-0 items-center justify-between gap-3 sm:mt-5">
          <p className="min-w-0 font-manrope text-[clamp(0.72rem,0.82vw,0.8rem)] font-medium uppercase leading-[1.5] tracking-[0.12em] text-white/60">
            {miniDescripcion}
          </p>
          <span
            aria-hidden="true"
            className={`flex size-8 shrink-0 items-center justify-center transition-colors duration-300 ${isActive ? "text-[#D84A31]" : "text-white/65 group-hover:text-[#A82811]"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
