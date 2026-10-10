import { notFound } from "next/navigation";

// Menangkap path tak dikenal di dalam /{locale} supaya 404 tampil dengan layout dan bahasa yang benar.
export default function CatchAll() {
  notFound();
}
