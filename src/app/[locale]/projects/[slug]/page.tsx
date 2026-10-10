import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/project/CaseStudy";
import { Flow } from "@/components/project/Flow";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { getProject, getProjectBody, getProjects, pick } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function generateStaticParams() {
  const featured = (await getProjects()).filter((p) => p.featured);
  return routing.locales.flatMap((locale) =>
    featured.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project?.featured) return {};

  const path = `/projects/${slug}`;
  return {
    title: `${project.title} · Yudha Setiawan Wicaksono`,
    description: pick(project.summary, locale, `project:${slug}`),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        id: `/id${path}`,
        "x-default": `/en${path}`,
      },
    },
  };
}

const mdxComponents = { Flow };

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const projects = (await getProjects()).filter((p) => p.featured);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];

  const [t, c, home, source] = await Promise.all([
    getTranslations({ locale, namespace: "Projects" }),
    getTranslations({ locale, namespace: "CaseStudy" }),
    getTranslations({ locale, namespace: "Nav" }),
    getProjectBody(slug, locale),
  ]);

  const prev = projects[index - 1];
  const next = projects[index + 1];
  const marker = {
    live: "dot",
    "in-development": "ring",
    archived: "none",
  } as const;
  const base = getSiteUrl();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: c("home"),
              item: `${base}/${locale}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: home("projects"),
              item: `${base}/${locale}/projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.title,
              item: `${base}/${locale}/projects/${slug}`,
            },
          ],
        }}
      />
      <nav aria-label={c("breadcrumb")} className="mb-8 text-sm text-fg-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-4">
              {c("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="underline underline-offset-4">
              {home("projects")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{project.title}</li>
        </ol>
      </nav>

      <CaseStudy
        title={project.title}
        summary={pick(project.summary, locale, `project:${slug}`)}
        status={{
          label: t(`status.${project.status}`),
          marker: marker[project.status],
        }}
        stackLabel={c("stack")}
        stack={project.stack}
        links={[
          ...(project.demoUrl
            ? [{ label: t("demo"), href: project.demoUrl }]
            : []),
          ...(project.repoUrl
            ? [{ label: t("repo"), href: project.repoUrl }]
            : []),
        ]}
        metricsLabel={c("metrics")}
        metrics={project.metrics.map((m) => ({
          label: pick(m.label, locale),
          value: pick(m.value, locale),
          note: m.note.en || m.note.id ? pick(m.note, locale) : undefined,
        }))}
        body={<MDXRemote source={source} components={mdxComponents} />}
        galleryLabel={c("gallery")}
        gallery={project.gallery.map((g) => ({
          ...g.image,
          alt: pick(g.alt, locale),
        }))}
        openImageLabel={c.raw("openImage") as string}
        closeImageLabel={c("closeImage")}
        prev={prev && { slug: prev.slug, title: prev.title, label: c("prev") }}
        next={next && { slug: next.slug, title: next.title, label: c("next") }}
      />
    </div>
  );
}
