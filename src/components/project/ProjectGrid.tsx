import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Props = {
  projects: ProjectCardData[];
  columns?: 2 | 3;
  activeTag?: string;
  headingLevel?: 2 | 3 | 4;
  /** Cover kartu pertama dimuat prioritas (dipakai di halaman indeks). */
  priorityFirst?: boolean;
};

export function ProjectGrid({
  projects,
  columns = 2,
  activeTag,
  headingLevel,
  priorityFirst,
}: Props) {
  const visible = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <ul
      className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {visible.map((project, i) => (
        <li key={project.slug} data-reveal="up">
          <ProjectCard
            {...project}
            headingLevel={headingLevel}
            priority={priorityFirst && i === 0}
          />
        </li>
      ))}
    </ul>
  );
}
