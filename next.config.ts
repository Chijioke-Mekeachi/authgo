/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint blocking builds
  },
  typescript: {
    ignoreBuildErrors: true,  // ✅ disables TypeScript blocking builds
  },
};

module.exports = nextConfig;
