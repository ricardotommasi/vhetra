"use client";

import { useEffect, useState } from "react";

export function ParallaxBg() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 bg-[url(/img/bg.webp)] bg-center sm:bg-cover bg-no-repeat opacity-70 -z-10"
      style={{ transform: `translateY(${offset * 0.15}px)` }}
    />
  );
}
