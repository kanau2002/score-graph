// src/app/api/direct-connection/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  try {
    console.log("直接接続テスト開始...");

    // 直接接続情報を指定
    const pool = new Pool({
      user: "postgres",
      password: "Kanau888",
      host: "postgres.rgyearxvfiioltnpdldl.supabase.co",
      port: 6543,
      database: "postgres",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // 接続テスト
    console.log("データベースに接続しています...");
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("データベース時間:", result.rows[0]);
    client.release();

    return NextResponse.json({
      status: "success",
      message: "直接接続に成功しました",
      time: result.rows[0],
      env: {
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        DATABASE_URL: process.env.DATABASE_URL ? "設定済み" : "未設定",
      },
    });
  } catch (error) {
    console.error("直接接続エラー:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "直接接続に失敗しました",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
        env: {
          POSTGRES_HOST: process.env.POSTGRES_HOST,
          POSTGRES_PORT: process.env.POSTGRES_PORT,
          DATABASE_URL: process.env.DATABASE_URL ? "設定済み" : "未設定",
        },
      },
      { status: 500 }
    );
  }
}
