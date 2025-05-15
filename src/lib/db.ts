// src/lib/db.ts
import { Pool } from "pg";

// 環境変数からデータベース接続情報を取得
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB, // 両方の変数名に対応
  ssl: 
    process.env.NODE_ENV === "production" || process.env.POSTGRES_SSL === "true"
      ? { rejectUnauthorized: false }
      : false, // 本番環境では常にSSLを使用
});

// 接続テスト用の関数
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    const result = await client.query('SELECT NOW()');
    console.log("Database time:", result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    console.error("Connection params:", {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      port: process.env.POSTGRES_PORT,
      ssl: process.env.NODE_ENV === "production" || process.env.POSTGRES_SSL === "true"
    });
    return false;
  }
}

export { pool };