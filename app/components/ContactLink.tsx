import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function ContactLink({ href, children, light = false, className }: { href: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={twMerge("group vhetra-cta inline-flex items-center justify-between overflow-hidden rounded-sm border font-khanda font-light tracking-[-0.02em] transition-colors duration-300 hover:border-[#A82811] hover:bg-[#A82811] hover:text-white",
        light ? "border-[#F9F9F9] bg-[#F9F9F9] text-[#171717]" : "border-black bg-black text-white", className)}>
      <span>{children}</span>
      <span aria-hidden="true" className="vhetra-cta-arrow font-light motion-safe:transition-transform motion-safe:group-hover:translate-x-2">⟶</span>
    </a>
  );
}
