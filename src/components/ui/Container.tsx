import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Page gutter and max width. The single place the horizontal grid is defined. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
