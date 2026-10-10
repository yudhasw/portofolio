import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Props = { projects: ProjectCardData[]; columns?: 2 | 3 };

export function ProjectGrid({ projects, columns = 2 }: Props) {
  return (
    <ul
      className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
}
