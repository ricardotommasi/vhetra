"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { scrollToSectionStart } from "@/app/utils/scrollToSection";

const SECTIONS = [
  { key: "home" as const, id: "inicio" },
  { key: "services" as const, id: "servicios" },
  { key: "projects" as const, id: "proyectos" },
  { key: "philosophy" as const, id: "filosofia" },
  { key: "contact" as const, id: "contacto" },
];

export const NavBar = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const navBar = navBarRef.current;
    if (!navBar) return;

    const updateNavClearance = () => {
      const clearance = Math.ceil(navBar.getBoundingClientRect().bottom + 16);
      document.documentElement.style.setProperty(
        "--nav-clearance",
        `${clearance}px`,
      );
    };

    updateNavClearance();

    const observer = new ResizeObserver(updateNavClearance);
    observer.observe(navBar);
    window.addEventListener("resize", updateNavClearance);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateNavClearance);
      document.documentElement.style.removeProperty("--nav-clearance");
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    scrollToSectionStart(id);
    setActiveSection(id);
  };

  return (
    <nav onKeyDown={(event) => {
      if (event.key === "Escape" && isMenuOpen) {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }} className="fixed top-0 left-0 right-0 z-50 mt-4 border-b border-zinc-800 bg-black sm:mt-6 lg:mt-8 min-[1800px]:!mt-10">
      <div
        ref={navBarRef}
        className="relative flex items-center px-4 py-3 sm:px-8 sm:py-4 min-[1800px]:!px-12 min-[1800px]:!py-5"
      >
        {/* Desktop nav */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-4 md:flex lg:gap-8 min-[1800px]:!gap-12">
          {SECTIONS.map(({ key, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={scrollTo(id)}
                className={twMerge(
                  "text-white text-[clamp(0.72rem,1.15vw,1rem)] min-[1800px]:!text-[1.2rem] font-extralight uppercase tracking-[0.16em] transition-opacity duration-300 lg:tracking-[0.2em]",
                  activeSection === id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex min-h-11 min-w-11 items-center justify-center flex-col gap-[6px] z-50"
          aria-label={t(isMenuOpen ? "closeMenu" : "openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>

        {/* Idiomas */}
        <div className="z-50 ml-auto flex items-center gap-2 text-[clamp(0.7rem,3vw,0.8rem)] min-[1800px]:!text-[1rem]">
          <Link
            href={pathname}
            locale="es"
            className={twMerge(
              "text-white transition-opacity",
              locale === "es"
                ? "opacity-100 font-semibold"
                : "opacity-50 hover:opacity-80",
            )}
          >
            ES
          </Link>

          <span className="text-white opacity-30">|</span>

          <Link
            href={pathname}
            locale="en"
            className={twMerge(
              "text-white transition-opacity",
              locale === "en"
                ? "opacity-100 font-semibold"
                : "opacity-50 hover:opacity-80",
            )}
          >
            EN
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={twMerge(
          "md:hidden overflow-hidden bg-black border-t border-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {SECTIONS.map(({ key, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={(e) => {
                  scrollTo(id)(e);
                  setIsMenuOpen(false);
                  menuButtonRef.current?.focus({ preventScroll: true });
                }}
                className={twMerge(
                  "block text-white text-sm font-extralight uppercase tracking-[0.2em] transition-opacity duration-300",
                  activeSection === id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
