"use client";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

const pageSections = [
  { displayName: "Inicio", location: "/" },
  { displayName: "Servicios", location: "servicios" },
  { displayName: "Proyectos", location: "proyectos" },
  { displayName: "Filosofía", location: "filosofia" },
  { displayName: "Contacto", location: "contacto" },
];

const menuClassNames =
  "text-md xs:text-xl sm:text-3xl font-ligth sm:mx-4 opacity-80 transition-all duration-300 ease-out hover:scale-150 hover:font-medium hover:opacity-100";
const menuClassNamesSelected = "text-lg xs:text-xl sm:text-3xl sm:mx-4 scale-150 font-medium opacity-100";

export const NavBar = (props: { specialAction?: () => Promise<void> }) => {
  const { specialAction } = props;

  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <nav className="w-full h-50 py-6 text-azulo">
      {!home && (
        <Link
          href="/"
          className="block text-center my-6 h-16"
          aria-label="Ir al inicio"
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
        {pageSections.map((section) => (
          <li key={section.location} className="flex items-center">
            <AnimatedLink
              href={section.location}
              className={twMerge(
                pathname === `/${section.location}`
                  ? menuClassNamesSelected
                  : menuClassNames,
              )}
              specialAction={specialAction}
            >
              {section.displayName}
            </AnimatedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
