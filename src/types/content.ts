import type { Locale } from "@/i18n/routing";

/** Field teks dua bahasa; keduanya wajib (lihat pick() di lib/content). */
export type Localized<T = string> = Record<Locale, T>;

export type Site = {
  name: string;
  headline: Localized;
  subheadline: Localized;
  bio: Localized<string[]>;
  highlights: Localized<string[]>;
  /** Path di /public. Kosong = tampilkan placeholder inisial. */
  photo?: string;
  photoAlt: Localized;
  email: string;
  github: string;
  linkedin: string;
  openToWork: boolean;
  /** Path di /public. Kosong = tombol CV disembunyikan. */
  cvEn?: string;
  cvId?: string;
};

export type Experience = {
  id: string;
  role: Localized;
  organization: string;
  type: "internship" | "fulltime" | "freelance";
  /** "YYYY-MM" atau "YYYY-MM-DD" */
  start: string;
  end?: string;
  bullets: Localized<string[]>;
  tags: string[];
  order: number;
};

export type Education = {
  id: string;
  degree: Localized;
  institution: string;
  start: string;
  end: string;
  gpa?: string;
  note?: Localized;
  order: number;
};

export type Certification = {
  title: string;
  issuer: string;
  year?: number;
  url?: string;
};

export type SkillGroup = {
  id: string;
  title: Localized;
  items: string[];
  order: number;
};

export type ProjectStatus = "live" | "in-development" | "archived";

export type Project = {
  slug: string;
  title: string;
  summary: Localized;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  year?: number;
  tags: string[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
};
