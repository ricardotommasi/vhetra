import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";
const CONTACTOS = [
  {
    id: 1,
    img: "/icons/instagramIco.svg",
    titleKey: "instagramTitle" as const,
    actionKey: "instagramAction" as const,
    href: "https://www.instagram.com/holavhetra/",
  },
  {
    id: 2,
    img: "/icons/gmailIco.svg",
    titleKey: "gmailTitle" as const,
    actionKey: "gmailAction" as const,
    href: "mailto:hola.vhetra@gmail.com",
  },
  {
    id: 3,
    img: "/icons/whatsappIco.svg",
    titleKey: "whatsappTitle" as const,
    actionKey: "whatsappAction" as const,
    href: "",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://vhetra.com.ar";

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}/tarjeta`,
      languages: {
        es: `${baseUrl}/es/tarjeta`,
        en: `${baseUrl}/en/tarjeta`,
      },
    },
    openGraph: {
      url: `${baseUrl}/${locale}/tarjeta`,
    },
  };
}

export default async function TarjetaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tarjeta");
  const tContact = await getTranslations("contact");

  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    tContact("whatsappMessage"),
  )}`;
  const contactos = CONTACTOS.map((c) => ({
    ...c,
    href: c.titleKey === "whatsappTitle" ? whatsappHref : c.href,
    title: tContact(c.titleKey),
    action: tContact.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-[#EAE6DF] px-4 py-6 sm:px-8 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,40,17,0.08),transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#F8F5EF] shadow-[0_24px_80px_-24px_rgba(40,30,20,0.25)] sm:rounded-[2.5rem] lg:grid-cols-[1.15fr_1fr]">
        <div className="relative flex flex-col items-start p-7 sm:p-12 lg:p-14">
          <div aria-hidden="true" className="mb-9 flex items-center gap-2 sm:mb-12">
            <span className="h-2 w-2 rounded-full bg-[#A82811]" />
            <span className="h-px w-12 bg-[#A82811]/30" />
          </div>

          <h1 className="font-khanda text-[4.5rem] font-medium uppercase leading-[0.82] tracking-[-0.065em] text-[#191919] sm:text-[6rem]">
            VHETRA<span className="text-[#A82811]">.</span>
          </h1>

          <p className="mt-8 max-w-sm text-balance font-khanda text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-[#26231F] sm:mt-10 sm:text-[2.75rem]">
            {t("tagline")}
          </p>

          <p className="mt-4 max-w-sm font-manrope text-sm leading-7 text-[#686159] sm:text-[0.95rem]">
            {t("description")}
          </p>

          <Link
            href="https://www.vhetra.com.ar"
            className="group mt-8 inline-flex min-h-11 items-center gap-5 border-b border-[#A82811]/30 pb-1 font-manrope text-sm font-semibold text-[#A82811] transition-colors hover:border-[#A82811] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#A82811] sm:mt-10"
          >
            {t("website")}
            <span aria-hidden="true" className="text-xl motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5">↗</span>
          </Link>
        </div>

        <div className="relative flex flex-col justify-center bg-[#1D1D1B] p-6 sm:p-10 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-56 w-56 bg-[radial-gradient(ellipse_at_top_right,rgba(168,40,17,0.22),transparent_70%)]" />
          <p className="relative mb-6 flex items-center gap-3 font-manrope text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#C7BFB4]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#CD614B]" />
            {tContact("eyebrow")}
          </p>
          <div className="relative flex flex-col gap-3">
            {contactos.map((contacto) => (
              <Link
                key={contacto.titleKey}
                href={contacto.href}
                className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-[#F5F0EA] transition-colors duration-200 hover:border-[#CD614B]/60 hover:bg-white/[0.075] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CD614B] sm:gap-4 sm:p-5"
              >
                <Image
                  src={contacto.img}
                  alt=""
                  width={48}
                  height={48}
                  className="h-10 w-10 shrink-0 rounded-xl sm:h-11 sm:w-11"
                />
                <div className="flex min-w-0 flex-col">
                  <span className="font-manrope text-xs font-semibold uppercase leading-tight tracking-[0.12em] text-[#F5F0EA]">
                    {contacto.title}
                  </span>
                  <span className="mt-2 font-manrope text-xs leading-5 text-[#C7BFB4]">
                    {contacto.action}
                  </span>
                </div>
                <span aria-hidden="true" className="ml-auto shrink-0 text-xl text-[#C7BFB4] transition-colors group-hover:text-[#E88973]">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
