import { Tag } from "@/components/ui/Tag";

export type TimelineItemData = {
  id: string;
  role: string;
  organization: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export function TimelineItem({
  role,
  organization,
  period,
  bullets,
  tags,
}: TimelineItemData) {
  return (
    <li data-reveal="up" className="relative pb-12 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-2 left-0 size-3 -translate-x-1/2 rounded-full bg-accent"
      />
      <p className="text-sm text-fg-muted">{period}</p>
      <h3 className="mt-1 font-display text-xl font-bold">{role}</h3>
      <p className="mb-4 text-fg-muted">{organization}</p>
      <ul className="list-disc space-y-2 pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Timeline({ items }: { items: TimelineItemData[] }) {
  return (
    <div data-timeline className="relative ml-1.5">
      <span
        aria-hidden="true"
        data-timeline-progress
        className="absolute top-0 -left-0.5 h-full w-0.5 origin-top bg-accent"
      />
      <ol className="border-l-2 border-border">
        {items.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}
      </ol>
    </div>
  );
}
