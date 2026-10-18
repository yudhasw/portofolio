export type GitHubRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  isFork: boolean;
};

// Fallback snapshot in case GitHub API rate limits or network is unavailable
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1210781028,
    name: "WealthWise",
    fullName: "yudhasw/WealthWise",
    description: "AI-powered web app with vision AI and an LLM chatbot for smart financial management.",
    htmlUrl: "https://github.com/yudhasw/WealthWise",
    homepage: "https://wealth-wise-neon.vercel.app",
    stars: 2,
    forks: 1,
    language: "JavaScript",
    topics: ["ai", "fintech", "nextjs", "react"],
    updatedAt: "2026-08-06T13:12:10Z",
    pushedAt: "2026-06-20T08:47:44Z",
    isFork: false,
  },
  {
    id: 1347173936,
    name: "cdc-pipeline-greenplum",
    fullName: "yudhasw/cdc-pipeline-greenplum",
    description: "Log-based Change Data Capture (CDC) pipeline from PostgreSQL to Greenplum data warehouse.",
    htmlUrl: "https://github.com/yudhasw/cdc-pipeline-greenplum",
    homepage: null,
    stars: 0,
    forks: 0,
    language: "Python",
    topics: ["data-engineering", "cdc", "postgresql", "greenplum"],
    updatedAt: "2026-08-26T11:32:50Z",
    pushedAt: "2026-08-26T11:31:13Z",
    isFork: false,
  },
  {
    id: 1385350245,
    name: "student-helper-bot",
    fullName: "yudhasw/student-helper-bot",
    description: "Automated student assistant bot for scheduling, query resolution, and campus tasks.",
    htmlUrl: "https://github.com/yudhasw/student-helper-bot",
    homepage: "https://student-helper-bot.vercel.app",
    stars: 0,
    forks: 0,
    language: "Python",
    topics: ["bot", "python", "automation"],
    updatedAt: "2026-10-01T17:05:15Z",
    pushedAt: "2026-10-01T17:05:10Z",
    isFork: false,
  },
  {
    id: 987030373,
    name: "E-TokoBuku",
    fullName: "yudhasw/E-TokoBuku",
    description: "Online bookstore platform built with object-oriented software engineering principles.",
    htmlUrl: "https://github.com/yudhasw/E-TokoBuku",
    homepage: "https://pbo-tugas-besar.vercel.app",
    stars: 1,
    forks: 4,
    language: "Java",
    topics: ["java", "oop", "web"],
    updatedAt: "2026-08-06T13:25:54Z",
    pushedAt: "2025-06-14T16:41:03Z",
    isFork: false,
  },
  {
    id: 1225864602,
    name: "esteler-app",
    fullName: "yudhasw/esteler-app",
    description: "Interactive beverage ordering and catalog web application.",
    htmlUrl: "https://github.com/yudhasw/esteler-app",
    homepage: "https://esteler-app.vercel.app",
    stars: 0,
    forks: 2,
    language: "HTML",
    topics: ["frontend", "javascript", "responsive-web"],
    updatedAt: "2026-06-25T02:04:29Z",
    pushedAt: "2026-06-25T02:04:25Z",
    isFork: false,
  },
  {
    id: 1073522770,
    name: "Telkomedika-Online-Reservation",
    fullName: "yudhasw/Telkomedika-Online-Reservation",
    description: "Online clinic appointment and health service reservation system.",
    htmlUrl: "https://github.com/yudhasw/Telkomedika-Online-Reservation",
    homepage: null,
    stars: 0,
    forks: 0,
    language: "Java",
    topics: ["healthcare", "reservation", "java"],
    updatedAt: "2026-05-18T04:29:28Z",
    pushedAt: "2026-01-19T15:16:25Z",
    isFork: false,
  },
];

export async function getGitHubRepos(username = "yudhasw"): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Yudha-Portfolio-App",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache 1 hour via Next.js ISR
      },
    );

    if (!res.ok) {
      console.warn(
        `[github] Failed to fetch repos (status ${res.status}): using fallback repos`,
      );
      return FALLBACK_REPOS;
    }

    const data = (await res.json()) as Array<{
      id: number;
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      topics?: string[];
      updated_at: string;
      pushed_at: string;
      fork: boolean;
    }>;

    // Filter out profile readme repo (e.g., username/username)
    const filtered = data
      .filter((r) => r.name.toLowerCase() !== username.toLowerCase())
      .map((r) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        htmlUrl: r.html_url,
        homepage: r.homepage && r.homepage.trim().length > 0 ? r.homepage : null,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        topics: Array.isArray(r.topics) ? r.topics : [],
        updatedAt: r.updated_at,
        pushedAt: r.pushed_at,
        isFork: r.fork,
      }))
      // Sort: non-forks first, then by stars, then by pushed_at
      .sort((a, b) => {
        if (a.isFork !== b.isFork) return a.isFork ? 1 : -1;
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
      });

    return filtered.length > 0 ? filtered : FALLBACK_REPOS;
  } catch (error) {
    console.error("[github] Error fetching repositories:", error);
    return FALLBACK_REPOS;
  }
}
