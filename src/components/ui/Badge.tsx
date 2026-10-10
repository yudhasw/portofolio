import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Penanda bentuk (selain warna) agar status tidak disampaikan lewat warna saja. */
  marker?: "dot" | "ring" | "none";
};

export function Badge({ children, marker = "none" }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-fg-muted px-3 py-1 text-sm text-fg">
      {marker !== "none" && (
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${marker === "dot" ? "bg-accent" : "border-2 border-accent"}`}
        />
      )}
      {children}
    </span>
  );
}
