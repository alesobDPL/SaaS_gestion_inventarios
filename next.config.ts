/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: false,
  },
  // Nueva clave para Prisma (reemplaza serverComponentsExternalPackages)
  serverExternalPackages: ['@prisma/client']
}

module.exports = nextConfig