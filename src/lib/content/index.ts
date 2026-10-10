import educationData from "../../../content/education/education.json";
import experienceData from "../../../content/experience/experience.json";
import projectsData from "../../../content/projects/projects.json";
import siteData from "../../../content/site/site.json";
import skillsData from "../../../content/skills/skills.json";
import { routing, type Locale } from "@/i18n/routing";
import type {
  Certification,
  Education,
  Experience,
  Localized,
  Project,
  Site,
  SkillGroup,
} from "@/types/content";

/**
 * Ambil teks sesuai bahasa. Bila kosong, fallback ke bahasa lain dan beri
 * peringatan saat build agar konten yang belum diterjemahkan tidak lolos diam-diam.
 */
export function pick<T extends string | string[]>(
  field: Localized<T>,
  locale: Locale,
  label = "content",
): T {
  const isEmpty = (v: T | undefined) => v === undefined || v.length === 0;
  if (!isEmpty(field[locale])) return field[locale];

  const fallback = routing.locales.find(
    (l) => l !== locale && !isEmpty(field[l]),
  );
  console.warn(
    `[content] "${label}" kosong untuk "${locale}", memakai fallback "${fallback}".`,
  );
  return fallback ? field[fallback] : ("" as T);
}

const byOrder = <T extends { order: number }>(items: T[]) =>
  [...items].sort((a, b) => a.order - b.order);

export const getSite = () => siteData as Site;
export const getExperience = () => byOrder(experienceData as Experience[]);
export const getEducation = () =>
  byOrder(educationData.education as Education[]);
export const getCertifications = () =>
  educationData.certifications as Certification[];
export const getSkillGroups = () => byOrder(skillsData as SkillGroup[]);
export const getProjects = () => byOrder(projectsData as Project[]);

/** "2026-07-29" -> "29 Jul 2026", "2026-01" -> "Jan 2026", "2023" -> "2023". */
export function formatDate(value: string, locale: Locale): string {
  const parts = value.split("-").map(Number);
  if (parts.length === 1) return String(parts[0]);
  const [year, month, day] = parts;
  const date = new Date(Date.UTC(year, month - 1, day ?? 1));
  return new Intl.DateTimeFormat(locale, {
    day: day ? "numeric" : undefined,
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatPeriod(
  start: string,
  end: string | undefined,
  locale: Locale,
  present: string,
) {
  return `${formatDate(start, locale)} – ${end ? formatDate(end, locale) : present}`;
}
