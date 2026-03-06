import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.metadata as { title: string; description: string };
  return {
    title: meta.title,
    description: meta.description,
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
      <body className="antialiased">
        <main className="relative h-screen-dynamic w-screen-dynamic flex flex-col overflow-hidden">
          <div className="absolute inset-0 bg-[url(/img/bg.webp)] bg-center sm:bg-cover bg-no-repeat opacity-70 -z-10" />

          {children}

          <Image
            src="/accent/flechaIzquierda.svg"
            alt="BackgroundDetail"
            width={49}
            height={308}
            className="absolute bottom-[5%] left-0 w-[45px] z-10"
          />
        </main>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
