"use client";

import { usePathname } from "@/i18n/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade-in h-full">
      {children}
    </div>
  );
}
