import Link from "next/link";

import { HeroSkyline } from "@/components/sections/HeroSkyline";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { buttonStyles, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { HERO, HERO_STATS } from "@/content/hero";
import { CITIES, PRIMARY_CTA, PROOF, SECONDARY_CTA } from "@/content/site";

/**
 * Two columns that argue the same point from opposite ends. The left says what
 * Propsoch does; the right shows it happening to a building. Weighted 46/54 so
 * the visual carries enough presence to answer the headline rather than
 * decorate it.
 *
 * Motion is two things only: a staggered entrance, and the analysis drawing
 * itself when a lens is chosen (see HeroVisual). Both are CSS — the section
 * still ships no client JavaScript.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line bg-brand-light">
      <div className="relative">
        <HeroSkyline />
        <Container className="relative pb-24 pt-8 sm:pt-10 lg:pb-20 lg:pt-10">
          <div className="grid items-center gap-11 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-14">
            <div className="max-w-160 lg:max-w-none">
              <h1
                id="hero-heading"
                className="-ml-0.5 animate-hero-rise font-hero text-[2.375rem] font-bold leading-[1.1] tracking-[-0.022em] text-foreground sm:text-[2.75rem] lg:text-[2.75rem] xl:-ml-0.75 xl:text-[3.375rem]"
              >
                {HERO.headline.lead}{" "}
                {/*
                  The emphasis is annotated rather than underlined: a single
                  drawn stroke that lands with a flick, using the same
                  pathLength-normalised reveal the property overlay uses. The
                  headline gets marked up the way the building does — which is
                  the whole argument of the section. Sized in `em` so the mark
                  tracks the type at every breakpoint.
                */}
                <span className="relative inline-block">
                  {HERO.headline.emphasis}
                  <svg
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                    className="absolute -bottom-[0.07em] left-0 h-[0.19em] w-full overflow-visible"
                  >
                    <path
                      d="M-2 8.6C24 4.6 58 3.9 84 5.6L103 2.4"
                      pathLength={1}
                      strokeWidth={5.5}
                      strokeLinecap="round"
                      className="animate-analysis-draw stroke-brand [animation-delay:820ms] [stroke-dasharray:1]"
                    />
                  </svg>
                </span>
                {HERO.headline.trail}
              </h1>

              <p className="mt-5 max-w-[46ch] animate-hero-rise text-lg leading-relaxed text-secondary-text [animation-delay:120ms]">
                {HERO.subheadline}
              </p>

              {/*
                A GET form rather than a client-side widget: the city choice is a
                real radio group, needs no JavaScript, and arrives at /start as a
                query parameter that the next page renders on the server.
              */}
              <form
                action={PRIMARY_CTA.href}
                method="get"
                className="mt-10 animate-hero-rise [animation-delay:240ms]"
              >
                <fieldset>
                  <legend className="text-[0.9375rem] font-medium text-foreground">
                    {HERO.cityFieldLabel}
                  </legend>
                  <div className="mt-3 flex w-full rounded-xl border border-line-strong bg-background p-1">
                    {CITIES.map((city, index) => (
                      <label key={city.value} className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="city"
                          value={city.value}
                          defaultChecked={index === 0}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-10 items-center justify-center rounded-lg px-4 text-[0.9375rem] text-weak transition-colors peer-checked:bg-foreground peer-checked:text-white peer-checked:shadow-[0_1px_2px_rgba(10,10,10,0.16)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground">
                          {city.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <Button type="submit" className="group w-full sm:w-auto sm:shrink-0">
                    {PRIMARY_CTA.label}
                    <ArrowRightIcon className="size-5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Button>
                  <Link
                    href={SECONDARY_CTA.href}
                    className={buttonStyles({
                      variant: "secondary",
                      className: "w-full sm:w-auto sm:shrink-0",
                    })}
                  >
                    {SECONDARY_CTA.label}
                  </Link>
                </div>

                <p className="mt-3 text-[0.875rem] text-secondary-text">{PRIMARY_CTA.assurance}</p>
              </form>

              <p className="mt-9 animate-hero-rise border-t border-line pt-6 font-sans text-[1rem] font-medium leading-relaxed text-weak [animation-delay:420ms]">
                {PROOF.buyers}
              </p>
            </div>

            <HeroVisual className="max-w-160 animate-hero-rise-visual [animation-delay:300ms] lg:max-w-none" />
          </div>
        </Container>
      </div>

      <div className="border-t border-line">
        <Container className="py-8 lg:py-10">
          <h2 className="sr-only">Propsoch by the numbers</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[0.875rem] leading-snug text-secondary-text">
                  {stat.label}
                </dt>
                <dd className="order-1 flex flex-col">
                  <span aria-hidden="true" className="mb-3 h-0.5 w-7 bg-brand" />
                  <span className="font-hero text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-foreground lg:text-[2rem]">
                    {stat.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
