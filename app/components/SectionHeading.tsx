export function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="mb-10 max-w-6xl sm:mb-12 lg:mb-14 min-[1800px]:mb-20 min-[1800px]:max-w-[1500px]">
      <div aria-hidden="true" className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:mb-8 min-[1800px]:w-32" />
      <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-white/60 sm:mb-4 min-[1800px]:text-sm">{eyebrow}</p>
      <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-white sm:text-6xl lg:text-[5.8rem] min-[1800px]:text-[7.2rem]">
        {title}{accent && <span className="mt-1 block text-[#C65037]">{accent}</span>}
      </h2>
    </div>
  );
}
