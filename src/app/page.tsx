import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DifferenceSection } from "@/components/sections/DifferenceSection";
import { Hero } from "@/components/sections/Hero";
import { JourneySection } from "@/components/sections/JourneySection";
import { BRAND, SITE_URL } from "@/content/site";

/**
 * Server-rendered on request. Nothing on this page is client state, so the
 * whole document — including the comparison tables — arrives as HTML.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: BRAND.name,
  legalName: BRAND.legalName,
  description: BRAND.tagline,
  url: SITE_URL,
  areaServed: ["Bangalore", "Mumbai"],
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* The page's only <h1> lives in the hero. */}
        <Hero />
        <DifferenceSection />
        <JourneySection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
    </>
  );
}
