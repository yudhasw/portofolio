import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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
import { toCardData } from "@/lib/content/cards";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/seo/site-url";

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

  const [
    site,
    experienceItems,
    educationItems,
    certifications,
    skillGroups,
    allProjects,
  ] = await Promise.all([
    getSite(),
    getExperience(),
    getEducation(),
    getCertifications(),
    getSkillGroups(),
    getProjects(),
  ]);

  const present = common("present");
  const cv = locale === "id" ? site.cvId : site.cvEn;
  const cardLabels = {
    status: (s: (typeof allProjects)[number]["status"]) =>
      projects(`status.${s}`),
    demo: projects("demo"),
    repo: projects("repo"),
    caseStudy: projects("caseStudy"),
  };
  const cards = allProjects.map((p) => toCardData(p, locale, cardLabels));

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Software Engineer",
    url: `${getSiteUrl()}/${locale}`,
    sameAs: [site.github, site.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Telkom University" },
    knowsAbout: skillGroups.flatMap((g) => g.items),
  };

  return (
    <>
      <JsonLd data={person} />
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
        locale={locale}
        scrollLabel={hero("scroll")}
        consoleLabels={{
          title: hero("consoleTitle"),
          prompt: hero("consolePrompt"),
          placeholder: hero("consolePlaceholder"),
          chips: {
            ai: hero("chips.ai"),
            cdc: hero("chips.cdc"),
            stack: hero("chips.stack"),
            experience: hero("chips.experience"),
            contact: hero("chips.contact"),
          },
        }}
      />
      <About
        eyebrow={about("eyebrow")}
        title={about("title")}
        bio={site.bio.map((p, i) => pick(p, locale, `site.bio[${i}]`))}
        highlightsLabel={about("highlights")}
        highlights={site.highlights.map((h, i) =>
          pick(h, locale, `site.highlights[${i}]`),
        )}
        skillsLabel={about("skills")}
        skillGroups={skillGroups.map((g) => ({
          id: g.id,
          title: pick(g.title, locale, `skill:${g.id}`),
          items: g.items,
        }))}
        bentoLabels={{
          role: about("bento.role"),
          hoverToRead: about("bento.hoverToRead"),
          craft: about("bento.craft"),
          craftDesc: about("bento.craftDesc"),
          basedIn: about("bento.basedIn"),
          location: about("bento.location"),
          coords: about("bento.coords"),
          gmt: about("bento.gmt"),
          mindset: about("bento.mindset"),
          mindsetDesc: about("bento.mindsetDesc"),
          status: about("bento.status"),
        }}
      />
      <Experience
        eyebrow={experience("eyebrow")}
        title={experience("title")}
        items={experienceItems.map((e) => ({
          id: e.id,
          role: pick(e.role, locale, `experience:${e.id}`),
          organization: e.organization,
          period: formatPeriod(e.start, e.end, locale, present),
          bullets: e.bullets.map((b, i) =>
            pick(b, locale, `experience:${e.id}.bullets[${i}]`),
          ),
          tags: e.tags,
        }))}
      />
      <Projects
        eyebrow={projects("eyebrow")}
        title={projects("title")}
        featuredLabel={projects("featured")}
        othersLabel={projects("others")}
        featured={cards.filter((p) => p.featured)}
        others={cards.filter((p) => !p.featured)}
        viewAll={{ label: projects("viewAll"), href: "/projects" }}
      />
      <Education
        eyebrow={education("eyebrow")}
        title={education("title")}
        items={educationItems.map((e) => ({
          id: e.id,
          degree: pick(e.degree, locale, `education:${e.id}`),
          institution: e.institution,
          period: `${formatDate(e.start, locale)} – ${formatDate(e.end, locale)}`,
          gpa: e.gpa,
        }))}
        certificationsLabel={education("certifications")}
        certifications={certifications}
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
