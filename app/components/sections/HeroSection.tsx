import { ContactLink } from "../ContactLink";
import { whatsappUrl } from "@/app/config/site";
import { getTranslations } from "next-intl/server";
import { HeroMedia } from "./HeroMedia";
import { SectionEyebrow } from "../SectionHeading";


export async function HeroSection() {
  const t = await getTranslations("home");
  const whatsappHref = whatsappUrl(t("whatsappMessage"));

  return (
    <section
      id="inicio"
      className="snap-panel isolate relative flex items-center bg-[#F9F9F9] px-4 pt-20 pb-8 sm:px-8 sm:pb-10 lg:px-12 xl:px-16"
    >
      <HeroMedia />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#F9F9F9]/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.14),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="section-panel-content relative z-20 mx-auto w-full max-w-[1600px] py-8 sm:py-10 lg:py-12 min-[1800px]:!max-w-[1900px] min-[1800px]:!py-16">
        <div className="flex max-w-[94%] flex-col gap-4 sm:max-w-[80%] sm:gap-5 md:max-w-[70%] lg:max-w-[62%] lg:gap-6 xl:max-w-[58%] min-[1800px]:!max-w-[54%] min-[1800px]:!gap-8">
          <div>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>

            <p className="font-khanda text-6xl font-light leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] min-[1800px]:!text-[10.5rem]">
              VHETRA<span className="ml-[0.005em] text-[#A82811]">.</span>
            </p>
          </div>

          <h1 className="max-w-5xl font-khanda text-4xl font-light uppercase leading-[0.82] tracking-[-0.075em] text-black sm:text-5xl md:text-6xl lg:text-[4.7rem] xl:text-[5.4rem] min-[1800px]:!max-w-7xl min-[1800px]:!text-[6.7rem]">
            {t("heroHeading1")} {t("heroHeading2")}{" "}
            <span className="text-[#A82811]">{t("heroHeadingAccent")}</span>
          </h1>

          <p className="max-w-xl font-manrope text-sm font-light leading-6 text-black/65 sm:text-base lg:text-[1rem] min-[1800px]:!max-w-2xl min-[1800px]:!text-xl min-[1800px]:!leading-8">
            {t("heroDescription")}
          </p>

          <ContactLink href={whatsappHref} className="mt-2 self-start">{t("heroCta")}</ContactLink>
        </div>
      </div>
    </section>
  );
}
