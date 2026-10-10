import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

type Props = {
  eyebrow: string;
  title: string;
  bio: string[];
  highlightsLabel: string;
  highlights: string[];
  skillsLabel: string;
  skillGroups: { id: string; title: string; items: string[] }[];
};

export function About({
  eyebrow,
  title,
  bio,
  highlightsLabel,
  highlights,
  skillsLabel,
  skillGroups,
}: Props) {
  return (
    <Section id="about">
      <SectionHeading id="about" eyebrow={eyebrow} title={title} />
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3 className="mt-8 font-display text-xl font-bold">
            {highlightsLabel}
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-base text-fg-muted">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl font-bold">{skillsLabel}</h3>
          <dl className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <dt className="mb-2 text-sm font-medium text-fg-muted">
                  {group.title}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
