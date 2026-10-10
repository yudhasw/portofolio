# web-portofolio

Portofolio Yudha Setiawan Wicaksono. Aturan dan keputusan proyek ada di [CLAUDE.md](CLAUDE.md).

## Perintah

| Perintah                | Fungsi                                  |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Dev server                              |
| `npm run build`         | Build produksi (SSG)                    |
| `npm run lint`          | ESLint                                  |
| `npm run typecheck`     | Generate route types + `tsc --noEmit`   |
| `npm run format`        | Prettier (+ urut kelas Tailwind)        |
| `npm run check:contrast`| Verifikasi kontras design tokens (AA)   |

## Deploy (Vercel Hobby)

1. Push repo ke GitHub.
2. Vercel > Add New Project > import repo. Framework terdeteksi otomatis (Next.js).
3. Rahasia (mis. `RESEND_API_KEY`, Fase 1) hanya di Environment Variables Vercel. Lihat `.env.example`.
