import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const khand = localFont({
  src: [
    { path: "../../public/fonts/Khand-Light.woff2", weight: "300" },
    { path: "../../public/fonts/Khand-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Khand-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Khand-SemiBold.woff2", weight: "600" },
    { path: "../../public/fonts/Khand-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-khand",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const manrope = localFont({
  src: "../../public/fonts/Manrope-Variable-Latin.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-manrope-local",
  fallback: ["Arial", "sans-serif"],
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.metadata as { title: string; description: string };
  const baseUrl = "https://vhetra.com.ar";
  const localizedUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: meta.title, template: "%s | Vhetra" },
    description: meta.description,
    applicationName: "Vhetra",
    keywords:
      locale === "en"
        ? ["Vhetra", "web design", "web development", "visual identity", "digital presence", "digital agency", "creative studio", "Argentina"]
        : ["Vhetra", "diseño web", "desarrollo web", "identidad visual", "presencia digital", "agencia digital", "estudio creativo", "Argentina"],
    authors: [{ name: "Vhetra" }],
    creator: "Vhetra",
    publisher: "Vhetra",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      url: localizedUrl,
      siteName: "Vhetra",
      title: meta.title,
      description: meta.description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vhetra" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: localizedUrl,
      languages: { es: `${baseUrl}/es`, en: `${baseUrl}/en` },
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/apple-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${khand.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
