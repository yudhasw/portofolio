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
    <Section id="contact">
      <SectionHeading id="contact" eyebrow={eyebrow} title={title} />
      <div className="grid gap-12 md:grid-cols-2">
        <div data-reveal="up">
          <p className="text-lg text-fg-muted">{intro}</p>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm text-fg-muted">{email.label}</dt>
              <dd>
                <a
                  href={`mailto:${email.address}`}
                  className="text-lg font-medium text-accent underline underline-offset-4"
                >
                  {email.address}
                </a>
              </dd>
            </div>
            {socials.map((s) => (
              <div key={s.href}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-accent underline underline-offset-4"
                  >
                    {s.label}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm locale={locale} labels={formLabels} />
      </div>
    </Section>
  );
}
