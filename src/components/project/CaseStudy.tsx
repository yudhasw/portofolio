import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Link } from "@/i18n/navigation";
import { Gallery } from "./Gallery";
import { MetricCard } from "./MetricCard";

type Props = {
  title: string;
  summary: string;
  status: { label: string; marker: "dot" | "ring" | "none" };
  stackLabel: string;
  stack: string[];
  links: { label: string; href: string }[];
  metricsLabel: string;
  metrics: { label: string; value: string; note?: string }[];
  /** MDX yang sudah dirender. */
  body: ReactNode;
  galleryLabel: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
  openImageLabel: (alt: string) => string;
  closeImageLabel: string;
  prev?: { slug: string; title: string; label: string };
  next?: { slug: string; title: string; label: string };
};

export function CaseStudy(props: Props) {
  const { title, summary, status, stack, metrics, gallery, prev, next } = props;

  return (
    <article>
      <header className="mb-10">
        <div className="mb-4">
          <Badge marker={status.marker}>{status.label}</Badge>
        </div>
        <h1 className="font-display text-(length:--text-hero) leading-[1.05] font-bold text-balance">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fg-muted">{summary}</p>
        <div className="mt-6">
          <p className="mb-2 text-sm text-fg-muted">{props.stackLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
        </div>
        {props.links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-medium">
            {props.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {metrics.length > 0 && (
        <section aria-labelledby="metrics-heading" className="mb-12">
          <h2
            id="metrics-heading"
            className="mb-4 font-display text-xl font-bold"
          >
            {props.metricsLabel}
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </dl>
        </section>
      )}

      <div className="case-body">{props.body}</div>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="mt-12">
          <h2
            id="gallery-heading"
            className="mb-4 font-display text-xl font-bold"
          >
            {props.galleryLabel}
          </h2>
          <Gallery
            images={gallery}
            openLabel={props.openImageLabel}
            closeLabel={props.closeImageLabel}
          />
        </section>
      )}

      {(prev || next) && (
        <nav
          aria-label="Project navigation"
          className="mt-16 flex flex-wrap justify-between gap-4 border-t border-border pt-8"
        >
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group">
              <span className="block text-sm text-fg-muted">
                ← {prev.label}
              </span>
              <span className="font-display text-lg font-bold group-hover:underline">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="block text-sm text-fg-muted">
                {next.label} →
              </span>
              <span className="font-display text-lg font-bold group-hover:underline">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
