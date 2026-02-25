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
    <>
      <NavBar />
      <h1
        role={showLayoutPosition ? "link" : undefined}
        tabIndex={showLayoutPosition ? 0 : undefined}
        onClick={handleTitleClick}
        onKeyDown={(e) =>
          showLayoutPosition && (e.key === "Enter" || e.key === " ") && handleTitleClick()
        }
        className={twMerge(
          "z-10 absolute text-4xl xs:text-6xl sm:text-8xl text-shadow-title text-azulo transition-all duration-1000 ease-in-out",
          "left-1/2 -translate-x-1/2",
          showLayoutPosition
            ? "top-[24px]"
            : "top-[calc(200px+150px+20px)] xs:top-[calc(200px+250px+20px)] pointer-events-none",
          showLayoutPosition && "cursor-pointer hover:opacity-90"
        )}
        aria-label={showLayoutPosition ? t("goHome") : undefined}
      >
        VHETRA
      </h1>
      <h2 className={twMerge("absolute text-azulo text-center xs:text-2xl sm:text-4xl text-shadow-title",
        showLayoutPosition
          ? "hidden"
          : "top-[calc(200px+150px+70px)] xs:top-[calc(200px+250px+130px)] left-1/2 -translate-x-1/2"
      )}>
        {tHome("tagline")}
      </h2>
      <div className="relative flex flex-col h-[calc(100vh-200px)] w-full overflow-hidden">
        {children}
        <div
          className={twMerge(
            "absolute transition-all duration-1000 ease-in-out w-[150px] h-[150px] xs:w-[200px] xs:h-[200px] sm:w-[250px] sm:h-[250px]",
            showLayoutPosition
              ? "hidden sm:flex bottom-[2%] -right-[125px]"
              : "left-1/2 -translate-x-1/2"
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
    </>
  );
}

export function SharedHero({ children }: { children: React.ReactNode }) {
  return (
    <SharedHeroInner>{children}</SharedHeroInner>
  );
}
