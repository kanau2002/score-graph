// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    POSTGRES_SSL: "true", // SSL接続を有効化
  },
};

export default nextConfig;
