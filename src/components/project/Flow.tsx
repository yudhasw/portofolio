/** Diagram alur untuk MDX: <Flow steps="A | B | C" /> */
export function Flow({ steps: raw }: { steps: string }) {
  const steps = raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <ol className="not-prose my-6 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-sm border border-fg-muted bg-surface px-3 py-2 text-sm font-medium">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-fg-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
