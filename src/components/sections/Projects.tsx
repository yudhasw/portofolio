import { ProjectGrid } from "@/components/project/ProjectGrid";
import type { ProjectCardData } from "@/components/project/ProjectCard";
import { buttonClasses } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

type Props = {
  eyebrow: string;
  title: string;
  featuredLabel: string;
  othersLabel: string;
  featured: ProjectCardData[];
  others: ProjectCardData[];
  viewAll: { label: string; href: string };
};

export function Projects({
  eyebrow,
  title,
  featuredLabel,
  othersLabel,
  featured,
  others,
  viewAll,
}: Props) {
  return (
    <Section id="projects">
      <SectionHeading id="projects" eyebrow={eyebrow} title={title} />
      <h3 className="mb-4 font-display text-xl font-bold">{featuredLabel}</h3>
      <ProjectGrid projects={featured} />
      {others.length > 0 && (
        <>
          <h3 className="mt-12 mb-4 font-display text-xl font-bold">
            {othersLabel}
          </h3>
          <ProjectGrid projects={others} columns={3} />
        </>
      )}
      <div className="mt-10">
        <Link href={viewAll.href} className={buttonClasses("secondary")}>
          {viewAll.label}
        </Link>
      </div>
    </Section>
  );
}
