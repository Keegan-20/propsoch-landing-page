import type { ReactNode } from "react";

export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export type FooterColumn = {
  readonly title: string;
  readonly links: readonly NavLink[];
};

/** A footer social account. `id` picks the glyph the footer renders for it. */
export type SocialLink = {
  readonly id: "instagram" | "linkedin" | "youtube" | "email";
  readonly label: string;
  readonly href: string;
};

export type City = {
  readonly value: string;
  readonly label: string;
};

export type Stat = {
  /** Pre-formatted so the figure renders identically on server and client. */
  readonly value: string;
  readonly label: string;
};

/**
 * One lens of the sample analysis in the hero visual. `finding` is written as
 * what the reading settles for a buyer, never as a verdict on a real listing,
 * so the sample can never be mistaken for data about a specific property.
 */
export type AnalysisLens = {
  readonly id: string;
  readonly label: string;
  readonly finding: string;
};

/** One row of the "How are we different?" comparison. */
export type ComparisonRow = {
  readonly criterion: string;
  readonly propsoch: string;
  readonly other: string;
};

export type ComparisonTable = {
  readonly id: string;
  /** Label used on the tab control. */
  readonly tabLabel: string;
  /** Column heading for the competitor, e.g. "Online portals". */
  readonly columnHeading: string;
  /** Optional qualifier shown under the column heading. */
  readonly columnQualifier?: string;
  /** Screen-reader caption for the table element. */
  readonly caption: string;
  readonly rows: readonly ComparisonRow[];
};

/** An expandable detail panel attached to a journey step. */
export type StepDisclosure = {
  /** Label on the control that opens the panel. */
  readonly summary: string;
  readonly intro: string;
  readonly stat: { readonly value: string; readonly label: string };
  readonly items: readonly string[];
};

/**
 * Which glyph a journey stop wears on its signboard. A key rather than a
 * component, so content stays free of JSX and the mapping lives in the one
 * component that renders it.
 */
export type StepIcon = "call" | "form" | "list" | "visit" | "report" | "key";

export type JourneyStep = {
  readonly title: string;
  readonly body: string;
  readonly icon: StepIcon;
  /** Secondary detail shown as a tag rather than body copy. */
  readonly note?: string;
  /** Closing line for the final step. */
  readonly outcome?: string;
  /** Optional expandable detail, e.g. what the Peace of Mind report contains. */
  readonly disclosure?: StepDisclosure;
};

export type JourneyPhase = {
  readonly label: string;
  readonly steps: readonly JourneyStep[];
};

/** A property in the search panel. Sample data — see content/listings.ts. */
export type Listing = {
  readonly id: string;
  readonly name: string;
  readonly locality: string;
  readonly city: string;
  readonly configuration: string;
  readonly price: string;
  readonly status: string;
  readonly href: string;
};

export type SectionIntro = {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: string;
};
