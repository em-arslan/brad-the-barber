import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    // Pre-compressed WebP assets — skip slow on-the-fly optimisation in dev
    unoptimized: isDev,
  },
  // Prevent stale dev cache from hanging the server
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
