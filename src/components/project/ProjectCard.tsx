import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Link } from "@/i18n/navigation";
import type { ProjectStatus } from "@/types/content";

export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  status: ProjectStatus;
  statusLabel: string;
  cover?: { src: string; alt: string; width: number; height: number };
  /** Ada = proyek punya halaman studi kasus. */
  caseStudy?: { href: string; label: string };
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
  cover,
  caseStudy,
  links,
  featured,
}: ProjectCardData) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface">
      {cover && (
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 45vw, 100vw"
          className="aspect-video w-full object-cover object-top"
        />
      )}
      <div
        className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-5"}`}
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
        {(caseStudy || links.length > 0) && (
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {caseStudy && (
              <li>
                <Link
                  href={caseStudy.href}
                  className="text-accent underline underline-offset-4"
                >
                  {caseStudy.label}
                  <span className="sr-only"> ({title})</span>
                </Link>
              </li>
            )}
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
      </div>
    </article>
  );
}
