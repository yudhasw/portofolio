import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Keystatic",
  robots: { index: false, follow: false },
};

export default function Layout() {
  // Di produksi editor hanya tersedia bila mode GitHub dikonfigurasi.
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
  ) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
