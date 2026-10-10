import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

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
}: Props) {
  return (
    <section aria-labelledby="hero-heading" className="py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          {status && (
            <div data-reveal="up" className="mb-6">
              <Badge marker="dot">{status}</Badge>
            </div>
          )}
          <p
            data-reveal="up"
            className="mb-3 text-sm font-medium tracking-widest text-accent uppercase"
          >
            {eyebrow} · {name}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-(length:--text-hero) leading-[1.05] font-bold text-balance"
          >
            {headline}
          </h1>
          <p data-reveal="up" className="mt-6 max-w-xl text-lg text-fg-muted">
            {subheadline}
          </p>
          <div data-reveal="up" className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </ButtonLink>
            {cv && (
              <ButtonLink href={cv.href} variant="ghost" size="lg" download>
                {cv.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={320}
            height={400}
            priority
            sizes="(min-width: 768px) 320px, 60vw"
            className="mx-auto aspect-[4/5] w-48 rounded-lg object-cover sm:w-64 md:w-80"
          />
        ) : (
          <div
            aria-hidden="true"
            className="mx-auto flex aspect-[4/5] w-48 items-center justify-center rounded-lg bg-surface font-display text-6xl font-bold text-accent sm:w-64 md:w-80"
          >
            {initials(name)}
          </div>
        )}
      </div>
    </section>
  );
}
