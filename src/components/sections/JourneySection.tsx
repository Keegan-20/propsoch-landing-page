import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { ComponentType, CSSProperties, SVGProps } from "react";

import homeImage from "@/assets/images/home-found-living-room.webp";
import { StepDetail } from "@/components/sections/StepDetail";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardIcon,
  HouseMarkerIcon,
  KeyIcon,
  ListIcon,
  PhaseMarkerIcon,
  PhoneIcon,
  PinIcon,
  ReportIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY, JOURNEY_PHASES } from "@/content/journey";
import { PRIMARY_CTA, PROOF } from "@/content/site";
import { cn } from "@/lib/cn";
import type { JourneyStep, StepIcon } from "@/types/content";

/**
 * The journey as a road, with a house travelling it.
 *
 * The metaphor is wayfinding, because that is what this section is for: a
 * reader arrives asking "where am I, what happens next, and how far is the
 * house?", which is the question a signpost exists to answer. Four things do
 * the answering, and each is load-bearing:
 *
 *  - all six signs are visible together, so the shape of the journey is one
 *    glance rather than a memory of what scrolled past;
 *  - the road fills, in the brand's own hue, from the first stop up to the one
 *    you are reading — so "how far through am I" is answered by the line;
 *  - a small house marker travels that road and settles onto the stop you
 *    picked, so the abstraction has someone in it: the house is the reader;
 *  - every sign is cut to a point aimed down the road, so the row reads as
 *    travel in one direction rather than as six tiles.
 *
 * The road turns with the viewport rather than shrinking. Below `lg` it stands
 * vertical — signs hung off a rail on the left, the house descending it — which
 * is the honest shape for a narrow screen; six signs squeezed into a row would
 * be six unreadable slivers, and a horizontally-scrolling road hides half the
 * journey behind a gesture. From `md` the vertical road and the open panel sit
 * side by side, because a tablet has the width for both. From `lg`, where six
 * signs have ~180px each, it lies flat and runs left to right.
 *
 * Propsoch's copy is untouched and complete: the five phase labels, six titles,
 * six bodies, the loan-assistance note and the closing line are theirs,
 * verbatim. The redesign contributes no words of its own — the destination is
 * marked with a house glyph rather than a label, precisely so that nothing here
 * has to be written.
 *
 * Still no client JavaScript, and no animation dependency. Six visually-hidden
 * radios drive the whole thing through `:has()`, exactly as the comparison
 * section does, so the stops keep real radio-group semantics — arrow keys,
 * "3 of 6" announced — every panel is in the markup whether or not it is on
 * screen, and the section works before, and without, hydration. That also
 * settles the question of scroll-driven activation: the active stop is a form
 * value the reader sets, so scroll position must not overwrite it. Scroll gets
 * the one job it is good at here — `sign-settle` brings the road in as it
 * reaches the viewport — and the page never stops scrolling normally.
 */

const STOP_ICONS: Record<StepIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  call: PhoneIcon,
  form: ClipboardIcon,
  list: ListIcon,
  visit: PinIcon,
  report: ReportIcon,
  key: KeyIcon,
};

type Stop = {
  readonly step: JourneyStep;
  /** The phase this stop belongs to — kept as the sign's own label. */
  readonly label: string;
  readonly number: number;
};

/**
 * The phases stay the source of truth; the road is their flattening. Two stops
 * share "Week 1" and that is left as it is: a week with two things in it gets
 * two signs, which is more honest than inventing a sixth week to fill.
 */
const STOPS: readonly Stop[] = JOURNEY_PHASES.flatMap((phase) =>
  phase.steps.map((step) => ({ step, label: phase.label })),
).map((stop, index) => ({ ...stop, number: index + 1 }));

const stopId = (number: number) => `journey-stop-${number}`;

/**
 * Sign state, passed down as custom properties rather than as classes.
 *
 * Every part of a signpost reacts to its own radio — the plate edge, the face,
 * the tilt, the depth, the post, the node on the road — and the radio lives
 * inside the `<li>` it belongs to, so all of that is one `:has()` away and the
 * four strings below are the whole state table. (An earlier version keyed every
 * rule to a stop id, which meant six near-identical copies of each; nothing
 * here needs to know *which* stop it is.)
 *
 * The ground is `--color-brand-light`, the same warm cream the hero sits on, so
 * the selected sign follows the hero's own precedent for an active state (see
 * the lens tabs in HeroVisual.tsx): unselected stays quiet — hairline edge,
 * muted label — and selected snaps to a plain white face with a brand edge, the
 * way a card lifts off a warm surface. The label turning brand is the accent,
 * and it is never the only signal: the tilt flattens, the shadow deepens, the
 * edge doubles in weight, and the road and the house both arrive.
 *
 * `SIGN_PASSED` is the road's memory. `:has(~li input:checked)` matches a stop
 * with a *later* stop selected — the ones already behind you — and tints their
 * nodes so the filled road runs through solid markers rather than hollow ones.
 *
 * `SIGN_FOCUS` is written as a raw `&:has(input:focus-visible)` rather than the
 * `has-[…]` shorthand for one reason: specificity. A clicked sign is both
 * checked and focused, and the focus treatment must win. Naming the element
 * inside `:has()` puts it one type selector above `has-[:checked]`, which
 * settles the cascade by weight instead of by whatever order the compiler emits
 * the two variants in. It thickens the plate edge rather than drawing a ring,
 * because an outline would be clipped by the chevron and break along the point,
 * whereas the edge already follows the exact silhouette of the sign.
 */
const SIGN_REST =
  "[--sign-tilt:0.6deg] [--sign-edge:var(--color-line-strong)] [--sign-edge-w:1px] [--sign-face:var(--color-background)] [--sign-depth:var(--sign-shadow)] [--sign-post:var(--color-line-strong)] [--sign-node:var(--color-brand-light)] [--sign-node-edge:var(--color-line-strong)] [--sign-label:var(--color-muted)] [--sign-num:var(--color-muted)]";

const SIGN_PASSED =
  "[&:has(~li_input:checked)]:[--sign-node:var(--color-brand-line)] [&:has(~li_input:checked)]:[--sign-node-edge:var(--color-brand)] [&:has(~li_input:checked)]:[--sign-post:var(--color-brand-line)]";

const SIGN_SELECTED =
  "has-[:checked]:[--sign-tilt:0deg] has-[:checked]:[--sign-edge:var(--color-brand)] has-[:checked]:[--sign-edge-w:2px] has-[:checked]:[--sign-depth:var(--sign-shadow-lifted)] has-[:checked]:[--sign-post:var(--color-brand)] has-[:checked]:[--sign-node:var(--color-brand)] has-[:checked]:[--sign-node-edge:var(--color-brand)] has-[:checked]:[--sign-label:var(--color-brand)] has-[:checked]:[--sign-num:var(--color-secondary-text)]";

const SIGN_FOCUS =
  "[&:has(input:focus-visible)]:[--sign-edge:var(--color-foreground)] [&:has(input:focus-visible)]:[--sign-edge-w:2px]";

/**
 * Where the journey has got to, as two numbers on the road's own wrapper.
 *
 * `--road-progress` is how much of the road is behind you and `--house-step` is
 * which stop the marker stands on, and everything that moves reads one of them.
 * The road runs from the first node to the last rather than edge to edge, so
 * both are linear in the stop index: stop n fills (n-1)/5 of the road and puts
 * the house at cell n. Stop 1 therefore starts with an empty road ahead of it,
 * and stop 6 finishes with a full one and the house on the final node — the
 * geometry says "arrived" without anything having to be labelled.
 *
 * Written out per stop because Tailwind only compiles class names it can read
 * in the source, and none of these can be assembled from a variable.
 */
const JOURNEY_PROGRESS = [
  "group-has-[#journey-stop-1:checked]:[--road-progress:0%] group-has-[#journey-stop-1:checked]:[--house-step:0]",
  "group-has-[#journey-stop-2:checked]:[--road-progress:20%] group-has-[#journey-stop-2:checked]:[--house-step:1]",
  "group-has-[#journey-stop-3:checked]:[--road-progress:40%] group-has-[#journey-stop-3:checked]:[--house-step:2]",
  "group-has-[#journey-stop-4:checked]:[--road-progress:60%] group-has-[#journey-stop-4:checked]:[--house-step:3]",
  "group-has-[#journey-stop-5:checked]:[--road-progress:80%] group-has-[#journey-stop-5:checked]:[--house-step:4]",
  "group-has-[#journey-stop-6:checked]:[--road-progress:100%] group-has-[#journey-stop-6:checked]:[--house-step:5]",
].join(" ");

/**
 * Road geometry, shared by the track and the fill laid over it so the two can
 * never drift apart.
 *
 * Vertical below `lg`: pinned to the centre of the 2.5rem rail, and inset half
 * a row top and bottom so it starts and ends on a node rather than running past
 * the first and last. Horizontal from `lg`: the same inset, now a twelfth of
 * the row at each end, which is where the centres of the first and last of six
 * equal columns fall. That equality is why the row carries no column gap — the
 * signs are spaced by their own padding instead. With a gap, column centres
 * drift inward by half the gap and the road, the nodes and the house would each
 * land in a slightly different place.
 */
const ROAD_GEOMETRY =
  "absolute left-5 top-[calc(var(--journey-row)/2)] bottom-[calc(var(--journey-row)/2)] w-0.5 -translate-x-1/2 lg:left-[8.333%] lg:right-[8.333%] lg:top-auto lg:bottom-[0.3125rem] lg:h-0.5 lg:w-auto lg:translate-x-0";

/**
 * The travelling marker's cell: exactly one row tall (vertical) or one column
 * wide (horizontal), so translating it by whole multiples of its own size steps
 * it from node to node with no measurement involved — and, at the last stop,
 * leaves it flush with the end of the road instead of overhanging the section.
 *
 * A transform is the whole movement. `left`/`top` are never touched, so travel
 * stays on the compositor.
 */
const HOUSE_TRAVEL =
  "pointer-events-none absolute left-0 top-0 flex h-[var(--journey-row)] w-10 items-center justify-center [transform:translateY(calc(var(--house-step)*100%))] transition-transform duration-[560ms] ease-[var(--ease-arrive)] [transition-delay:120ms] lg:bottom-0 lg:top-auto lg:h-3 lg:w-1/6 lg:[transform:translateX(calc(var(--house-step)*100%))]";

/**
 * The celebration, and all of it: eight dots, out and gone in under a second.
 * They live inside the marker's cell, so they are wherever the house is without
 * anything having to be positioned twice — which at stop 6 is the front door.
 *
 * Offsets are the data. Uneven radii and staggered starts are what keep eight
 * dots from reading as a mechanism; the two sizes and the softer alternate tone
 * keep it from reading as confetti. They travel ~38px because they are thrown
 * from the centre of a 36px disc: anything shorter and the whole burst happens
 * behind the house.
 *
 * `delay` is measured from the house's arrival, not from the click: the marker
 * is still moving for 680ms (see `house-land` in globals.css), and dots thrown
 * before it lands are celebrating an empty stop.
 */
const ARRIVAL_MS = 660;

const SPARKS = [
  { x: 0, y: -38, size: 4, delay: 0, soft: false },
  { x: 29, y: -29, size: 3, delay: 60, soft: true },
  { x: 40, y: -3, size: 5, delay: 30, soft: false },
  { x: 27, y: 25, size: 3, delay: 120, soft: true },
  { x: -1, y: 36, size: 4, delay: 90, soft: false },
  { x: -28, y: 26, size: 3, delay: 150, soft: true },
  { x: -39, y: -2, size: 4, delay: 45, soft: false },
  { x: -27, y: -27, size: 3, delay: 105, soft: true },
] as const;

/**
 * The closing line's timing, as the two numbers the stagger is built from.
 *
 * The tick pops first (`cheer-badge`, 380ms in) and rings out behind it, and
 * only then do the words land — one at a time, 38ms apart, each overshooting
 * slightly on the same curve the house settles onto. Seven short beats, so the
 * sentence reads as said aloud rather than printed, and the last word arrives
 * at ~1.23s — just after the house reaches the front door, so the panel, the
 * road and the sentence all finish the journey on one beat instead of three.
 *
 * Nothing triggers it. The stop-6 panel goes `display:none` -> `block` when
 * its radio is checked, and animations on a subtree that was not being
 * rendered start from zero the moment it is — so the cheer plays once on
 * arrival, and never for a stop the reader is not on. See the `cheer-*` note
 * in globals.css for how `both` fill keeps that safe under reduced motion.
 */
const CHEER_WORD_START_MS = 480;
const CHEER_WORD_STAGGER_MS = 38;

/** Which detail plate is on show. */
const PANEL_STATES: readonly string[] = [
  "hidden group-has-[#journey-stop-1:checked]:block",
  "hidden group-has-[#journey-stop-2:checked]:block",
  "hidden group-has-[#journey-stop-3:checked]:block",
  "hidden group-has-[#journey-stop-4:checked]:block",
  "hidden group-has-[#journey-stop-5:checked]:block",
  "hidden group-has-[#journey-stop-6:checked]:block",
];

/**
 * The small screen's road, as one range shared by the fill and the marker.
 *
 * Desktop drives both from `--road-progress`, a value the reader sets. Mobile
 * has no such value, so scroll stands in for it — and the two must read the
 * same clock or the marker will sit off the end of its own road. Naming the
 * range once is what guarantees that.
 *
 * `cover 6%` to `cover 86%` rather than the full range: the marker reaches the
 * last phase while that phase is still on screen, instead of arriving as the
 * section leaves. See the `rail-fill` note in globals.css for how this behaves
 * where scroll-driven animations are not supported.
 */
const RAIL_SCROLL = "[animation-timeline:view()] [animation-range:cover_6%_cover_86%]";

/** See the `sign-settle` note in globals.css. One entrance for the whole road. */
const SETTLE =
  "animate-sign-settle [animation-timeline:view()] [animation-range:cover_0px_cover_280px]";

export function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      /* Cream, the same `--color-brand-light` the hero sits on — bookending
         the page in the brand's own warm tint rather than a neutral. The
         comparison section between them is white, so the hairline keeps that
         seam crisp instead of the two cream bands reading as one overlong one. */
      className="scroll-mt-20 border-t border-line bg-brand-light"
    >
      <Container className="py-16 lg:py-20">
        {/*
          Heading and deck as two columns of one grid rather than a centred
          stack. Centred, the title left a channel of empty cream down both
          sides of the section and no relationship at all to the road under it;
          set against the container's left edge it starts on the same line the
          road starts on, which is the alignment the eye actually uses. The deck
          drops to the far column and sits on the heading's last baseline, so
          the pair reads as one masthead over the journey instead of two
          stacked blocks. Below `lg` they stack, in that order.
        */}
        <div className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="journey-heading"
            eyebrow="The 25-day journey"
            title={JOURNEY.heading}
            /* Stated as a length, not in `ch`: this wrapper is set in the
               body sans, so a `ch` cap here would be measured against the
               wrong face — narrower than the display type it is meant to
               hold — and the title would break far shorter than intended.
               34rem is about four words a line at 2.875rem, which keeps the
               title a masthead of three lines rather than a column of six.
               `text-wrap: balance` (globals.css) picks the break points. */
            className="max-w-[30rem] lg:col-span-7 lg:max-w-[34rem]"
          />
          <p className="max-w-[38ch] text-base leading-relaxed text-secondary-text sm:text-lg lg:col-span-5 lg:pb-1.5">
            {JOURNEY.description}
          </p>
        </div>

        {/*
          Below `lg`, the journey is a read rather than a thing to operate.

          The signpost above is a wayfinding device: six signs held in one
          glance, a road that fills, a marker you move. All three depend on
          width. On a phone the signs stack into a column of slivers, the road
          becomes six short segments, and "all six at once" — the whole reason
          the control exists — is gone; what is left is a tap-to-reveal that
          hides five sixths of the section behind a gesture, on the one screen
          size where a reader is most likely to be skimming.

          So the small screen gets the other honest shape: every step open, in
          order, grouped under the phase it belongs to, on a plain rail. No
          state, no radios, nothing to discover — you scroll and you have read
          the journey. The phases are the source of truth here as they are up
          there, but the flattening in `STOPS` is skipped, because grouping is
          exactly what a vertical read wants: "Week 1" is written once with its
          two steps beneath it, rather than twice on two separate signs.

          Type is set a step down from the desktop panel (title 15px against
          22px, body 14px against 15px), which is what a card 320px wide can
          hold without every line breaking twice.

          It is a second tree rather than a reflow of the first because the two
          share no structure — one is a radio group with a single visible
          panel, the other is a static grouped list — and because the desktop
          road then cannot be disturbed by anything done here.
        */}
        <div className="mt-8 lg:hidden">
          {/* The rail lives on this wrapper rather than inside the list: an
              <ol> may only contain list items, and the road, its fill and the
              marker are none of them. `--rail-x` is the one number the four
              pieces are aligned from — rule, marker, phase glyphs, and the
              list's own indent all read it, so the column cannot come apart. */}
          <div className="relative pl-10 [--rail-x:0.875rem]">
            {/* The road ahead: the full run, so the journey's length is stated
                before it is travelled. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-[var(--rail-x)] w-px -translate-x-1/2 bg-line-strong"
            />

            {/* The road behind, revealed by clipping rather than by growing —
                the same technique the desktop road uses, so no layout is
                touched as it fills. Flat brand rather than the road gradient:
                see the --road-fill note in globals.css. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 left-[var(--rail-x)] w-px -translate-x-1/2 animate-rail-fill bg-brand",
                RAIL_SCROLL,
              )}
            />

            <ol className="flex flex-col gap-7">
              {JOURNEY_PHASES.map((phase) => (
                <li key={phase.label} className="relative">
                  {/* Pulled back out over the rail by the list's own indent,
                      then centred on it, so the glyph's centre and the rule's
                      centre are the same line at every width. */}
                  <PhaseMarkerIcon
                    className="absolute left-[calc(var(--rail-x)-2.5rem)] top-[0.15625rem] size-3.5 -translate-x-1/2 text-brand"
                  />
                  <h3 className="text-[0.875rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                    {phase.label}
                  </h3>

                  {/* One card per phase, its steps stacked inside — so a phase
                      with two steps reads as one week containing two things
                      rather than as two unrelated weeks. */}
                  <div className="mt-3 rounded-xl border border-line bg-background p-4">
                    {phase.steps.map((step, stepIndex) => {
                      const StopIcon = STOP_ICONS[step.icon];

                      return (
                        <div key={step.title} className={stepIndex > 0 ? "mt-5" : undefined}>
                          <div className="flex items-center gap-2.5">
                            <StopIcon aria-hidden="true" className="size-[1.0625rem] shrink-0 text-foreground" />
                            <h4 className="min-w-0 text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                              {step.title}
                            </h4>
                          </div>

                          <p className="mt-2 text-[0.875rem] leading-relaxed text-secondary-text">
                            {step.body}
                          </p>

                          {step.note ? (
                            <p className="mt-2 text-[0.875rem] leading-relaxed text-secondary-text">
                              {step.note}
                            </p>
                          ) : null}

                          {step.disclosure ? <StepDetail disclosure={step.disclosure} /> : null}

                          {/* The closing line, printed rather than spoken: on
                              this layout it is on screen from first paint, so
                              the desktop cheer would fire off-screen, to nobody,
                              long before the reader scrolled down to it. */}
                          {step.outcome ? (
                            <p className="mt-4 flex items-center gap-2.5 rounded-lg bg-brand-light px-3 py-2.5 text-[0.875rem] font-semibold leading-snug text-foreground">
                              <span
                                aria-hidden="true"
                                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground"
                              >
                                <CheckIcon className="size-3" />
                              </span>
                              {step.outcome}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>

            {/* The reader, on the road — last in the source so it passes over
                the phase glyphs rather than under them, exactly as the desktop
                marker passes over the nodes. The wrapper is stretched to the
                rail's full height and is the thing that travels; the disc only
                centres itself on the rule, so the two transforms never land on
                one element and fight. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 left-[var(--rail-x)] w-0 animate-rail-house",
                RAIL_SCROLL,
              )}
            >
              <span className="flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[var(--house-glow)] ring-4 ring-brand-light">
                <HouseMarkerIcon className="size-4" />
              </span>
            </span>
          </div>
        </div>

        {/*
          `min-w-0` is load-bearing, not tidying. Browsers give <fieldset> a UA
          `min-inline-size: min-content`, which Tailwind's preflight does not
          reset — so without it the fieldset refuses to shrink below the widest
          thing in it and the whole page overflows sideways.

          `--journey-row` is the height of one stop on the vertical road, and
          the single number the vertical geometry is built from: the rail's
          length, the road's end insets and the marker's travel distance are all
          stated in terms of it. Fixed rather than intrinsic on purpose — equal
          rows are what let the house move by whole multiples of one row with no
          measurement — and set generously enough for a two-line label under a
          two-line title at the narrowest width the vertical road is used at.
        */}
        <fieldset
          className={cn(
            "group mt-10 hidden min-w-0 [--journey-row:5.25rem] lg:mt-14 lg:block",
            SETTLE,
          )}
        >
          <legend className="sr-only">Choose a stage of the journey</legend>

          <div
            className={cn(
              "relative mb-8 md:mb-0 lg:mb-10",
              "[--road-progress:0%] [--house-step:0]",
              JOURNEY_PROGRESS,
            )}
          >
            {/* The road ahead of you: one continuous line the nodes sit on. */}
            <span aria-hidden="true" className={cn(ROAD_GEOMETRY, "bg-line-strong")} />

            {/*
              The road behind you. Same element geometry, brand gradient, and
              revealed by clipping rather than by growing: the box stays full
              size so the gradient keeps its proportions at every stop instead
              of being squeezed into whatever is currently shown, and no layout
              is touched to animate it. It runs a beat behind the sign, and a
              beat ahead of the house.
            */}
            <span
              aria-hidden="true"
              className={cn(
                ROAD_GEOMETRY,
                "bg-[image:var(--road-fill-v)] [clip-path:inset(0_0_calc(100%_-_var(--road-progress))_0)] transition-[clip-path] duration-[620ms] ease-[var(--ease-journey)] [transition-delay:60ms] lg:bg-[image:var(--road-fill-h)] lg:[clip-path:inset(0_calc(100%_-_var(--road-progress))_0_0)]",
              )}
            />

            <ol className="flex flex-col lg:grid lg:grid-cols-6">
              {STOPS.map(({ step, label, number }) => (
                <li
                  key={step.title}
                  className={cn(
                    /* `relative` is required, not cosmetic: `sr-only` makes the
                       radio `position:absolute`, and it has to be positioned
                       against its own sign. */
                    "relative flex h-[var(--journey-row)] min-w-0 items-center lg:h-auto lg:flex-col lg:items-stretch lg:px-1.5",
                    SIGN_REST,
                    SIGN_PASSED,
                    SIGN_SELECTED,
                    SIGN_FOCUS,
                  )}
                >
                  {/*
                    The radio lives inside the sign it controls. Clicking a
                    label focuses its control and a browser scrolls a newly
                    focused element into view, so keying through the group walks
                    the page along the road with you — with no JavaScript
                    involved, and no scroll position ever overriding the choice
                    the reader made.
                  */}
                  <input
                    type="radio"
                    id={stopId(number)}
                    name="journey-stop"
                    defaultChecked={number === 1}
                    className="sr-only"
                  />

                  {/* Sign first when the road is horizontal, last when it is
                      vertical: on a rail the marker has to come before the
                      thing it points at. */}
                  <label
                    htmlFor={stopId(number)}
                    className="order-3 flex min-w-0 flex-1 cursor-pointer flex-col [filter:var(--sign-depth)] [transform:rotate(var(--sign-tilt))] [transform-origin:0_100%] transition-[transform,filter] duration-300 ease-out hover:[--sign-depth:var(--sign-shadow-lifted)] hover:[--sign-tilt:0deg] lg:order-1"
                  >
                    {/* Plate edge: the hairline is this layer showing through
                        the pad of the face on top of it. */}
                    <span className="flex flex-1 bg-[var(--sign-edge)] p-[var(--sign-edge-w)] transition-colors duration-300 ease-out [clip-path:var(--sign-point-sm)]">
                      <span className="flex flex-1 flex-col justify-center bg-[var(--sign-face)] py-2.5 pl-3.5 pr-6 transition-colors duration-300 ease-out [clip-path:var(--sign-point-sm)] lg:justify-start lg:pb-3.5 lg:pt-3">
                        <span
                          aria-hidden="true"
                          className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[var(--sign-num)] transition-colors duration-300 ease-out"
                        >
                          {number.toString().padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[0.75rem] font-semibold leading-snug text-[var(--sign-label)] transition-colors duration-300 ease-out">
                          {label}
                        </span>
                        <span className="mt-0.5 text-[0.875rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </label>

                  {/* Post from the sign to the road: across it on the rail,
                      down to it on the row. */}
                  <span
                    aria-hidden="true"
                    className="order-2 h-px w-3 shrink-0 bg-[var(--sign-post)] transition-colors duration-300 ease-out lg:mx-auto lg:h-4 lg:w-0.5"
                  />

                  {/* The node this stop stands on. */}
                  <span
                    aria-hidden="true"
                    className="relative order-1 flex w-10 shrink-0 items-center justify-center lg:order-3 lg:h-3 lg:w-auto"
                  >
                    {/* The destination, promised from the start: the one node
                        with a threshold drawn round it, which the house lands
                        squarely on top of when the journey completes. */}
                    {number === STOPS.length ? (
                      <span className="absolute size-6 rounded-full border border-dashed border-brand-line" />
                    ) : null}
                    <span className="relative size-3 rounded-full border-2 border-[var(--sign-node-edge)] bg-[var(--sign-node)] transition-colors duration-300 ease-out" />
                  </span>
                </li>
              ))}
            </ol>

            {/* The reader, on the road. Last in the source so it passes over
                the nodes rather than under them. */}
            <span aria-hidden="true" className={HOUSE_TRAVEL}>
              <span className="relative flex size-7 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[var(--house-glow)] ring-4 ring-brand-light group-has-[#journey-stop-6:checked]:animate-house-land">
                <HouseMarkerIcon className="size-4" />
              </span>

              {SPARKS.map((spark) => (
                <span
                  key={`${spark.x}:${spark.y}`}
                  style={
                    {
                      "--spark-x": `${spark.x}px`,
                      "--spark-y": `${spark.y}px`,
                      width: spark.size,
                      height: spark.size,
                      marginLeft: -spark.size / 2,
                      marginTop: -spark.size / 2,
                      animationDelay: `${ARRIVAL_MS + spark.delay}ms`,
                    } as CSSProperties
                  }
                  className={cn(
                    "absolute left-1/2 top-1/2 rounded-full opacity-0 group-has-[#journey-stop-6:checked]:animate-spark",
                    spark.soft ? "bg-brand-line" : "bg-brand",
                  )}
                />
              ))}
            </span>
          </div>

          {/* Detail for the stop you are on. Deliberately no `min-height`: the
              panels measure 156-352px depending on stop and width, so any
              reservation big enough for the Peace of Mind stop leaves a band of
              empty ground under the other four. The panel sizes to its content
              and the page reflows under a click the reader just made. */}
          <div className="min-w-0">
            {STOPS.map(({ step, label }, index) => {
              const StopIcon = STOP_ICONS[step.icon];

              return (
                <div key={step.title} className={cn("animate-panel-in", PANEL_STATES[index])}>
                  <div className="bg-line-strong p-px [filter:var(--sign-shadow)] [clip-path:var(--sign-point)]">
                    <div className="bg-background [clip-path:var(--sign-point)]">
                      {/* One column while the plate is narrow, two once it
                          runs the full width of the container: the stop's name
                          against the left edge and what happens at it in the
                          facing column, which is how a signboard is read. Set
                          in one column the body would be a 64-character ribbon
                          with half a metre of empty plate beside it. */}
                      <div className="p-5 pr-10 sm:p-6 sm:pr-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:p-7 lg:pr-16">
                        <div className="flex gap-4 sm:gap-5 lg:col-span-5">
                          <span
                            aria-hidden="true"
                            className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand sm:flex"
                          >
                            <StopIcon className="size-5" />
                          </span>

                          <div className="min-w-0">
                            <p className="text-[0.8125rem] font-semibold leading-snug tracking-[0.01em] text-brand">
                              {label}
                            </p>
                            <h3 className="mt-1 font-display text-[1.375rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[1.5rem]">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <div className="mt-3 min-w-0 lg:col-span-7 lg:mt-0">
                          <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-secondary-text">
                            {step.body}
                          </p>

                          {step.note ? (
                            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] font-semibold text-weak">
                              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand " />
                              {step.note}
                            </p>
                          ) : null}

                          {step.disclosure ? <StepDetail disclosure={step.disclosure} /> : null}
                        </div>
                      </div>

                      {/* The one line Propsoch closes the journey on. Full
                          bleed, so the chevron mitres it and the last plate
                          reads as one piece of material; the tick is the same
                          arrival the house and the filled road are reporting,
                          said once more where the sentence is. */}
                      {step.outcome ? (
                        <p className="flex items-center gap-3 border-t border-brand-line bg-brand-light px-5 py-4 pr-10 font-display text-[1.0625rem] leading-snug tracking-[-0.01em] text-foreground sm:px-6 sm:pr-12">
                          <span
                            aria-hidden="true"
                            className="relative flex size-6 shrink-0 animate-cheer-badge items-center justify-center rounded-full bg-brand text-brand-foreground"
                          >
                            <CheckIcon className="size-3.5" />
                            {/* The ring, thrown off the tick. It starts inside
                                the badge's own edge, in the badge's own hue, so
                                the beat it waits out before firing is drawn on
                                brand-over-brand and cannot be seen — it only
                                appears once it clears the disc. */}
                            <span className="absolute inset-0 animate-cheer-ring rounded-full border border-brand" />
                          </span>

                          {/* Split on spaces so each word can carry its own
                              delay; the separators are kept as real spaces
                              between inline-blocks, rather than as a flex gap,
                              so the sentence still wraps and copies as one
                              sentence. The words stay in source order, so this
                              is unchanged to a screen reader. */}
                          <span className="min-w-0">
                            {step.outcome.split(" ").map((word, wordIndex) => (
                              <Fragment key={`${word}-${wordIndex}`}>
                                {wordIndex > 0 ? " " : null}
                                <span
                                  className="inline-block animate-cheer-word"
                                  style={{
                                    animationDelay: `${CHEER_WORD_START_MS + wordIndex * CHEER_WORD_STAGGER_MS}ms`,
                                  }}
                                >
                                  {word}
                                </span>
                              </Fragment>
                            ))}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-background lg:mt-16">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[17rem]">
              <Image
                src={homeImage}
                alt="Warm, plant-filled living room of a finished apartment, with a sofa, coffee table and bookshelves"
                fill
                loading="lazy"
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 bg-brand-light p-6 sm:p-10">
              <p className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[2rem]">
                {PROOF.outcome}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={PRIMARY_CTA.href}
                  className={buttonStyles({ className: "w-full sm:w-auto" })}
                >
                  {PRIMARY_CTA.label}
                  <ArrowRightIcon className="size-5" />
                </Link>
                <p className="text-[0.875rem] text-secondary-text">{PRIMARY_CTA.assurance}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
