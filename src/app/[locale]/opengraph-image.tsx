import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSite, pick } from "@/lib/content";

export const alt = "Yudha Setiawan Wicaksono";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const site = await getSite();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0F1514",
        color: "#E8EEEC",
        padding: 72,
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 4,
          color: "#6FCFB8",
          textTransform: "uppercase",
        }}
      >
        Software Engineer
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 38, color: "#A3B2AE", lineHeight: 1.3 }}>
          {pick(site.headline, locale, "site.headline")}
        </div>
      </div>
      <div style={{ height: 6, width: 160, background: "#6FCFB8" }} />
    </div>,
    size,
  );
}
