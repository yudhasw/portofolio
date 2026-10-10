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
    <Section id="education" tone="surface">
      <SectionHeading id="education" eyebrow={eyebrow} title={title} />
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.id}>
            <p className="text-sm text-fg-muted">{item.period}</p>
            <h3 className="font-display text-xl font-bold">{item.degree}</h3>
            <p className="text-fg-muted">
              {item.institution}
              {item.gpa ? ` · ${item.gpa}` : ""}
            </p>
          </li>
        ))}
      </ul>
      <h3 className="mt-12 mb-4 font-display text-xl font-bold">
        {certificationsLabel}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((c) => (
          <li
            key={c.title}
            className="rounded-md border border-border bg-bg p-4"
          >
            <p className="font-medium">{c.title}</p>
            <p className="text-sm text-fg-muted">
              {c.issuer}
              {c.year ? ` · ${c.year}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
