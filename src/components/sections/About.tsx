import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutBento } from "./AboutBento";

type Props = {
  eyebrow: string;
  title: string;
  bio: string[];
  highlightsLabel: string;
  highlights: string[];
  skillsLabel: string;
  skillGroups: { id: string; title: string; items: string[] }[];
  bentoLabels?: {
    role: string;
    hoverToRead: string;
    craft: string;
    craftDesc: string;
    basedIn: string;
    location: string;
    coords: string;
    gmt: string;
    mindset: string;
    mindsetDesc: string;
    status: string;
  };
};

export function About({
  eyebrow,
  title,
  bio,
  highlights,
  skillGroups,
  bentoLabels = {
    role: "Software & AI Engineer",
    hoverToRead: "Hover to inspect details",
    craft: "Craft",
    craftDesc:
      "Building scalable AI-driven web apps and high-throughput data pipelines.",
    basedIn: "Based in",
    location: "Bandung, Indonesia",
    coords: "6.9744° S, 107.6303° E",
    gmt: "GMT+7",
    mindset: "Engineering Philosophy",
    mindsetDesc:
      "Bridging computer vision & LLM research into clean, reliable, and user-facing software.",
    status: "Available for opportunities & freelance",
  },
}: Props) {
  return (
    <Section id="about">
      <SectionHeading id="about" eyebrow={eyebrow} title={title} />
      <AboutBento
        bio={bio}
        highlights={highlights}
        skillGroups={skillGroups}
        labels={bentoLabels}
      />
    </Section>
  );
}
