import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectsIndex } from "@/components/project/ProjectsIndex";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/content";
import { toCardData } from "@/lib/content/cards";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: `${t("indexTitle")} · Yudha Setiawan Wicaksono`,
    description: t("indexIntro"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        id: "/id/projects",
        "x-default": "/en/projects",
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Projects" });
  const projects = await getProjects();
  const labels = {
    status: (s: (typeof projects)[number]["status"]) => t(`status.${s}`),
    demo: t("demo"),
    repo: t("repo"),
    caseStudy: t("caseStudy"),
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-display text-(length:--text-h2) leading-tight font-bold">
          {t("indexTitle")}
        </h1>
        <p className="mt-3 text-lg text-fg-muted">{t("indexIntro")}</p>
      </div>
      <ProjectsIndex
        projects={projects.map((p) => toCardData(p, locale, labels))}
        filterLabel={t("filterLabel")}
        allLabel={t("filterAll")}
        emptyLabel={t("empty")}
      />
    </div>
  );
}
