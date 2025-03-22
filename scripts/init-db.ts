import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { pool } from "../src/lib/db";
import * as fs from 'fs';
import * as path from 'path';

async function initDb() {
  try {
    console.log("Connecting to database with the following credentials:");
    console.log(`User: ${process.env.POSTGRES_USER}`);
    console.log(`Host: ${process.env.POSTGRES_HOST}`);
    console.log(`Database: ${process.env.POSTGRES_DATABASE}`);
    console.log("Password exists: " + !!process.env.POSTGRES_PASSWORD);

    // データベース接続
    const client = await pool.connect();

    console.log("Connected to database, initializing schema...");

    // 全ての既存オブジェクトを削除
    await client.query(`
      -- 全てのトリガーを削除
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT trigger_schema, trigger_name, event_object_table 
                  FROM information_schema.triggers 
                  WHERE trigger_schema NOT IN ('pg_catalog', 'information_schema')) 
        LOOP
          EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.trigger_name) || 
                  ' ON ' || quote_ident(r.event_object_table) || ';';
        END LOOP;
      END $$;

      -- 全てのテーブルを削除
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;

      -- スキーマの権限を元に戻す
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);

    // schema.sqlからSQLを読み込む
    console.log("Reading schema from schema.sql file...");
    const schemaPath = path.join(__dirname, 'schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at path: ${schemaPath}`);
    }
    
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log(`Read ${schemaSql.length} characters from schema file`);
    
    // schema.sqlを実行 - 複数のステートメントに分割して実行
    console.log("Executing schema SQL...");
    
    // 単一のトランザクションとして実行
    await client.query("BEGIN");
    try {
      await client.query(schemaSql);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }

    console.log("Database schema initialized successfully");

    // 接続を解放
    client.release();

    // 接続プールを終了
    await pool.end();
  } catch (error) {
    console.error("Error initializing database:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      // スタックトレースも表示
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
}

// スクリプト実行
initDb();