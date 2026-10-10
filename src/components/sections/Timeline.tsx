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
    <li data-reveal="up" className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
      {/* Timeline Node */}
      <div
        aria-hidden="true"
        className="absolute top-6 left-0 flex -translate-x-1/2 items-center justify-center"
      >
        <span className="relative flex size-3.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40"></span>
          <span className="relative inline-flex size-3.5 rounded-full bg-accent shadow-sm ring-4 shadow-accent/50 ring-bg"></span>
        </span>
      </div>

      {/* Experience Card */}
      <div className="glass-strong group rounded-3xl border border-border/70 p-5 shadow-md shadow-black/5 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 sm:p-6">
        <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <span className="inline-flex items-center self-start rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
            {period}
          </span>
          <span className="font-mono text-xs font-medium text-fg-muted">
            {organization}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-fg transition-colors group-hover:text-accent sm:text-xl">
          {role}
        </h3>

        <ul className="mt-3.5 space-y-2 text-sm leading-relaxed text-fg-muted">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-xs font-bold text-accent">
                ▸
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="rounded-full border border-border/70 bg-surface px-2.5 py-0.5 font-mono text-[10px] font-medium text-fg-muted">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function Timeline({ items }: { items: TimelineItemData[] }) {
  return (
    <div data-timeline className="relative ml-2 sm:ml-4">
      {/* Scroll-linked progress line */}
      <span
        aria-hidden="true"
        data-timeline-progress
        className="absolute top-0 -left-0.5 h-full w-0.5 origin-top bg-gradient-to-b from-accent via-accent/80 to-transparent"
      />
      <ol className="border-l-2 border-border/60">
        {items.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}
      </ol>
    </div>
  );
}
