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

/**
 * The Propsoch column is a card set down on the table, so its shadow is built
 * the way a real one falls: a 1px contact edge, a warm near shadow on the brand
 * hue, and a wide neutral ambient that does the actual lifting. Interacting
 * with the column deepens those layers and adds an even glow around the edge —
 * the card never translates, because moving the surface while its text stays
 * put reads as a glitch at this size. Depth and the glow are the whole cue.
 *
 * Both states carry the same five layers, because `box-shadow` only
 * interpolates between lists of equal length — hover adding two layers would
 * snap instead of easing. So the glow's two layers are always present and sit
 * at zero alpha at rest: a tight 6px bloom hugging the edge, and a wider 22px
 * bloom on the same hue. Both are pure blur with no spread, so the light falls
 * off evenly on every side rather than reading as an outline.
 */
const COLUMN_SHADOW =
  "shadow-[0_0_6px_-1px_rgba(255,109,51,0),0_0_22px_-6px_rgba(255,109,51,0),0_1px_1px_rgba(10,10,10,0.03),0_10px_22px_-14px_rgba(255,109,51,0.5),0_30px_52px_-34px_rgba(10,10,10,0.2)]";
const COLUMN_SHADOW_HOVER =
  "group-has-[[data-propsoch]:hover]/table:shadow-[0_0_6px_-1px_rgba(255,109,51,0.24),0_0_22px_-6px_rgba(255,109,51,0.18),0_1px_1px_rgba(10,10,10,0.04),0_16px_28px_-14px_rgba(255,109,51,0.62),0_38px_60px_-34px_rgba(10,10,10,0.26)]";

/**
 * Entrance. See the `compare-*` block in globals.css for why this is a
 * view-progress timeline and why only two elements carry it.
 */
const RISE = "animate-compare-rise [animation-timeline:view()] [animation-range:cover_0px_cover_300px]";
const LIFT = "animate-compare-lift [animation-timeline:view()] [animation-range:cover_0px_cover_460px]";

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
                  "flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-4 text-center text-[0.9375rem] text-foreground transition-colors",
                  TAB_STYLES[index].label,
                )}
              >
                {table.tabLabel}
              </label>
            ))}
          </div>

          {COMPARISON_TABLES.map((table, index) => (
            <div
              key={table.id}
              /* The comparison is capped short of the page gutter. At 1440 the full
                 container leaves each row stretched across empty space, which
                 reads as a spreadsheet; pulled in, the three columns hold
                 together as one block under the centred heading. */
              className={cn("mx-auto mt-12 max-w-[64rem]", RISE, TAB_STYLES[index].panel)}
            >
              <ComparisonGrid table={table} />
            </div>
          ))}
        </fieldset>
      </Container>
    </section>
  );
}

type TableProps = { table: ComparisonTable };

/**
 * One table at every width, with the Propsoch column lifted out of it.
 *
 * The lift is a decorative card painted *behind* the table rather than a
 * background on the cells themselves. Cells cannot round their corners, cast a
 * shadow, or extend past the row they sit in; a sibling box can do all three,
 * so the column gets to be an object — rounded, edged, overhanging the header
 * above and the last row below — while the markup stays a plain `<table>` with
 * real row and column headers.
 *
 * `table-fixed` is what makes that safe: the `<colgroup>` percentages are then
 * honoured exactly, so the card's `left`/`width` can be stated in the same
 * percentages and stay registered to the column at every width. Those
 * percentages deliberately do not change at any breakpoint — a card whose
 * offsets had to be kept in sync with a responsive `<colgroup>` is a
 * misalignment waiting to happen.
 *
 * The comparison stays three columns down to 320px rather than restacking:
 * seeing both answers on one line is the entire point of a comparison, and a
 * stacked list makes the reader hold one half in their head. What scales
 * instead is everything around the words — type down to 13px, cell padding
 * from 28px to 12px, icons from 18px to 14px — so at 390px the widest value in
 * the set ("Assisted by on-ground market experts") lands on three lines rather
 * than being clipped or scrolled. Below ~320px the columns do get tight; that
 * is the floor this layout trades for keeping the two answers side by side.
 *
 * The rest of the hierarchy is deliberately quiet. The competitor column gets
 * no accent rule, a lighter weight, a smaller size and coolgrey-60 text, so it
 * recedes without ever looking disparaged — the comparison has to stay
 * credible to be worth anything.
 */
function ComparisonGrid({ table }: TableProps) {
  return (
    <div className="group/table relative pb-5 sm:pb-6">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-[29%] w-[37%] rounded-xl border border-brand-line sm:rounded-[1.25rem]",
          /* Tint is heaviest at the header and has settled to --primarylight by
             10rem down, so the column anchors at the top without washing the
             row copy in orange. Fixed in rem, not a percentage, so the falloff
             is identical whether the table has five rows or nine. */
          "bg-[linear-gradient(to_bottom,var(--color-brand-tint),var(--color-brand-light)_10rem)]",
          COLUMN_SHADOW,
          COLUMN_SHADOW_HOVER,
          "transition-[box-shadow,border-color] duration-300 ease-out",
          "group-has-[[data-propsoch]:hover]/table:border-brand/30",
          LIFT,
        )}
      >
        {/* Second, wider hairline offset outside the card. One quiet layer is
            enough to say "this column is mounted, not filled in" — it reads at
            a glance and disappears on inspection. */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-2xl border border-brand/10 transition-colors duration-300 ease-out group-has-[[data-propsoch]:hover]/table:border-brand/18 sm:-inset-1.5 sm:rounded-[1.5rem]"
        />
      </div>

      <table
        /* Three wrapping rules, in order of last resort.
           `hyphens-auto` alone was too eager — Chrome hyphenates to tighten a
           ragged edge, not only when forced, so a 390px phone got "High
           pres-sure" where a plain wrap reads better. `hyphenate-limit-chars`
           restricts it to words of 12+ characters with at least 6 before and 4
           after the break, which is exactly the set that cannot fit a ~90px
           column ("complimentary", "Consultative", "Transparency") and none of
           the ones that can. `break-words` is then the floor below 360px: it
           guarantees no value ever spills into the column beside it, at the
           cost of a hard cut on the one or two words hyphenation can't save. */
        className="relative w-full table-fixed border-collapse hyphens-auto break-words text-left [hyphenate-limit-chars:12_6_4]"
      >
        <caption className="sr-only">{table.caption}</caption>
        <colgroup>
          <col className="w-[29%]" />
          <col className="w-[37%]" />
          <col className="w-[34%]" />
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              className="pb-5 pr-3 align-baseline text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted sm:pb-6 sm:pl-4 sm:pr-6 sm:text-[0.8125rem]"
            >
              {/* Three lines of tracked-out caps in a 95px column is noise, not
                  a label. The column is self-evident from its contents, so
                  below `sm` the heading stays for screen readers only. */}
              <span className="sr-only sm:not-sr-only">{DIFFERENCE.criterionColumnHeading}</span>
            </th>
            {/* The generous top padding is what actually lifts the card: the row
                is as tall as this cell, the other two headers sit on its
                baseline, and the card top therefore clears them by ~2.5rem. */}
            <th scope="col" className="px-2.5 pb-5 pt-7 align-baseline sm:px-5 sm:pb-6 sm:pt-9 lg:px-7">
              {/* Same accent mark the hero uses above each statistic. */}
              <span aria-hidden="true" className="mb-2.5 block h-0.5 w-5 bg-brand sm:mb-3.5 sm:w-7" />
              <span className="block font-display text-[1.25rem] font-semibold leading-none tracking-[-0.02em] text-foreground sm:text-[1.5rem]">
                {DIFFERENCE.propsochColumnHeading}
              </span>
            </th>
            <th scope="col" className="px-2 pb-5 align-baseline sm:px-4 sm:pb-6 lg:px-6">
              <span className="block text-[0.875rem] font-medium leading-none tracking-[-0.01em] text-foreground sm:text-[1.0625rem]">
                {table.columnHeading}
              </span>
              {table.columnQualifier ? (
                <span /* "(Housing/99Acres/Magicbricks)" has no space to break at, and
                     UAX#14 refuses to break the slash before a digit. Left
                     alone it runs past a 100px column and widens the document.
                     `break-words` only splits a token that cannot otherwise
                     fit, so wider screens still break it at the slashes. */
                  className="mt-1.5 block break-words text-[0.6875rem] font-normal leading-snug text-muted sm:text-[0.8125rem]">
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
              <tr key={row.criterion} className="group/row">
                <th
                  scope="row"
                  className="border-b border-line py-3.5 pr-3 align-top text-[0.75rem] font-medium leading-snug text-foreground transition-colors duration-200 group-hover/row:bg-surface/70 sm:py-5 sm:pl-4 sm:pr-6 sm:text-[0.9375rem] sm:leading-normal"
                >
                  {row.criterion}
                </th>
                <td
                  data-propsoch
                  className={cn(
                    "px-2.5 py-3.5 align-top text-[0.8125rem] font-medium leading-snug text-foreground transition-colors duration-200 group-hover/row:bg-brand-tint/55 sm:px-5 sm:py-5 sm:text-[0.9375rem] sm:leading-normal lg:px-7",
                    /* Hairlines inside the column are the column's own colour,
                       not the table's grey — the card has to look like one
                       surface, not a grey table showing through. The last row
                       drops its rule so the card closes on its own edge. */
                    !isLast && "border-b border-brand-line/70",
                  )}
                >
                  <span className="flex gap-1.5 sm:gap-3">
                    <CheckIcon
                      strokeWidth={2.25}
                      className="mt-px size-3.5 shrink-0 text-brand transition-transform duration-200 group-hover/row:scale-110 sm:size-[1.125rem]"
                    />
                    <span className="min-w-0">{row.propsoch}</span>
                  </span>
                </td>
                <td className="border-b border-line px-2 py-3.5 align-top text-[0.8125rem] leading-snug text-foreground transition-colors duration-200 group-hover/row:bg-surface/70 sm:px-4 sm:py-5 sm:text-[0.9375rem] sm:leading-normal lg:px-6">
                  <span className="flex gap-1.5 sm:gap-3">
                    <CrossIcon
                      strokeWidth={1.5}
                      className="mt-px size-3.5 shrink-0 text-foreground sm:mt-0.5 sm:size-4"
                    />
                    <span className="min-w-0">{row.other}</span>
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
