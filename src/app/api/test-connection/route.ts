// test-connection.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require("dotenv");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require("pg");
// .env.localファイルの読み込み
dotenv.config({ path: ".env.local" });

// DATABASE_URL環境変数を優先
const connectionString = process.env.DATABASE_URL;

// 接続情報をログ出力（パスワードを隠す）
const safeConnectionString = connectionString
  ? connectionString.replace(/:[^:@]+@/, ":******@")
  : "未設定";

console.log("Connection string:", safeConnectionString);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected successfully to the database");
    const result = await client.query("SELECT NOW()");
    console.log("Current time from DB:", result.rows[0]);
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
