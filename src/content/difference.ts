import type { ComparisonTable } from "@/types/content";

/**
 * Content below is reproduced verbatim from propsoch.com's "How are we
 * different?" section. Only the presentation is redesigned — criteria, values,
 * ordering and column headings are unchanged.
 *
 * The "Online portals" dataset only renders on the live site after the tab is
 * switched; it is included here so both comparisons are server-rendered.
 */
export const DIFFERENCE = {
  heading: "How are we different?",
  /* verbatim: used as the legend of the comparison chooser */
  chooserLabel: "Compare our services with",
  propsochColumnHeading: "Propsoch",
  criterionColumnHeading: "What you care about",
} as const;

export const COMPARISON_TABLES: readonly ComparisonTable[] = [
  {
    id: "local-brokers",
    tabLabel: "Local brokers",
    columnHeading: "Local brokers",
    caption:
      "How Propsoch compares with local brokers across nine things homebuyers care about.",
    rows: [
      {
        criterion: "Sales Practices",
        propsoch: "Consultative, no pressure",
        other: "High pressure sales tactics",
      },
      {
        criterion: "Transparency",
        propsoch: "Detailed pros & cons",
        other: "Only pros highlighted",
      },
      {
        criterion: "Project Curation",
        propsoch: "Based on 20+ factors",
        other: "Not curated",
      },
      {
        criterion: "Spam",
        propsoch: "No spam",
        other: "High spamming until closure",
      },
      {
        criterion: "Post sales support",
        propsoch: "End-to-end support",
        other: "None",
      },
      {
        criterion: "Site Visits",
        propsoch: "Assisted by on-ground market experts",
        other: "No market expertise",
      },
      {
        criterion: "Negotiation",
        propsoch: "High leverage via insights",
        other: "No insights to leverage",
      },
      {
        criterion: "In-Depth Reports",
        propsoch: "2 complimentary Peace of Mind Reports",
        other: "None",
      },
      {
        criterion: "Advisor",
        propsoch: "Trained architects",
        other: "Local sales people",
      },
    ],
  },
  {
    id: "online-portals",
    tabLabel: "Online portals",
    columnHeading: "Online portals",
    columnQualifier: "(Housing/99Acres/Magicbricks)",
    caption:
      "How Propsoch compares with online property portals across five things homebuyers care about.",
    rows: [
      {
        criterion: "Information Depth",
        propsoch: "80+ Data Points",
        other: "20-40 Data Points",
      },
      {
        criterion: "Transparency",
        propsoch: "Detailed pros & cons",
        other: "Only pros highlighted",
      },
      {
        criterion: "Data Accuracy",
        propsoch: "Verified By Architects",
        other: "Loose verification",
      },
      {
        criterion: "Service Validity",
        propsoch: "Till you find your home",
        other: "Based on no. of contacts",
      },
      {
        criterion: "Data Sources",
        propsoch: "RERA, GMaps, CDP etc.",
        other: "Added by developer & broker",
      },
    ],
  },
];
