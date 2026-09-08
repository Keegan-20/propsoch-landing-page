import { CheckIcon } from "@/components/ui/icons";
import type { StepDisclosure } from "@/types/content";

/**
 * An expandable panel on a journey step, used for the Peace of Mind report.
 *
 * Built on <details>/<summary>, so it is keyboard accessible, announced as a
 * disclosure, open to in-page search, and works with no JavaScript at all. The
 * expand is animated in CSS via ::details-content (see globals.css); browsers
 * without it simply open instantly.
 */
export function StepDetail({ disclosure }: { disclosure: StepDisclosure }) {
  return (
    <details className="group mt-4 max-w-[34rem] overflow-hidden rounded-xl border border-line bg-background">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand" />
          {disclosure.summary}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-5 shrink-0 text-secondary-text transition-transform duration-200 group-open:-rotate-180"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </summary>

      <div className="border-t border-line px-4 pb-5 pt-4">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-[-0.02em] text-foreground">
            {disclosure.stat.value}
          </span>
          <span className="text-[0.875rem] text-secondary-text">{disclosure.stat.label}</span>
        </p>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
          {disclosure.intro}
        </p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {disclosure.items.map((item) => (
            <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-foreground">
              <CheckIcon className="mt-0.5 size-[1.125rem] shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
