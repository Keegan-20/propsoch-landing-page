import type { AnalysisLens, Stat } from "@/types/content";

/**
 * The original hero leads with the problem ("Blindly trusting a broker's Sales
 * Pitch? Fake Claims? Half Info?") and closes on a generic "Get Started".
 * The positioning is kept, but the headline now carries the value proposition
 * and the broker critique becomes the contrast rather than the whole message.
 */
export const HERO = {
  headline: {
    lead: "Buy your home on",
    emphasis: "facts",
    trail: ", not a broker's sales pitch.",
  },
  /* verbatim: propsoch.com hero subheadline */
  subheadline:
    "Get independent guidance from advisors who've helped 1000+ families buy the right home.",
  cityFieldLabel: "Where are you buying?",
} as const;

/* verbatim figures and labels: propsoch.com stats band */
export const HERO_STATS: readonly Stat[] = [
  { value: "2,500+", label: "Intelligent Homebuyers" },
  { value: "700+", label: "Projects Across Bangalore" },
  { value: "290+", label: "Partner Builders" },
  { value: "8500+", label: "Hours of Advise" },
];


export const HERO_ANALYSIS = {
  reportLabel: "Peace of Mind Report",
  sampleTag: "Illustrative",
  dataPoints: "80+ data points",
  verifiedBy: "Verified by architects",
  legend: "Read this property by",
  findingLabel: "What this tells you",
} as const;

export const HERO_LENSES: readonly AnalysisLens[] = [
  {
    id: "sunlight",
    label: "Sunlight",
    finding: "Which rooms get direct light through the day, and which stay dark year-round.",
  },
  {
    id: "ventilation",
    label: "Ventilation",
    finding: "Where air actually crosses the home, and the rooms that get no draught at all.",
  },
  {
    id: "layout",
    label: "Layout",
    finding: "How much of the built-up area you can genuinely use, against what the brochure counts.",
  },
  {
    id: "locality",
    label: "Locality",
    finding: "What is genuinely within reach today, and what is still only drawn on a masterplan.",
  },
];
