// Verifikasi kontras design tokens (WCAG AA: teks 4.5:1, non-teks 3:1).
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const themes = {
  light: {
    bg: "#FAFAF7",
    surface: "#F0EFEC",
    fg: "#1B2422",
    muted: "#4A5552",
    accent: "#2F4F4B",
    onAccent: "#FFFFFF",
    border: "#D9D8D3",
  },
  dark: {
    bg: "#0F1514",
    surface: "#172120",
    fg: "#E8EEEC",
    muted: "#A3B2AE",
    accent: "#6FCFB8",
    onAccent: "#0F1514",
    border: "#2A3836",
  },
};

let failed = false;
for (const [name, t] of Object.entries(themes)) {
  const checks = [
    ["fg / bg", t.fg, t.bg, 4.5],
    ["fg / surface", t.fg, t.surface, 4.5],
    ["fg-muted / bg", t.muted, t.bg, 4.5],
    ["fg-muted / surface", t.muted, t.surface, 4.5],
    ["accent / bg", t.accent, t.bg, 4.5],
    ["accent / surface", t.accent, t.surface, 4.5],
    ["on-accent / accent", t.onAccent, t.accent, 4.5],
    // --border hanya pemisah dekoratif (info). Batas kontrol interaktif (input) memakai fg-muted, min 3:1.
    ["fg-muted / bg (batas kontrol)", t.muted, t.bg, 3],
    ["border / bg (dekoratif, info)", t.border, t.bg, 0],
    ["border / surface (dekoratif, info)", t.border, t.surface, 0],
  ];
  for (const [label, a, b, min] of checks) {
    const r = ratio(a, b);
    const ok = r >= min;
    if (!ok) failed = true;
    console.log(
      `${ok ? "OK  " : "FAIL"} ${name.padEnd(5)} ${label.padEnd(28)} ${r.toFixed(2)} (min ${min})`,
    );
  }
}
process.exit(failed ? 1 : 0);
