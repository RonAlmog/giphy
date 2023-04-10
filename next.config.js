/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.giphy.com"],
  },
  env: {
    key: process.env.GIPHY_API_KEY,
  },
};

module.exports = nextConfig;
