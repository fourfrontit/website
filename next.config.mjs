/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
  basePath: "/fourfront-it", // 👈 change to your repo name
  assetPrefix: "/fourfront-it/",
  experimental: { optimizeCss: true },
};

export default nextConfig;
