import { SITE_URL } from "./config/site";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  return ["es", "en"].flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/tarjeta`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/tarjeta`,
          en: `${baseUrl}/en/tarjeta`,
        },
      },
    },
  ]);
}
