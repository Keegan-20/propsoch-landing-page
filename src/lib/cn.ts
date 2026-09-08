/**
 * Minimal class joiner. Tailwind Merge is deliberately not a dependency here:
 * every component owns its own classes and we never merge conflicting utilities.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
