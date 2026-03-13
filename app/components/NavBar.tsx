"use client";
import { twMerge } from "tailwind-merge";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const PAGE_SECTIONS = [
  { key: "home" as const, location: "/" },
  { key: "services" as const, location: "servicios" },
  { key: "projects" as const, location: "proyectos" },
  { key: "philosophy" as const, location: "filosofia" },
  { key: "contact" as const, location: "contacto" },
];

const menuClassNames =
  "text-lg font-medium sm:text-2xl font-ligth opacity-80 transition-all duration-300 ease-out hover:scale-125 hover:xs:scale-150 hover:font-medium hover:opacity-100";
const menuClassNamesSelected = "scale-125 xs:scale-150 font-semibold opacity-100";

export const NavBar = () => {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const home = pathname === "/";

  return (
    <nav className="z-20 relative w-full sm:mt-0 py-6 text-azulo text-khand">
      <ul
        className={twMerge(
          "flex justify-evenly",
          'xl:mx-30'
        )}
      >
        {PAGE_SECTIONS.map((section) => {
          const isSelected =
            section.location === "/" ? home : pathname === `/${section.location}`;
          return (
            <li key={section.location} className="flex items-center nav-item">
              <Link
                href={section.location}
                prefetch={false}
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
    </nav>
  );
};
