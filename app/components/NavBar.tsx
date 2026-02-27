"use client";
import { twMerge } from "tailwind-merge";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const PAGE_SECTIONS = [
  { key: "home" as const, location: "/" },
  { key: "services" as const, location: "servicios" },
  { key: "projects" as const, location: "proyectos" },
  { key: "philosophy" as const, location: "filosofia" },
  { key: "contact" as const, location: "contacto" },
];

const menuClassNames =
  "text-sm xs:text-md sm:text-2xl font-ligth opacity-80 transition-all duration-300 ease-out hover:scale-125 hover:xs:scale-150 hover:font-medium hover:opacity-100";
const menuClassNamesSelected = "scale-125 xs:scale-150 font-medium opacity-100";

export const NavBar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const home = pathname === "/";

  return (
    <nav className="z-20 relative w-full py-6 text-azulo text-khand">
      <ul
        className={twMerge(
          "mt-10 xs:mt-16 sm:mt-24",
          "flex justify-evenly",
          'xl:mx-[120px]'
        )}
      >
        {PAGE_SECTIONS.map((section) => {
          const isSelected =
            section.location === "/" ? home : pathname === `/${section.location}`;
          return (
            <li key={section.location} className="flex items-center">
              <Link
                href={section.location}
                className={twMerge(menuClassNames,
                  isSelected ? menuClassNamesSelected : '',
                )}
              >
                {t(section.key)}
              </Link>
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
