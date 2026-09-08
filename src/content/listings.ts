import type { Listing } from "@/types/content";


export const TRENDING_LISTINGS: readonly Listing[] = [
  {
    id: "alder-grove",
    name: "Alder Grove",
    locality: "Whitefield",
    city: "Bangalore",
    configuration: "3 BHK · 1,845 sq ft",
    price: "₹2.4 Cr onwards",
    status: "Ready to move",
    href: "#properties",
  },
  {
    id: "marbella-heights",
    name: "Marbella Heights",
    locality: "Sarjapur Road",
    city: "Bangalore",
    configuration: "2 & 3 BHK · 1,180–1,620 sq ft",
    price: "₹1.6 Cr onwards",
    status: "Under construction",
    href: "#properties",
  },
  {
    id: "copperleaf-residences",
    name: "Copperleaf Residences",
    locality: "HSR Layout",
    city: "Bangalore",
    configuration: "3 & 4 BHK · 2,050 sq ft",
    price: "₹3.1 Cr onwards",
    status: "Ready to move",
    href: "#properties",
  },
];

/** Matches on the fields a buyer would actually type. */
export function searchListings(query: string): readonly Listing[] {
  const term = query.trim().toLowerCase();
  if (!term) return TRENDING_LISTINGS;

  return TRENDING_LISTINGS.filter((listing) =>
    [listing.name, listing.locality, listing.city, listing.configuration, listing.status].some(
      (field) => field.toLowerCase().includes(term),
    ),
  );
}
