import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProject, getProjects, pick } from "@/lib/content";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const featured = (await getProjects()).filter((p) => p.featured);
  return routing.locales.flatMap((locale) =>
    featured.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) notFound();
  const label = `${locale === "id" ? "Studi kasus" : "Case study"} · Yudha Setiawan Wicaksono`;

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
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.1 }}>
          {project.title}
        </div>
        <div style={{ fontSize: 32, color: "#A3B2AE", lineHeight: 1.35 }}>
          {pick(project.summary, locale, `project:${slug}`).slice(0, 170)}
        </div>
      </div>
      <div style={{ height: 6, width: 160, background: "#6FCFB8" }} />
    </div>,
    size,
  );
}
