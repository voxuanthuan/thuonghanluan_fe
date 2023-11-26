/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  env: {
    API_URL: 'thuonghanluan.vercel.app'
  }
}

module.exports = nextConfig
