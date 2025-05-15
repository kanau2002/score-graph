// src/app/api/test-connection/route.ts
import { testConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Starting database connection test...");

    // 環境変数が設定されているか確認
    const envVars = {
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_PORT: process.env.POSTGRES_PORT,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      DATABASE_URL: process.env.DATABASE_URL?.replace(/:.+@/, ":****@"), // パスワードを隠す
    };

    console.log("Environment variables check:", envVars);

    const result = await testConnection();

    if (result) {
      return NextResponse.json({
        status: "success",
        message: "Database connection successful",
        env: envVars,
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
          env: envVars,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error testing database connection:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Error testing database connection",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
        env: {
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_HOST: process.env.POSTGRES_HOST,
          POSTGRES_PORT: process.env.POSTGRES_PORT,
          POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
        },
      },
      { status: 500 }
    );
  }
}
