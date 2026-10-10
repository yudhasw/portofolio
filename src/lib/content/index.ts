import path from "node:path";
import { createReader } from "@keystatic/core/reader";
import { cacheLife } from "next/cache";
import sharp from "sharp";
import keystaticConfig from "../../../keystatic.config";
import { routing, type Locale } from "@/i18n/routing";
import type {
  Certification,
  Education,
  Experience,
  Localized,
  Project,
  ProjectImage,
  Site,
  SkillGroup,
} from "@/types/content";
import { validateContent } from "./validate";

const reader = createReader(process.cwd(), keystaticConfig);

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
const opt = <T>(v: T | null | undefined | "") =>
  v === null || v === undefined || v === "" ? undefined : v;

async function imageInfo(
  src: string | null | undefined,
): Promise<ProjectImage | undefined> {
  if (!src) return undefined;
  // Path publik (/images/...) dipetakan ke folder public/.
  const file = path.join(process.cwd(), "public", src.replace(/^\/+/, ""));
  const { width, height } = await sharp(file).metadata();
  if (!width || !height)
    throw new Error(`[content] Tidak bisa membaca ukuran gambar: ${src}`);
  return { src, width, height };
}

/** Di-cache agar halaman tetap statis; saat dev cepat kedaluwarsa supaya edit CMS langsung terlihat. */
async function loadAll() {
  "use cache";
  if (process.env.NODE_ENV === "production") cacheLife("max");
  else cacheLife({ stale: 30, revalidate: 30, expire: 300 });

  const [
    siteRaw,
    experienceRaw,
    educationRaw,
    certificationRaw,
    skillRaw,
    projectRaw,
  ] = await Promise.all([
    reader.singletons.site.read(),
    reader.collections.experience.all(),
    reader.collections.education.all(),
    reader.collections.certifications.all(),
    reader.collections.skillGroups.all(),
    reader.collections.projects.all(),
  ]);
  if (!siteRaw)
    throw new Error("[content] content/site/index.json tidak ditemukan.");

  const site = {
    ...siteRaw,
    photo: opt(siteRaw.photo),
    cvEn: opt(siteRaw.cvEn),
    cvId: opt(siteRaw.cvId),
  } as unknown as Site;

  const experience = byOrder(
    experienceRaw.map(({ entry }) => ({ ...entry, end: opt(entry.end) })),
  ) as unknown as Experience[];
  const education: Education[] = byOrder(
    educationRaw.map(({ entry }) => ({ ...entry, gpa: opt(entry.gpa) })),
  );
  const certifications: Certification[] = byOrder(
    certificationRaw.map(({ entry }) => ({
      title: entry.title,
      issuer: entry.issuer,
      year: opt(entry.year),
      url: opt(entry.url),
      order: entry.order,
    })),
  );
  const skillGroups = byOrder(
    skillRaw.map(({ entry }) => ({ ...entry })),
  ) as unknown as SkillGroup[];

  const projects: Project[] = await Promise.all(
    projectRaw.map(async ({ slug, entry }) => {
      const [bodyEn, bodyId] = await Promise.all([
        entry.bodyEn(),
        entry.bodyId(),
      ]);
      return {
        slug,
        title: entry.title,
        published: entry.published,
        summary: entry.summary,
        status: entry.status,
        featured: entry.featured,
        order: entry.order,
        year: opt(entry.year),
        tags: [...entry.tags],
        stack: [...entry.stack],
        cover: await imageInfo(entry.cover),
        coverAlt: entry.coverAlt,
        gallery: await Promise.all(
          entry.gallery.map(async (g) => ({
            image: (await imageInfo(g.image))!,
            alt: g.alt,
          })),
        ),
        repoUrl: opt(entry.repoUrl),
        demoUrl: opt(entry.demoUrl),
        metrics: entry.metrics.map((m) => ({
          label: m.label,
          value: m.value,
          note: m.note,
        })),
        hasBody: { en: Boolean(bodyEn?.trim()), id: Boolean(bodyId?.trim()) },
      } satisfies Project;
    }),
  );

  const problems = validateContent({
    site,
    projects,
    experience,
    education,
    skillGroups,
  });
  if (problems.length > 0) {
    throw new Error(
      `[content] Validasi konten gagal:\n- ${problems.join("\n- ")}`,
    );
  }

  return {
    site,
    experience,
    education,
    certifications,
    skillGroups,
    projects: byOrder(projects),
  };
}

export const getSite = async () => (await loadAll()).site;
export const getExperience = async () => (await loadAll()).experience;
export const getEducation = async () => (await loadAll()).education;
export const getCertifications = async () => (await loadAll()).certifications;
export const getSkillGroups = async () => (await loadAll()).skillGroups;

/** Hanya proyek terbit. */
export const getProjects = async () =>
  (await loadAll()).projects.filter((p) => p.published);

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

/** Isi studi kasus (MDX mentah) sesuai bahasa. */
export async function getProjectBody(
  slug: string,
  locale: Locale,
): Promise<string> {
  "use cache";
  if (process.env.NODE_ENV === "production") cacheLife("max");
  else cacheLife({ stale: 30, revalidate: 30, expire: 300 });

  const entry = await reader.collections.projects.read(slug);
  if (!entry) return "";
  return (locale === "id" ? await entry.bodyId() : await entry.bodyEn()) ?? "";
}

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
