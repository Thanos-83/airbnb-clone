/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},

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
