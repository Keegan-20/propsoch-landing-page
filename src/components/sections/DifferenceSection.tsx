import { Container } from "@/components/ui/Container";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPARISON_TABLES, DIFFERENCE } from "@/content/difference";
import { cn } from "@/lib/cn";
import type { ComparisonTable } from "@/types/content";

/**
 * Tab switching with no JavaScript.
 *
 * Two visually-hidden radios drive the whole interaction through `:has()` on
 * the fieldset, so the tab labels and the panels can sit at whatever nesting
 * depth the layout needs. That keeps real radio-group semantics (arrow keys,
 * announced as "1 of 2") and the section works before — or without — hydration.
 *
 * Tailwind only sees class names it can read literally, so the variants are
 * written out per tab rather than generated from the table id.
 */
const TAB_STYLES = [
  {
    label:
      "group-has-[#compare-local-brokers:checked]:bg-foreground group-has-[#compare-local-brokers:checked]:text-white group-has-[#compare-local-brokers:focus-visible]:ring-2 group-has-[#compare-local-brokers:focus-visible]:ring-foreground",
    panel: "hidden group-has-[#compare-local-brokers:checked]:block",
  },
  {
    label:
      "group-has-[#compare-online-portals:checked]:bg-foreground group-has-[#compare-online-portals:checked]:text-white group-has-[#compare-online-portals:focus-visible]:ring-2 group-has-[#compare-online-portals:focus-visible]:ring-foreground",
    panel: "hidden group-has-[#compare-online-portals:checked]:block",
  },
] as const;

export function DifferenceSection() {
  return (
    <section
      id="how-we-are-different"
      aria-labelledby="difference-heading"
      className="scroll-mt-20 bg-white"
    >
      <Container className="py-16 lg:py-24">
        <SectionHeading
          id="difference-heading"
          eyebrow="The difference"
          title={DIFFERENCE.heading}
          align="center"
        />

        <fieldset className="group mt-9">
          <legend className="mx-auto mb-4 text-center text-[0.9375rem] text-secondary-text">
            {DIFFERENCE.chooserLabel}
          </legend>

          {COMPARISON_TABLES.map((table, index) => (
            <input
              key={table.id}
              type="radio"
              id={`compare-${table.id}`}
              name="compare-with"
              defaultChecked={index === 0}
              className="sr-only"
            />
          ))}

          <div className="mx-auto flex w-full max-w-md rounded-full border border-line-strong bg-background p-1">
            {COMPARISON_TABLES.map((table, index) => (
              <label
                key={table.id}
                htmlFor={`compare-${table.id}`}
                className={cn(
                  "flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-4 text-center text-[0.9375rem] text-weak transition-colors",
                  TAB_STYLES[index].label,
                )}
              >
                {table.tabLabel}
              </label>
            ))}
          </div>

          {COMPARISON_TABLES.map((table, index) => (
            <div key={table.id} className={cn("mt-10", TAB_STYLES[index].panel)}>
              <ComparisonGrid table={table} />
              {/* The qualifier is part of the desktop column header; on mobile it is
                  shown once here rather than repeated on every card. */}
              {table.columnQualifier ? (
                <p className="mb-4 text-center text-[0.875rem] text-secondary-text md:hidden">
                  {table.columnHeading} {table.columnQualifier}
                </p>
              ) : null}
              <ComparisonCards table={table} />
            </div>
          ))}
        </fieldset>
      </Container>
    </section>
  );
}

type TableProps = { table: ComparisonTable };

/** Desktop: a real table, with the Propsoch column lifted onto a white card. */
function ComparisonGrid({ table }: TableProps) {
  return (
    <div className="hidden md:block">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{table.caption}</caption>
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[35%]" />
          <col className="w-[35%]" />
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              className="pb-4 pr-6 align-bottom text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-secondary-text"
            >
              {DIFFERENCE.criterionColumnHeading}
            </th>
            <th
              scope="col"
              className="rounded-t-xl border-t-[3px] border-brand bg-background px-6 py-5 align-bottom text-lg font-semibold tracking-[-0.01em] text-foreground"
            >
              {DIFFERENCE.propsochColumnHeading}
            </th>
            <th
              scope="col"
              className="px-6 pb-4 align-bottom text-lg font-medium tracking-[-0.01em] text-weak"
            >
              {table.columnHeading}
              {table.columnQualifier ? (
                <span className="block text-[0.875rem] font-normal text-secondary-text">
                  {table.columnQualifier}
                </span>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => {
            const isLast = index === table.rows.length - 1;
            return (
              <tr key={row.criterion}>
                <th
                  scope="row"
                  className="border-b border-line py-5 pr-6 align-top text-[0.9375rem] font-medium text-foreground"
                >
                  {row.criterion}
                </th>
                <td
                  className={cn(
                    "bg-background px-6 py-5 align-top text-[0.9375rem] text-foreground",
                    isLast ? "rounded-b-xl" : "border-b border-line",
                  )}
                >
                  <span className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-[1.125rem] shrink-0 text-brand" />
                    {row.propsoch}
                  </span>
                </td>
                <td className="border-b border-line px-6 py-5 align-top text-[0.9375rem] text-secondary-text">
                  <span className="flex gap-3">
                    <CrossIcon className="mt-0.5 size-[1.125rem] shrink-0 text-secondary-text" />
                    {row.other}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Mobile: the same data as one card per criterion. A three-column table is
 * unreadable at 320px, so below `md` it stops being a table and becomes a
 * description list — the comparison stays explicit for screen readers too.
 */
function ComparisonCards({ table }: TableProps) {
  return (
    <ul className="flex flex-col gap-3 md:hidden">
      {table.rows.map((row) => (
        <li
          key={row.criterion}
          className="overflow-hidden rounded-xl border border-line bg-background"
        >
          <h3 className="border-b border-line px-4 py-3 text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-secondary-text">
            {row.criterion}
          </h3>
          <dl className="divide-y divide-line">
            <div className="flex gap-3 bg-brand-light px-4 py-3.5">
              <CheckIcon className="mt-0.5 size-[1.125rem] shrink-0 text-brand" />
              <div>
                <dt className="text-[0.8125rem] font-semibold text-foreground">
                  {DIFFERENCE.propsochColumnHeading}
                </dt>
                <dd className="mt-0.5 text-[0.9375rem] leading-snug text-foreground">{row.propsoch}</dd>
              </div>
            </div>
            <div className="flex gap-3 px-4 py-3.5">
              <CrossIcon className="mt-0.5 size-[1.125rem] shrink-0 text-secondary-text" />
              <div>
                <dt className="text-[0.8125rem] font-semibold text-weak">
                  {table.columnHeading}
                </dt>
                <dd className="mt-0.5 text-[0.9375rem] leading-snug text-secondary-text">{row.other}</dd>
              </div>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
