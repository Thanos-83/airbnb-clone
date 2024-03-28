/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'a0.muscache.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
