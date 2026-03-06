import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Common aliases third-party checkers probe for
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/tos',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/cookies',
        destination: '/cookie-policy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
