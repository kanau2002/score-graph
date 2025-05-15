// src/lib/db.ts
import { Pool } from "pg";

// 環境変数から接続情報を取得
const dbConfig = {
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || "db.rgyearxvfiioltnpdldl.supabase.co", // 'postgres.'から'db.'に修正
  port: parseInt(process.env.POSTGRES_PORT || "5432"), // 6543から5432に修正
  database: process.env.POSTGRES_DATABASE || "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
};

// DATABASE_URLが設定されている場合はそちらを優先
const connectionString = process.env.DATABASE_URL;

// 接続情報をログに出力（パスワードを隠す）
console.log("使用するDB設定（パスワード除く）:", {
  ...dbConfig,
  password: "********",
  connectionString: connectionString ? "設定あり" : "未設定",
});

// Pool インスタンスを作成
const pool = connectionString
  ? new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new Pool(dbConfig);

// 接続エラーを検知するイベントリスナー
pool.on("error", (err) => {
  console.error("DB接続エラー:", err);
});

// PostgreSQLエラー用のインターフェース定義
interface PostgresError extends Error {
  code?: string;
  position?: string;
  detail?: string;
  hint?: string;
  schema?: string;
  table?: string;
  column?: string;
  dataType?: string;
  constraint?: string;
}

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

    // エラーの詳細情報を取得してログ出力
    if (error instanceof Error && "code" in error) {
      console.error("エラーコード:", (error as PostgresError).code);
    }
    return false;
  }
}

export { pool };
