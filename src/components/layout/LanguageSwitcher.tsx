"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  currentLocale: Locale;
  /** Label aksesibel per bahasa tujuan, mis. { en: "Switch language to English", ... } */
  labels: Record<Locale, string>;
};

/** Pindah bahasa di halaman yang sama; scroll tidak direset sehingga posisi terjaga. */
export function LanguageSwitcher({ currentLocale, labels }: Props) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {routing.locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              scroll={false}
              lang={locale}
              hrefLang={locale}
              aria-label={labels[locale]}
              aria-current={active ? "true" : undefined}
              className={`inline-flex h-8 items-center justify-center rounded-full px-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                active
                  ? "bg-accent text-on-accent shadow-sm"
                  : "text-fg-muted hover:bg-surface/60 hover:text-fg"
              }`}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
