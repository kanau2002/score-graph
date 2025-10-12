// src/lib/db.ts
import { Pool } from "pg";

// Pool インスタンスを作成 - 接続文字列を優先
const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      })
    : new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || "5432"),
        database: process.env.POSTGRES_DATABASE,
        ssl: false,
      });

// 接続エラーを検知するイベントリスナー
pool.on("error", (err) => {
  console.error("DB接続エラー:", err);
});

export { pool };
