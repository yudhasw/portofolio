type Props = {
  name: string;
  rights: string;
  year: number;
  links: { label: string; href: string }[];
};

export function Footer({ name, rights, year, links }: Props) {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-fg-muted">
          © {year} {name}. {rights}
        </p>
        <ul className="flex gap-4 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-fg underline underline-offset-4 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
