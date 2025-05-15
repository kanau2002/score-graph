// src/lib/db.ts
import { Pool } from "pg";

let pool: Pool;

// 接続文字列を使用するか、個別のパラメータを使用するかを決定
if (process.env.DATABASE_URL) {
  // 接続文字列を使用する場合
  const connectionString =
    process.env.DATABASE_URL + "?sslmode=require&pgbouncer=true";

  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log(
    "Database pool created using connection string (PgBouncer enabled)"
  );
} else {
  // 個別のパラメータを使用する場合
  pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "6543"), // Supabaseのポート番号：6543
    database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log("Database pool created using individual parameters");
}

// プール作成時にイベントリスナーを追加
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// 接続テスト用の関数
export async function testConnection() {
  try {
    console.log("Attempting to connect to database...");
    console.log("Connection info:", {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT || "6543", // ログにも正しいデフォルト値を表示
      database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
    });

    const client = await pool.connect();
    console.log("Database connected successfully");
    const result = await client.query("SELECT NOW()");
    console.log("Database time:", result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

export { pool };
