// src/lib/db.ts
import { Pool } from "pg";

// 接続文字列を優先
const connectionString = process.env.DATABASE_URL;

// Pool インスタンスを作成 - 接続文字列を優先
const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD,
      host:
        process.env.POSTGRES_HOST || "aws-0-ap-northeast-1.pooler.supabase.com",
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

export { pool };
