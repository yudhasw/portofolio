/**
 * URL dasar situs, untuk canonical, hreflang, sitemap, dan OG image.
 * Prioritas: NEXT_PUBLIC_SITE_URL (domain kustom nanti) > domain produksi Vercel
 * (otomatis) > URL deployment Vercel > localhost.
 */
function normalize(value: string) {
  const url = value.startsWith("http") ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalize(explicit);
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return normalize(vercel);
  return "http://localhost:3000";
}
