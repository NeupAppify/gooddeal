import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.neupgroup.com",
      },
    ],
  },
};

export default nextConfig;
