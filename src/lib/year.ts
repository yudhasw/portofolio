import { cacheLife } from "next/cache";

/** Tahun saat build/revalidasi; di-cache supaya halaman tetap statis. */
export async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
