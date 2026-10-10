import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site-url";

/** Setiap halaman x setiap bahasa, lengkap dengan alternatif hreflang. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const featured = (await getProjects()).filter((p) => p.featured);
  const paths = [
    "",
    "/projects",
    ...featured.map((p) => `/projects/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
