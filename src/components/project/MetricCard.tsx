type Props = { label: string; value: string; note?: string };

export function MetricCard({ label, value, note }: Props) {
  return (
    <div className="rounded-md border border-border bg-surface p-5">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className="mt-1">
        <span className="font-display text-3xl font-bold">{value}</span>
        {note && (
          <span className="mt-2 block text-sm text-fg-muted">{note}</span>
        )}
      </dd>
    </div>
  );
}
