import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:opacity-90",
  secondary: "border border-fg-muted text-fg hover:bg-surface",
  ghost: "text-fg hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return `inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-[background-color,opacity] duration-(--duration-fast) disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]}`;
}

type CommonProps = { variant?: Variant; size?: Size };

export function Button({
  variant,
  size,
  className = "",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${buttonClasses(variant, size)} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className = "",
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${buttonClasses(variant, size)} ${className}`} {...props} />
  );
}
