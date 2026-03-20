"use client";

import React from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
import { NavBar } from "./NavBar";

const BlenderModel = dynamic(() => import("./BlenderModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-w-[120px] min-h-[120px] bg-azulo/5 rounded-lg animate-pulse" aria-hidden />
  ),
});

const PLACEHOLDER = (
  <div className="w-full h-full min-w-[120px] min-h-[120px] bg-azulo/5 rounded-lg animate-pulse" aria-hidden />
);

/** Defers BlenderModel mount until after idle to improve INP - loads 3D only when browser is free */
function DeferredBlenderModel(props: React.ComponentProps<typeof BlenderModel>) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const id = requestIdleCallback(() => setMounted(true), { timeout: 500 });
    return () => cancelIdleCallback(id);
  }, []);
  if (!mounted) return PLACEHOLDER;
  return <BlenderModel {...props} />;
}

function SharedHeroInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const t = useTranslations("nav");
  const tHome = useTranslations("home");

  const showLayoutPosition = !isHome
  const locale = useLocale();

  const handleTitleClick = () => {
    if (showLayoutPosition) router.push("/");
  };

  const modelSizes = twMerge(
    "hero-model-size md:w-[320px] md:h-[320px]",
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="absolute top-6 right-6 flex gap-2 text-sm nav-lang">
        <Link
          href={pathname}
          locale="es"
          className={twMerge(
            "opacity-80 hover:opacity-100 transition-opacity",
            locale === "es" && "font-medium opacity-100",
          )}
        >
          ES
        </Link>
        <span className="opacity-60">|</span>
        <Link
          href={pathname}
          locale="en"
          className={twMerge(
            "opacity-80 hover:opacity-100 transition-opacity",
            locale === "en" && "font-medium opacity-100",
          )}
        >
          EN
        </Link>
      </div>
      {showLayoutPosition ? (
        <>
          <h1
            role="link"
            tabIndex={0}
            onClick={handleTitleClick}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleTitleClick()
            }
            className={twMerge(
              "z-10 mt-4 text-6xl sm:text-8xl text-shadow-title text-azulo transition-[margin-top] duration-1000 ease-in-out inline-flex self-center cursor-pointer hover:opacity-90",
            )}
            aria-label={t("goHome")}
          >
            VHETRA
          </h1>
          <NavBar />
        </>
      ) : (
        <><div className="h-15 sm:h-24 sm:text-8xl mt-4" />
          <NavBar />
          <div className={twMerge(
            "shrink-0 self-center hero-model",
            modelSizes,
          )}>
            <DeferredBlenderModel
              path="/animations/vhetra-logo.glb"
              type="animated"
              scale={2.5}
              canInteract={isHome}
            />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-visible">
            <h1
              className={twMerge(
                "z-10 mt-2 text-6xl sm:text-8xl text-shadow-title text-azulo transition-[margin-top] duration-1000 ease-in-out inline-flex self-center pointer-events-none",
              )}
            >
              {"VHETRA".split("").map((letter, i) => (
                <span key={i} className="hero-letter inline-block">{letter}</span>
              ))}
            </h1>
            <h2
              className={twMerge(
                "text-azulo text-center text-lg xs:text-3xl sm:text-4xl text-shadow-title w-full transition-[margin-top,opacity] duration-1000 ease-in-out self-center hero-tagline mt-4",
              )}
            >
              {tHome("tagline")}
            </h2>
          </div>
        </>
      )}
      <div className="relative flex flex-col flex-1 min-h-0 w-full">
        {showLayoutPosition && (
          <div
            className={twMerge(
              "absolute z-10 hidden sm:flex w-37.5 h-37.5 xs:w-50 xs:h-50 sm:w-62.5 sm:h-62.5 md:w-[320px] md:h-80 bottom-[1%] -right-31.25 lg:bottom-[2%] lg:-right-87.5 lg:w-150 lg:h-150 transition-[left,right,bottom,transform] duration-1000 ease-in-out",)}
          >
            <DeferredBlenderModel
              path="/animations/vhetra-logo.glb"
              type="animated"
              scale={2.5}
              canInteract={false}
            />
          </div>
        )}
        <div className="z-20 flex-1 min-h-0">
          {children}
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
