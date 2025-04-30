import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    POSTGRES_SSL: "false", // SSL接続を無効化
  },
};

export default nextConfig;
