import { fields } from "@keystatic/core";

type Factory = (label: string) => ReturnType<typeof fields.text>;

/**
 * Field dua bahasa ({ en, id }); keduanya wajib diisi.
 * Contoh: localized("Judul", (label) => fields.text({ label, validation: { isRequired: true } }))
 */
export function localized(label: string, make: Factory) {
  return fields.object(
    { en: make(`${label} (EN)`), id: make(`${label} (ID)`) },
    { label },
  );
}

export const requiredText = (label: string) =>
  fields.text({ label, validation: { isRequired: true } });

export const requiredMultiline = (label: string) =>
  fields.text({ label, multiline: true, validation: { isRequired: true } });
