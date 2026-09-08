import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Newsreader } from "next/font/google";

import { SITE_URL } from "@/content/site";

import "./globals.css";

/* Self-hosted and subset by next/font: no third-party request, no FOUT-blocking
   stylesheet, and metrics-matched fallbacks so swapping does not shift layout. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
});

/* Hero display type. Loaded here because fonts have to be declared at the
   root; only the hero section actually uses it.

   Archivo over a neutral grotesque: it is squarer and tighter, so it holds a
   headline at display size without going soft, and its narrower set width fits
   the line in fewer breaks. Distinct enough from Inter that the hierarchy reads
   as deliberate rather than as two weights of the same face. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const title = "Propsoch — Independent homebuying advisors in Bangalore & Mumbai";
const description =
  "Independent guidance from advisors who've helped 1000+ families buy the right home. Compare projects on real data, visit with market experts, and close in 25 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Propsoch",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Propsoch",
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${newsreader.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
