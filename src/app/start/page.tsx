import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JOURNEY_PHASES } from "@/content/journey";
import { CITIES, PRIMARY_CTA } from "@/content/site";

export const metadata: Metadata = {
  title: "Book your free advisor call",
  robots: { index: false, follow: true },
};

/**
 * The hero CTA has to land somewhere that answers "what happens after I click".
 * This is that page, kept deliberately small: it confirms the city chosen in
 * the hero form and restates the first steps of the journey, using the same
 * content source as the timeline so the two can never drift apart.
 */
export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const selectedCity = CITIES.find((option) => option.value === city);
  const firstSteps = JOURNEY_PHASES.flatMap((phase) => phase.steps).slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="main">
        <Container className="max-w-3xl py-16 lg:py-24">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-brand">
            {selectedCity ? `Buying in ${selectedCity.label}` : "Your free advisor call"}
          </p>
          <h1 className="mt-4 font-display text-[2.25rem] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.75rem]">
            Here&apos;s what happens next
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-secondary-text">
            {PRIMARY_CTA.assurance}. An advisor picks up from here,  no listings pushed at you,
            no obligation to continue.
          </p>

          <ol className="mt-10 flex flex-col gap-8 border-t border-line pt-10">
            {firstSteps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-[0.8125rem] font-semibold text-secondary-text"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-secondary-text">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row">
            <Link href="/" className={buttonStyles({ variant: "secondary" })}>
              Back to home
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
