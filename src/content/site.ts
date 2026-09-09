import type { City, FooterColumn, NavLink, SocialLink } from "@/types/content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://propsoch-redesign.example.com";

export const BRAND = {
  name: "Propsoch",
  legalName: "Thinkr Proptech Private Limited",
  /* verbatim: propsoch.com footer */
  tagline:
    "Propsoch is the most advanced real estate research platform for homebuyers in India.",
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

/**
 * The footer link columns, as propsoch.com groups them: the three sets of
 * landing pages a buyer is most likely to arrive on from search — builder,
 * locality, and budget or possession filter.
 */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Top developers in Bengaluru",
    links: [
      { label: "Prestige Developers", href: "#prestige-developers" },
      { label: "Godrej Properties", href: "#godrej-properties" },
      { label: "Brigade Developers", href: "#brigade-developers" },
      { label: "Sobha Developers", href: "#sobha-developers" },
      { label: "Assetz Developers", href: "#assetz-developers" },
    ],
  },
  {
    title: "Top areas in Bengaluru",
    links: [
      { label: "Whitefield", href: "#whitefield" },
      { label: "Sarjapur Road", href: "#sarjapur-road" },
      { label: "Bellandur", href: "#bellandur" },
      { label: "Yelahanka", href: "#yelahanka" },
      { label: "HSR Layout", href: "#hsr-layout" },
    ],
  },
  {
    title: "Top filters",
    links: [
      { label: "Luxury Homes", href: "#luxury-homes" },
      { label: "Properties <3Cr", href: "#under-3cr" },
      { label: "Properties <2Cr", href: "#under-2cr" },
      { label: "Ready To Move In", href: "#ready-to-move-in" },
      { label: "Townships", href: "#townships" },
    ],
  },
];

/** The single crumb above the footer rule, back to the top of the site. */
export const FOOTER_HOME: NavLink = { label: "Home", href: "/" };

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/propsoch" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/propsoch" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@propsoch" },
  { id: "email", label: "Email us", href: "mailto:hello@propsoch.com" },
];

/* verbatim: propsoch.com footer compliance block. Rendered as running text
   rather than a labelled table — the footer states them, it does not tabulate
   them — so each label carries its own separator. */
export const REGISTRATIONS = [
  { label: "RERA:", value: "PRM/KA/RERA/1251/446/AG/220827/003103" },
  { label: "GSTIN -", value: "12314ASDAD213" },
  { label: "CIN -", value: "21312216151061" },
] as const;

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
];
