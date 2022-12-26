/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbotrace: true,
    appDir: true
  }
}

module.exports = nextConfig
