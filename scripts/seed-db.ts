// scripts/seed-db.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { pool } from "../src/lib/db";
import fs from "fs";
import path from "path";

async function seedDb() {
  try {
    console.log("Connecting to database to seed test data...");

    // テストデータのSQLファイルを読み込む
    const seedFilePath = path.join(__dirname, "seed-data.sql");
    const seedSQL = fs.readFileSync(seedFilePath, "utf8");

    // データベース接続
    const client = await pool.connect();

    console.log("Connected to database, inserting test data...");

    // SQLコマンドを実行
    await client.query(seedSQL);

    console.log("Test data inserted successfully");

    // 接続を解放
    client.release();

    // 接続プールを終了
    await pool.end();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// スクリプト実行
seedDb();
