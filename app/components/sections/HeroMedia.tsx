"use client";

import React from "react";

export function HeroMedia() {
  const heroVideoSrc = "/videos/hero-bg.mp4?v=20260707-4";
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPageVisible, setIsPageVisible] = React.useState(true);
  const [videoFailed, setVideoFailed] = React.useState(false);

  const playVideo = React.useCallback(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    void video.play().catch(() => {
      // Mobile browsers can reject play() until enough data is available.
      // Keep the video mounted and retry from media readiness events.
    });
  }, [videoFailed]);

  React.useEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onVisibilityChange = () =>
      setIsPageVisible(document.visibilityState === "visible");
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    if (!isVisible || !isPageVisible) {
      video.pause();
      return;
    }

    playVideo();
  }, [isPageVisible, isVisible, playVideo, videoFailed]);

  return (
    <div ref={rootRef} className="contents">
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[url('/videos/hero-poster.webp')] bg-cover bg-center"
        aria-hidden="true"
      >
        {!videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-x-[-1.08] scale-y-[1.08] object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/videos/hero-poster.webp"
            onCanPlay={playVideo}
            onLoadedData={playVideo}
            onError={() => setVideoFailed(true)}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
