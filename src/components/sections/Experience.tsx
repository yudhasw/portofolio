import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, type TimelineItemData } from "./Timeline";

export function Experience({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: TimelineItemData[];
}) {
  return (
    <Section id="experience" tone="surface">
      <SectionHeading id="experience" eyebrow={eyebrow} title={title} />
      <Timeline items={items} />
    </Section>
  );
}
