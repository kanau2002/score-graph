// src/app/api/test-connection-url/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  try {
    console.log("Starting database connection test using connection URL...");

    // 環境変数からDB URLを取得（パスワードを隠して表示）
    const dbUrl = process.env.DATABASE_URL;
    const safeDbUrl = dbUrl?.replace(/:.+@/, ":****@"); // パスワードを隠す

    console.log("Using database URL:", safeDbUrl);

    if (!dbUrl) {
      return NextResponse.json(
        {
          status: "error",
          message: "DATABASE_URL environment variable is not set",
        },
        { status: 500 }
      );
    }

    // 接続URLを直接使用するプール
    const poolByUrl = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // 接続テスト
    const client = await poolByUrl.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Database time:", result.rows[0]);
    client.release();

    return NextResponse.json({
      status: "success",
      message: "Database connection successful using URL",
      time: result.rows[0],
      url: safeDbUrl,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Error connecting to database using URL",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
        url: process.env.DATABASE_URL?.replace(/:.+@/, ":****@"),
      },
      { status: 500 }
    );
  }
}
