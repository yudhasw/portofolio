import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ProjectCardData } from "@/components/project/ProjectCard";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { routing, type Locale } from "@/i18n/routing";
import {
  formatDate,
  formatPeriod,
  getCertifications,
  getEducation,
  getExperience,
  getProjects,
  getSite,
  getSkillGroups,
  pick,
} from "@/lib/content";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  const locale: Locale = raw;
  setRequestLocale(locale);

  const [common, hero, about, experience, projects, education, contact, form] =
    await Promise.all(
      [
        "Common",
        "Hero",
        "About",
        "Experience",
        "Projects",
        "Education",
        "Contact",
        "ContactForm",
      ].map((namespace) => getTranslations({ locale, namespace })),
    );

  const site = getSite();
  const present = common("present");
  const cv = locale === "id" ? site.cvId : site.cvEn;

  const toCard = (
    p: ReturnType<typeof getProjects>[number],
  ): ProjectCardData => ({
    slug: p.slug,
    title: p.title,
    summary: pick(p.summary, locale, `project:${p.slug}`),
    tags: p.tags,
    stack: p.stack,
    status: p.status,
    statusLabel: projects(`status.${p.status}`),
    links: [
      ...(p.demoUrl ? [{ label: projects("demo"), href: p.demoUrl }] : []),
      ...(p.repoUrl ? [{ label: projects("repo"), href: p.repoUrl }] : []),
    ],
  });
  const allProjects = getProjects();

  return (
    <>
      <Hero
        name={site.name}
        eyebrow={hero("eyebrow")}
        headline={pick(site.headline, locale, "site.headline")}
        subheadline={pick(site.subheadline, locale, "site.subheadline")}
        photo={
          site.photo
            ? {
                src: site.photo,
                alt: pick(site.photoAlt, locale, "site.photoAlt"),
              }
            : undefined
        }
        primaryCta={{ label: hero("ctaProjects"), href: "#projects" }}
        secondaryCta={{ label: hero("ctaContact"), href: "#contact" }}
        cv={cv ? { label: hero("downloadCv"), href: cv } : undefined}
        status={site.openToWork ? hero("openToWork") : undefined}
      />
      <About
        eyebrow={about("eyebrow")}
        title={about("title")}
        bio={pick(site.bio, locale, "site.bio")}
        highlightsLabel={about("highlights")}
        highlights={pick(site.highlights, locale, "site.highlights")}
        skillsLabel={about("skills")}
        skillGroups={getSkillGroups().map((g) => ({
          id: g.id,
          title: pick(g.title, locale, `skill:${g.id}`),
          items: g.items,
        }))}
      />
      <Experience
        eyebrow={experience("eyebrow")}
        title={experience("title")}
        items={getExperience().map((e) => ({
          id: e.id,
          role: pick(e.role, locale, `experience:${e.id}`),
          organization: e.organization,
          period: formatPeriod(e.start, e.end, locale, present),
          bullets: pick(e.bullets, locale, `experience:${e.id}.bullets`),
          tags: e.tags,
        }))}
      />
      <Projects
        eyebrow={projects("eyebrow")}
        title={projects("title")}
        featuredLabel={projects("featured")}
        othersLabel={projects("others")}
        featured={allProjects.filter((p) => p.featured).map(toCard)}
        others={allProjects.filter((p) => !p.featured).map(toCard)}
      />
      <Education
        eyebrow={education("eyebrow")}
        title={education("title")}
        items={getEducation().map((e) => ({
          id: e.id,
          degree: pick(e.degree, locale, `education:${e.id}`),
          institution: e.institution,
          period: `${formatDate(e.start, locale)} – ${formatDate(e.end, locale)}`,
          gpa: e.gpa,
        }))}
        certificationsLabel={education("certifications")}
        certifications={getCertifications()}
      />
      <Contact
        eyebrow={contact("eyebrow")}
        title={contact("title")}
        intro={contact("intro")}
        email={{ label: contact("emailLabel"), address: site.email }}
        socials={[
          { label: contact("github"), href: site.github },
          { label: contact("linkedin"), href: site.linkedin },
        ]}
        locale={locale}
        formLabels={{
          name: form("name"),
          email: form("email"),
          message: form("message"),
          submit: form("submit"),
          sending: form("sending"),
          success: form("success"),
          error: form("error"),
          errors: {
            required: form("errors.required"),
            email: form("errors.email"),
            tooShort: form("errors.tooShort"),
            tooLong: form("errors.tooLong"),
          },
        }}
      />
    </>
  );
}
