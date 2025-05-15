// src/app/api/test-connection/route.ts
import { testConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await testConnection();

    if (result) {
      return NextResponse.json({
        status: "success",
        message: "Database connection successful",
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
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
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
