// src/app/api/test-pgbouncer/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  try {
    console.log("Testing connection with PgBouncer settings...");

    // 環境変数からDB情報を取得
    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const host = process.env.POSTGRES_HOST;
    const port = process.env.POSTGRES_PORT || "6543"; // デフォルト値を6543に修正
    const database = process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB;

    if (!user || !password || !host || !database) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database environment variables are not completely set",
          env: {
            user: user ? "設定済み" : "未設定",
            password: password ? "設定済み" : "未設定",
            host: host ? "設定済み" : "未設定",
            port,
            database: database ? "設定済み" : "未設定",
          },
        },
        { status: 500 }
      );
    }

    // PgBouncer設定を含むconnection string
    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}?sslmode=require&pgbouncer=true`;

    // 接続設定
    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // 接続テスト
    console.log("Connecting to database with PgBouncer settings...");
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Database time:", result.rows[0]);
    client.release();

    return NextResponse.json({
      status: "success",
      message: "Database connection successful with PgBouncer settings",
      time: result.rows[0],
      config: {
        host,
        port,
        database,
        user,
      },
    });
  } catch (error) {
    console.error("Database connection error with PgBouncer settings:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Error connecting to database with PgBouncer settings",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
      },
      { status: 500 }
    );
  }
}
