"use client";

import { useState } from "react";

type BentoLabels = {
  role: string;
  hoverToRead: string;
  craft: string;
  craftDesc: string;
  basedIn: string;
  location: string;
  coords: string;
  gmt: string;
  mindset: string;
  mindsetDesc: string;
  status: string;
};

type Props = {
  bio: string[];
  highlights: string[];
  skillGroups: { id: string; title: string; items: string[] }[];
  labels: BentoLabels;
};

export function AboutBento({ bio, highlights, skillGroups, labels }: Props) {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  // Flattened skills for the marquee
  const allSkills = skillGroups.flatMap((g) => g.items);
  const marqueeSkillsRow1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const marqueeSkillsRow2 = allSkills.slice(Math.ceil(allSkills.length / 2));

  // Stacked cards data
  const stackedCards = [
    {
      title: "WealthWise",
      subtitle: "Vision AI & Finance",
      text:
        highlights[0] ??
        "AI-powered web app with vision AI for receipt scanning and an LLM finance chatbot.",
      tag: "Computer Vision · LLM",
    },
    {
      title: "InfraNexia CDC",
      subtitle: "Data Engineering",
      text:
        highlights[1] ??
        "Log-based Change Data Capture pipeline from PostgreSQL to Greenplum with 14.6s median latency.",
      tag: "PostgreSQL · Greenplum",
    },
    {
      title: "Telkom University",
      subtitle: "Informatics & QA",
      text:
        highlights[2] ??
        "Rigorous QA testing: test plans, API automation with Postman, and regression testing.",
      tag: "Software QA · Testing",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
      {/* CARD 1: Kinetic Name & Monogram Card */}
      <div
        data-reveal="up"
        className="glass-strong group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-border/70 p-6 transition-all duration-300 hover:border-accent/40 sm:p-7"
      >
        <div className="bg-radial-at-c pointer-events-none absolute inset-0 from-accent/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
          <div className="font-display text-3xl leading-[1.05] font-black tracking-tighter text-fg uppercase transition-transform duration-300 group-hover:scale-105 sm:text-4xl">
            <span className="text-gradient-shimmer block">YUDHA</span>
            <span className="block text-fg">SETIAWAN</span>
          </div>
          <div className="mt-3 flex flex-col items-center gap-1.5">
            <div className="h-0.5 w-12 rounded-full bg-accent/60"></div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-fg-muted uppercase">
              {labels.role}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 animate-ping rounded-full bg-accent"></span>
            <span className="text-[11px] font-medium text-fg">
              {labels.status}
            </span>
          </span>
        </div>
      </div>

      {/* CARD 2: Interactive Stacking Cards (Signature pszostak.pl feature) */}
      <div
        data-reveal="up"
        className="glass-strong group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-border/70 p-5 transition-all duration-300 hover:border-accent/40 sm:p-6 md:col-span-2"
      >
        <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-40"></div>

        {/* Header badge */}
        <div className="relative z-10 flex items-center justify-between pb-3">
          <span className="text-xs font-bold tracking-wider text-fg uppercase">
            Featured Highlights
          </span>
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-accent uppercase">
            {labels.hoverToRead}
          </span>
        </div>

        {/* Stacked Cards Deck */}
        <div className="relative z-10 mt-auto grid w-full grid-cols-1 gap-2.5 pt-4 sm:grid-cols-3">
          {stackedCards.map((card, idx) => {
            const isHovered = activeTab === idx;
            return (
              <div
                key={card.title}
                onMouseEnter={() => setActiveTab(idx)}
                onMouseLeave={() => setActiveTab(null)}
                onClick={() => setActiveTab(activeTab === idx ? null : idx)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-300 ${
                  isHovered
                    ? "-translate-y-2 border-accent bg-surface shadow-xl shadow-accent/10"
                    : "border-border/60 bg-surface/60 hover:border-accent/40"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-1">
                  <span className="text-xs font-bold tracking-tight text-fg uppercase">
                    {card.title}
                  </span>
                  <span className="max-w-[100px] truncate rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-accent">
                    {card.subtitle}
                  </span>
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-fg-muted">
                  {card.text}
                </p>
                <div className="mt-3 border-t border-border/40 pt-2 font-mono text-[10px] text-accent">
                  {card.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CARD 3: Craft & Infinite Marquee Ticker */}
      <div
        data-reveal="up"
        className="glass-strong group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 p-6 transition-all duration-300 hover:border-accent/40 md:col-span-2"
      >
        <div className="mb-4">
          <div className="mb-1.5 flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-fg">
              {labels.craft}
            </h3>
            <span className="h-0.5 w-6 rounded-full bg-accent"></span>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-fg-muted sm:text-sm">
            {labels.craftDesc}
          </p>
        </div>

        {/* Infinite Marquee Tickers */}
        <div className="space-y-2.5 overflow-hidden rounded-2xl border border-border/50 bg-surface/40 py-2 select-none">
          {/* Row 1 */}
          <div className="marquee-track flex items-center gap-2.5">
            {[...marqueeSkillsRow1, ...marqueeSkillsRow1].map(
              (skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs font-medium text-fg shadow-xs transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="size-1.5 rounded-full bg-accent"></span>
                  <span>{skill}</span>
                </span>
              ),
            )}
          </div>
          {/* Row 2 */}
          <div
            className="marquee-track flex items-center gap-2.5"
            style={{ animationDirection: "reverse" }}
          >
            {[...marqueeSkillsRow2, ...marqueeSkillsRow2].map(
              (skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs font-medium text-fg shadow-xs transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="size-1.5 rounded-full bg-accent/60"></span>
                  <span>{skill}</span>
                </span>
              ),
            )}
          </div>
        </div>

        {/* Skill Groups categorized */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/40 pt-4 text-xs sm:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold tracking-wider text-fg-muted uppercase">
                {group.title}
              </span>
              <span className="line-clamp-1 text-[11px] font-medium text-fg">
                {group.items.slice(0, 3).join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 4: Location & Real-Time Coordinate Card */}
      <div
        data-reveal="up"
        className="glass-strong group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 p-6 transition-all duration-300 hover:border-accent/40"
      >
        <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-40"></div>
        {/* Animated scanline effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-16 animate-[scanline_8s_linear_infinite] bg-gradient-to-b from-transparent via-accent/15 to-transparent"
        ></div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-fg-muted uppercase">
            {labels.basedIn}
          </span>
          <span className="rounded-full border border-accent/25 bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent">
            {labels.gmt}
          </span>
        </div>

        <div className="relative z-10 my-6">
          <h4 className="font-display text-2xl font-black tracking-tight text-fg uppercase">
            {labels.location}
          </h4>
          <p className="mt-1 font-mono text-xs text-accent">{labels.coords}</p>
        </div>

        <div className="relative z-10 flex items-center gap-2 border-t border-border/40 pt-3 text-xs text-fg-muted">
          <span className="size-2 animate-pulse rounded-full bg-green-500"></span>
          <span>Telkom University Hub</span>
        </div>
      </div>

      {/* CARD 5: Bio Statement Card */}
      <div
        data-reveal="up"
        className="glass group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-border/70 p-6 transition-all duration-300 hover:border-accent/40 sm:flex-row sm:items-center sm:p-8 md:col-span-3"
      >
        <div className="max-w-3xl space-y-2">
          <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
            {labels.mindset}
          </span>
          <p className="text-base leading-relaxed font-medium text-fg sm:text-lg">
            {bio[0]}
          </p>
          {bio[1] && (
            <p className="text-sm leading-relaxed text-fg-muted">{bio[1]}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-xs font-bold text-accent">
              AI
            </span>
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-xs font-bold text-accent">
              CDC
            </span>
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-xs font-bold text-accent">
              QA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
