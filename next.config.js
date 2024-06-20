import mdx from "@next/mdx";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
};

const withMDX = mdx({
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
