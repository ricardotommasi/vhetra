import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import "./globals.css";
import { ParallaxBg } from "./components/ParallaxBg";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.metadata as { title: string; description: string };

  const baseUrl = "https://vhetra.com.ar";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: meta.title,
      template: "%s | Vhetra",
    },
    description: meta.description,
    applicationName: "Vhetra",
    keywords: [
      "Vhetra",
      "diseño web",
      "desarrollo web",
      "identidad visual",
      "presencia digital",
      "agencia digital",
      "estudio creativo",
      "Argentina",
    ],
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
      url: baseUrl,
      siteName: "Vhetra",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Vhetra",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <main className="relative h-screen-dynamic w-screen-dynamic flex flex-col overflow-hidden">
          <ParallaxBg />

          {children}

          <Image
            src="/accent/flechaIzquierda.svg"
            alt="BackgroundDetail"
            width={49}
            height={308}
            className="absolute bottom-[5%] left-0 w-11.25 z-10"
          />
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
