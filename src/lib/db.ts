// src/lib/db.ts
import { Pool } from "pg";

// ハードコードされた接続設定
const dbConfig = {
  user: "postgres",
  password: "Kanau888",
  host: "postgres.rgyearxvfiioltnpdldl.supabase.co",
  port: 6543,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log("使用するDB設定（パスワード除く）:", {
  ...dbConfig,
  password: "********",
});

const pool = new Pool(dbConfig);

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

export { pool };
