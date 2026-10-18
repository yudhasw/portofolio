"use client";

import { useState } from "react";
import { ProjectGrid } from "./ProjectGrid";
import { GitHubRepoCard } from "./GitHubRepoCard";
import type { ProjectCardData } from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";

type Props = {
  featured: ProjectCardData[];
  others: ProjectCardData[];
  githubRepos: GitHubRepo[];
  featuredLabel: string;
  othersLabel: string;
  labels: {
    tabFeatured: string;
    tabGithub: string;
    tabAll: string;
    liveGithubHint: string;
    demo: string;
    source: string;
    viewAllGithub: string;
  };
};

export function ProjectFilterTabs({
  featured,
  others,
  githubRepos,
  featuredLabel,
  othersLabel,
  labels,
}: Props) {
  const [activeTab, setActiveTab] = useState<"featured" | "github" | "all">("featured");

  const totalFeatured = featured.length + others.length;
  const totalGithub = githubRepos.length;
  const totalAll = totalFeatured + totalGithub;

  return (
    <div className="w-full">
      {/* Tab Filter Control Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="glass-strong inline-flex items-center gap-1.5 rounded-full border border-border/80 p-1.5 shadow-sm">
          {/* Tab: Featured */}
          <button
            type="button"
            onClick={() => setActiveTab("featured")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-sm ${
              activeTab === "featured"
                ? "border border-accent/40 bg-accent text-bg shadow-md shadow-accent/20"
                : "text-fg-muted hover:text-fg hover:bg-bg-muted/60"
            }`}
          >
            <span>{labels.tabFeatured}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeTab === "featured"
                  ? "bg-bg/25 text-bg"
                  : "bg-bg-muted text-fg-muted"
              }`}
            >
              {totalFeatured}
            </span>
          </button>

          {/* Tab: Live GitHub */}
          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-sm ${
              activeTab === "github"
                ? "border border-accent/40 bg-accent text-bg shadow-md shadow-accent/20"
                : "text-fg-muted hover:text-fg hover:bg-bg-muted/60"
            }`}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>{labels.tabGithub}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeTab === "github"
                  ? "bg-bg/25 text-bg"
                  : "bg-bg-muted text-fg-muted"
              }`}
            >
              {totalGithub}
            </span>
          </button>

          {/* Tab: All */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-sm ${
              activeTab === "all"
                ? "border border-accent/40 bg-accent text-bg shadow-md shadow-accent/20"
                : "text-fg-muted hover:text-fg hover:bg-bg-muted/60"
            }`}
          >
            <span>{labels.tabAll}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeTab === "all"
                  ? "bg-bg/25 text-bg"
                  : "bg-bg-muted text-fg-muted"
              }`}
            >
              {totalAll}
            </span>
          </button>
        </div>

        {/* Live GitHub status badge */}
        <div className="flex items-center gap-2 text-xs text-fg-muted">
          <svg className="size-4 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="font-mono text-[11px]">{labels.liveGithubHint}</span>
        </div>
      </div>

      {/* View: FEATURED */}
      {(activeTab === "featured" || activeTab === "all") && (
        <div className="space-y-12">
          {activeTab === "all" && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                {featuredLabel}
              </h3>
            </div>
          )}

          <ProjectGrid projects={featured} />

          {others.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fg-muted" />
                <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                  {othersLabel}
                </h3>
              </div>
              <ProjectGrid projects={others} columns={3} />
            </div>
          )}
        </div>
      )}

      {/* View: GITHUB REPOSITORIES */}
      {(activeTab === "github" || activeTab === "all") && (
        <div className={activeTab === "all" ? "mt-16 pt-12 border-t border-border/60" : ""}>
          {activeTab === "all" && (
            <div className="mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                {labels.tabGithub}
              </h3>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {githubRepos.map((repo) => (
              <GitHubRepoCard
                key={repo.id}
                repo={repo}
                demoLabel={labels.demo}
                sourceLabel={labels.source}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:justify-start">
            <a
              href="https://github.com/yudhasw?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-subtle hover:glass-strong inline-flex items-center gap-2 rounded-full border border-border/80 px-5 py-2.5 text-xs font-semibold text-fg transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <span>{labels.viewAllGithub}</span>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
