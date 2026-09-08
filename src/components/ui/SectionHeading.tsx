import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** Consistent section header rhythm: eyebrow, H2, optional deck. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-[2rem] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem] lg:text-[2.875rem]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[52ch] text-base leading-relaxed text-secondary-text sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
