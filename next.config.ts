import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /* Serve AVIF first, WebP second; both fall back to the optimised source. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
