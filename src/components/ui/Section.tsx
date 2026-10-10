import type { ReactNode } from "react";

export function Section({
  id,
  children,
  tone = "base",
}: {
  id: string;
  children: ReactNode;
  tone?: "base" | "surface";
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-16 py-20 sm:py-24 ${tone === "surface" ? "bg-surface" : ""}`}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
