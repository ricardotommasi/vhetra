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
            : twMerge(
              "top-[calc(200px+150px+20px)] xs:top-[calc(200px+250px+20px)] lg:top-[calc(200px+250px+60px)] pointer-events-none",
              /* max-height: 700px = un breakpoint menos */
              "[@media(max-height:700px)]:text-5xl [@media(max-height:700px)]:sm:text-6xl [@media(max-height:700px)]:top-[calc(170px+130px+18px)] [@media(max-height:700px)]:xs:top-[calc(170px+200px+18px)] [@media(max-height:700px)]:lg:top-[calc(170px+200px+45px)]",
              /* max-height: 400px = dos breakpoints menos */
              "[@media(max-height:400px)]:text-4xl [@media(max-height:400px)]:sm:text-5xl [@media(max-height:400px)]:top-[calc(140px+100px+14px)] [@media(max-height:400px)]:xs:top-[calc(140px+160px+14px)] [@media(max-height:400px)]:lg:top-[calc(140px+160px+35px)]",
            ),
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
          : twMerge(
            "top-[calc(200px+150px+90px)] xs:top-[calc(200px+250px+130px)] lg:top-[calc(200px+250px+160px)] left-1/2 -translate-x-1/2 hero-tagline",
            "[@media(max-height:700px)]:text-base [@media(max-height:700px)]:xs:text-2xl [@media(max-height:700px)]:sm:text-3xl [@media(max-height:700px)]:top-[calc(170px+130px+70px)] [@media(max-height:700px)]:xs:top-[calc(170px+200px+100px)] [@media(max-height:700px)]:lg:top-[calc(170px+200px+120px)]",
            "[@media(max-height:400px)]:text-sm [@media(max-height:400px)]:xs:text-lg [@media(max-height:400px)]:sm:text-xl [@media(max-height:400px)]:top-[calc(140px+100px+55px)] [@media(max-height:400px)]:xs:top-[calc(140px+160px+80px)] [@media(max-height:400px)]:lg:top-[calc(140px+160px+95px)]",
          )
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
              ? twMerge(
                "z-10 hidden sm:flex bottom-[1%] -right-[125px] lg:bottom-[2%] lg:-right-[350px] lg:w-[600px] lg:h-[600px]",
                "[@media(max-height:700px)]:lg:w-[300px] [@media(max-height:700px)]:lg:h-[300px] [@media(max-height:700px)]:lg:-right-[168px]",
                "[@media(max-height:400px)]:lg:w-[370px] [@media(max-height:400px)]:lg:h-[370px] [@media(max-height:400px)]:lg:-right-[220px]",
              )
              : twMerge(
                "z-20 mt-10 sm:mt-0 left-1/2 -translate-x-1/2 hero-model",
                "[@media(max-height:700px)]:w-[130px] [@media(max-height:700px)]:h-[130px] [@media(max-height:700px)]:xs:w-[180px] [@media(max-height:700px)]:xs:h-[180px] [@media(max-height:700px)]:sm:w-[220px] [@media(max-height:700px)]:sm:h-[220px] [@media(max-height:700px)]:md:w-[240px] [@media(max-height:700px)]:md:h-[240px]",
                "[@media(max-height:400px)]:w-[50px] [@media(max-height:400px)]:h-[50px] [@media(max-height:400px)]:xs:w-[120px] [@media(max-height:400px)]:xs:h-[120px] [@media(max-height:400px)]:sm:w-[150px] [@media(max-height:400px)]:sm:h-[150px] [@media(max-height:400px)]:md:w-[120px] [@media(max-height:400px)]:md:h-[120px]",
              )
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
