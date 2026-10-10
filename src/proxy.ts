import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 mengganti konvensi `middleware` menjadi `proxy`.
export default createMiddleware(routing);

export const config = {
  // Lewati /api, /keystatic, /_next, dan semua file statis (ada titik).
  matcher: "/((?!api|keystatic|_next|_vercel|.*\..*).*)",
};
