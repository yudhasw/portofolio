import type { ComponentProps } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  email: { label: string; address: string };
  socials: { label: string; href: string }[];
  locale: ComponentProps<typeof ContactForm>["locale"];
  formLabels: ComponentProps<typeof ContactForm>["labels"];
};

export function Contact({
  eyebrow,
  title,
  intro,
  email,
  socials,
  locale,
  formLabels,
}: Props) {
  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none top-1/4 -right-20 size-96 bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none bottom-0 -left-20 size-80 bg-accent/10 blur-3xl"
      />

      <div className="relative z-10">
        <SectionHeading id="contact" eyebrow={eyebrow} title={title} />
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div data-reveal="up" className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
              {intro}
            </p>

            {/* Quick Contact Glass Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${email.address}`}
                className="group glass-strong flex items-center justify-between rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <svg
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-xs tracking-wider text-fg-muted uppercase">
                      {email.label}
                    </span>
                    <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent sm:text-base">
                      {email.address}
                    </span>
                  </div>
                </div>
                <svg
                  className="size-4 text-fg-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-strong flex items-center justify-between rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-surface text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <span className="font-mono text-xs font-bold">
                        {s.label[0]}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-xs tracking-wider text-fg-muted uppercase">
                        Social Profile
                      </span>
                      <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent sm:text-base">
                        {s.label}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="size-4 text-fg-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
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

          {/* Form inside glass card */}
          <div
            data-reveal="up"
            className="glass-strong rounded-3xl border border-border/70 p-6 shadow-xl shadow-black/5 sm:p-8"
          >
            <ContactForm locale={locale} labels={formLabels} />
          </div>
        </div>
      </div>
    </Section>
  );
}
