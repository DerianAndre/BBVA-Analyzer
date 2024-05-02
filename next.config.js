/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "export",
    trailingSlash: true,
    distDir: "dist",
    assetPrefix: "./",
    basePath: "/apps/bbva",
};

module.exports = nextConfig;
