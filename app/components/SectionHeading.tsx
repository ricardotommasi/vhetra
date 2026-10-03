import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div className="mb-4 flex items-center gap-3 sm:mb-5">
      <span className="h-px w-10 bg-[#A82811] sm:w-14" aria-hidden="true" />
      <p className={`font-manrope text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:text-xs ${isDark ? "text-white/60" : "text-black/55"}`}>
        {children}
      </p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <header className={`section-heading mb-8 grid gap-4 border-b pb-6 sm:mb-10 sm:pb-8 ${description ? "md:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)] md:items-end md:gap-10" : ""} lg:mb-12 ${isDark ? "border-white/15" : "border-black/10"} ${className}`}>
      <div>
        <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
        <h2 className={`section-heading-title max-w-4xl font-khanda font-light uppercase tracking-[-0.055em] ${isDark ? "text-white" : "text-black"}`}>
          <span>{title}</span>
          {accent && <span className="mt-1 block text-[#A82811]">{accent}</span>}
        </h2>
      </div>
      {description && (
        <p className={`max-w-lg font-manrope text-sm leading-relaxed sm:text-base md:justify-self-end lg:text-[1.05rem] ${isDark ? "text-white/65" : "text-black/60"}`}>
          {description}
        </p>
      )}
    </header>
  );
}
