"use client";
import { twMerge } from "tailwind-merge";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import AnimatedLink from "./AnimatedLink";

const PAGE_SECTIONS = [
  { key: "home" as const, location: "/" },
  { key: "services" as const, location: "servicios" },
  { key: "projects" as const, location: "proyectos" },
  { key: "philosophy" as const, location: "filosofia" },
  { key: "contact" as const, location: "contacto" },
];

const menuClassNames =
  "text-md xs:text-xl sm:text-3xl font-ligth sm:mx-4 opacity-80 transition-all duration-300 ease-out hover:scale-150 hover:font-medium hover:opacity-100";
const menuClassNamesSelected = "text-lg xs:text-xl sm:text-3xl sm:mx-4 scale-150 font-medium opacity-100";

export const NavBar = (props: { specialAction?: () => Promise<void> }) => {
  const { specialAction } = props;
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const home = pathname === "/";

  return (
    <nav className="relative w-full h-50 py-6 text-azulo">
      {!home && (
        <Link
          href="/"
          className="block text-center my-6 h-16"
          aria-label={t("goHome")}
        >
          <h1 className={"text-center text-7xl sm:text-8xl text-shadow-title"}>
            VHETRA
          </h1>
        </Link>
      )}
      <ul
        className={twMerge(
          home ? "mt-18" : "",
          "flex justify-center gap-6 items-center",
        )}
      >
        {PAGE_SECTIONS.map((section) => {
          const isSelected =
            section.location === "/" ? home : pathname === `/${section.location}`;
          return (
            <li key={section.location} className="flex items-center">
              <AnimatedLink
                href={section.location}
                className={twMerge(
                  isSelected ? menuClassNamesSelected : menuClassNames,
                )}
                specialAction={specialAction}
              >
                {t(section.key)}
              </AnimatedLink>
            </li>
          );
        })}
      </ul>
      <div className="absolute top-6 right-6 flex gap-2 text-sm">
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
    </nav>
  );
};
