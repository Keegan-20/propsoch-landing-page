import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";
type Shape = "pill" | "soft";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60";

/* Rounding lives here rather than in a caller's className: `cn` is a plain
   joiner, so two competing `rounded-*` utilities would be settled by stylesheet
   order instead of by the caller. */
const SHAPES: Record<Shape, string> = {
  pill: "rounded-full",
  soft: "rounded-lg",
};

const VARIANTS: Record<Variant, string> = {
  /* Brand orange with their --states-foreground label, exactly as propsoch.com
     renders its own CTAs. Hover uses --orange-80, the brand's own strong shade. */
  primary: "bg-brand text-brand-foreground hover:bg-brand-strong",
  secondary: "border border-line-strong bg-background text-foreground hover:border-foreground hover:bg-surface",
  quiet: "text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground",
};

const SIZES: Record<Size, string> = {
  /* min-heights keep every target above the 44px touch guideline */
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

type StyleOptions = {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  className?: string;
};

/** Shared styling so links and buttons can look identical without duplicating classes. */
export function buttonStyles({
  variant = "primary",
  size = "lg",
  shape = "pill",
  className,
}: StyleOptions = {}) {
  return cn(
    BASE,
    SHAPES[shape],
    VARIANTS[variant],
    variant === "quiet" ? "min-h-11" : SIZES[size],
    className,
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & StyleOptions;

export function Button({ variant, size, shape, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, shape, className })} {...props} />
  );
}
