"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { HeroMedia } from "./sections/HeroMedia";

const sections = [
  { id: "inicio", key: "home" },
  { id: "servicios", key: "services" },
  { id: "proyectos", key: "projects" },
  { id: "filosofia", key: "philosophy" },
  { id: "contacto", key: "contact" },
] as const;

export function SectionDeck({ children }: { children: ReactNode }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const panels = Children.toArray(children);
  const selectedIndex = sections.findIndex((item) => item.id === active);

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      setActive(sections.some((section) => section.id === id) ? id : null);
    };
    const navigate = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail.id;
      if (sections.some((section) => section.id === id)) {
        event.preventDefault();
        setActive(id);
      }
    };
    sync();
    const element = root.current;
    element?.addEventListener("vhetra:section-navigate", navigate);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      element?.removeEventListener("vhetra:section-navigate", navigate);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  function open(id: string | null) {
    if (document.querySelector("dialog[open]")) return;
    setActive(id);
    window.history.pushState(null, "", id ? `#${id}` : window.location.pathname + window.location.search);
  }

  return (
    <main ref={root} className={`section-deck snap-page ${active ? "is-open" : "is-overview"}`}>
      <div className="deck-tools">
        <button type="button" onClick={() => open(null)} aria-label={locale === "es" ? "Ver todas las fichas" : "View all sections"}>VH<span>.</span></button>
        <div><Link href={pathname} locale="es" aria-current={locale === "es" ? "page" : undefined}>ES</Link><span>/</span><Link href={pathname} locale="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link></div>
      </div>
      <div className="deck-panels">
        {sections.map((section, index) => {
          const depth = selectedIndex < 0 ? index : index === selectedIndex ? 0 : 1 + index - (index > selectedIndex ? 1 : 0);
          return (
            <div key={section.id} className={`deck-sheet ${index % 2 ? "is-dark" : "is-light"} ${active === section.id ? "is-active" : ""}`} style={{ "--sheet-index": index, "--sheet-depth": depth } as CSSProperties}>
              <div className="deck-folder-surface">
              {index === 0 && <div className="deck-hero-background" aria-hidden="true"><HeroMedia /><div className="deck-hero-wash" /></div>}
              <button type="button" className="deck-tab" onClick={() => open(section.id)} aria-controls={`deck-panel-${section.id}`} aria-expanded={active === section.id} aria-current={active === section.id ? "location" : undefined}>
                <span className="deck-tab-label">{t(section.key)}</span>
              </button>
              <div id={`deck-panel-${section.id}`} className="deck-sheet-content" inert={active !== section.id} aria-hidden={active !== section.id} tabIndex={-1}>
                {panels[index]}
              </div>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
