import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "truepizza.dp.ua",
      },
    ],
  },
};

export default nextConfig;
