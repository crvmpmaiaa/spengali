import type { NextConfig } from "next";

const isGitHubPages = Boolean(process.env.GITHUB_PAGES);

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/spengali" : "",
  assetPrefix: isGitHubPages ? "/spengali/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
