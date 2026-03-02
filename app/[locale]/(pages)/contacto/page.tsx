import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import CardContacto from "@/app/components/CardContacto";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

const CONTACTOS = [
  { id: 1, img: "/icons/instagramIco.svg", titleKey: "instagramTitle" as const, actionKey: "instagramAction" as const, href: "https://www.instagram.com/somosvhetra/" },
  { id: 2, img: "/icons/gmailIco.svg", titleKey: "gmailTitle" as const, actionKey: "gmailAction" as const, href: "mailto:somosvhetra@gmail.com" },
  { id: 3, img: "/icons/whatsappIco.svg", titleKey: "whatsappTitle" as const, actionKey: "whatsappAction" as const, href: "https://wa.me/5216242661967?text=Hola%20!%0ATe%20contacto%20desde%20la%20web%20de%20VHETRA." },
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
    <div className="flex flex-col relative px-4 sm:max-w-[920px]">
      <h3 className="ml-4 text-xl sm:text-3xl md:text-4xl shrink-0">{t("title")}</h3>
      <div className="flex flex-row justify-end relative max-w-[820px]">
        <h2 className="text-right text-4xl sm:text-5xl md:text-7xl font-normal font-licorice text-accent stroke-accent shrink-0">{t("letsTalk")}</h2>
        <Image className="scale-60 md:scale-100 flex -mt-10" src="/accent/exclamacion.svg" alt="" aria-hidden width={100} height={40} />
      </div>
      <div className="flex flex-col gap-10 mx-auto">
        {contactos.map((contacto) => (
          <CardContacto key={contacto.titleKey} id={contacto.id} img={contacto.img} title={contacto.title} action={contacto.action} href={contacto.href} />
        ))}
      </div>
    </div>
  );
}
