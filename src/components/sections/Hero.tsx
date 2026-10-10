import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { HeroConsole } from "./HeroConsole";

type Cta = { label: string; href: string; download?: boolean };

type Props = {
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  photo?: { src: string; alt: string };
  primaryCta: Cta;
  secondaryCta: Cta;
  cv?: Cta;
  status?: string;
  locale?: string;
  scrollLabel?: string;
  consoleLabels?: {
    title: string;
    prompt: string;
    placeholder: string;
    chips: {
      ai: string;
      cdc: string;
      stack: string;
      experience: string;
      contact: string;
    };
  };
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Hero({
  name,
  eyebrow,
  headline,
  subheadline,
  photo,
  primaryCta,
  secondaryCta,
  cv,
  status,
  locale = "en",
  scrollLabel,
  consoleLabels,
}: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none -top-24 left-1/2 size-96 -translate-x-1/2 bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none top-1/2 -right-24 size-80 bg-accent/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div>
            {status && (
              <div data-reveal="up" className="mb-6 flex items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent shadow-xs">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-accent"></span>
                  </span>
                  <span>{status}</span>
                </span>
              </div>
            )}
            <p
              data-reveal="up"
              className="mb-3 font-mono text-xs font-bold tracking-widest text-accent uppercase sm:text-sm"
            >
              {eyebrow} · {name}
            </p>
            <h1
              id="hero-heading"
              data-reveal="up"
              className="font-display text-(length:--text-hero) leading-[1.08] font-bold tracking-tight text-balance"
            >
              <span className="text-gradient-shimmer">{headline}</span>
            </h1>
            <p
              data-reveal="up"
              className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              {subheadline}
            </p>
            <div data-reveal="up" className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={primaryCta.href}
                size="lg"
                className="shadow-lg shadow-accent/20 transition-transform duration-300 hover:scale-105"
              >
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                className="glass transition-transform duration-300 hover:scale-105"
              >
                {secondaryCta.label}
              </ButtonLink>
              {cv && (
                <ButtonLink
                  href={cv.href}
                  variant="ghost"
                  size="lg"
                  download
                  className="transition-transform duration-300 hover:scale-105"
                >
                  {cv.label}
                </ButtonLink>
              )}
            </div>
          </div>

          {photo ? (
            <div data-reveal="up" className="group relative mx-auto">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent/40 via-surface to-accent/10 opacity-75 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative aspect-[4/5] w-52 overflow-hidden rounded-3xl border-2 border-border/80 bg-surface shadow-2xl transition-all duration-500 group-hover:scale-[1.02] sm:w-64 md:w-80">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 font-mono text-xs text-white/95 backdrop-blur-md">
                  <span className="font-semibold tracking-wide">AI & Data</span>
                  <span className="size-2 animate-pulse rounded-full bg-accent"></span>
                </div>
              </div>
            </div>
          ) : (
            <div
              data-reveal="up"
              aria-hidden="true"
              className="mx-auto flex aspect-[4/5] w-52 items-center justify-center rounded-3xl border-2 border-border/70 bg-surface/90 font-display text-6xl font-bold text-accent shadow-2xl transition-transform duration-500 hover:scale-[1.02] sm:w-64 md:w-80"
            >
              {initials(name)}
            </div>
          )}
        </div>

        {/* Interactive Console - signature pszostak.pl feature */}
        {consoleLabels && (
          <div className="mt-14 sm:mt-18">
            <HeroConsole locale={locale} labels={consoleLabels} />
          </div>
        )}

        {/* Scroll indicator */}
        {scrollLabel && (
          <div
            data-reveal="up"
            className="mt-14 flex flex-col items-center justify-center gap-2 text-fg-muted/70 transition-colors hover:text-fg sm:mt-20"
          >
            <span className="font-mono text-[11px] font-medium tracking-widest uppercase">
              {scrollLabel}
            </span>
            <svg
              className="size-4 animate-bounce text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
