/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  trailingSlash: true,
  distDir: "dist",
  assetPrefix: "./",
};

module.exports = nextConfig;
