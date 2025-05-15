// src/lib/db.ts
import { Pool } from "pg";

// 環境変数のチェック
console.log("DB接続情報チェック:", {
  POSTGRES_USER: process.env.POSTGRES_USER || "未設定",
  POSTGRES_HOST: process.env.POSTGRES_HOST || "未設定",
  POSTGRES_PORT: process.env.POSTGRES_PORT || "未設定",
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "未設定",
  DATABASE_URL: process.env.DATABASE_URL ? "設定済み" : "未設定",
});

// 環境変数が設定されていない場合でも動作するよう直接値を使用
const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Kanau888",
  host:
    process.env.POSTGRES_HOST || "postgres.rgyearxvfiioltnpdldl.supabase.co",
  port: parseInt(process.env.POSTGRES_PORT || "6543"),
  database: process.env.POSTGRES_DATABASE || "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

// 接続エラーを検知するイベントリスナー
pool.on("error", (err) => {
  console.error("DB接続エラー:", err);
});

// 接続テスト用の関数
export async function testConnection() {
  try {
    console.log("データベース接続テスト開始...");
    const client = await pool.connect();
    console.log("データベース接続成功");
    const result = await client.query("SELECT NOW()");
    console.log("データベース時間:", result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error("データベース接続エラー:", error);
    if (error instanceof Error) {
      console.error("エラーメッセージ:", error.message);
      console.error("スタックトレース:", error.stack);
    }
    return false;
  }
}

// もし環境変数が設定されていなければコンソールに警告を表示
if (!process.env.POSTGRES_HOST || !process.env.POSTGRES_USER) {
  console.warn(
    "警告: DB接続用の環境変数が不足しています。デフォルト値を使用します。"
  );
}

export { pool };
