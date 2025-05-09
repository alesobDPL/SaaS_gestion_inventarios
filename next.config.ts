/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: false,
  },
  serverExternalPackages: ['@prisma/client'],
};

module.exports = (nextConfig);
