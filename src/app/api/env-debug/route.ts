// src/app/api/env-debug/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // すべての環境変数名とその存在状態（値自体は表示しない）をチェック
    const envStatus = {
      // PostgreSQL関連
      POSTGRES_USER: process.env.POSTGRES_USER ? "設定済み" : "未設定",
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? "設定済み" : "未設定",
      POSTGRES_HOST: process.env.POSTGRES_HOST ? "設定済み" : "未設定",
      POSTGRES_PORT: process.env.POSTGRES_PORT ? "設定済み" : "未設定",
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE ? "設定済み" : "未設定",
      POSTGRES_DB: process.env.POSTGRES_DB ? "設定済み" : "未設定",
      POSTGRES_SSL: process.env.POSTGRES_SSL ? "設定済み" : "未設定",
      DATABASE_URL: process.env.DATABASE_URL ? "設定済み" : "未設定",

      // その他の設定
      JWT_SECRET: process.env.JWT_SECRET ? "設定済み" : "未設定",
      NODE_ENV: process.env.NODE_ENV || "未設定",

      // Supabase
      NEXT_PUBLIC_SUPABASE_URL:
        process.env.NEXT_PUBLIC_SUPABASE_URL || "未設定",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? "設定済み"
        : "未設定",

      // Vercel環境変数
      VERCEL: process.env.VERCEL || "未設定",
      VERCEL_ENV: process.env.VERCEL_ENV || "未設定",
      VERCEL_URL: process.env.VERCEL_URL || "未設定",
      VERCEL_REGION: process.env.VERCEL_REGION || "未設定",
    };

    // 環境変数の実際の値を安全に表示（パスワードは隠す）
    const safeValues = {
      POSTGRES_USER: process.env.POSTGRES_USER || "未設定",
      POSTGRES_HOST: process.env.POSTGRES_HOST || "未設定",
      POSTGRES_PORT: process.env.POSTGRES_PORT || "未設定",
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "未設定",
      POSTGRES_DB: process.env.POSTGRES_DB || "未設定",
      POSTGRES_SSL: process.env.POSTGRES_SSL || "未設定",
      DATABASE_URL: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.replace(/:.+@/, ":****@")
        : "未設定",
      NODE_ENV: process.env.NODE_ENV || "未設定",
      NEXT_PUBLIC_SUPABASE_URL:
        process.env.NEXT_PUBLIC_SUPABASE_URL || "未設定",
    };

    // 実行環境情報
    const runtimeInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      env: process.env.NODE_ENV,
    };

    return NextResponse.json({
      status: "success",
      message: "環境変数ステータス",
      envStatus,
      safeValues,
      runtimeInfo,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "環境変数チェック中にエラーが発生しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
