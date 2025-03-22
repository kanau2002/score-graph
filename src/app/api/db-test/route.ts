// src/app/api/test-data/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM profiles LIMIT 10");
    client.release();

    return NextResponse.json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
