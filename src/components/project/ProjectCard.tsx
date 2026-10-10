import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
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

type CardProps = ProjectCardData & {
  /** Level heading judul kartu, mengikuti hierarki halaman. */
  headingLevel?: 2 | 3 | 4;
  /** Muat cover lebih awal (untuk kartu yang terlihat di layar pertama). */
  priority?: boolean;
  index?: number;
};

const marker = {
  live: "dot",
  "in-development": "ring",
  archived: "none",
} as const;

const GRADIENTS: Record<string, string> = {
  wealthwise: "from-emerald-700 via-teal-800 to-cyan-950",
  "cdc-infranexia": "from-indigo-700 via-violet-800 to-purple-950",
  "my-neighbor": "from-amber-700 via-orange-800 to-rose-950",
  telkomedika: "from-blue-700 via-sky-800 to-cyan-950",
  "e-tokobuku": "from-rose-700 via-pink-800 to-purple-950",
  "pakan-ikan-otomatis": "from-teal-700 via-emerald-800 to-green-950",
};

export function ProjectCard({
  slug,
  title,
  summary,
  tags,
  stack,
  status,
  statusLabel,
  cover,
  caseStudy,
  links,
  headingLevel = 3,
  priority,
  index,
}: CardProps) {
  const Heading = `h${headingLevel}` as const;
  const gradient =
    GRADIENTS[slug] ?? "from-neutral-800 via-slate-800 to-neutral-900";
  const formattedIndex = index ? String(index).padStart(2, "0") : undefined;

  return (
    <article className="group glass-strong flex h-full flex-col justify-between rounded-3xl border border-border/70 p-4 shadow-lg shadow-black/5 transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 sm:p-5">
      <div>
        {/* Header index & tags */}
        <header className="mb-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-fg-muted uppercase">
            {formattedIndex && (
              <>
                <span className="font-bold text-accent">{formattedIndex}</span>
                <span className="h-px w-4 bg-border"></span>
              </>
            )}
            <span className="truncate">{tags[0] ?? "Project"}</span>
          </div>
          <Badge marker={marker[status]}>{statusLabel}</Badge>
        </header>

        {/* Title and Action Buttons */}
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <Heading className="font-display text-xl font-bold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-2xl">
            {title}
          </Heading>
          <div className="flex shrink-0 items-center gap-2">
            {caseStudy && (
              <Link
                href={caseStudy.href}
                className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <span>{caseStudy.label}</span>
                <span className="sr-only"> ({title})</span>
              </Link>
            )}
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-surface/80 px-2.5 py-1 text-xs font-semibold text-fg-muted transition-all hover:scale-105 hover:border-accent/40 hover:text-fg active:scale-95"
              >
                <span>{l.label}</span>
                <svg
                  className="size-3 text-fg-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Signature Showcase Container (pszostak.pl style) */}
        <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-neutral-900 p-3.5 shadow-xl sm:rounded-3xl sm:p-5">
          {/* Vibrant Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-95`}
          />
          <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-20" />

          {/* Top text snippet */}
          <p className="relative z-10 line-clamp-2 max-w-lg text-xs leading-relaxed font-medium text-white/95 drop-shadow-sm sm:line-clamp-3 sm:text-sm">
            {summary}
          </p>

          {/* Browser / Device Mockup Window */}
          <div className="relative -bottom-1 z-10 mx-auto w-[92%] origin-bottom transition-all duration-500 group-hover:translate-y-[-8px] group-hover:scale-[1.02] sm:-bottom-2 sm:w-[88%]">
            <div className="overflow-hidden rounded-t-xl border-x border-t border-white/20 bg-neutral-900/95 shadow-2xl">
              {/* macOS window title bar */}
              <div className="flex h-5 items-center justify-between border-b border-white/10 bg-neutral-900/90 px-3 sm:h-6">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block size-2 rounded-full bg-[#FF5F57]"></span>
                  <span className="inline-block size-2 rounded-full bg-[#FEBC2E]"></span>
                  <span className="inline-block size-2 rounded-full bg-[#28C840]"></span>
                </div>
                <span className="max-w-[120px] truncate font-mono text-[9px] text-white/50">
                  {slug}.app
                </span>
                <div className="w-8"></div>
              </div>

              {/* Window body */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                {cover ? (
                  <Image
                    src={cover.src}
                    priority={priority}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-black p-4 text-center font-mono text-xs text-white/70">
                    <span className="mb-1 text-sm font-bold text-accent">
                      {title}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {tags.join(" · ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack footer */}
      <footer className="mt-4 border-t border-border/40 pt-3">
        <ul className="flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border/70 bg-surface px-2.5 py-1 font-mono text-[10px] font-semibold text-fg-muted sm:text-[11px]"
            >
              {s}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
