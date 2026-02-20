import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Filosofia({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("philosophy");

  return (
    <div className="flex items-center justify-center flex-col mx-5">
      <h4 className="text-azulo text-xl font-medium">{t("title")}</h4>

      <section className="text-azulo max-w-xl text-center space-y-4">
        <h5 className="text-lg font-medium">{t("subtitle")}</h5>

        <p className="text-sm opacity-80">{t("paragraph1")}</p>

        <p className="text-sm opacity-80">{t("paragraph2")}</p>
      </section>
    </div>
  );
}
