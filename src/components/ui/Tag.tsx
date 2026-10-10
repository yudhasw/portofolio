import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-surface px-2.5 py-1 text-sm text-fg-muted">
      {children}
    </span>
  );
}
