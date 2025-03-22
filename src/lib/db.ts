// src/lib/db.ts
import { Pool } from "pg";

// 環境変数からデータベース接続情報を取得
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// 接続テスト用の関数
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

export { pool };
