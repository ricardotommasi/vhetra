import { CONTACTS, whatsappUrl } from "@/app/config/site";
import { getTranslations } from "next-intl/server";
import CardContacto from "@/app/components/CardContacto";
import { SectionHeading } from "../SectionHeading";

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
      className="snap-panel section-render-window relative bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative mx-auto w-full max-w-[1420px]">
        <div className="relative z-10 flex w-full flex-col gap-8 sm:gap-10 lg:w-[calc(100%-18rem)] xl:w-[calc(100%-25rem)]">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={`${t("spaHeading1")} ${t("spaHeading2")}`}
            accent={t("spaHeadingAccent")}
          />

          <div className="flex w-full max-w-4xl flex-col gap-3 sm:gap-4 lg:max-w-none min-[1800px]:!gap-5">
            {contactos.map((contacto) => (
              <div
                key={contacto.titleKey}
                className="transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:drop-shadow-[0_22px_45px_rgba(0,0,0,0.16)]"
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
