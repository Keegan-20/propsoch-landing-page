import Image from "next/image";
import type { ReactNode } from "react";

import heroImage from "@/assets/images/hero-property-dusk.webp";
import { LensAutoplay } from "@/components/sections/LensAutoplay";
import { CheckIcon, ReportIcon } from "@/components/ui/icons";
import { HERO_ANALYSIS, HERO_LENSES } from "@/content/hero";
import { cn } from "@/lib/cn";

/**
 * The hero visual: a property, and Propsoch reading it.
 *
 * The point of the composition is the distinction the product turns on — a
 * portal *shows* you a home, Propsoch *understands* it. So the photograph is
 * never shown plain. Choosing a lens draws that analysis onto the building:
 * the sun's path and where the light actually lands, the air that does or does
 * not cross the plan, the footprint against the area you can use, the site in
 * its surroundings. Same property, four readings — which is the argument.
 *
 * No JavaScript. The lens chooser is a real radio group driven through `:has()`
 * on the fieldset, the same pattern the comparison section uses: arrow keys
 * work, it is announced as "1 of 4", and it works before hydration. Tailwind
 * only sees class names it can read literally, so the variants are written out
 * per lens rather than generated from the id.
 */
const LENS_STYLES = [
  {
    tab: "group-has-[#lens-sunlight:checked]:border-brand group-has-[#lens-sunlight:checked]:bg-background group-has-[#lens-sunlight:checked]:text-foreground group-has-[#lens-sunlight:focus-visible]:outline group-has-[#lens-sunlight:focus-visible]:outline-2 group-has-[#lens-sunlight:focus-visible]:-outline-offset-2 group-has-[#lens-sunlight:focus-visible]:outline-foreground",
    panel: "hidden group-has-[#lens-sunlight:checked]:block",
  },
  {
    tab: "group-has-[#lens-ventilation:checked]:border-brand group-has-[#lens-ventilation:checked]:bg-background group-has-[#lens-ventilation:checked]:text-foreground group-has-[#lens-ventilation:focus-visible]:outline group-has-[#lens-ventilation:focus-visible]:outline-2 group-has-[#lens-ventilation:focus-visible]:-outline-offset-2 group-has-[#lens-ventilation:focus-visible]:outline-foreground",
    panel: "hidden group-has-[#lens-ventilation:checked]:block",
  },
  {
    tab: "group-has-[#lens-layout:checked]:border-brand group-has-[#lens-layout:checked]:bg-background group-has-[#lens-layout:checked]:text-foreground group-has-[#lens-layout:focus-visible]:outline group-has-[#lens-layout:focus-visible]:outline-2 group-has-[#lens-layout:focus-visible]:-outline-offset-2 group-has-[#lens-layout:focus-visible]:outline-foreground",
    panel: "hidden group-has-[#lens-layout:checked]:block",
  },
  {
    tab: "group-has-[#lens-locality:checked]:border-brand group-has-[#lens-locality:checked]:bg-background group-has-[#lens-locality:checked]:text-foreground group-has-[#lens-locality:focus-visible]:outline group-has-[#lens-locality:focus-visible]:outline-2 group-has-[#lens-locality:focus-visible]:-outline-offset-2 group-has-[#lens-locality:focus-visible]:outline-foreground",
    panel: "hidden group-has-[#lens-locality:checked]:block",
  },
] as const;

/**
 * Overlay geometry is traced against this photograph in a 400×300 space that
 * matches the image's 4:3 crop, so the lines sit on real features: the upper
 * volume, the glazed pavilion, the left wing and the lawn. The aspect ratio is
 * therefore fixed at every breakpoint — the drawing is registered to the photo.
 *
 * `pathLength={1}` normalises every path so one dash offset draws any of them.
 */
const DRAW = "animate-analysis-draw [stroke-dasharray:1]";

function Overlay({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 size-full"
    >
      {children}
    </svg>
  );
}

/**
 * Sun path across the plot, the light it throws onto the glazed pavilion, and
 * the patch of floor that actually receives it.
 */
function SunlightOverlay() {
  return (
    <Overlay>
      <path
        d="M18 138Q205 30 394 104"
        pathLength={1}
        strokeWidth={1.25}
        className={cn("stroke-brand/65", DRAW)}
      />
      <circle cx="330" cy="84" r="4.5" className="animate-analysis-fade fill-brand [animation-delay:280ms]" />
      <circle
        cx="330"
        cy="84"
        r="10"
        strokeWidth={1}
        className="animate-analysis-fade stroke-brand/55 [animation-delay:340ms]"
      />
      {/* Parallel, because the source is 150 million km away — not a starburst. */}
      {["M296 92L271 152", "M330 92L305 152", "M364 100L339 160"].map((d, index) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          strokeWidth={1.25}
          style={{ animationDelay: `${200 + index * 90}ms` }}
          className={cn("stroke-brand/85", DRAW)}
        />
      ))}
      <path
        d="M244 258L276 238L340 244L306 264Z"
        strokeWidth={1}
        className="animate-analysis-fade fill-brand/25 stroke-brand/75 [animation-delay:520ms]"
      />
    </Overlay>
  );
}

/** The two paths air takes through the plan, and the openings it leaves by. */
function VentilationOverlay() {
  return (
    <Overlay>
      <path
        d="M88 252C176 214 264 262 380 212"
        pathLength={1}
        strokeWidth={1.5}
        className={cn("stroke-white/85", DRAW)}
      />
      <path
        d="M381 204l9 7l-9 8"
        pathLength={1}
        strokeWidth={1.5}
        style={{ animationDelay: "440ms" }}
        className={cn("stroke-brand", DRAW)}
      />
      <path
        d="M60 158C122 120 198 168 268 138"
        pathLength={1}
        strokeWidth={1.5}
        style={{ animationDelay: "160ms" }}
        className={cn("stroke-white/85", DRAW)}
      />
      <path
        d="M269 130l9 7l-9 8"
        pathLength={1}
        strokeWidth={1.5}
        style={{ animationDelay: "560ms" }}
        className={cn("stroke-brand", DRAW)}
      />
    </Overlay>
  );
}

/** The built massing traced against the floor area you can actually stand on. */
function LayoutOverlay() {
  return (
    <Overlay>
      <path
        d="M228 264L250 240L366 240L380 264Z"
        strokeWidth={1}
        className="animate-analysis-fade fill-brand/20 stroke-brand/60 [animation-delay:400ms]"
      />
      <path
        d="M4 272L4 196L132 196L132 186L256 186L256 152L396 152L396 272"
        pathLength={1}
        strokeWidth={1.5}
        className={cn("stroke-brand/90", DRAW)}
      />
      <path
        d="M88 178L88 92L272 134L272 152"
        pathLength={1}
        strokeWidth={1.5}
        style={{ animationDelay: "220ms" }}
        className={cn("stroke-brand/90", DRAW)}
      />
      <path
        d="M228 281v9M228 286h152M380 281v9"
        pathLength={1}
        strokeWidth={1.25}
        style={{ animationDelay: "460ms" }}
        className={cn("stroke-white/80", DRAW)}
      />
    </Overlay>
  );
}

/** The site read outward from the front door, by distance. */
function LocalityOverlay() {
  return (
    <Overlay>
      <ellipse
        cx="200"
        cy="282"
        rx="120"
        ry="16"
        strokeWidth={1.25}
        strokeDasharray="4 5"
        className="animate-analysis-fade stroke-white/75 [animation-delay:140ms]"
      />
      <ellipse
        cx="200"
        cy="282"
        rx="190"
        ry="28"
        strokeWidth={1.25}
        strokeDasharray="4 5"
        className="animate-analysis-fade stroke-white/50 [animation-delay:260ms]"
      />
      <path
        d="M310 148c-7-11-11-15-11-21a11 11 0 1 1 22 0c0 6-4 10-11 21Z"
        className="animate-analysis-fade fill-brand [animation-delay:60ms]"
      />
      <circle cx="310" cy="126" r="3.75" className="animate-analysis-fade fill-white [animation-delay:60ms]" />
      {/* Left node was clear of the single chip; two stacked chips now cover
          that corner (x0-134, y242-289 in this 400x300 space), so it moves
          right along the same ellipse arc rather than sitting behind them. */}
      {[
        { cx: 150, cy: 268 },
        { cx: 340, cy: 263 },
      ].map((node, index) => (
        <g key={node.cx} style={{ animationDelay: `${380 + index * 110}ms` }} className="animate-analysis-fade">
          <circle cx={node.cx} cy={node.cy} r="3.5" className="fill-white/90" />
          <path d={`M${node.cx} ${node.cy - 4}v-9`} strokeWidth={1.25} className="stroke-white/60" />
        </g>
      ))}
    </Overlay>
  );
}

const OVERLAYS = [SunlightOverlay, VentilationOverlay, LayoutOverlay, LocalityOverlay] as const;

export function HeroVisual({ className }: { className?: string }) {
  return (
    <fieldset
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-background shadow-[0_1px_2px_rgba(10,10,10,0.04),0_12px_32px_-12px_rgba(10,10,10,0.14)]",
        className,
      )}
    >
      <legend className="sr-only">{HERO_ANALYSIS.legend}</legend>

      {HERO_LENSES.map((lens, index) => (
        <input
          key={lens.id}
          type="radio"
          id={`lens-${lens.id}`}
          name="hero-lens"
          defaultChecked={index === 0}
          className="sr-only"
        />
      ))}

      <LensAutoplay />

      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
        {/* A document glyph, not a dot: this is the report's title bar, and the
            mark should say "report". Deliberately static — the live chip below
            already carries the card's one piece of ambient motion, and two
            pulsing brand dots in one card compete instead of communicating. */}
        <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-foreground">
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-light text-brand"
          >
            <ReportIcon className="size-4" />
          </span>
          {HERO_ANALYSIS.reportLabel}
        </p>
        <p className="shrink-0 rounded-full border border-line-strong px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-secondary-text">
          {HERO_ANALYSIS.sampleTag}
        </p>
      </div>

      <div className="relative aspect-[4/3] bg-surface">
        <Image
          src={heroImage}
          alt="A modern two-storey home at dusk: a dark timber upper volume above a fully glazed, lit living pavilion, seen from the lawn."
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, (min-width: 640px) 90vw, 100vw"
          className="object-cover"
        />
        {/* Seats the drawn lines against the photograph and gives the chip a ground. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-foreground/10"
        />

        {OVERLAYS.map((LensOverlay, index) => (
          <div key={HERO_LENSES[index].id} className={cn("absolute inset-0", LENS_STYLES[index].panel)}>
            <LensOverlay />
          </div>
        ))}

        <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1.5 sm:bottom-4 sm:left-4">
          <p className="flex items-center gap-2 rounded-full bg-background/95 px-3 py-1.5 text-[0.8125rem] font-medium text-foreground shadow-[0_1px_2px_rgba(10,10,10,0.12)]">
            {/* Live indicator: solid dot, plus a ring pinging outward behind it.
                The ping stays inside the chip's padding, so nothing bleeds. */}
            <span aria-hidden="true" className="relative flex size-1.5 shrink-0">
              <span className="absolute inset-0 animate-live-ping rounded-full bg-brand" />
              <span className="relative size-1.5 animate-live-dot rounded-full bg-brand" />
            </span>
            {HERO_ANALYSIS.dataPoints}
          </p>
          <p className="flex items-center gap-2 rounded-full bg-background/95 px-3 py-1.5 text-[0.8125rem] font-medium text-foreground shadow-[0_1px_2px_rgba(10,10,10,0.12)]">
            <CheckIcon className="size-3.5 shrink-0 text-brand" />
            {HERO_ANALYSIS.verifiedBy}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-line bg-surface sm:grid-cols-4">
        {HERO_LENSES.map((lens, index) => (
          <label
            key={lens.id}
            htmlFor={`lens-${lens.id}`}
            className={cn(
              "flex min-h-11 cursor-pointer items-center justify-center border-b-2 border-transparent px-2 text-center text-[0.875rem] font-medium text-weak transition-colors duration-150 hover:bg-line/50 hover:text-foreground",
              LENS_STYLES[index].tab,
            )}
          >
            {lens.label}
          </label>
        ))}
      </div>

      <div className="px-4 py-3 sm:px-5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
          {HERO_ANALYSIS.findingLabel}
        </p>
        {/* Min-height holds the tallest reading so switching lenses shifts nothing. */}
        <div className="mt-1 min-h-[4.5rem] sm:min-h-[3.25rem]">
          {HERO_LENSES.map((lens, index) => (
            <p
              key={lens.id}
              className={cn(
                "text-[0.9375rem] leading-relaxed text-weak",
                LENS_STYLES[index].panel,
              )}
            >
              {lens.finding}
            </p>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
