import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  params: Promise<{ locale: string }>;
};

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5216242661967";
const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola !\nTe contacto desde la web de VHETRA.")}`;

const CONTACTOS = [
  { id: 1, img: "/icons/instagramIco.svg", titleKey: "instagramTitle" as const, actionKey: "instagramAction" as const, href: "https://www.instagram.com/somosvhetra/" },
  { id: 2, img: "/icons/gmailIco.svg", titleKey: "gmailTitle" as const, actionKey: "gmailAction" as const, href: "mailto:hola.vhetra@gmail.com" },
  { id: 3, img: "/icons/whatsappIco.svg", titleKey: "whatsappTitle" as const, actionKey: "whatsappAction" as const, href: whatsappHref },
];

export default async function TarjetaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tarjeta");
  const tContact = await getTranslations("contact");

  const contactos = CONTACTOS.map((c) => ({
    ...c,
    title: tContact(c.titleKey),
    action: tContact.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <div className="flex flex-1 justify-center items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-[320px] bg-[#EEEFF0] backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 sm:p-8 flex flex-col gap-6 card-stagger overflow-visible">
        <header className="text-center space-y-2">
          <h1 className="text-6xl sm:text-8xl tracking-tight text-azulo">
            VHETRA
          </h1>
          <p className="text-lg sm:text-xl font-medium text-azulo">
            {t("tagline")}
          </p>
          <p className="text-sm sm:text-base text-azulo/90">
            {t("description")}
          </p>
          <Link
            href="https://www.vhetra.com.ar"
            className="inline-block text-accent font-medium hover:underline"
          >
            {t("website")}
          </Link>
        </header>

        <div className="flex flex-col gap-4 sm:w-[110%]">
          {contactos.map((contacto, index) => (
            <Link
              key={contacto.titleKey}
              href={contacto.href}
              className={twMerge(
                "w-full sm:w-[110%] p-4 gap-3 flex flex-row items-center text-tiza bg-card rounded-xl shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)] ripple-btn transition-transform",
                index % 2 === 0 ? "sm:-ml-12" : "sm:ml-0"
              )}
            >
              <Image
                src={contacto.img}
                alt={contacto.title}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold uppercase text-tiza">
                  {contacto.title}
                </span>
                <span className="text-sm text-tiza/80">{contacto.action}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
