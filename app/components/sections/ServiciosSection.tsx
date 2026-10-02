"use client";

import { SectionHeading } from "../SectionHeading";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SERVICE_KEYS } from "@/app/data/services";
import CardChica from "@/app/components/CardChica";
import { Servicio } from "@/app/model/servicio.type";

const CardGrande = dynamic(
  () => import("@/app/components/CardGrande").then((mod) => mod.CardGrande),
  { ssr: false },
);

export function ServiciosSection() {
  const t = useTranslations("services");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const servicios: Servicio[] = useMemo(
    () =>
      SERVICE_KEYS.map((s) => ({
        id: s.id,
        name: s.name,
        displayName: t(s.displayKey),
        descriptionKey: s.fullKey,
        texture: s.texture,
      })),
    [t],
  );

  const selectedCard = servicios.find((service) => service.id === selectedId);

  return (
    <section
      id="servicios"
      className="snap-panel section-render-window relative bg-black px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />

      <div className="section-panel-content relative z-10 mx-auto max-w-[1040px] min-[1400px]:max-w-[1400px] min-[1800px]:!max-w-[1680px]">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} accent={t("headingAccent")} />

        <div className="group/cards grid grid-cols-1 gap-3 min-[340px]:grid-cols-2 min-[650px]:grid-cols-5 min-[650px]:gap-3 min-[1400px]:gap-5 min-[1800px]:!gap-7">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="
                transition-all
                duration-500
                ease-out
                group-hover/cards:opacity-60
                hover:!z-20
                hover:!-translate-y-3
                hover:!scale-[1.04]
                hover:!opacity-100
                hover:drop-shadow-[0_25px_55px_rgba(0,0,0,0.35)]
              "
            >
              <CardChica
                servicio={servicio}
                onClick={() => setSelectedId(servicio.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <CardGrande
          servicio={selectedCard}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}
