import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    // ✅ Do not run ESLint on builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;

