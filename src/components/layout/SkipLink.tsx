export function SkipLink({
  targetId,
  label,
}: {
  targetId: string;
  label: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-sm bg-accent px-4 py-2 font-medium text-on-accent focus:translate-y-0"
    >
      {label}
    </a>
  );
}
