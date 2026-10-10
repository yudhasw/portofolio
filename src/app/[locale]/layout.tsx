import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { getSite } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getCurrentYear } from "@/lib/year";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", id: "/id", "x-default": "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [nav, common, theme, language, footer] = await Promise.all([
    getTranslations({ locale, namespace: "Nav" }),
    getTranslations({ locale, namespace: "Common" }),
    getTranslations({ locale, namespace: "Theme" }),
    getTranslations({ locale, namespace: "Language" }),
    getTranslations({ locale, namespace: "Footer" }),
  ]);
  const site = await getSite();

  const items = ["about", "experience", "projects", "education", "contact"].map(
    (id) => ({
      id,
      label: nav(id as "about"),
    }),
  );

  const languageLabels = {
    en: language("label", { language: language("en") }),
    id: language("label", { language: language("id") }),
  };

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider messages={{}}>
            <SkipLink targetId="main" label={common("skipToContent")} />
            <Navbar
              locale={locale}
              items={items}
              brand={site.name.split(" ")[0]}
              navLabel={nav("label")}
              openLabel={nav("openMenu")}
              closeLabel={nav("closeMenu")}
            >
              <LanguageSwitcher
                currentLocale={locale}
                labels={languageLabels}
              />
              <ThemeToggle label={theme("toggle")} />
            </Navbar>
            <main id="main">{children}</main>
            <Footer
              name={site.name}
              rights={footer("rights")}
              year={await getCurrentYear()}
              links={[
                { label: "GitHub", href: site.github },
                { label: "LinkedIn", href: site.linkedin },
              ]}
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
