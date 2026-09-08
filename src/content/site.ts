import type { City, FooterColumn, NavLink } from "@/types/content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://propsoch-redesign.example.com";

export const BRAND = {
  name: "Propsoch",
  legalName: "Thinkr Proptech Private Limited",
  /* verbatim: propsoch.com footer */
  tagline:
    "Propsoch is the most advanced real estate research platform for homebuyers in India",
} as const;

/* verbatim claims from propsoch.com, used once each so neither is repeated */
export const PROOF = {
  buyers: "Trusted by 1000+ buyers from Google, Amazon, PhonePe, Atlassian, Flipkart +More.",
  outcome: "9 in 10 homebuyers have bought a home via us within 25 days.",
} as const;

export const CITIES: readonly City[] = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
];

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
];

/** Single source of truth for the primary action, reused by nav, hero and journey. */
export const PRIMARY_CTA = {
  label: "Book my free advisor call",
  shortLabel: "Book a free call",
  href: "/start",
  /* Answers "what does this cost me?" before the click. Both promises are
     claims Propsoch already makes in its own comparison table. */
  assurance: "15-minute call · No spam, no sales pressure",
} as const;

export const SECONDARY_CTA = {
  label: "See how we compare",
  href: "#how-we-are-different",
} as const;

/**
 * The three header actions. Saved navigates, so it renders as a link; Search
 * and Share act in place, so they render as buttons. Each is icon-only in the
 * header bar, so each carries an explicit accessible name.
 */
export const NAV_ACTIONS = {
  search: {
    label: "Search properties",
    placeholder: "Project, locality or configuration",
    trendingLabel: "Trending now",
    resultsLabel: "Results",
    empty: "No projects match that search.",
    close: "Close search",
  },
  saved: { label: "Saved homes", href: "#saved" },
  share: {
    label: "Share this page",
    copied: "Link copied to clipboard",
    failed: "Couldn't copy the link",
  },
} as const;

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Properties",
    links: [
      { label: "Search & Filter Properties", href: "#properties" },
      { label: "Compare Properties", href: "#compare" },
      { label: "Sell Your Property", href: "#sell" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Guided Homebuying", href: "#guided-homebuying" },
      { label: "Peace of Mind Report", href: "#peace-of-mind" },
      { label: "NRI Advisory", href: "#nri-advisory" },
      { label: "Home Loans", href: "#home-loans" },
      { label: "Legal Services", href: "#legal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Homebuying Guide 101", href: "#guide" },
      { label: "Homebuying Checklist", href: "#checklist" },
      { label: "EMI Calculator", href: "#emi-calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Customer Reviews", href: "#reviews" },
      { label: "Careers", href: "#careers" },
    ],
  },
];

export const COMMUNITY_LINKS: readonly NavLink[] = [
  { label: "Join the Bangalore Community", href: "#community-bangalore" },
  { label: "Join the Mumbai Community", href: "#community-mumbai" },
];

/* verbatim: propsoch.com footer compliance block */
export const REGISTRATIONS = [
  { label: "GSTIN", value: "12314ASDAD213" },
  { label: "CIN", value: "21312215151661" },
  {
    label: "Karnataka RERA Reg. No.",
    value: "PRM/KA/RERA/1251/446/AG/220927/003103",
    href: "https://rera.karnataka.gov.in",
  },
  {
    label: "Maharashtra RERA Reg. No.",
    value: "A041182600110",
    href: "https://maharera.maharashtra.gov.in",
  },
] as const;

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
];
