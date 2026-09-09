import { cn } from "@/lib/cn";

type WordmarkProps = {
  className?: string;
  /** `inverse` for dark surfaces; `mono` for the footer lockup, which is
   *  set in a single weight of white so the mark beside it reads as one piece. */
  tone?: "default" | "inverse" | "mono";
};

/** Matches the live logotype: "Prop" in brand orange, "soch" in ink. */
export function Wordmark({ className, tone = "default" }: WordmarkProps) {
  return (
    <span className={cn("font-display text-xl font-semibold tracking-[-0.02em]", className)}>
      <span className={tone === "mono" ? "text-white" : "text-brand"}>Prop</span>
      <span className={tone === "default" ? "text-foreground" : "text-white"}>soch</span>
    </span>
  );
}
