import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import CardContacto from "@/app/components/CardContacto";
import LicoriceWriteOn from "@/app/components/LicoriceWriteOn";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5216242661967";
const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola !\nTe contacto desde la web de VHETRA.")}`;

const CONTACTOS = [
  { id: 1, img: "/icons/instagramIco.svg", titleKey: "instagramTitle" as const, actionKey: "instagramAction" as const, href: "https://www.instagram.com/somosvhetra/" },
  { id: 2, img: "/icons/gmailIco.svg", titleKey: "gmailTitle" as const, actionKey: "gmailAction" as const, href: "mailto:somosvhetra@gmail.com" },
  { id: 3, img: "/icons/whatsappIco.svg", titleKey: "whatsappTitle" as const, actionKey: "whatsappAction" as const, href: whatsappHref },
];

export default async function Contacto({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const contactos = CONTACTOS.map((c) => ({
    ...c,
    title: t(c.titleKey),
    action: t.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <div className="flex flex-col relative px-4 sm:max-w-[920px] mx-auto">
      <h3 className="ml-4 text-xl sm:text-3xl md:text-4xl shrink-0 my-4">{t("title")}</h3>
      <div className="flex flex-row justify-end relative max-w-[820px]">
        <LicoriceWriteOn
          className="text-right text-4xl sm:text-5xl md:text-7xl font-semibold font-licorice text-accent shrink-0 block"
          duration={2}
        >
          {t("letsTalk")}
        </LicoriceWriteOn>
        <div className="flex justify-start">
          <Image className="ml-4 items-left scale-50 sm:scale-60 md:scale-100 flex -mt-10" src="/accent/exclamacion.svg" alt="" aria-hidden width={75} height={30} />
        </div>
      </div>
      <div className="flex flex-col gap-10 mx-auto">
        {contactos.map((contacto) => (
          <CardContacto key={contacto.titleKey} id={contacto.id} img={contacto.img} title={contacto.title} action={contacto.action} href={contacto.href} />
        ))}
      </div>
    </div>
  );
}
