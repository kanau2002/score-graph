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
  '1',
  '2',
  '3',
  '4',
  'CORRECT',
  'INCORRECT',
  'SKIPPED'
);

-- ユーザープロフィール情報テーブル
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  targetUniversity_1 VARCHAR(100),
  targetUniversity_2 VARCHAR(100),
  targetUniversity_3 VARCHAR(100)
);

-- 科目カードテーブル
CREATE TABLE user_subject (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject subject_enum NOT NULL,
  final_score_target INTEGER NOT NULL,
  final_score_lowest INTEGER NOT NULL,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, subject)
);

-- 生徒の詳細テスト結果テーブル
CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject subject_enum NOT NULL,
  year VARCHAR(10) NOT NULL,
  score INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  target_percentage INTEGER,
  date DATE NOT NULL,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  score_section1 INTEGER,
  score_section2 INTEGER,
  score_section3 INTEGER,
  score_section4 INTEGER,
  score_section5 INTEGER,
  score_section6 INTEGER,
  percentage_section1 INTEGER,
  percentage_section2 INTEGER,
  percentage_section3 INTEGER,
  percentage_section4 INTEGER,
  percentage_section5 INTEGER,
  percentage_section6 INTEGER,
  target_score_section1 INTEGER,
  target_score_section2 INTEGER,
  target_score_section3 INTEGER,
  target_score_section4 INTEGER,
  target_score_section5 INTEGER,
  target_score_section6 INTEGER,
  target_percentage_section1 INTEGER,
  target_percentage_section2 INTEGER,
  target_percentage_section3 INTEGER,
  target_percentage_section4 INTEGER,
  target_percentage_section5 INTEGER,
  target_percentage_section6 INTEGER,
  UNIQUE (user_id, subject, year)
);

-- 問題への解答データテーブル
CREATE TABLE test_answer (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject subject_enum NOT NULL,
  year VARCHAR(10) NOT NULL,
  question_number INTEGER NOT NULL,
  answer answer_enum,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, subject, year, question_number)
);

-- 更新タイムスタンプを自動的に更新するための関数
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now(); 
  RETURN NEW;
END;
$$ language 'plpgsql';

-- フォロー関係を管理するテーブル
CREATE TABLE user_follows (
  id SERIAL PRIMARY KEY,
  follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id) -- 自分自身をフォローできないようにする
);

-- 各テーブルに対してトリガーを作成
CREATE TRIGGER update_users_modtime 
BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_user_modtime 
BEFORE UPDATE ON user_subject 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_tests_modtime 
BEFORE UPDATE ON tests 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_test_answer_modtime 
BEFORE UPDATE ON test_answer 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_user_follows_modtime 
BEFORE UPDATE ON user_follows 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

