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

  const linkClass = (id: string) => {
    const isActive = active === id;
    return `relative rounded-full px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
      isActive
        ? "text-fg bg-accent/20 border border-accent/30 shadow-xs"
        : "text-fg-muted hover:text-fg hover:bg-surface/60"
    }`;
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="glass-strong pointer-events-auto mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full border border-border/70 px-3.5 py-2 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 sm:gap-4 sm:px-5 sm:py-2.5">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-sm font-bold tracking-tight text-fg transition-transform duration-300 hover:scale-105 sm:text-base"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex size-2.5 rounded-full bg-accent"></span>
          </span>
          <span className="truncate">{brand}</span>
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          {children}
          <Link
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-on-accent shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-accent/25 active:scale-95 sm:inline-flex"
          >
            <span>
              {items.find((i) => i.id === "contact")?.label ?? "Contact"}
            </span>
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? closeLabel : openLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-8 items-center justify-center rounded-full text-fg transition-all duration-300 hover:bg-surface sm:size-9 md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
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
        <div className="animate-in fade-in slide-in-from-top-2 pointer-events-auto mx-auto mt-2 max-w-sm duration-300 md:hidden">
          <nav
            id="mobile-nav"
            aria-label={navLabel}
            className="glass-strong rounded-3xl border border-border/80 p-3 shadow-2xl shadow-black/20"
          >
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className={`block w-full rounded-2xl py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      active === item.id
                        ? "border border-accent/30 bg-accent/20 text-fg"
                        : "text-fg-muted hover:bg-surface/60 hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
