import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60";

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
  className?: string;
};

/** Shared styling so links and buttons can look identical without duplicating classes. */
export function buttonStyles({ variant = "primary", size = "lg", className }: StyleOptions = {}) {
  return cn(BASE, VARIANTS[variant], variant === "quiet" ? "min-h-11" : SIZES[size], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & StyleOptions;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
