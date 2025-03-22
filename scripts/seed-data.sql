-- プロフィールデータの挿入
INSERT INTO profiles (id, user_name, memo)
VALUES (
  1, 
  '植田佳和侑', 
  'サッカー部の活動時間が長く、勉強時間が1日2時間程度しか取れていないため、内職をして時間を確保したり、過去問をもとに本当に必要なものを優先したりと工夫して勉強しています。'
);

-- 志望大学データの挿入
INSERT INTO target_universities (profile_id, university_name, display_order)
VALUES 
  (1, '千葉大学-理学部-地球科学科', 1),
  (1, '明治大学-農学部-農学科', 2),
  (1, '東京農業大学-農学部-農学科', 3);

-- 科目カードデータの挿入
INSERT INTO subject_cards (profile_id, subject, final_score_target, final_score_lowest, memo)
VALUES 
  (1, 'READING', 84, 70, '英語は1月から英語長文ポラリス1の文を例文としてスラスラ言えるレベルをテーマに30分/日音読をしたことで伸びた気がします。'),
  (1, 'MATH1A', 75, 60, '数1Aは基礎問を2周回したら70点台に乗りました。とてもおすすめなのでぜひやってみてください。'),
  (1, 'MATH2B', 75, 60, '数2Bは基礎問を3周回したら70点台に乗りました。たくさん演習を積むことが大事だと思います。'),
  (1, 'CHEMISTRY', 75, 65, '共通テストの化学は本当に難しいので目標の点数は低めに設定しました。');

-- テスト結果データの挿入（英語）
INSERT INTO test_results (subject_card_id, date, year, target_score, student_score, memo)
VALUES 
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-08-01', '2018', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-07-01', '2017', 70, 65, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-06-01', '2016', 85, 80, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-05-01', '2015', 90, 85, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-04-01', '2014', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-03-01', '2013', 60, 55, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-02-01', '2012', 40, 45, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'READING'), '2024-01-01', '2011', 10, 15, 'この日は調子が悪かったのでしょうがなかった。');

-- 数1Aのテスト結果データ
INSERT INTO test_results (subject_card_id, date, year, target_score, student_score, memo)
VALUES 
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-08-01', '2018', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-07-01', '2017', 70, 65, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-06-01', '2016', 85, 80, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-05-01', '2015', 90, 85, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-04-01', '2014', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-03-01', '2013', 60, 55, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-02-01', '2012', 40, 45, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH1A'), '2024-01-01', '2011', 10, 15, 'この日は調子が悪かったのでしょうがなかった。');

-- 数2Bのテスト結果データ
INSERT INTO test_results (subject_card_id, date, year, target_score, student_score, memo)
VALUES 
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-08-01', '2018', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-07-01', '2017', 70, 65, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-06-01', '2016', 85, 80, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-05-01', '2015', 90, 85, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-04-01', '2014', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-03-01', '2013', 60, 55, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-02-01', '2012', 40, 45, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'MATH2B'), '2024-01-01', '2011', 10, 15, 'この日は調子が悪かったのでしょうがなかった。');

-- 化学のテスト結果データ
INSERT INTO test_results (subject_card_id, date, year, target_score, student_score, memo)
VALUES 
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-08-01', '2018', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-07-01', '2017', 70, 65, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-06-01', '2016', 85, 80, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-05-01', '2015', 90, 85, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-04-01', '2014', 80, 75, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-03-01', '2013', 60, 55, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-02-01', '2012', 40, 45, 'この日は調子が悪かったのでしょうがなかった。'),
  ((SELECT id FROM subject_cards WHERE profile_id = 1 AND subject = 'CHEMISTRY'), '2024-01-01', '2011', 10, 15, 'この日は調子が悪かったのでしょうがなかった。');

-- -- テスト情報の挿入（英語2018年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (1, 'READING', 2018, 200);

-- -- セクション情報の挿入
-- INSERT INTO sections (test_id, section_number, total_score)
-- VALUES 
--   (1, 1, 14),
--   (1, 2, 47),
--   (1, 3, 23),
--   (1, 4, 40),
--   (1, 5, 30),
--   (1, 6, 36);

-- -- 問題情報の挿入（英語2018年度の大問1）
-- INSERT INTO questions (section_id, question_number, score, correct_answer)
-- VALUES 
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 1, 2, 4),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 2, 2, 3),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 3, 2, 2),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 4, 2, 1),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 5, 2, 4),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 6, 2, 3),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 1), 7, 2, 2);

-- -- 問題情報の挿入（英語2018年度の大問2の一部）
-- INSERT INTO questions (section_id, question_number, score, correct_answer)
-- VALUES 
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 2), 8, 2, 3),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 2), 9, 2, 2),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 2), 10, 2, 1),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 2), 11, 2, 4),
--   ((SELECT id FROM sections WHERE test_id = 1 AND section_number = 2), 12, 2, 1);

-- -- テスト情報の挿入（数学1A 2015年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (2, 'MATH1A', 2015, 100);

-- -- セクション情報の挿入（数学1A 2015年度）
-- INSERT INTO sections (test_id, section_number, total_score)
-- VALUES 
--   (2, 1, 20),
--   (2, 2, 25),
--   (2, 3, 15),
--   (2, 4, 20),
--   (2, 5, 20),
--   (2, 6, 20);

-- -- 問題情報の挿入（数学1A 2015年度の一部）
-- INSERT INTO questions (section_id, question_number, score, correct_answer)
-- VALUES 
--   ((SELECT id FROM sections WHERE test_id = 2 AND section_number = 1), 1, 5, null),
--   ((SELECT id FROM sections WHERE test_id = 2 AND section_number = 1), 2, 5, null),
--   ((SELECT id FROM sections WHERE test_id = 2 AND section_number = 1), 3, 5, null),
--   ((SELECT id FROM sections WHERE test_id = 2 AND section_number = 1), 4, 2, null),
--   ((SELECT id FROM sections WHERE test_id = 2 AND section_number = 1), 5, 3, null);

-- 解答済みデータの挿入（英語2018年度）
INSERT INTO answered_data (profile_id, test_id, name, score, percentage, target_percentage, date, memo)
VALUES (
  1,
  1,
  'あなた',
  150,
  75,
  70,
  '2024-01-26',
  '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。'
);

-- セクションスコア情報の挿入（英語2018年度）
INSERT INTO section_scores (answered_data_id, section_number, score, percentage, target_score, target_percentage)
VALUES 
  (1, 1, 12, 86, 12, 86),
  (1, 2, 47, 100, 30, 64),
  (1, 3, 17, 74, 18, 78),
  (1, 4, 35, 88, 25, 63),
  (1, 5, 18, 60, 18, 60),
  (1, 6, 30, 83, 25, 69);

-- 解答情報の挿入（英語2018年度の一部）
INSERT INTO answers (answered_data_id, question_number, numeric_answer)
VALUES 
  (1, 1, 4),
  (1, 2, 3),
  (1, 3, 2),
  (1, 4, 1),
  (1, 5, 3),
  (1, 6, 3),
  (1, 7, 2),
  (1, 8, 3),
  (1, 9, 2),
  (1, 10, 1);

-- 解答済みデータの挿入（数学1A 2015年度）
INSERT INTO answered_data (profile_id, test_id, name, score, percentage, target_percentage, date, memo)
VALUES (
  1,
  2,
  'あなた',
  86,
  86,
  75,
  '2024-01-26',
  '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。'
);

-- セクションスコア情報の挿入（数学1A 2015年度）
INSERT INTO section_scores (answered_data_id, section_number, score, percentage, target_score, target_percentage)
VALUES 
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 1, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 2, 22, 88, 20, 80),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 3, 13, 87, 10, 67),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 4, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 5, 0, 0, 0, 0),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 6, 17, 85, 15, 75);

-- 解答情報の挿入（数学1A 2015年度の一部）
INSERT INTO answers (answered_data_id, question_number, enum_answer)
VALUES 
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 1, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 2, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 3, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 4, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 5, 'INCORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 6, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 7, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 8, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 9, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 10, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 11, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 12, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 13, 'INCORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 14, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 15, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 16, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 17, 'INCORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 18, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 19, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 20, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 21, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 22, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 23, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 24, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 25, 'INCORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 26, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 27, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 28, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 29, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 30, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 31, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 32, 'SKIPPED'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 33, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 34, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 35, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 36, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 37, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE profile_id = 1 AND test_id = 2), 38, 'INCORRECT');

-- フレンドデータの挿入
INSERT INTO friends (id, name)
VALUES 
  (1, '大貫しもん'),
  (2, '磯辺恵美理'),
  (3, '藤岡優仁');

-- フレンドの解答データ挿入（数学1A 2015年度）
INSERT INTO answered_data (profile_id, test_id, name, score, percentage, target_percentage, date, memo)
VALUES 
  (NULL, 2, '大貫しもん', 86, 86, 75, '2024-01-26', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。'),
  (NULL, 2, '磯辺恵美理', 86, 86, 75, '2024-01-26', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。'),
  (NULL, 2, '藤岡優仁', 69, 69, 75, '2024-01-26', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。');

-- フレンドのセクションスコア情報（大貫しもん）
INSERT INTO section_scores (answered_data_id, section_number, score, percentage, target_score, target_percentage)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 1, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 2, 22, 88, 20, 80),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 3, 13, 87, 10, 67),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 4, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 5, 0, 0, 0, 0),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 6, 17, 85, 15, 75);

-- フレンドのセクションスコア情報（磯辺恵美理）
INSERT INTO section_scores (answered_data_id, section_number, score, percentage, target_score, target_percentage)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 1, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 2, 22, 88, 20, 80),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 3, 13, 87, 10, 67),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 4, 17, 85, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 5, 0, 0, 0, 0),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 6, 17, 85, 15, 75);

-- フレンドのセクションスコア情報（藤岡優仁）
INSERT INTO section_scores (answered_data_id, section_number, score, percentage, target_score, target_percentage)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 1, 15, 75, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 2, 19, 76, 20, 80),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 3, 7, 54, 10, 67),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 4, 15, 75, 15, 75),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 5, 0, 0, 0, 0),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 6, 13, 65, 15, 75);

-- フレンドの解答情報（大貫しもん、一部のみ）
INSERT INTO answers (answered_data_id, question_number, enum_answer)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 1, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 2, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 3, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 4, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '大貫しもん' AND test_id = 2), 5, 'INCORRECT');

-- フレンドの解答情報（磯辺恵美理、一部のみ）
INSERT INTO answers (answered_data_id, question_number, enum_answer)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 1, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 2, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 3, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 4, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '磯辺恵美理' AND test_id = 2), 5, 'INCORRECT');

-- フレンドの解答情報（藤岡優仁、一部のみ）
INSERT INTO answers (answered_data_id, question_number, enum_answer)
VALUES 
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 1, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 2, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 3, 'CORRECT'),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 4, 'INCORRECT'),
  ((SELECT id FROM answered_data WHERE name = '藤岡優仁' AND test_id = 2), 5, 'INCORRECT');

-- -- テスト情報の挿入（英語2015年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (3, 'READING', 2015, 200);

-- -- テスト情報の挿入（英語2016年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (4, 'READING', 2016, 200);

-- -- テスト情報の挿入（英語2017年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (5, 'READING', 2017, 200);

-- -- テスト情報の挿入（数学1A 2016年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (6, 'MATH1A', 2016, 100);

-- -- テスト情報の挿入（数学1A 2017年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (7, 'MATH1A', 2017, 100);

-- -- テスト情報の挿入（数学1A 2018年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (8, 'MATH1A', 2018, 100);

-- -- テスト情報の挿入（数学2B 2015年度）
-- INSERT INTO tests (id, subject, year, max_score)
-- VALUES (9, 'MATH2B', 2015, 100);