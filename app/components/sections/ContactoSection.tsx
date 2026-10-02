import { CONTACTS, whatsappUrl } from "@/app/config/site";
import { getTranslations } from "next-intl/server";
import CardContacto from "@/app/components/CardContacto";

export async function ContactoSection() {
  const t = await getTranslations("contact");
  const whatsappHref = whatsappUrl(t("whatsappMessage"));

  const contactos = CONTACTS.map((c) => ({
    ...c,
    href: c.href ?? whatsappHref,
    title: t(c.titleKey),
    action: t.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <section
      id="contacto"
      className="snap-panel section-render-window relative bg-cover bg-center bg-no-repeat px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative">
        <div className="relative z-10 flex w-full max-w-6xl flex-col gap-8 sm:gap-10 xl:max-w-7xl min-[1800px]:!max-w-[1680px] min-[1800px]:!gap-14">
          <div>
            <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:!mb-8 min-[1800px]:!w-32" />

            <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4 min-[1800px]:!text-sm">
              {t("eyebrow")}
            </p>

            <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
              {t("spaHeading1")}
            </h2>

            <h2 className="mt-1 font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
              {t("spaHeading2")}{" "}
              <span className="text-[#A82811]">{t("spaHeadingAccent")}</span>
            </h2>
          </div>

          <div className="flex w-full max-w-4xl flex-col gap-3 sm:gap-4 lg:w-[calc(100%-20rem)] lg:max-w-none xl:w-[calc(100%-28rem)] min-[1800px]:!w-[calc(100%-36rem)] min-[1800px]:!gap-5">
            {contactos.map((contacto) => (
              <div
                key={contacto.titleKey}
                className="
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.025]
                  hover:drop-shadow-[0_22px_45px_rgba(0,0,0,0.16)]
                "
              >
                <CardContacto
                  id={contacto.id}
                  img={contacto.img}
                  title={contacto.title}
                  action={contacto.action}
                  href={contacto.href}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 hidden select-none justify-end lg:flex">
          <span className="font-khanda text-[13rem] font-light leading-none tracking-[-0.12em] text-black/70 xl:text-[18rem] min-[1800px]:!text-[24rem]">
            VH<span className="text-[#A82811]">.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
