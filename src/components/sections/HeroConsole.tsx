"use client";

import { useState } from "react";

type TopicKey = "ai" | "cdc" | "stack" | "experience" | "contact";

type Props = {
  locale: string;
  labels: {
    title: string;
    prompt: string;
    placeholder: string;
    chips: Record<TopicKey, string>;
  };
};

const ANSWERS: Record<
  string,
  Record<TopicKey, { q: string; a: string; tag: string }>
> = {
  en: {
    ai: {
      q: "Tell me about your AI products",
      a: "WealthWise is an AI personal finance platform combining computer vision for real-time receipt scanning and an LLM-powered financial advisor for automated budgeting and financial health scoring.",
      tag: "Vision AI & LLM",
    },
    cdc: {
      q: "How did the CDC pipeline work?",
      a: "At TIF (PT Telkom Infrastruktur Indonesia), I engineered a log-based Change Data Capture pipeline transferring data from PostgreSQL to Greenplum with a median end-to-end latency of 14.6 seconds (micro-batch 15s vs legacy daily batch ETL).",
      tag: "Data Engineering",
    },
    stack: {
      q: "What is your main technology stack?",
      a: "I specialize in TypeScript, Next.js, React, and Python, complemented by Docker, PostgreSQL, Greenplum, Laravel, and Tailwind CSS. I also bring strong software QA methodologies.",
      tag: "Full Stack & Data",
    },
    experience: {
      q: "What is your hands-on experience?",
      a: "I completed 3 internships: Data Management at TIF (CDC pipeline), Data Analyst at Metranet, and Software QA at Telkom University's Advanced Software Engineering Lab.",
      tag: "3 Internships",
    },
    contact: {
      q: "Are you open to work or freelance?",
      a: "Yes! I am actively looking for Software Engineer and AI Engineer opportunities, as well as freelance projects. Feel free to reach out directly via email or LinkedIn.",
      tag: "Open to Work",
    },
  },
  id: {
    ai: {
      q: "Ceritakan tentang proyek AI Anda",
      a: "WealthWise adalah platform finansial pribadi berbasis AI yang menggabungkan vision AI untuk pemindaian struk otomatis serta chatbot LLM untuk rekomendasi anggaran dan skor kesehatan keuangan.",
      tag: "Vision AI & LLM",
    },
    cdc: {
      q: "Bagaimana cara kerja pipeline CDC?",
      a: "Di TIF (PT Telkom Infrastruktur Indonesia), saya membangun pipeline Change Data Capture berbasis log dari PostgreSQL ke Greenplum dengan latensi median 14,6 detik (micro-batch 15 dtk dibanding ETL harian sebelumnya).",
      tag: "Data Engineering",
    },
    stack: {
      q: "Apa teknologi utama yang Anda kuasai?",
      a: "Keahlian utama saya mencakup TypeScript, Next.js, React, dan Python, didukung Docker, PostgreSQL, Greenplum, Laravel, dan Tailwind CSS, serta fondasi pengujian Software QA yang kuat.",
      tag: "Full Stack & Data",
    },
    experience: {
      q: "Apa saja pengalaman kerja Anda?",
      a: "Saya telah menyelesaikan 3 kali magang: Data Management di TIF (pipeline CDC), Data Analyst di Metranet, dan Software QA di Lab Advanced Software Engineering Telkom University.",
      tag: "3 Kali Magang",
    },
    contact: {
      q: "Apakah terbuka untuk kerja atau freelance?",
      a: "Ya! Saya aktif mencari peluang Software Engineer dan AI Engineer, serta proyek freelance. Anda dapat langsung menghubungi via email atau LinkedIn.",
      tag: "Siap Kerja",
    },
  },
};

export function HeroConsole({ locale, labels }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>("ai");
  const [customInput, setCustomInput] = useState("");
  const [history, setHistory] = useState<
    Array<{ q: string; a: string; tag: string }>
  >([ANSWERS[locale]?.[selectedTopic] ?? ANSWERS.en.ai]);

  const activeLocaleAnswers = ANSWERS[locale] ?? ANSWERS.en;

  function handleSelectTopic(key: TopicKey) {
    setSelectedTopic(key);
    const item = activeLocaleAnswers[key];
    setHistory((prev) => [...prev.slice(-2), item]);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = customInput.trim().toLowerCase();
    if (!query) return;

    let matched: TopicKey = "ai";
    if (
      query.includes("cdc") ||
      query.includes("data") ||
      query.includes("postgres") ||
      query.includes("pipeline")
    ) {
      matched = "cdc";
    } else if (
      query.includes("stack") ||
      query.includes("tech") ||
      query.includes("bahasa") ||
      query.includes("react")
    ) {
      matched = "stack";
    } else if (
      query.includes("exp") ||
      query.includes("magang") ||
      query.includes("kerja") ||
      query.includes("work")
    ) {
      matched = "experience";
    } else if (
      query.includes("contact") ||
      query.includes("hire") ||
      query.includes("email") ||
      query.includes("freelance")
    ) {
      matched = "contact";
    }

    const item = activeLocaleAnswers[matched];
    setHistory((prev) => [
      ...prev.slice(-2),
      { q: customInput, a: item.a, tag: item.tag },
    ]);
    setCustomInput("");
  }

  return (
    <div
      data-reveal="up"
      className="glass-strong mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border/70 shadow-2xl shadow-black/15 transition-all duration-300"
    >
      {/* Top window bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-surface/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-full bg-[#FF5F57]"></span>
          <span className="inline-block size-2.5 rounded-full bg-[#FEBC2E]"></span>
          <span className="inline-block size-2.5 rounded-full bg-[#28C840]"></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 animate-ping rounded-full bg-accent"></span>
          <span className="font-mono text-[11px] font-medium tracking-wider text-fg-muted uppercase">
            {labels.title}
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Terminal dialogue viewport */}
      <div className="flex max-h-[220px] min-h-[160px] flex-col gap-3 overflow-y-auto p-4 sm:p-5">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className="animate-in fade-in flex flex-col gap-1.5 duration-300"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <span className="font-mono">❯</span>
              <span>{msg.q}</span>
              <span className="ml-auto rounded-full border border-accent/25 bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">
                {msg.tag}
              </span>
            </div>
            <p className="rounded-r-xl border-l-2 border-accent/30 bg-surface/30 p-2.5 pl-4 text-xs leading-relaxed text-fg-muted sm:text-sm">
              {msg.a}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Chips & Input */}
      <div className="flex flex-col gap-2.5 border-t border-border/50 bg-surface/20 p-3 sm:p-4">
        <div className="flex flex-wrap justify-center gap-1.5">
          {(["ai", "cdc", "stack", "experience", "contact"] as TopicKey[]).map(
            (key) => {
              const isSelected = selectedTopic === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectTopic(key)}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "border-accent bg-accent text-on-accent shadow-xs"
                      : "border-border/60 bg-surface/80 text-fg-muted hover:border-accent/40 hover:text-fg"
                  }`}
                >
                  {labels.chips[key]}
                </button>
              );
            },
          )}
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={labels.placeholder}
            className="w-full rounded-full border border-border/70 bg-surface/80 px-4 py-2 pr-10 text-xs text-fg transition-all duration-200 placeholder:text-fg-muted/60 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            aria-label="Send"
            className="absolute right-1.5 flex size-7 cursor-pointer items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-40"
            disabled={!customInput.trim()}
          >
            <svg
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
