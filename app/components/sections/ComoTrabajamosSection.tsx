import { SectionHeading } from "../SectionHeading";
import { ContactLink } from "../ContactLink";
import { whatsappUrl } from "@/app/config/site";
import { getTranslations } from "next-intl/server";


const STEPS = [
  { num: "01", titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { num: "02", titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { num: "03", titleKey: "step3Title" as const, descKey: "step3Desc" as const },
];

export async function ComoTrabajamosSection() {
  const t = await getTranslations("howWeWork");
  const whatsappHref = whatsappUrl(t("whatsappMessage"));

  return (
    <section
      id="filosofia"
      className="snap-panel section-render-window philosophy-section-background relative px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="section-panel-content relative z-10 mx-auto max-w-7xl min-[1800px]:!max-w-[1680px]">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")}  />

        <div className="group/steps grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6 min-[1800px]:!gap-12">
          {STEPS.map(({ num, titleKey, descKey }) => (
            <article
              key={num}
              className="
    flex
    flex-col
    transition-all
    duration-500
    ease-out
    hover:-translate-y-2
  "
            >
              <span
                className="
      relative
      mb-8
      w-fit
      font-khanda
      text-6xl
      font-light
      leading-none
      tracking-[-0.08em]
      text-[#F9F9F9]
      sm:text-7xl
      lg:text-8xl
      min-[1800px]:!text-[8.5rem]
    "
              >
                {num}

                <span
                  className="
        absolute
        -bottom-4
        left-1
        h-[2px]
        w-20
        bg-[#A82811]
        transition-all
        duration-500
        group-hover:w-28
      "
                />
              </span>

              <h3
                className="
      mb-3
      font-khanda
      text-3xl
      font-light
      uppercase
      leading-[0.85]
      tracking-[-0.06em]
      text-[#F9F9F9]
      sm:text-4xl
      lg:text-5xl
      min-[1800px]:!text-[4.3rem]
    "
              >
                {t(titleKey)}
              </h3>

              <p
                className="
      max-w-[320px]
      font-manrope
      text-sm
      leading-6
      text-[#F9F9F9]/68
      min-[1800px]:!max-w-[400px]
      min-[1800px]:!text-lg
      min-[1800px]:!leading-8
    "
              >
                {t(descKey)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-start sm:mt-20 md:justify-end lg:mt-24">
          <ContactLink href={whatsappHref} light>{t("cta")}</ContactLink>
        </div>
      </div>
    </section>
  );
}
