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
      className={`project-card-surface group relative isolate flex aspect-[1.62/1] w-full flex-col overflow-hidden rounded-[15px] border bg-[#080808] text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A82811] ${isActive ? "border-[#A82811] shadow-[0_0_28px_rgba(168,40,17,0.12)]" : "border-white/15 hover:border-white/35"}`}
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-center p-4 sm:p-5 lg:p-7">
        <h3 className="max-w-full break-words font-manrope text-[clamp(1.3rem,2.4vw,2.25rem)] font-light leading-[1.05] tracking-[-0.045em] text-white">
          {miniTitulo}
        </h3>

        <div className={`mt-3 h-px w-12 transition-colors ${isActive ? "bg-[#A82811]" : "bg-white/55"}`} />

        <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
          <p className="min-w-0 font-manrope text-[clamp(0.72rem,0.9vw,0.84rem)] font-medium uppercase leading-[1.45] tracking-[0.12em] text-white/65">
            {miniDescripcion}
          </p>
          <span
            aria-hidden="true"
            className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:size-10 lg:size-11 ${isActive ? "border-[#D84A31] text-[#D84A31] group-hover:bg-[#A82811] group-hover:text-white" : "border-white/40 text-white group-hover:border-white/80"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
