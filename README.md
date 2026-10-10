# web-portofolio

Portofolio Yudha Setiawan Wicaksono. Aturan dan keputusan proyek ada di [CLAUDE.md](CLAUDE.md).

## Perintah

| Perintah                 | Fungsi                                |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Dev server                            |
| `npm run build`          | Build produksi (SSG)                  |
| `npm run lint`           | ESLint                                |
| `npm run typecheck`      | Generate route types + `tsc --noEmit` |
| `npm run format`         | Prettier (+ urut kelas Tailwind)      |
| `npm run check:contrast` | Verifikasi kontras design tokens (AA) |

## Edit konten (Keystatic)

1. `npm run dev`, lalu buka http://localhost:3000/keystatic.
2. Ubah atau tambah proyek, pengalaman, dll. Semua teks wajib dua bahasa (EN dan ID).
3. Proyek featured butuh isi studi kasus EN dan ID. Hilangkan centang "Terbit" untuk menyembunyikan proyek.
4. Commit hasilnya (folder `content/` dan `public/`) lalu push; Vercel akan deploy ulang.

Build gagal bila ada teks dua bahasa kosong, featured tanpa studi kasus, gambar tanpa alt, atau slug ganda.

## Deploy (Vercel Hobby)

1. Push repo ke GitHub.
2. Vercel > Add New Project > import repo. Framework terdeteksi otomatis (Next.js).
3. Base URL (canonical, sitemap, OG) otomatis memakai domain produksi Vercel; isi `NEXT_PUBLIC_SITE_URL` hanya untuk domain kustom.
4. Rahasia (mis. `RESEND_API_KEY`, Fase 1) hanya di Environment Variables Vercel. Lihat `.env.example`.
