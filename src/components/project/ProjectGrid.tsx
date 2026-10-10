import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Props = {
  projects: ProjectCardData[];
  columns?: 2 | 3;
  activeTag?: string;
};

export function ProjectGrid({ projects, columns = 2, activeTag }: Props) {
  const visible = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <ul
      className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {visible.map((project) => (
        <li key={project.slug}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
}
