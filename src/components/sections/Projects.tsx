import { ProjectGrid } from "@/components/project/ProjectGrid";
import type { ProjectCardData } from "@/components/project/ProjectCard";
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
    <Section id="projects" className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none -top-20 -left-20 size-96 bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none -right-20 bottom-0 size-96 bg-accent/10 blur-3xl"
      />

      <div className="relative z-10">
        <SectionHeading id="projects" eyebrow={eyebrow} title={title} />

        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
            {featuredLabel}
          </h3>
        </div>

        <ProjectGrid projects={featured} />

        {others.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-fg-muted" />
              <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                {othersLabel}
              </h3>
            </div>
            <ProjectGrid projects={others} columns={3} />
          </div>
        )}

        <div className="mt-12 text-center sm:mt-16 sm:text-left">
          <Link
            href={viewAll.href}
            className="glass-strong inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-3 text-sm font-semibold text-fg shadow-sm transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-lg hover:shadow-accent/15 active:scale-95"
          >
            <span>{viewAll.label}</span>
            <svg
              className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
