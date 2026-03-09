"use client";

import { twMerge } from "tailwind-merge";

type LicoriceWriteOnProps = {
  children: React.ReactNode;
  className?: string;
  /** Animation duration in seconds. Default: 1.5 */
  duration?: number;
  /** Delay before animation starts in seconds. Default: 0 */
  delay?: number;
};

export default function LicoriceWriteOn({
  children,
  className,
  duration = 1.5,
  delay = 0,
}: LicoriceWriteOnProps) {
  return (
    <span
      className={twMerge("px-2 licorice-write-on inline-block", className)}
      style={
        {
          "--licorice-duration": `${duration}s`,
          "--licorice-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
