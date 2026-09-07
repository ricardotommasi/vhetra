import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function pageMetadata(locale: string, title: string, description: string, path = ""): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const images = [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vhetra" }];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es${path}`, en: `${SITE_URL}/en${path}` },
    },
    openGraph: { type: "website", locale: locale === "es" ? "es_AR" : "en_US", url, siteName: "Vhetra", title, description, images },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}
