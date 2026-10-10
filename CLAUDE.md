# Portfolio: Yudha Setiawan Wicaksono

## Tujuan

Website portofolio pribadi untuk mencari kerja/freelance dan personal branding.
Target peran: Software Engineer / AI Engineer. Positioning: "Software engineer yang
membangun produk berbasis AI & data". Bukti utama: WealthWise (AI/computer vision) dan
pipeline CDC InfraNexia (data engineering). QA dan Data Analyst = nilai tambah.

## Keputusan (jangan diubah tanpa konfirmasi)

- Next.js (App Router) + TypeScript, Tailwind CSS, design tokens via CSS variables
- i18n: next-intl, URL /en dan /id, toggle bahasa menjaga posisi halaman
- CMS: Keystatic (berbasis Git). Semua konten di content/, bukan hardcoded
- Tema: next-themes, default mengikuti sistem, gelap/terang
- Animasi: GSAP + ScrollTrigger, di-lazy-load. TANPA Locomotive Scroll / smooth-scroll JS
- Form kontak: Route Handler /api/contact + Resend, validasi zod, honeypot, rate limit
- Hosting: Vercel Hobby, domain *.vercel.app dulu. Budget: gratis
- Data: 100% SSG. Tidak ada SSR. ISR hanya jika ada data eksternal
- Selalu cek dokumentasi versi terbaru Next.js, next-intl, Keystatic, Tailwind, GSAP
  sebelum menulis kode; jangan mengandalkan memori. Pasang versi stabil terbaru.

## Aturan konten (wajib)

- DILARANG menampilkan nomor telepon atau alamat rumah di mana pun (kode, konten, JSON-LD)
- Hanya tampilkan: email, GitHub, LinkedIn
- Studi kasus InfraNexia: versi disanitasi. Tanpa host, nama database/tabel internal,
  kredensial, atau screenshot yang memuatnya. Cukup diagram arsitektur dan metrik umum.
  Publikasi hanya setelah izin pembimbing lapangan [ISI: sudah/belum]
- Klaim latensi CDC: "median 14,6 dtk dari PostgreSQL sampai terlihat di Greenplum,
  vs batch ETL harian; micro-batch 15 dtk, bukan streaming langsung". Jangan tulis "real-time"
- Durasi KP InfraNexia: hanya rentang tanggal 29 Jul - 28 Agu 2026, tanpa jumlah minggu
- Jangan mengarang angka atau metrik. Jika tidak ada data, jangan buat metrik
- Foto: satu foto formal, konsisten dengan CV

## Sitemap

/ -> redirect ke /en atau /id (Accept-Language)
/{locale} halaman utama: Hero, About, Experience, Projects, Education, Contact
/{locale}/projects indeks proyek + filter tag
/{locale}/projects/[slug] studi kasus (hanya proyek featured)
/{locale}/blog, /blog/[slug] [Fase 2]
/cv/en.pdf, /cv/id.pdf
/keystatic editor CMS (noindex, di-disallow di robots)
sitemap.xml, robots.txt, 404

## Struktur folder

keystatic.config.ts skema CMS
content/ site/, projects/<slug>/, experience/, education/, skills/, blog/
messages/en.json, id.json string UI
public/cv, public/images
src/app/[locale]/... halaman publik (layout, page, projects/)
src/app/api/contact/route.ts
src/app/keystatic/ UI+API Keystatic
src/app/sitemap.ts, robots.ts, opengraph-image.tsx
src/components/ui | layout | sections | project | motion | seo
src/lib/content | seo | animations | validation
src/i18n/ (routing.ts, request.ts), src/styles/, src/types/, src/middleware.ts
Prinsip: content/ = apa, components/ = bagaimana, lib/ = logika.

## Komponen (props utama)

Layout: Navbar{locale,items,activeId?}, LanguageSwitcher{currentLocale,pathname},
ThemeToggle, SkipLink{targetId}, Footer{links,year}
Section: Hero{name,headline,subheadline,photo,primaryCta,secondaryCta,status?},
SectionHeading{id,eyebrow,title}, About{bio,highlights,skillGroups},
Timeline{items}, TimelineItem{role,organization,period,bullets,tags},
Projects{featured,others,viewAllHref}, Education{degree,institution,period,gpa?,certifications},
Contact{email,socials,formLabels}, ContactForm{locale,labels}
Proyek: ProjectCard{slug,title,summary,cover,tags,status,links,featured?},
ProjectGrid{projects,activeTag?}, CaseStudy{project,body,metrics,prev?,next?},
MetricCard{label,value,note?}, Gallery{images[{src,alt,width,height}]}
Util: Reveal{as?,direction,delay?,once?}, JsonLd{data}, Tag/Badge/Button{variant,size,asChild?}
Default Server Component. "use client" hanya untuk Navbar interaktif, ThemeToggle,
LanguageSwitcher, ContactForm, Reveal, Gallery.

## Model konten (Keystatic)

- Helper localized(): objek {en,id}, keduanya wajib. pick(field, locale) fallback ke bahasa
  lain + peringatan build bila salah satu kosong
- Data non-teks (tag, link, tahun, status, order) ditulis sekali
- site (singleton): name, headline(L), subheadline(L), bio(L), photo+photoAlt(L), email,
  github, linkedin, openToWork, cvEn, cvId, seoDefault
- experience: role(L), organization, type, start, end?, bullets(L[]), tags, order
- education: degree(L), institution, start, end, gpa?, note(L)
- certification: title, issuer, year, url?
- skillGroup: title(L), items[], order
- project: slug, title, summary(L), status(live|in-development|archived), featured, order,
  year, tags, stack[], cover, coverAlt(L), repoUrl, demoUrl, metrics[{label(L),value,note(L)}],
  bodyEn(MDX), bodyId(MDX)
- Validasi build (lib/content/validate.ts): gagalkan build bila ada field L kosong pada
  konten terbit, featured tanpa bodyEn/bodyId, gambar tanpa alt, slug duplikat
- Nama API Keystatic berbeda antar versi: cocokkan dengan dokumentasi versi terpasang

## Konten awal

Experience (terbaru dulu): Data Management (InfraNexia, 29 Jul-28 Agu 2026);
Data Analyst (Metranet, Jan-Mar 2026); Software QA (Lab. Advanced Software Engineering, Jul-Sep 2025)
Featured: WealthWise (live), Pipeline CDC InfraNexia (disanitasi), My Neighbor (in-development),
Telkomedika Online Reservation (in-development)
Kartu saja: E-TokoBuku, Pakan Ikan Otomatis, ChattingYuk
Sumber data: CV dan Laporan KP ada di docs/source/ [ISI]. CV belum final: semester dan IPK
dicek ulang sebelum publikasi.

## Design tokens

Warna (terang/gelap): bg #FAFAF7/#0F1514, surface #F0EFEC/#172120, fg #1B2422/#E8EEEC,
fg-muted #4A5552/#A3B2AE, accent #2F4F4B/#6FCFB8, on-accent #FFFFFF/#0F1514,
border #D9D8D3/#2A3836. Verifikasi kontras dengan alat sebelum final (AA: teks 4,5:1,
non-teks 3:1). Jangan sampaikan info dengan warna saja.
Font: Space Grotesk (display) + Inter (body), next/font, subset Latin, bobot 400/500/700, maks 2 keluarga.
Skala teks fluid: hero clamp(2.5rem,6vw+1rem,4.5rem), h2 clamp(1.75rem,3vw+1rem,2.75rem), body 1rem.
Spasi basis 4px. Radius 8/16/24/pill. Breakpoint 640/768/1024/1280. Bayangan minimal.
Gerak: 150/400/700 ms, ease cubic-bezier(0.22,1,0.36,1).

## Animasi

Hanya transform + opacity. Reveal naik 24px + fade, stagger 80ms; hero masuk bertahap;
garis timeline scroll-linked; kartu proyek angkat 4px saat hover/fokus; scroll progress tipis.
GSAP di-import dinamis di klien setelah render awal; gunakan gsap.matchMedia() agar hanya
aktif pada (prefers-reduced-motion: no-preference). Konten TIDAK BOLEH opacity:0 dari server;
keadaan awal animasi diterapkan JS setelah hydrate, sehingga tanpa JS konten tetap terbaca.

## Performa dan SEO

Target Lighthouse mobile: Performance >=95, Accessibility 100, Best Practices >=95, SEO 100.
LCP <2,0s, CLS <0,05, INP <200ms. JS halaman utama target <~150KB terkompresi (ukur lalu sesuaikan).
next/image (AVIF/WebP, sizes benar, Hero priority), kompres gambar sebelum commit, next/font.
generateMetadata per halaman+bahasa (title, description, canonical), hreflang en/id + x-default,
OG image dinamis, sitemap.ts (locale x halaman), robots.ts (disallow /keystatic dan /api),
JSON-LD Person (name, jobTitle, url, sameAs[GitHub,LinkedIn], alumniOf, knowsAbout),
BreadcrumbList di proyek, Article di blog. Jalankan @next/bundle-analyzer.

## Aksesibilitas (WCAG 2.2 AA)

Landmark semantik, SkipLink, :focus-visible jelas, semua interaksi bisa keyboard (lightbox:
Esc + focus trap), lang pada <html> mengikuti locale, alt text wajib, form dengan label
eksplisit + aria-describedby + status aria-live. Uji lebar 360px sebagai baseline.

## Form kontak

Validasi zod di klien dan server, honeypot, rate limit sederhana, kirim via Resend ke email
pemilik. Rahasia (API key) hanya di environment variable Vercel, jangan commit.
Jangan membocorkan detail error ke klien.

## Roadmap dan definisi selesai

Fase 0 Fondasi (3-4 hari): scaffold, tooling, deploy kosong, tokens
Fase 1 MVP (1,5-2 minggu): i18n, layout, semua section, form. Selesai = semua section
tampil di dua bahasa di URL Vercel
Fase 2 CMS + studi kasus (1-1,5 minggu): Keystatic, /projects, /projects/[slug].
Selesai = bisa menambah proyek tanpa menyentuh kode
Fase 3 Polish (1-1,5 minggu): animasi, reduced-motion, SEO penuh, audit a11y, optimasi.
Selesai = Lighthouse mobile >=95 + lolos uji keyboard dan reduced-motion
Fase 4 (opsional): blog MDX, RSS, analytics, domain kustom

## Cara bekerja

- Kerjakan per fase. Di akhir tiap fase: jalankan lint, typecheck, build, ringkas hasil
- Commit kecil dan bermakna; jangan commit rahasia
- Bila ada keputusan di luar dokumen ini, tanyakan dulu daripada menebak
- Jangan menambah dependensi besar tanpa alasan dan tanpa menyebut dampak bundle-nya
