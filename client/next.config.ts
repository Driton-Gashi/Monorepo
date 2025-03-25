import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_GATEWAY_URL ?? '',
        pathname: '/ipfs/**',
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  output: process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : undefined,
};

export default nextConfig;