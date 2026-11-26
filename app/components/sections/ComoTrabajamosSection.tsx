"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/app/config/site";

const STEPS = [
  { num: "01", titleKey: "step1Title", descKey: "step1Desc" },
  { num: "02", titleKey: "step2Title", descKey: "step2Desc" },
  { num: "03", titleKey: "step3Title", descKey: "step3Desc" },
] as const;

export function ComoTrabajamosSection() {
  const t = useTranslations("howWeWork");
  const id = useId();
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = STEPS[active];

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) buttons.current[index]?.focus({ preventScroll: true });
  }

  return (
    <section id="filosofia" className="snap-panel approach-section" aria-labelledby={`${id}-heading`}>
      <div className="section-panel-content approach-content">
        <header className="approach-header">
          <h2 id={`${id}-heading`}>{t("title")}</h2>
        </header>
        <div className="approach-stage">
          <div className="approach-dial" role="tablist" aria-label={t("title")} aria-orientation="vertical"
            onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (active + 1) % STEPS.length;
              else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (active + STEPS.length - 1) % STEPS.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = STEPS.length - 1;
              else return;
              event.preventDefault(); event.stopPropagation(); select(next, true);
            }}>
            {STEPS.map((item, index) => <div className={`approach-marker${active === index ? " is-active" : ""}`} key={item.num}
              style={{ "--step-offset": (index - active + 4) % 3 - 1 } as CSSProperties}>
              <button ref={(element) => { buttons.current[index] = element; }} type="button" role="tab"
                id={`${id}-step-${index}`} aria-selected={active === index} aria-controls={`${id}-panel`}
                aria-label={`${item.num} ${t(item.titleKey)}`} tabIndex={active === index ? 0 : -1}
                onClick={() => select(index)}>
                <span aria-hidden="true">{item.num}</span>
              </button>
            </div>)}
          </div>
          <div className="approach-copy" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-step-${active}`} tabIndex={0}>
            <div className="approach-copy-reveal" key={step.num}>
              <h3>{t(step.titleKey)}</h3>
              <p>{t(step.descKey)}</p>
            </div>
          </div>
        </div>
        <footer className="approach-footer">
          <a href={whatsappUrl(t("whatsappMessage"))} target="_blank" rel="noopener noreferrer">{t("cta")}<span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </section>
  );
}
