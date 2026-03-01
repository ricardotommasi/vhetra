import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Filosofia({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("philosophy");

  return (

    <div className="flex px-4 py-8 flex-col w-full mt-[10%] bg-white/50 shadow-[0px_5px_5px_0px_rgba(0,0,0,0.45)]">
      <div className="flex flex-row gap-5 items-center mb-4">
        <h3 className="text-black text-2xl sm:text-4xl md:text-6xl font-medium shrink-0">{t("titlePrefix")}</h3>
        <div className="text-black text-4xl sm:text-6xl md:text-8xl font-medium mt-10 shrink-0 relative w-fit">
          <h3 className="relative z-20">{t("titleSuffix")}</h3>
          <Image src="/accent/circuloRespira.svg" alt="" aria-hidden width={200} height={80}
            className="absolute inset-x-0 bottom-0 w-full h-auto z-10 pointer-events-none scale-160" />
          <Image src="/accent/tildeRespira.svg" alt="" aria-hidden width={200} height={80}
            className="absolute -top-15 -right-20 sm:-top-25 sm:-right-35 md:-top-35 md:-right-45 lg:-top-45 lg:-right- w-full h-auto z-10 pointer-events-none" />
        </div>
      </div>
      <p className="text-black text-sm sm:text-base md:text-lg text-left">{t("intro")}</p>
      <p className="text-black text-sm sm:text-base md:text-lg text-left">{t("body1")}</p>
      <p className="text-black text-sm sm:text-base md:text-lg text-left">{t("body2")}</p>
      <p className="text-black text-sm sm:text-base md:text-lg text-left">{t("body3")}</p>
    </div>
  );
}
