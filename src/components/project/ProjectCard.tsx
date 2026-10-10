import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import type { ProjectStatus } from "@/types/content";

export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  status: ProjectStatus;
  statusLabel: string;
  links: { label: string; href: string }[];
  featured?: boolean;
};

const marker = {
  live: "dot",
  "in-development": "ring",
  archived: "none",
} as const;

export function ProjectCard({
  title,
  summary,
  stack,
  status,
  statusLabel,
  links,
  featured,
}: ProjectCardData) {
  return (
    <article
      className={`flex h-full flex-col rounded-md border border-border bg-surface ${featured ? "p-6 sm:p-8" : "p-5"}`}
    >
      <div className="mb-3">
        <Badge marker={marker[status]}>{statusLabel}</Badge>
      </div>
      <h3
        className={`font-display font-bold ${featured ? "text-2xl" : "text-lg"}`}
      >
        {title}
      </h3>
      <p className="mt-2 flex-1 text-fg-muted">{summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {stack.map((s) => (
          <li key={s}>
            <Tag>{s}</Tag>
          </li>
        ))}
      </ul>
      {links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                {l.label}
                <span className="sr-only"> ({title})</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
