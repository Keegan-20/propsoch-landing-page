import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  HomeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PropsochMarkIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import {
  BRAND,
  FOOTER_COLUMNS,
  FOOTER_HOME,
  LEGAL_LINKS,
  REGISTRATIONS,
  SOCIAL_LINKS,
} from "@/content/site";
import { cn } from "@/lib/cn";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  email: MailIcon,
} as const;

/**
 * Geometry for the oversized wordmark, shared verbatim by the resting word and
 * the lit copy that sweeps over it. One constant rather than two class lists:
 * the two are stacked on top of each other and have to agree on every metric,
 * so there is nowhere for them to be edited apart.
 *
 * Sized in `cqw` against the footer's own content box, so the word spans the
 * column grid at every width instead of tracking the viewport and running past
 * the gutter on a wide screen. Set in the page's display face — the same one
 * the hero headline uses — because at this size it is a graphic, not a label.
 */
const GIANT_WORDMARK = cn(
  "block whitespace-nowrap bg-clip-text font-hero text-[24.8cqw] font-bold",
  "-mt-[0.2em] leading-none tracking-[-0.04em] text-transparent",
  // `background-clip: text` paints no further than the element's own box, so a
  // box narrower than the glyph run drops the tail of the word to transparent —
  // the final `h` simply vanishes. `w-max` makes the box *be* the glyph run, so
  // it holds whatever the text measures; a percentage of the column grid cannot,
  // because it is a guess about font metrics that a fallback face invalidates.
  // The padding covers glyph overhang, which sits outside the advance width.
  // `self-start` keeps the box at its own line-box height: the wrappers are
  // flex containers now, and a stretched item would take the clipped 0.63em
  // height instead, re-scaling the vertical gradient that fills the letters.
  "w-max self-start px-[0.06em]",
);

export function Footer() {
  return (
    <footer className="overflow-hidden bg-foreground text-line-strong">
      <Container>
        <nav aria-label="Breadcrumb" className="border-b border-border-dark pt-11 pb-7">
          <Link
            href={FOOTER_HOME.href}
            className="inline-flex items-center gap-2 text-[0.9375rem] text-brand transition-opacity hover:opacity-80"
          >
            <HomeIcon className="h-4.25 w-4.25" />
            {FOOTER_HOME.label}
          </Link>
        </nav>

        <div className="grid gap-x-8 gap-y-12 pt-9 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2.5 text-white">
              <PropsochMarkIcon className="h-7 w-7" />
              <Wordmark tone="mono" className="text-[1.5rem]" />
            </div>

            <p className="max-w-[36ch] text-[0.9375rem] leading-[1.6]">{BRAND.tagline}</p>

            <ul className="flex flex-wrap items-center gap-3.5">
              {SOCIAL_LINKS.map((social) => {
                const Glyph = SOCIAL_ICONS[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-white transition-colors hover:bg-white/[0.14]"
                    >
                      <Glyph className="h-4.5 w-4.5" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="text-[0.75rem] leading-[1.8] text-muted">
              <p>{BRAND.legalName}</p>
              <dl>
                {REGISTRATIONS.map((item) => (
                  <div key={item.label}>
                    <dt className="inline">{item.label} </dt>
                    <dd className="inline wrap-break-word">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.875rem] font-semibold uppercase tracking-[0.04em] text-white">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-[0.9375rem] leading-snug transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        
        <div className="@container mt-15 grid grid-cols-[minmax(0,1fr)] border-t border-border-dark">
          <div
            aria-hidden
            className="pointer-events-none relative col-start-1 row-start-1 flex h-[0.63em] select-none justify-center overflow-y-clip text-[24.8cqw]"
          >
            <span
              className={cn(GIANT_WORDMARK, "[background-image:var(--footer-wordmark-fill)]")}
            >
              {BRAND.name}
            </span>

            {/*
             * The shine. The band is a static mask on this full-width layer,
             * which travels; the copy of the word inside runs the same curve
             * backwards, so the letters stay put while the light crosses them.
             * Both animate `transform` and nothing else.
             */}
            <span className="absolute inset-0 block animate-shine-band mask-(--footer-shine-band) mask-no-repeat motion-reduce:hidden">
              <span className="flex animate-shine-anchor justify-center">
                <span
                  className={cn(
                    GIANT_WORDMARK,
                    "[background-image:var(--footer-wordmark-shine)]",
                  )}
                >
                  {BRAND.name}
                </span>
              </span>
            </span>
          </div>

          <div className="col-start-1 row-start-1 flex flex-col gap-3 self-start pt-8 text-[0.875rem] sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-8">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-muted">
              © Copyright {BRAND.legalName.replace("Private Limited", "Pvt. Ltd.")} 2020
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
