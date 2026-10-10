type Props = { id: string; eyebrow: string; title: string };

/** `id` adalah id section; heading-nya memakai `${id}-heading` untuk aria-labelledby. */
export function SectionHeading({ id, eyebrow, title }: Props) {
  return (
    <div data-reveal="up" className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="font-display text-(length:--text-h2) leading-tight font-bold"
      >
        {title}
      </h2>
    </div>
  );
}
