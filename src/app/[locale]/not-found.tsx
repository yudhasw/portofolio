import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("Common");

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-start justify-center gap-4 px-5 sm:px-8">
      <p className="text-sm font-medium tracking-widest text-accent uppercase">
        404
      </p>
      <h1 className="font-display text-(length:--text-h2) font-bold">
        {t("notFoundTitle")}
      </h1>
      <p className="text-fg-muted">{t("notFoundBody")}</p>
      <ButtonLink href="/">{t("backHome")}</ButtonLink>
    </div>
  );
}
