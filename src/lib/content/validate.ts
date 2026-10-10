import { routing } from "@/i18n/routing";
import type { Localized, Project, Site } from "@/types/content";

type Content = {
  site: Site;
  projects: Project[];
  experience: { id: string; role: Localized; bullets: Localized[] }[];
  education: { id: string; degree: Localized }[];
  skillGroups: { id: string; title: Localized }[];
};

const empty = (v: string | undefined) => !v || v.trim().length === 0;

/**
 * Gagalkan build bila konten terbit tidak lengkap: field dua bahasa kosong,
 * featured tanpa bodyEn/bodyId, gambar tanpa alt, atau slug ganda.
 * Mengembalikan daftar masalah (kosong = valid).
 */
export function validateContent(content: Content): string[] {
  const problems: string[] = [];

  const checkL = (where: string, field: Localized | undefined) => {
    for (const locale of routing.locales) {
      if (empty(field?.[locale]))
        problems.push(`${where}: teks "${locale}" kosong`);
    }
  };

  const { site } = content;
  checkL("site.headline", site.headline);
  checkL("site.subheadline", site.subheadline);
  site.bio.forEach((p, i) => checkL(`site.bio[${i}]`, p));
  site.highlights.forEach((p, i) => checkL(`site.highlights[${i}]`, p));
  if (site.photo) checkL("site.photoAlt (foto tanpa alt)", site.photoAlt);

  for (const e of content.experience) {
    checkL(`experience/${e.id}.role`, e.role);
    e.bullets.forEach((b, i) => checkL(`experience/${e.id}.bullets[${i}]`, b));
  }
  for (const e of content.education)
    checkL(`education/${e.id}.degree`, e.degree);
  for (const s of content.skillGroups) checkL(`skills/${s.id}.title`, s.title);

  const slugs = new Set<string>();
  for (const p of content.projects) {
    if (slugs.has(p.slug)) problems.push(`projects: slug ganda "${p.slug}"`);
    slugs.add(p.slug);
    if (!p.published) continue;

    checkL(`projects/${p.slug}.summary`, p.summary);
    if (p.cover)
      checkL(`projects/${p.slug}.coverAlt (cover tanpa alt)`, p.coverAlt);
    p.gallery.forEach((g, i) =>
      checkL(`projects/${p.slug}.gallery[${i}].alt (gambar tanpa alt)`, g.alt),
    );
    p.metrics.forEach((m, i) => {
      checkL(`projects/${p.slug}.metrics[${i}].label`, m.label);
      checkL(`projects/${p.slug}.metrics[${i}].value`, m.value);
    });
    if (p.featured) {
      if (!p.hasBody.en)
        problems.push(`projects/${p.slug}: featured tanpa bodyEn`);
      if (!p.hasBody.id)
        problems.push(`projects/${p.slug}: featured tanpa bodyId`);
    }
  }

  return problems;
}
