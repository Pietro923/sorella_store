import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
