import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./data/**/*'],
  },
  experimental: {
    serverActions: { bodySizeLimit: '2mb' }
  }
};

export default nextConfig;
