import type { ProjectCardData } from "@/components/project/ProjectCard";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/types/content";
import { pick } from "./index";

type Labels = {
  status: (status: Project["status"]) => string;
  demo: string;
  repo: string;
  caseStudy: string;
};

/** Ubah Project (konten) menjadi data kartu (tampilan) untuk satu bahasa. */
export function toCardData(
  p: Project,
  locale: Locale,
  labels: Labels,
): ProjectCardData {
  return {
    slug: p.slug,
    title: p.title,
    summary: pick(p.summary, locale, `project:${p.slug}`),
    tags: p.tags,
    stack: p.stack,
    status: p.status,
    statusLabel: labels.status(p.status),
    cover: p.cover
      ? {
          ...p.cover,
          alt: pick(p.coverAlt, locale, `project:${p.slug}.coverAlt`),
        }
      : undefined,
    // Studi kasus hanya untuk proyek featured.
    caseStudy: p.featured
      ? { href: `/projects/${p.slug}`, label: labels.caseStudy }
      : undefined,
    links: [
      ...(p.demoUrl ? [{ label: labels.demo, href: p.demoUrl }] : []),
      ...(p.repoUrl ? [{ label: labels.repo, href: p.repoUrl }] : []),
    ],
    featured: p.featured,
  };
}
