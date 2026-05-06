import type { NextConfig } from "next";

const isCI = Boolean(process.env.CI);

const nextConfig: NextConfig = {
  output: "export",
  basePath: isCI ? "/spengali" : "",
  assetPrefix: isCI ? "/spengali/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
