import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  eyebrow: string;
  title: string;
  items: {
    id: string;
    degree: string;
    institution: string;
    period: string;
    gpa?: string;
  }[];
  certificationsLabel: string;
  certifications: {
    title: string;
    issuer: string;
    year?: number;
    url?: string;
  }[];
};

export function Education({
  eyebrow,
  title,
  items,
  certificationsLabel,
  certifications,
}: Props) {
  return (
    <Section id="education">
      <SectionHeading id="education" eyebrow={eyebrow} title={title} />

      {/* Degrees / Main education items */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            data-reveal="up"
            className="glass-strong group rounded-3xl border border-border/70 p-6 shadow-md shadow-black/5 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
          >
            <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
              <span className="inline-flex items-center self-start rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                {item.period}
              </span>
              {item.gpa && (
                <span className="self-start rounded-full border border-border/60 bg-surface px-2.5 py-0.5 font-mono text-xs font-bold text-fg">
                  GPA: {item.gpa}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent">
              {item.degree}
            </h3>
            <p className="mt-1 text-sm font-medium text-fg-muted">
              {item.institution}
            </p>
          </li>
        ))}
      </ul>

      {/* Certifications & Training */}
      {certifications.length > 0 && (
        <div className="mt-14 sm:mt-18">
          <div className="mb-6 flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
              {certificationsLabel}
            </h3>
          </div>

          <ul className="grid gap-3.5 sm:grid-cols-2">
            {certifications.map((c) => {
              const Content = (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold text-fg transition-colors group-hover:text-accent sm:text-base">
                      {c.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-fg-muted">
                      {c.issuer}
                    </p>
                  </div>
                  {c.year && (
                    <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                        {c.year}
                      </span>
                      {c.url && (
                        <svg
                          className="size-3 text-fg-muted transition-colors group-hover:text-accent"
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
                      )}
                    </div>
                  )}
                </div>
              );

              return (
                <li
                  key={c.title}
                  data-reveal="up"
                  className="glass-strong group rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-5"
                >
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {Content}
                    </a>
                  ) : (
                    Content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Section>
  );
}
