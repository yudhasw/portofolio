import type { Locale } from "@/i18n/routing";

/** Field teks dua bahasa; keduanya wajib (lihat pick() di lib/content). */
export type Localized<T = string> = Record<Locale, T>;

export type Site = {
  name: string;
  headline: Localized;
  subheadline: Localized;
  bio: Localized[];
  highlights: Localized[];
  /** Path publik (mis. /images/yudha.jpg). Kosong = placeholder inisial. */
  photo?: string;
  photoAlt: Localized;
  email: string;
  github: string;
  linkedin: string;
  openToWork: boolean;
  /** Path publik. Kosong = tombol CV disembunyikan. */
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
  bullets: Localized[];
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
  order: number;
};

export type Certification = {
  title: string;
  issuer: string;
  year?: number;
  url?: string;
  order: number;
};

export type SkillGroup = {
  id: string;
  title: Localized;
  items: string[];
  order: number;
};

export type ProjectStatus = "live" | "in-development" | "archived";

export type ProjectImage = { src: string; width: number; height: number };

export type ProjectMetric = {
  label: Localized;
  value: Localized;
  note: Localized;
};

export type Project = {
  slug: string;
  title: string;
  published: boolean;
  summary: Localized;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  year?: number;
  tags: string[];
  stack: string[];
  cover?: ProjectImage;
  coverAlt: Localized;
  gallery: { image: ProjectImage; alt: Localized }[];
  repoUrl?: string;
  demoUrl?: string;
  metrics: ProjectMetric[];
  hasBody: Localized<boolean>;
};
