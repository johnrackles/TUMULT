/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  reactStrictMode: true,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
