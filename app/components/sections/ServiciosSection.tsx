"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { SERVICE_KEYS, SERVICE_TEXTURES } from "@/app/data/services";
import type { Servicio } from "@/app/model/servicio.type";

const CardGrande = dynamic(
  () => import("@/app/components/CardGrande").then((mod) => mod.CardGrande),
  { ssr: false },
);

// Unequal endpoints keep the grid open rather than forming a rectangular frame.
const horizontalEnds = [
  ["8%", "19%"], ["24%", "7%"], ["3%", "28%"],
  ["17%", "4%"], ["6%", "23%"], ["31%", "11%"],
  ["12%", "32%"], ["4%", "9%"], ["21%", "16%"],
  ["9%", "26%"], ["16%", "7%"], ["27%", "18%"],
];
const verticalEnds = [
  ["-8%", "13%"], ["-24%", "-6%"], ["11%", "-18%"], ["-13%", "23%"],
  ["-5%", "-27%"], ["18%", "7%"], ["-31%", "-12%"], ["6%", "-9%"],
  ["-17%", "19%"], ["14%", "-22%"], ["-9%", "5%"], ["-21%", "-14%"],
  ["9%", "16%"], ["-15%", "-7%"], ["-4%", "-24%"], ["5%", "12%"], ["17%", "-3%"],
];

export function ServiciosSection() {
  const t = useTranslations("services");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const servicios = useMemo<Servicio[]>(() => SERVICE_KEYS.map((service) => ({
    id: service.id,
    name: service.name,
    displayName: t(service.displayKey),
    descriptionKey: service.fullKey,
    texture: service.texture,
  })), [t]);
  const selected = servicios.find((service) => service.id === selectedId);

  return (
    <section id="servicios" className="snap-panel services-grid-section" aria-labelledby="services-heading">
      <div className="section-panel-content services-grid-content">
        <header className="services-grid-header">
          <h2 id="services-heading">{t("grid.title")}</h2>
        </header>
        <div className="services-collage">
          <div className="services-grid-lines" aria-hidden="true">
            <div className="services-grid-horizontals">{horizontalEnds.map(([start, end], index) => <span key={index} style={{ "--line-index": index, "--line-start": start, "--line-end": end } as CSSProperties} />)}</div>
            <div className="services-grid-verticals">{verticalEnds.map(([start, end], index) => <span key={index} style={{ "--line-index": index, "--line-start": start, "--line-end": end } as CSSProperties} />)}</div>
          </div>
          {SERVICE_TEXTURES.map((texture) => <div key={texture.name} className={`services-texture services-texture-${texture.name}`} aria-hidden="true">
            <Image src={texture.src} alt="" fill sizes="(max-width: 767px) 30vw, 250px" className="object-cover" />
          </div>)}
          {servicios.map((service) => <button key={service.id} type="button" className={`services-word services-word-${service.name}`}
            aria-haspopup="dialog" aria-label={service.displayName} onClick={() => setSelectedId(service.id)}>
            <span>{service.displayName}</span><span className="services-word-arrow" aria-hidden="true">↗</span>
          </button>)}
        </div>
      </div>
      {selected && <CardGrande servicio={selected} onClose={() => setSelectedId(null)} />}
    </section>
  );
}
