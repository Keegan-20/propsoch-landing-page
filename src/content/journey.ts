import type { JourneyPhase, StepDisclosure } from "@/types/content";

/**
 * Content below is reproduced verbatim from propsoch.com's timeline section.
 * The process, its phases and its wording are unchanged; only the visual
 * treatment differs. Two lines that the original renders as extra body copy
 * are typed as `note` and `outcome` so they can take distinct visual roles.
 */
export const JOURNEY = {
  heading: "Here's how you will find a home with us in 25 days",
  description:
    "Six steps, from the first conversation to the keys in your hand.",
} as const;

/**
 * What the Peace of Mind report contains. The step already names the report but
 * never says what is in it, which is the obvious question at that point in the
 * journey. Every line here is Propsoch's own copy, taken from their Peace of
 * Mind service section and product menu — nothing is invented. It stays
 * collapsed by default, so the step reads exactly as it does today at rest.
 */
const PEACE_OF_MIND_REPORT: StepDisclosure = {
  summary: "See what's inside the report",
  intro:
    "Our Peace of Mind (POM) reports ensure you're technically, financially, and emotionally ready to buy or sell your property confidently. It covers:",
  stat: { value: "80+", label: "critical data points" },
  items: [
    "Connectivity, location and investment potential assessment",
    "Design assessment of the master, tower and floor plans",
    "Current state of litigations & next steps to secure yourself legally",
    "Builder's track record and credibility assessment",
    "Final decision support with zero guesswork",
  ],
};

/**
 * `icon` is the only field here that is not copy: it names which glyph the
 * stop's signboard wears, so the content file stays free of JSX. Every string
 * below is propsoch.com's own, verbatim and complete — the redesign adds no
 * line of its own to this section.
 */
export const JOURNEY_PHASES: readonly JourneyPhase[] = [
  {
    label: "Start Guided Home Buying today",
    steps: [
      {
        title: "A quick free call",
        body: "We walk you through our services, answer any immediate questions and set the stage for what's next.",
        icon: "call",
      },
    ],
  },
  {
    label: "Week 1",
    steps: [
      {
        title: "Discovery form",
        body: "Tell us what you are looking for so that your advisor can start building a shortlist of verified projects.",
        icon: "form",
      },
      {
        title: "Longlist call",
        body: "The team curates a list of 10-12 properties tailored to your preferences and walks you through in detail.",
        icon: "list",
      },
    ],
  },
  {
    label: "Week 2",
    steps: [
      {
        title: "Site visits",
        body: "Once we've narrowed down the final 4-5 properties, it's time for seeing and analysing them in person!",
        icon: "visit",
      },
    ],
  },
  {
    label: "Week 3",
    steps: [
      {
        title: "Deepdiving",
        body: "Found the one? Get your 'Peace of Mind' report within a day. Everything you need to know about the property, in one place.",
        icon: "report",
        note: "Along with loan assistance.",
        disclosure: PEACE_OF_MIND_REPORT,
      },
    ],
  },
  {
    label: "Last week",
    steps: [
      {
        title: "Negotiation and Closure",
        body: "Take your time and once you're ready, we'll handle the negotiation and seal the best deal for you.",
        icon: "key",
        outcome: "Congratulations! you found your home sweet home!",
      },
    ],
  },
];
