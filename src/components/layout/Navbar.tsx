"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Item = { id: string; label: string };

type Props = {
  locale: Locale;
  items: Item[];
  /** Section yang aktif saat render awal (opsional). */
  activeId?: string;
  brand: string;
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  /** Slot untuk LanguageSwitcher dan ThemeToggle. */
  children?: ReactNode;
};

export function Navbar({
  items,
  activeId,
  brand,
  navLabel,
  openLabel,
  closeLabel,
  children,
}: Props) {
  const [active, setActive] = useState(activeId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `block rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-(--duration-fast) ${
      active === id
        ? "text-accent underline underline-offset-8"
        : "text-fg-muted hover:text-fg"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold">
          {brand}
        </Link>

        <nav aria-label={navLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={linkClass(item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {children}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? closeLabel : openLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-pill text-fg hover:bg-surface md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={navLabel}
          className="border-t border-border md:hidden"
        >
          <ul className="mx-auto max-w-5xl px-5 py-2 sm:px-8">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`${linkClass(item.id)} py-3`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
