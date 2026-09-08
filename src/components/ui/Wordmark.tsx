import { cn } from "@/lib/cn";

type WordmarkProps = {
  className?: string;
  /** Renders for dark surfaces (footer). */
  tone?: "default" | "inverse";
};

/** Matches the live logotype: "Prop" in brand orange, "soch" in ink. */
export function Wordmark({ className, tone = "default" }: WordmarkProps) {
  return (
    <span className={cn("font-display text-xl font-semibold tracking-[-0.02em]", className)}>
      <span className="text-brand">Prop</span>
      <span className={tone === "inverse" ? "text-white" : "text-foreground"}>soch</span>
    </span>
  );
}
