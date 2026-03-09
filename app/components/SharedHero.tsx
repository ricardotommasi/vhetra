"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import BlenderModel from "./BlenderModel";
import { NavBar } from "./NavBar";

function SharedHeroInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const t = useTranslations("nav");
  const tHome = useTranslations("home");

  const showLayoutPosition = !isHome

  const handleTitleClick = () => {
    if (showLayoutPosition) router.push("/");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <NavBar />
      <h1
        role={showLayoutPosition ? "link" : undefined}
        tabIndex={showLayoutPosition ? 0 : undefined}
        onClick={handleTitleClick}
        onKeyDown={(e) =>
          showLayoutPosition && (e.key === "Enter" || e.key === " ") && handleTitleClick()
        }
        className={twMerge(
          "z-10 absolute text-6xl sm:text-8xl text-shadow-title text-azulo transition-all duration-1000 ease-in-out inline-flex",
          "left-1/2 -translate-x-1/2",
          showLayoutPosition
            ? "top-[24px]"
            : "top-[calc(200px+150px+20px)] xs:top-[calc(200px+250px+20px)]  lg:top-[calc(200px+250px+60px)] pointer-events-none",
          showLayoutPosition && "cursor-pointer hover:opacity-90"
        )}
        aria-label={showLayoutPosition ? t("goHome") : undefined}
      >
        {!showLayoutPosition ? "VHETRA".split("").map((letter, i) => (
          <span key={i} className="hero-letter inline-block">{letter}</span>
        )) : "VHETRA"}
      </h1>
      <h2 className={twMerge("absolute text-azulo text-center text-lg xs:text-3xl sm:text-4xl text-shadow-title w-full",
        showLayoutPosition
          ? "hidden"
          : "top-[calc(200px+150px+90px)] xs:top-[calc(200px+250px+130px)] lg:top-[calc(200px+250px+160px)] left-1/2 -translate-x-1/2 hero-tagline"
      )}>
        {tHome("tagline")}
      </h2>
      <div className="relative flex flex-col h-hero-dynamic w-full overflow-hidden">
        <div className="z-20 h-full">
          {children}
        </div>
        <div
          className={twMerge(
            "absolute w-[150px] h-[150px] xs:w-[200px] xs:h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px]",
            showLayoutPosition
              ? "z-10 hidden sm:flex bottom-[2%] -right-[125px] lg:bottom-[10%] lg:-right-[350px] lg:w-[600px] lg:h-[600px]"
              : "z-20 mt-10 sm:mt-0 left-1/2 -translate-x-1/2 hero-model"
          )}
        >
          <BlenderModel
            path="/animations/vhetra-logo.glb"
            type="animated"
            scale={2.5}
            canInteract={isHome}
          />
        </div>
      </div>
    </div>
  );
}

export function SharedHero({ children }: { children: React.ReactNode }) {
  return (
    <SharedHeroInner>{children}</SharedHeroInner>
  );
}
