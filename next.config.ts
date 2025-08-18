import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // English: Skip ESLint during production builds to avoid blocking on third-party generated files
    // 中文：生产构建时跳过 ESLint，避免因第三方生成文件导致构建失败
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
