import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { pool } from "../src/lib/db";

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

    // 新しいスキーマを作成
    await client.query(`
      -- 科目enum型
      CREATE TYPE subject_enum AS ENUM (
        'READING',
        'MATH1A',
        'MATH2B',
        'CHEMISTRY',
        'BIOLOGY'
      );

      -- 解答状態enum型
      CREATE TYPE answer_enum AS ENUM (
        'CORRECT',
        'INCORRECT',
        'SKIPPED'
      );

      -- ユーザープロフィール情報テーブル
      CREATE TABLE profiles (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        memo TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 志望大学テーブル
      CREATE TABLE target_universities (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        university_name VARCHAR(200) NOT NULL,
        display_order INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 科目カードテーブル
      CREATE TABLE subject_cards (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        subject subject_enum NOT NULL,
        final_score_target INTEGER NOT NULL,
        final_score_lowest INTEGER NOT NULL,
        memo TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (profile_id, subject)
      );

      -- テスト結果サマリーテーブル
      CREATE TABLE test_results (
        id SERIAL PRIMARY KEY,
        subject_card_id INTEGER NOT NULL REFERENCES subject_cards(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        year VARCHAR(10) NOT NULL,
        target_score INTEGER NOT NULL,
        student_score INTEGER NOT NULL,
        memo TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- テスト構造マスターテーブル
      CREATE TABLE tests (
        id SERIAL PRIMARY KEY,
        subject subject_enum NOT NULL,
        year INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (subject, year)
      );

      -- セクション構造テーブル
      CREATE TABLE sections (
        id SERIAL PRIMARY KEY,
        test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
        section_number INTEGER NOT NULL,
        total_score INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (test_id, section_number)
      );

      -- 問題情報テーブル
      CREATE TABLE questions (
        id SERIAL PRIMARY KEY,
        section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
        question_number INTEGER NOT NULL,
        score INTEGER,
        correct_answer INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (section_id, question_number)
      );

      -- 生徒の詳細テスト結果テーブル
      CREATE TABLE answered_data (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
        test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        score INTEGER NOT NULL,
        percentage INTEGER NOT NULL,
        target_percentage INTEGER,
        date DATE NOT NULL,
        memo TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (profile_id, test_id, date)
      );

      -- セクション別得点テーブル
      CREATE TABLE section_scores (
        id SERIAL PRIMARY KEY,
        answered_data_id INTEGER NOT NULL REFERENCES answered_data(id) ON DELETE CASCADE,
        section_number INTEGER NOT NULL,
        score INTEGER NOT NULL,
        percentage INTEGER NOT NULL,
        target_score INTEGER,
        target_percentage INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (answered_data_id, section_number)
      );

      -- 問題への解答データテーブル
      CREATE TABLE answers (
        id SERIAL PRIMARY KEY,
        answered_data_id INTEGER NOT NULL REFERENCES answered_data(id) ON DELETE CASCADE,
        question_number INTEGER NOT NULL,
        numeric_answer INTEGER,
        enum_answer answer_enum,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (answered_data_id, question_number),
        CHECK (
          (numeric_answer IS NOT NULL AND enum_answer IS NULL) OR
          (numeric_answer IS NULL AND enum_answer IS NOT NULL)
        )
      );

      -- フレンドデータを保存するためのテーブル
      CREATE TABLE friends (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 更新タイムスタンプを自動的に更新するための関数
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now(); 
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- 各テーブルに対してトリガーを作成
      CREATE TRIGGER update_profiles_modtime 
      BEFORE UPDATE ON profiles 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_target_universities_modtime 
      BEFORE UPDATE ON target_universities 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_subject_cards_modtime 
      BEFORE UPDATE ON subject_cards 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_test_results_modtime 
      BEFORE UPDATE ON test_results 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_tests_modtime 
      BEFORE UPDATE ON tests 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_sections_modtime 
      BEFORE UPDATE ON sections 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_questions_modtime 
      BEFORE UPDATE ON questions 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_answered_data_modtime 
      BEFORE UPDATE ON answered_data 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_section_scores_modtime 
      BEFORE UPDATE ON section_scores 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_answers_modtime 
      BEFORE UPDATE ON answers 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

      CREATE TRIGGER update_friends_modtime 
      BEFORE UPDATE ON friends 
      FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
    `);

    console.log("Database schema initialized successfully");

    // 接続を解放
    client.release();

    // 接続プールを終了
    await pool.end();
  } catch (error) {
    console.error("Error initializing database:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    process.exit(1);
  }
}

// スクリプト実行
initDb();
