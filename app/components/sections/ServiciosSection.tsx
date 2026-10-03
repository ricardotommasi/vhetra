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
      className="snap-panel section-render-window relative bg-black px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />

      <div className="section-panel-content relative z-10 mx-auto w-full max-w-[1420px]">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} accent={t("headingAccent")} tone="dark" />

        <div className="group/cards grid grid-cols-1 gap-3 min-[340px]:grid-cols-2 min-[650px]:grid-cols-5 min-[650px]:gap-3 min-[1400px]:gap-5 min-[1800px]:!gap-7">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="relative z-0 transition-all duration-300 ease-out hover:z-30 hover:-translate-y-1 hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.28)]"
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
