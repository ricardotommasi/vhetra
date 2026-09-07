"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function HeroMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isVisible || !isPageVisible || reducedMotion || videoFailed || document.visibilityState !== "visible") {
      video.pause();
      return;
    }
    void video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
  }, [isVisible, isPageVisible, reducedMotion, videoFailed]);

  useEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setIsPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(syncPlayback, [syncPlayback]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image src="/videos/hero-poster.webp" alt="" fill sizes="100vw" preload className="object-cover object-center" />
      {!reducedMotion && !videoFailed && (
        <video ref={videoRef} className="absolute inset-0 h-full w-full scale-x-[-1.08] scale-y-[1.08] object-cover object-center"
          loop muted playsInline preload="none" poster="/videos/hero-poster.webp"
          onCanPlay={syncPlayback} onLoadedData={syncPlayback} onError={() => setVideoFailed(true)}>
          <source src="/videos/hero-bg.mp4?v=20260707-4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
