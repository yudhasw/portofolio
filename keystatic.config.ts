import { collection, config, fields, singleton } from "@keystatic/core";
import {
  localized,
  requiredMultiline,
  requiredText,
} from "./src/lib/content/localized";

// Lokal: edit lewat `npm run dev` lalu /keystatic. Mode GitHub baru aktif bila repo diisi.
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as
  `${string}/${string}` | undefined;

const datePattern = {
  regex: /^\d{4}(-\d{2}(-\d{2})?)?$/,
  message: "Format: YYYY, YYYY-MM, atau YYYY-MM-DD",
};

const dateField = (label: string, required = true) =>
  fields.text({
    label,
    validation: { isRequired: required, pattern: datePattern },
  });

const orderField = fields.integer({
  label: "Urutan (kecil tampil dulu)",
  validation: { isRequired: true },
});

const tagsField = (label: string) =>
  fields.array(
    fields.text({ label: "Item", validation: { isRequired: true } }),
    {
      label,
      itemLabel: (props) => props.value,
    },
  );

const localizedPair = (label: string, make: typeof requiredText) =>
  fields.object(
    { en: make(`${label} (EN)`), id: make(`${label} (ID)`) },
    { label },
  );

export default config({
  storage: githubRepo
    ? { kind: "github", repo: githubRepo }
    : { kind: "local" },

  singletons: {
    site: singleton({
      label: "Situs",
      path: "content/site/",
      format: { data: "json" },
      schema: {
        name: requiredText("Nama"),
        headline: localized("Headline", requiredText),
        subheadline: localized("Subheadline", requiredMultiline),
        bio: fields.array(localizedPair("Paragraf", requiredMultiline), {
          label: "Bio (per paragraf)",
          itemLabel: (props) => props.fields.en.value.slice(0, 40),
        }),
        highlights: fields.array(localizedPair("Sorotan", requiredText), {
          label: "Sorotan",
          itemLabel: (props) => props.fields.en.value.slice(0, 40),
        }),
        photo: fields.image({
          label: "Foto formal (satu foto, konsisten dengan CV)",
          directory: "public/images",
          publicPath: "/images/",
        }),
        photoAlt: localized("Alt foto", requiredText),
        email: fields.text({
          label: "Email",
          validation: { isRequired: true },
        }),
        github: fields.url({
          label: "GitHub",
          validation: { isRequired: true },
        }),
        linkedin: fields.url({
          label: "LinkedIn",
          validation: { isRequired: true },
        }),
        openToWork: fields.checkbox({
          label: "Terbuka untuk pekerjaan",
          defaultValue: true,
        }),
        cvEn: fields.file({
          label: "CV (EN, PDF)",
          directory: "public/cv",
          publicPath: "/cv/",
        }),
        cvId: fields.file({
          label: "CV (ID, PDF)",
          directory: "public/cv",
          publicPath: "/cv/",
        }),
      },
    }),
  },

  collections: {
    experience: collection({
      label: "Pengalaman",
      path: "content/experience/*/",
      slugField: "id",
      format: { data: "json" },
      schema: {
        id: fields.slug({ name: { label: "ID (nama internal)" } }),
        role: localized("Peran", requiredText),
        organization: requiredText("Organisasi"),
        type: fields.select({
          label: "Jenis",
          options: [
            { label: "Magang", value: "internship" },
            { label: "Penuh waktu", value: "fulltime" },
            { label: "Freelance", value: "freelance" },
          ],
          defaultValue: "internship",
        }),
        start: dateField("Mulai"),
        end: dateField("Selesai (kosong = sekarang)", false),
        bullets: fields.array(localizedPair("Poin", requiredMultiline), {
          label: "Poin",
          itemLabel: (props) => props.fields.en.value.slice(0, 50),
        }),
        tags: tagsField("Tag"),
        order: orderField,
      },
    }),

    education: collection({
      label: "Pendidikan",
      path: "content/education/*/",
      slugField: "id",
      format: { data: "json" },
      schema: {
        id: fields.slug({ name: { label: "ID (nama internal)" } }),
        degree: localized("Gelar/jurusan", requiredText),
        institution: requiredText("Institusi"),
        start: dateField("Mulai"),
        end: dateField("Selesai"),
        gpa: fields.text({
          label: "IPK (opsional; cek ulang sebelum publikasi)",
        }),
        order: orderField,
      },
    }),

    certifications: collection({
      label: "Sertifikasi",
      path: "content/certifications/*/",
      slugField: "title",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Judul" } }),
        issuer: requiredText("Penerbit"),
        year: fields.integer({ label: "Tahun" }),
        url: fields.url({ label: "URL" }),
        order: orderField,
      },
    }),

    skillGroups: collection({
      label: "Keahlian",
      path: "content/skills/*/",
      slugField: "id",
      format: { data: "json" },
      schema: {
        id: fields.slug({ name: { label: "ID (nama internal)" } }),
        title: localized("Judul grup", requiredText),
        items: tagsField("Item"),
        order: orderField,
      },
    }),

    projects: collection({
      label: "Proyek",
      path: "content/projects/*/",
      slugField: "title",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Judul" } }),
        published: fields.checkbox({
          label: "Terbit",
          description:
            "Hilangkan centang untuk menyembunyikan proyek dari situs.",
          defaultValue: true,
        }),
        summary: localized("Ringkasan", requiredMultiline),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Live", value: "live" },
            { label: "Dalam pengembangan", value: "in-development" },
            { label: "Selesai/arsip", value: "archived" },
          ],
          defaultValue: "live",
        }),
        featured: fields.checkbox({
          label:
            "Featured (punya halaman studi kasus; wajib isi bodyEn dan bodyId)",
        }),
        order: orderField,
        year: fields.integer({ label: "Tahun" }),
        tags: tagsField("Tag"),
        stack: tagsField("Stack"),
        cover: fields.image({
          label: "Cover",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        coverAlt: localized("Alt cover (wajib bila ada cover)", (label) =>
          fields.text({ label }),
        ),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Gambar",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
              validation: { isRequired: true },
            }),
            alt: localized("Alt", requiredText),
          }),
          {
            label: "Galeri",
            itemLabel: (props) => props.fields.alt.fields.en.value.slice(0, 40),
          },
        ),
        repoUrl: fields.url({ label: "URL repo" }),
        demoUrl: fields.url({ label: "URL demo" }),
        metrics: fields.array(
          fields.object({
            label: localized("Label", requiredText),
            value: localized("Nilai", requiredText),
            note: localized("Catatan", (label) => fields.text({ label })),
          }),
          {
            label: "Metrik (hanya data nyata)",
            itemLabel: (props) => props.fields.value.fields.en.value,
          },
        ),
        bodyEn: fields.mdx({ label: "Studi kasus (EN)", extension: "mdx" }),
        bodyId: fields.mdx({ label: "Studi kasus (ID)", extension: "mdx" }),
      },
    }),
  },
});
