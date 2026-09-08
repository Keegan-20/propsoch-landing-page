import Image from "next/image";
import Link from "next/link";

import homeImage from "@/assets/images/home-found-living-room.webp";
import { StepDetail } from "@/components/sections/StepDetail";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY, JOURNEY_PHASES } from "@/content/journey";
import { PRIMARY_CTA, PROOF } from "@/content/site";

/**
 * The process, its phases and its wording are Propsoch's own. What changes:
 *  - phases and steps are ordered lists, so the sequence is in the markup;
 *  - one continuous rail with numbered nodes answers "how many steps are left";
 *  - on desktop the phase labels move into a left column and read as a time axis.
 *
 * The original's scroll-linked progress line is deliberately dropped: it is
 * client-side JavaScript and motion in service of decoration.
 */
/** Flat 1-based step numbers, derived once from the phase data. */
const STEP_OFFSETS: readonly number[] = JOURNEY_PHASES.map((_, index) =>
  JOURNEY_PHASES.slice(0, index).reduce((total, phase) => total + phase.steps.length, 0),
);

export function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="scroll-mt-20 bg-background">
      <Container className="py-16 lg:py-24">
        <SectionHeading
          id="journey-heading"
          eyebrow="The 25-day journey"
          title={JOURNEY.heading}
          description={JOURNEY.description}
          className="max-w-[26ch] sm:max-w-[38ch]"
        />

        <ol className="mt-12 lg:mt-16">
          {JOURNEY_PHASES.map((phase, phaseIndex) => (
            <li
              key={phase.label}
              className="group relative pb-10 pl-8 last:pb-0 lg:grid lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-x-10 lg:pb-12 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px bg-line group-last:hidden lg:left-[11rem]"
              />

              <h3 className="mb-5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand lg:mb-0 lg:pt-1 lg:text-right">
                {phase.label}
              </h3>

              <ol className="flex flex-col gap-8 lg:pl-8">
                {phase.steps.map((step, stepIndex) => {
                  const stepNumber = STEP_OFFSETS[phaseIndex] + stepIndex + 1;

                  return (
                    <li key={step.title} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-0.5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-background text-[0.75rem] font-semibold text-secondary-text"
                      >
                        {stepNumber}
                      </span>

                      <h4 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                        {step.title}
                      </h4>
                      <p className="mt-2 max-w-[58ch] leading-relaxed text-secondary-text">
                        {step.body}
                      </p>

                      {step.note ? (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-weak">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                          {step.note}
                        </p>
                      ) : null}

                      {step.disclosure ? <StepDetail disclosure={step.disclosure} /> : null}

                      {step.outcome ? (
                        <p className="mt-4 font-display text-xl leading-snug tracking-[-0.01em] text-foreground">
                          {step.outcome}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ol>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line lg:mt-20">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[19rem]">
              <Image
                src={homeImage}
                alt="Warm, plant-filled living room of a finished apartment, with a sofa, coffee table and bookshelves"
                fill
                loading="lazy"
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 bg-surface p-6 sm:p-10">
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
