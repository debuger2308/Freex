/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:8081/:path*',
      },
    ];
  },
};