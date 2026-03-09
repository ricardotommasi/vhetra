import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageTransition } from "../components/PageTransition";
import { SharedHero } from "../components/SharedHero";
export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div className="relative z-20 h-full flex flex-col min-h-0">
      <NextIntlClientProvider messages={messages}>
        <div className="flex-1 min-h-0 flex flex-col">
          <SharedHero>
            <div className="h-full overflow-y-auto">
              <PageTransition>{children}</PageTransition>
            </div>
          </SharedHero>
        </div>
      </NextIntlClientProvider>
    </div>
  );
}
