import type { GitHubRepo } from "@/lib/github";

type Props = {
  repo: GitHubRepo;
  demoLabel: string;
  sourceLabel: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "bg-blue-400 dark:bg-blue-500",
  JavaScript: "bg-amber-400 dark:bg-yellow-400",
  TypeScript: "bg-blue-500 dark:bg-blue-400",
  Java: "bg-orange-500 dark:bg-orange-600",
  HTML: "bg-rose-500 dark:bg-rose-600",
  CSS: "bg-purple-500 dark:bg-purple-600",
  Shell: "bg-emerald-500 dark:bg-emerald-400",
  Dart: "bg-cyan-500 dark:bg-cyan-400",
};

export function GitHubRepoCard({ repo, demoLabel, sourceLabel }: Props) {
  const langColor =
    (repo.language && LANGUAGE_COLORS[repo.language]) || "bg-accent";

  return (
    <div className="group glass hover:glass-strong relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
      {/* Ambient background hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Header: Title + Stars */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display line-clamp-1 text-base font-bold text-fg transition-colors hover:text-accent"
            >
              {repo.name}
            </a>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {repo.stars > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500 dark:text-amber-400">
                <svg
                  className="size-3 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {repo.stars}
              </span>
            )}
            {repo.forks > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-bg-muted/60 px-2 py-0.5 text-xs font-medium text-fg-muted">
                <svg
                  className="size-3"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5A2.25 2.25 0 0012 6.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 014.5 6.25v-.878z" />
                </svg>
                {repo.forks}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-xs leading-relaxed text-fg-muted sm:text-sm">
          {repo.description || "Public repository on GitHub"}
        </p>

        {/* Topics Chips */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-border/50 bg-bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-fg-muted"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Language + Links */}
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
        <div className="flex items-center gap-2">
          {repo.language && (
            <span className="flex items-center gap-1.5 font-medium text-fg">
              <span className={`size-2.5 rounded-full ${langColor}`} />
              {repo.language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2.5 py-1 font-medium text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              <span>{demoLabel}</span>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-bg-muted/50 px-2.5 py-1 font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <span>{sourceLabel}</span>
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
