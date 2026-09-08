# Propsoch — landing page redesign

A redesign of three sections of [propsoch.com](https://www.propsoch.com/): a rebuilt hero,
plus "How are we different?" and "Here's how you will find a home with us in 25 days"
re-presented without changing a word of their content.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · zero runtime dependencies
beyond React and Next.

> **On Vite:** the brief asked for a Vite project *and* for the App Router, `next/image`,
> Server Components and SSR. Those are mutually exclusive — Vite's React template is a
> client-rendered SPA. This is built on Next.js, which is what the rest of the
> requirements describe.

## Structure

```
src/
├── app/                  layout · page · start/ · robots · sitemap · globals.css
├── components/
│   ├── layout/           Navbar (the only client component) · Footer
│   ├── sections/         Hero · DifferenceSection · JourneySection
│   └── ui/               Container · Button · SectionHeading · Wordmark · icons
├── content/              site · hero · difference · journey
├── lib/                  cn
└── types/                content contracts
```

Content is fully separated from presentation. The "don't change the content" requirement
is verifiable by reading `src/content/difference.ts` and `src/content/journey.ts` — every
string there is reproduced verbatim from the live site, comments included.

## What changed, and why

### Hero — redesigned

The original leads with the problem ("Blindly trusting a broker's Sales Pitch? Fake
Claims? Half Info?") and ends on **Get Started**. A first-time visitor learns what is
wrong with brokers, but not what Propsoch is or what clicking will do.

- **H1 carries the value proposition** — *"Buy your home on facts, not a broker's sales
  pitch."* The original antagonist survives as the contrast rather than the whole message.
- **Subheadline is their line, verbatim.**
- **CTA names the outcome**: "Book my free advisor call", with
  *"15-minute call · No spam, no sales pressure"* underneath — pre-answering the
  objection their own comparison table raises. The arrow nudges right on hover.
- **CTA hierarchy**: one filled primary, one outlined secondary ("See how we compare"),
  then trust signals. Never two competing buttons.
- **The city choice** (part of their real funnel) became a micro-commitment inside the
  CTA form instead of a dropdown blocking the button.
- **The CTA leads somewhere.** `/start` is server-rendered from the chosen city and
  states what happens next, so "what do I get if I click" is answered by the product.

#### The visual: a property, and Propsoch reading it

The hero used to be a stock living room sitting next to the text. It has been replaced
by the argument the business actually turns on — *a portal shows you a home; Propsoch
understands it* — so the photograph is never shown plain.

- The card is a sample of **their own deliverable**, the "Peace of Mind Report" named in
  their comparison table, and is labelled `Illustrative` so it cannot be read as a real
  listing.
- Choosing a lens **draws that analysis onto the building**: the sun's path and the patch
  of floor it reaches, the air that does or does not cross the plan, the built massing
  against the floor area you can use, and the site read outward by distance. Same
  property, four readings.
- Overlay geometry is traced against this photograph in a 400×300 space matching its 4:3
  crop, so the lines land on real features — the upper volume, the glazed pavilion, the
  lawn. The photo's aspect ratio is therefore fixed at every breakpoint.
- The two figures on the card — **80+ data points**, **Verified by architects** — are
  verbatim rows from their own "Online portals" comparison. Every *finding* is phrased as
  the question the analysis settles, never as a result for the property shown, so no
  score, rating or measurement is invented.
- **No JavaScript.** The lens chooser is a real radio group driven through `:has()`, the
  same pattern the comparison section uses: arrow keys work, it is announced as "1 of 4",
  and it works before — or without — hydration.

Motion is two primitives, both CSS: a staggered entrance, and a `pathLength`-normalised
line-drawing reveal that runs when a lens is chosen. Entrances use `backwards` fill, so
nothing depends on an animation running to become visible, and `prefers-reduced-motion`
zeroes delays as well as durations.

### "How are we different?" — presentation only

Both datasets are included, including the *Online portals* comparison, which the live
site only renders after the tab is switched.

- Propsoch's column is lifted onto a white card with a brand rule so the answer is
  findable before reading.
- ✓ / ✕ **shapes** carry the verdict — never colour alone.
- Desktop is a real `<table>` (`<th scope>`, sr-only `<caption>`); below `md` it stops
  being a table and becomes one card per criterion built on `<dl>`, because a
  three-column table is unreadable at 320px.
- Tab switching uses **no JavaScript**: two visually-hidden radios in a `<fieldset>`
  whose legend is their own line, "Compare our services with", with `:has()` driving the
  panels. Real radio-group semantics, and it works before hydration.

### "…in 25 days" — presentation only

- Phases and steps are `<ol>`s, so the sequence lives in the markup.
- One continuous rail with numbered nodes (1–6) answers "how many steps are left".
- On desktop the phase labels move to a left column and read as a time axis.
- The two trailing lines in their data (*"Along with loan assistance"*,
  *"Congratulations! you found your home sweet home!"*) get distinct typographic roles
  instead of reading as more body copy.
- **The Peace of Mind report is interactive.** The step names the report but never
  says what is in it, which is the obvious question at that point in the journey. A
  `<details>` disclosure on the Deepdiving step expands to the report's contents —
  `80+ critical data points` and the five coverage lines — using Propsoch's own copy
  from their Peace of Mind service section. It is collapsed by default, so the step
  reads exactly as it does today at rest.
- Their scroll-linked progress line was dropped: client JS and motion for decoration.

The disclosure is the one piece of motion on the page, and it earns it: it shows state
change, not decoration. It is `<details>`/`<summary>`, so it is keyboard accessible,
announced as a disclosure, findable by in-page search, and needs **no JavaScript** —
the expand is animated in CSS via `::details-content` + `interpolate-size`, and browsers
without those simply open instantly. Measured at ~260ms easing to its natural height;
`prefers-reduced-motion` collapses it to an instant open.

## Performance

- Server Components throughout; the only client component is the mobile nav disclosure.
  The hero and comparison ship **zero** client JS.
- Static image imports → intrinsic dimensions and a generated blur placeholder, so
  there is no layout shift. The hero image uses `preload` (`priority` is deprecated as of
  Next.js 16); the journey image is lazy.
- Sources pre-resized and encoded to WebP (149 KB / 73 KB) with AVIF/WebP negotiation
  on top via `next/image`.
- Two variable fonts self-hosted through `next/font` — no third-party stylesheet.
- No icon, animation, or class-merging library.

## Accessibility

- One `<h1>`, no heading-level skips, landmarks and a skip link.
- **Contrast is a known, deliberate gap.** CTAs use the brand `--primary` `#ff6d33`
  with their `--states-foreground` `#fafafa` label, exactly as propsoch.com renders its
  own CTAs — which measures 2.8:1 and does not meet AA for normal text. Brand fidelity
  was chosen over contrast here; tuning is deferred. Everything else clears AA: body
  copy uses `--secondary-text` `#66677e` (5.52:1) and headings `--foreground` `#0a0a0a`
  (19.8:1).
- Every interactive target is ≥24px (nav) or ≥44px (buttons); visible focus ring
  throughout; `prefers-reduced-motion` respected.
- Verified in-browser: no horizontal overflow at 320/390/430/768/1024/1440.

## SEO

Title and meta description, canonical, Open Graph and Twitter cards, `RealEstateAgent`
JSON-LD, `robots.ts` and `sitemap.ts`. `/start` is `noindex`.

## Colour

All colour values come from propsoch.com's own stylesheet — the semantic `:root` block
(`--background` `#fff`, `--foreground` `#0a0a0a`, `--primary` `#ff6d33`, `--border`
`#3b3b3b`) plus the coolgrey and orange scales those are built from. Where a role needed
a value that the semantic block does not name — surfaces, hairlines, secondary text —
it was taken from their existing scale (`coolgrey-10` `#f2f3f7`, `coolgrey-20` `#e6e8f0`,
`--secondary-text` `#66677e`) rather than invented. See `src/app/globals.css`, where
every token is annotated with the Propsoch token it came from.

The footer uses `--foreground` `#0a0a0a`, matching the live site's `bg-foreground`
footer, with `--border` `#3b3b3b` for its hairlines — which is what that token is for.

## Image credits

Photographs from [Unsplash](https://unsplash.com), resized and re-encoded locally to
WebP; see `src/assets/images/`.
