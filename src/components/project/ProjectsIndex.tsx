"use client";

import { useState } from "react";
import { ProjectGrid } from "./ProjectGrid";
import type { ProjectCardData } from "./ProjectCard";

type Props = {
  projects: ProjectCardData[];
  filterLabel: string;
  allLabel: string;
  emptyLabel: string;
};

/**
 * Filter tag sisi klien. Semua kartu sudah ada di HTML (SSG), jadi tanpa JS
 * semua proyek tetap terbaca.
 */
export function ProjectsIndex({
  projects,
  filterLabel,
  allLabel,
  emptyLabel,
}: Props) {
  const [activeTag, setActiveTag] = useState<string>();
  const tags = [...new Set(projects.flatMap((p) => p.tags))].sort();
  const count = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag)).length
    : projects.length;

  const chip = (selected: boolean) =>
    `inline-flex h-10 items-center rounded-pill border px-4 text-sm font-medium transition-colors duration-(--duration-fast) ${
      selected
        ? "bg-accent text-on-accent border-accent"
        : "border-fg-muted text-fg hover:bg-surface"
    }`;

  return (
    <>
      <div
        role="group"
        aria-label={filterLabel}
        className="mb-8 flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={!activeTag}
          className={chip(!activeTag)}
          onClick={() => setActiveTag(undefined)}
        >
          {allLabel}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={activeTag === tag}
            className={chip(activeTag === tag)}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ProjectGrid
        projects={projects}
        columns={3}
        activeTag={activeTag}
        headingLevel={2}
        priorityFirst
      />
      <p role="status" className="mt-6 text-sm text-fg-muted">
        {count === 0 ? emptyLabel : ""}
      </p>
    </>
  );
}
