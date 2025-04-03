-- ここではトランザクションを使用して整合性を保証します
BEGIN;

-- IDをリセットして自動増分を1から開始するように設定
ALTER SEQUENCE tests_id_seq RESTART WITH 1;
ALTER SEQUENCE tests_target_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE user_subject_id_seq RESTART WITH 1;
ALTER SEQUENCE test_answer_id_seq RESTART WITH 1;

-- プロフィールデータの挿入
INSERT INTO users (user_name, memo, targetUniversity_1, targetUniversity_2, targetUniversity_3)
VALUES (
  '植田佳和侑', 
  'サッカー部の活動時間が長く、勉強時間が1日2時間程度しか取れていないため、内職をして時間を確保したり、過去問をもとに本当に必要なものを優先したりと工夫して勉強しています。',
  '千葉大学-理学部-地球科学科',
  '明治大学-農学部-農学科',
  '東京農業大学-農学部-農学科'
),
('大貫蒔門', '陸上部で頑張っています。', '千葉大学-教育学部-中学数学', '千葉大学-理学部-数学科', null),
('磯辺慧美理', 'アイデア甲子園に出場します。', '国際医療福祉大-医学部', null, null),
('藤岡優仁', 'サッカー部と生徒会を頑張っています。', '千葉大学-理学部-物理学科', null, null),
('星野心紀', '新学期のクラス替えが楽しみです。', '千葉大学-園芸学部-園芸学科', null, null);


-- 科目カードデータの挿入
INSERT INTO user_subject (user_id, subject, final_score_target, final_score_lowest, memo)
VALUES 
  (1, 'READING', 84, 70, '英語は1月から英語長文ポラリス1の文を例文としてスラスラ言えるレベルをテーマに30分/日音読をしたことで伸びた気がします。'),
  (1, 'MATH1A', 75, 60, '数1Aは基礎問を2周回したら70点台に乗りました。とてもおすすめなのでぜひやってみてください。'),
  (1, 'MATH2B', 75, 60, '数2Bは基礎問を3周回したら70点台に乗りました。たくさん演習を積むことが大事だと思います。'),
  (1, 'CHEMISTRY', 75, 65, '共通テストの化学は本当に難しいので目標の点数は低めに設定しました。');


-- =========== ここからトランザクションの依存関係に注意 ===========

INSERT INTO tests (user_id, subject, year, score, percentage, date, memo, score_section1, score_section2, score_section3, score_section4, score_section5, score_section6, percentage_section1, percentage_section2, percentage_section3, percentage_section4, percentage_section5, percentage_section6)
VALUES
( 1, 'READING', '2015', 150, 75, '2025-01-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2016', 150, 75, '2025-02-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2017', 150, 75, '2025-03-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2018', 150, 75, '2025-04-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2019', 150, 75, '2025-05-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2020', 150, 75, '2025-06-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'READING', '2021', 150, 75, '2025-07-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 1, 'MATH1A', '2015', 86, 86, '2025-01-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2016', 86, 86, '2025-02-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2017', 86, 86, '2025-03-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2018', 86, 86, '2025-04-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2019', 86, 86, '2025-05-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2020', 86, 86, '2025-06-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH1A', '2021', 86, 86, '2025-07-26', '今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2015', 86, 86, '2025-01-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2016', 86, 86, '2025-02-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2017', 86, 86, '2025-03-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2018', 86, 86, '2025-04-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2019', 86, 86, '2025-05-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2020', 86, 86, '2025-06-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 1, 'MATH2B', '2021', 86, 86, '2025-07-26', '今回の数2Bは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'READING', '2015', 150, 75, '2025-01-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2016', 150, 75, '2025-02-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2017', 150, 75, '2025-03-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2018', 150, 75, '2025-04-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2019', 150, 75, '2025-05-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2020', 150, 75, '2025-06-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'READING', '2021', 150, 75, '2025-07-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 2, 'MATH1A', '2015', 86, 86, '2025-01-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2016', 86, 86, '2025-02-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2017', 86, 86, '2025-03-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2018', 86, 86, '2025-04-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2019', 86, 86, '2025-05-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2020', 86, 86, '2025-06-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 2, 'MATH1A', '2021', 86, 86, '2025-07-27', '今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'READING', '2015', 150, 75, '2025-01-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2016', 150, 75, '2025-02-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2017', 150, 75, '2025-03-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2018', 150, 75, '2025-04-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2019', 150, 75, '2025-05-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2020', 150, 75, '2025-06-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'READING', '2021', 150, 75, '2025-07-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 3, 'MATH1A', '2015', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2016', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2017', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2018', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2019', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2020', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 3, 'MATH1A', '2021', 86, 86, '2025-01-28', '数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。', 17, 22, 13, 17, 0, 17, 85, 88, 87, 85, 0, 85 ),
( 4, 'READING', '2015', 150, 75, '2025-01-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2016', 150, 75, '2025-02-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2017', 150, 75, '2025-03-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2018', 150, 75, '2025-04-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2019', 150, 75, '2025-05-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2020', 150, 75, '2025-06-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'READING', '2021', 150, 75, '2025-07-26', '今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。', 12, 47, 17, 35, 18, 30, 86, 100, 74, 88, 60, 83 ),
( 4, 'MATH1A', '2015', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2016', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2017', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2018', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2019', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2020', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 ),
( 4, 'MATH1A', '2021', 69, 69, '2025-01-29', '数1Aは基礎問2周しただけだけど結構点数取れてよかった。', 15, 19, 7, 15, 0, 13, 75, 76, 54, 75, 0, 65 );


-- 解答情報の挿入（英語2018年度あなた）
INSERT INTO test_answer (user_id, subject, year, question_number, answer)
VALUES 
  (1, 'READING', '2018', 1, '4'),
  (1, 'READING', '2018', 2, '3'),
  (1, 'READING', '2018', 3, '2'),
  (1, 'READING', '2018', 4, '1'),
  (1, 'READING', '2018', 5, '3'),
  (1, 'READING', '2018', 6, '3'),
  (1, 'READING', '2018', 7, '2'),
  (1, 'READING', '2018', 8, '3'),
  (1, 'READING', '2018', 9, '2'),
  (1, 'READING', '2018', 10, '1'),
  (1, 'READING', '2018', 11, '4'),
  (1, 'READING', '2018', 12, '1'),
  (1, 'READING', '2018', 13, '3'),
  (1, 'READING', '2018', 14, '1'),
  (1, 'READING', '2018', 15, '3'),
  (1, 'READING', '2018', 16, '3'),
  (1, 'READING', '2018', 17, '3'),
  (1, 'READING', '2018', 18, '3'),
  (1, 'READING', '2018', 19, '2'),
  (1, 'READING', '2018', 20, '4'),
  (1, 'READING', '2018', 21, '2'),
  (1, 'READING', '2018', 22, '3'),
  (1, 'READING', '2018', 23, '2'),
  (1, 'READING', '2018', 24, '2'),
  (1, 'READING', '2018', 25, '4'),
  (1, 'READING', '2018', 26, '4'),
  (1, 'READING', '2018', 27, '2'),
  (1, 'READING', '2018', 30, '1'),
  (1, 'READING', '2018', 31, '2'),
  (1, 'READING', '2018', 32, '4'),
  (1, 'READING', '2018', 33, '2'),
  (1, 'READING', '2018', 34, '3'),
  (1, 'READING', '2018', 35, '1'),
  (1, 'READING', '2018', 36, '4'),
  (1, 'READING', '2018', 37, '4'),
  (1, 'READING', '2018', 38, '2'),
  (1, 'READING', '2018', 39, '3'),
  (1, 'READING', '2018', 40, '4'),
  (1, 'READING', '2018', 41, '3'),
  (1, 'READING', '2018', 42, '2'),
  (1, 'READING', '2018', 43, '2'),
  (1, 'READING', '2018', 44, '2'),
  (1, 'READING', '2018', 45, '4'),
  (1, 'READING', '2018', 46, '4'),
  (1, 'READING', '2018', 47, '2'),
  (1, 'READING', '2018', 48, '1'),
  (1, 'READING', '2018', 49, '1'),
  (1, 'READING', '2018', 50, '2'),
  (1, 'READING', '2018', 51, '4'),
  (1, 'READING', '2018', 52, '3'),
  (1, 'READING', '2018', 53, '4'),
  (1, 'READING', '2018', 54, '1'),
  
-- 解答情報の挿入（英語2018年度大貫君）
  (2, 'READING', '2018', 1, '4'),
  (2, 'READING', '2018', 2, '3'),
  (2, 'READING', '2018', 3, '2'),
  (2, 'READING', '2018', 4, '1'),
  (2, 'READING', '2018', 5, '4'),
  (2, 'READING', '2018', 6, '3'),
  (2, 'READING', '2018', 7, '1'),
  (2, 'READING', '2018', 8, '3'),
  (2, 'READING', '2018', 9, '2'),
  (2, 'READING', '2018', 10, '1'),
  (2, 'READING', '2018', 11, '4'),
  (2, 'READING', '2018', 12, '1'),
  (2, 'READING', '2018', 13, '3'),
  (2, 'READING', '2018', 14, '1'),
  (2, 'READING', '2018', 15, '3'),
  (2, 'READING', '2018', 16, '3'),
  (2, 'READING', '2018', 17, '3'),
  (2, 'READING', '2018', 18, '3'),
  (2, 'READING', '2018', 19, '2'),
  (2, 'READING', '2018', 20, '4'),
  (2, 'READING', '2018', 21, '2'),
  (2, 'READING', '2018', 22, '3'),
  (2, 'READING', '2018', 23, '1'),
  (2, 'READING', '2018', 24, '2'),
  (2, 'READING', '2018', 25, '2'),
  (2, 'READING', '2018', 26, '4'),
  (2, 'READING', '2018', 27, '2'),
  (2, 'READING', '2018', 30, '1'),
  (2, 'READING', '2018', 31, '2'),
  (2, 'READING', '2018', 32, '4'),
  (2, 'READING', '2018', 33, '2'),
  (2, 'READING', '2018', 34, '2'),
  (2, 'READING', '2018', 35, '2'),
  (2, 'READING', '2018', 36, '4'),
  (2, 'READING', '2018', 37, '4'),
  (2, 'READING', '2018', 38, '2'),
  (2, 'READING', '2018', 39, '3'),
  (2, 'READING', '2018', 40, '4'),
  (2, 'READING', '2018', 41, '3'),
  (2, 'READING', '2018', 42, '2'),
  (2, 'READING', '2018', 43, '1'),
  (2, 'READING', '2018', 44, '2'),
  (2, 'READING', '2018', 45, '3'),
  (2, 'READING', '2018', 46, '4'),
  (2, 'READING', '2018', 47, '2'),
  (2, 'READING', '2018', 48, '1'),
  (2, 'READING', '2018', 49, '1'),
  (2, 'READING', '2018', 50, '2'),
  (2, 'READING', '2018', 51, '4'),
  (2, 'READING', '2018', 52, '3'),
  (2, 'READING', '2018', 53, '3'),
  (2, 'READING', '2018', 54, '1'),

  -- 解答情報の挿入（英語2018年度磯辺さん）
  (3, 'READING', '2018', 1, '4'),
  (3, 'READING', '2018', 2, '3'),
  (3, 'READING', '2018', 3, '2'),
  (3, 'READING', '2018', 4, '1'),
  (3, 'READING', '2018', 5, '4'),
  (3, 'READING', '2018', 6, '3'),
  (3, 'READING', '2018', 7, '2'),
  (3, 'READING', '2018', 8, '3'),
  (3, 'READING', '2018', 9, '2'),
  (3, 'READING', '2018', 10, '1'),
  (3, 'READING', '2018', 11, '4'),
  (3, 'READING', '2018', 12, '1'),
  (3, 'READING', '2018', 13, '3'),
  (3, 'READING', '2018', 14, '1'),
  (3, 'READING', '2018', 15, '3'),
  (3, 'READING', '2018', 16, '3'),
  (3, 'READING', '2018', 17, '3'),
  (3, 'READING', '2018', 18, '3'),
  (3, 'READING', '2018', 19, '2'),
  (3, 'READING', '2018', 20, '4'),
  (3, 'READING', '2018', 21, '2'),
  (3, 'READING', '2018', 22, '3'),
  (3, 'READING', '2018', 23, '2'),
  (3, 'READING', '2018', 24, '2'),
  (3, 'READING', '2018', 25, '4'),
  (3, 'READING', '2018', 26, '4'),
  (3, 'READING', '2018', 27, '2'),
  (3, 'READING', '2018', 30, '1'),
  (3, 'READING', '2018', 31, '3'),
  (3, 'READING', '2018', 32, '4'),
  (3, 'READING', '2018', 33, '2'),
  (3, 'READING', '2018', 34, '3'),
  (3, 'READING', '2018', 35, '2'),
  (3, 'READING', '2018', 36, '4'),
  (3, 'READING', '2018', 37, '4'),
  (3, 'READING', '2018', 38, '2'),
  (3, 'READING', '2018', 39, '3'),
  (3, 'READING', '2018', 40, '4'),
  (3, 'READING', '2018', 41, '3'),
  (3, 'READING', '2018', 42, '2'),
  (3, 'READING', '2018', 43, '2'),
  (3, 'READING', '2018', 44, '1'),
  (3, 'READING', '2018', 45, '3'),
  (3, 'READING', '2018', 46, '4'),
  (3, 'READING', '2018', 47, '2'),
  (3, 'READING', '2018', 48, '1'),
  (3, 'READING', '2018', 49, '1'),
  (3, 'READING', '2018', 50, '2'),
  (3, 'READING', '2018', 51, '4'),
  (3, 'READING', '2018', 52, '2'),
  (3, 'READING', '2018', 53, '3'),
  (3, 'READING', '2018', 54, '1'),

  -- 解答情報の挿入（英語2018年度藤岡君）
  (4, 'READING', '2018', 1, '4'),
  (4, 'READING', '2018', 2, '3'),
  (4, 'READING', '2018', 3, '2'),
  (4, 'READING', '2018', 4, '1'),
  (4, 'READING', '2018', 5, '3'),
  (4, 'READING', '2018', 6, '3'),
  (4, 'READING', '2018', 7, '2'),
  (4, 'READING', '2018', 8, '3'),
  (4, 'READING', '2018', 9, '2'),
  (4, 'READING', '2018', 10, '1'),
  (4, 'READING', '2018', 11, '4'),
  (4, 'READING', '2018', 12, '1'),
  (4, 'READING', '2018', 13, '3'),
  (4, 'READING', '2018', 14, '1'),
  (4, 'READING', '2018', 15, '3'),
  (4, 'READING', '2018', 16, '3'),
  (4, 'READING', '2018', 17, '3'),
  (4, 'READING', '2018', 18, '3'),
  (4, 'READING', '2018', 19, '2'),
  (4, 'READING', '2018', 20, '4'),
  (4, 'READING', '2018', 21, '2'),
  (4, 'READING', '2018', 22, '3'),
  (4, 'READING', '2018', 23, '2'),
  (4, 'READING', '2018', 24, '2'),
  (4, 'READING', '2018', 25, '4'),
  (4, 'READING', '2018', 26, '4'),
  (4, 'READING', '2018', 27, '2'),
  (4, 'READING', '2018', 30, '1'),
  (4, 'READING', '2018', 31, '2'),
  (4, 'READING', '2018', 32, '4'),
  (4, 'READING', '2018', 33, '2'),
  (4, 'READING', '2018', 34, '3'),
  (4, 'READING', '2018', 35, '2'),
  (4, 'READING', '2018', 36, '4'),
  (4, 'READING', '2018', 37, '4'),
  (4, 'READING', '2018', 38, '2'),
  (4, 'READING', '2018', 39, '3'),
  (4, 'READING', '2018', 40, '4'),
  (4, 'READING', '2018', 41, '3'),
  (4, 'READING', '2018', 42, '2'),
  (4, 'READING', '2018', 43, '2'),
  (4, 'READING', '2018', 44, '2'),
  (4, 'READING', '2018', 45, '3'),
  (4, 'READING', '2018', 46, '4'),
  (4, 'READING', '2018', 47, '2'),
  (4, 'READING', '2018', 48, '1'),
  (4, 'READING', '2018', 49, '1'),
  (4, 'READING', '2018', 50, '2'),
  (4, 'READING', '2018', 51, '4'),
  (4, 'READING', '2018', 52, '3'),
  (4, 'READING', '2018', 53, '4'),
  (4, 'READING', '2018', 54, '1');


INSERT INTO test_answer (user_id, subject, year, question_number, answer)
VALUES 
-- 解答情報の挿入（数学1A 2015年度あなた）
  (1, 'MATH1A', '2015', 1, 'CORRECT'),
  (1, 'MATH1A', '2015', 2, 'CORRECT'),
  (1, 'MATH1A', '2015', 3, 'CORRECT'),
  (1, 'MATH1A', '2015', 4, 'CORRECT'),
  (1, 'MATH1A', '2015', 5, 'INCORRECT'),
  (1, 'MATH1A', '2015', 6, 'CORRECT'),
  (1, 'MATH1A', '2015', 7, 'CORRECT'),
  (1, 'MATH1A', '2015', 8, 'CORRECT'),
  (1, 'MATH1A', '2015', 9, 'CORRECT'),
  (1, 'MATH1A', '2015', 10, 'CORRECT'),
  (1, 'MATH1A', '2015', 11, 'CORRECT'),
  (1, 'MATH1A', '2015', 12, 'CORRECT'),
  (1, 'MATH1A', '2015', 13, 'INCORRECT'),
  (1, 'MATH1A', '2015', 14, 'CORRECT'),
  (1, 'MATH1A', '2015', 15, 'CORRECT'),
  (1, 'MATH1A', '2015', 16, 'CORRECT'),
  (1, 'MATH1A', '2015', 17, 'INCORRECT'),
  (1, 'MATH1A', '2015', 18, 'CORRECT'),
  (1, 'MATH1A', '2015', 19, 'CORRECT'),
  (1, 'MATH1A', '2015', 20, 'CORRECT'),
  (1, 'MATH1A', '2015', 21, 'CORRECT'),
  (1, 'MATH1A', '2015', 22, 'CORRECT'),
  (1, 'MATH1A', '2015', 23, 'CORRECT'),
  (1, 'MATH1A', '2015', 24, 'CORRECT'),
  (1, 'MATH1A', '2015', 25, 'INCORRECT'),
  (1, 'MATH1A', '2015', 26, 'SKIPPED'),
  (1, 'MATH1A', '2015', 27, 'SKIPPED'),
  (1, 'MATH1A', '2015', 28, 'SKIPPED'),
  (1, 'MATH1A', '2015', 29, 'SKIPPED'),
  (1, 'MATH1A', '2015', 30, 'SKIPPED'),
  (1, 'MATH1A', '2015', 31, 'SKIPPED'),
  (1, 'MATH1A', '2015', 32, 'SKIPPED'),
  (1, 'MATH1A', '2015', 33, 'CORRECT'),
  (1, 'MATH1A', '2015', 34, 'CORRECT'),
  (1, 'MATH1A', '2015', 35, 'CORRECT'),
  (1, 'MATH1A', '2015', 36, 'CORRECT'),
  (1, 'MATH1A', '2015', 37, 'CORRECT'),
  (1, 'MATH1A', '2015', 38, 'INCORRECT'),

-- フレンドの解答情報（大貫君）
  (2, 'MATH1A', '2015', 1, 'CORRECT'),
  (2, 'MATH1A', '2015', 2, 'CORRECT'),
  (2, 'MATH1A', '2015', 3, 'CORRECT'),
  (2, 'MATH1A', '2015', 4, 'INCORRECT'),
  (2, 'MATH1A', '2015', 5, 'INCORRECT'),
  (2, 'MATH1A', '2015', 6, 'CORRECT'),
  (2, 'MATH1A', '2015', 7, 'CORRECT'),
  (2, 'MATH1A', '2015', 8, 'CORRECT'),
  (2, 'MATH1A', '2015', 9, 'CORRECT'),
  (2, 'MATH1A', '2015', 10, 'CORRECT'),
  (2, 'MATH1A', '2015', 11, 'CORRECT'),
  (2, 'MATH1A', '2015', 12, 'INCORRECT'),
  (2, 'MATH1A', '2015', 13, 'INCORRECT'),
  (2, 'MATH1A', '2015', 14, 'CORRECT'),
  (2, 'MATH1A', '2015', 15, 'CORRECT'),
  (2, 'MATH1A', '2015', 16, 'INCORRECT'),
  (2, 'MATH1A', '2015', 17, 'INCORRECT'),
  (2, 'MATH1A', '2015', 18, 'CORRECT'),
  (2, 'MATH1A', '2015', 19, 'CORRECT'),
  (2, 'MATH1A', '2015', 20, 'CORRECT'),
  (2, 'MATH1A', '2015', 21, 'CORRECT'),
  (2, 'MATH1A', '2015', 22, 'CORRECT'),
  (2, 'MATH1A', '2015', 23, 'CORRECT'),
  (2, 'MATH1A', '2015', 24, 'INCORRECT'),
  (2, 'MATH1A', '2015', 25, 'INCORRECT'),
  (2, 'MATH1A', '2015', 26, 'SKIPPED'),
  (2, 'MATH1A', '2015', 27, 'SKIPPED'),
  (2, 'MATH1A', '2015', 28, 'SKIPPED'),
  (2, 'MATH1A', '2015', 29, 'SKIPPED'),
  (2, 'MATH1A', '2015', 30, 'SKIPPED'),
  (2, 'MATH1A', '2015', 31, 'SKIPPED'),
  (2, 'MATH1A', '2015', 32, 'SKIPPED'),
  (2, 'MATH1A', '2015', 33, 'CORRECT'),
  (2, 'MATH1A', '2015', 34, 'CORRECT'),
  (2, 'MATH1A', '2015', 35, 'CORRECT'),
  (2, 'MATH1A', '2015', 36, 'CORRECT'),
  (2, 'MATH1A', '2015', 37, 'INCORRECT'),
  (2, 'MATH1A', '2015', 38, 'INCORRECT'),

-- フレンドの解答情報（磯辺さん）
  (3, 'MATH1A', '2015', 1, 'CORRECT'),
  (3, 'MATH1A', '2015', 2, 'CORRECT'),
  (3, 'MATH1A', '2015', 3, 'CORRECT'),
  (3, 'MATH1A', '2015', 4, 'CORRECT'),
  (3, 'MATH1A', '2015', 5, 'INCORRECT'),
  (3, 'MATH1A', '2015', 6, 'CORRECT'),
  (3, 'MATH1A', '2015', 7, 'CORRECT'),
  (3, 'MATH1A', '2015', 8, 'CORRECT'),
  (3, 'MATH1A', '2015', 9, 'CORRECT'),
  (3, 'MATH1A', '2015', 10, 'CORRECT'),
  (3, 'MATH1A', '2015', 11, 'CORRECT'),
  (3, 'MATH1A', '2015', 12, 'CORRECT'),
  (3, 'MATH1A', '2015', 13, 'INCORRECT'),
  (3, 'MATH1A', '2015', 14, 'CORRECT'),
  (3, 'MATH1A', '2015', 15, 'CORRECT'),
  (3, 'MATH1A', '2015', 16, 'CORRECT'),
  (3, 'MATH1A', '2015', 17, 'INCORRECT'),
  (3, 'MATH1A', '2015', 18, 'CORRECT'),
  (3, 'MATH1A', '2015', 19, 'CORRECT'),
  (3, 'MATH1A', '2015', 20, 'CORRECT'),
  (3, 'MATH1A', '2015', 21, 'CORRECT'),
  (3, 'MATH1A', '2015', 22, 'CORRECT'),
  (3, 'MATH1A', '2015', 23, 'CORRECT'),
  (3, 'MATH1A', '2015', 24, 'CORRECT'),
  (3, 'MATH1A', '2015', 25, 'INCORRECT'),
  (3, 'MATH1A', '2015', 26, 'SKIPPED'),
  (3, 'MATH1A', '2015', 27, 'SKIPPED'),
  (3, 'MATH1A', '2015', 28, 'SKIPPED'),
  (3, 'MATH1A', '2015', 29, 'SKIPPED'),
  (3, 'MATH1A', '2015', 30, 'SKIPPED'),
  (3, 'MATH1A', '2015', 31, 'SKIPPED'),
  (3, 'MATH1A', '2015', 32, 'SKIPPED'),
  (3, 'MATH1A', '2015', 33, 'CORRECT'),
  (3, 'MATH1A', '2015', 34, 'CORRECT'),
  (3, 'MATH1A', '2015', 35, 'CORRECT'),
  (3, 'MATH1A', '2015', 36, 'CORRECT'),
  (3, 'MATH1A', '2015', 37, 'CORRECT'),
  (3, 'MATH1A', '2015', 38, 'INCORRECT'),

-- フレンドの解答情報（藤岡優仁）
  (4, 'MATH1A', '2015', 1, 'CORRECT'),
  (4, 'MATH1A', '2015', 2, 'CORRECT'),
  (4, 'MATH1A', '2015', 3, 'CORRECT'),
  (4, 'MATH1A', '2015', 4, 'INCORRECT'),
  (4, 'MATH1A', '2015', 5, 'INCORRECT'),
  (4, 'MATH1A', '2015', 6, 'CORRECT'),
  (4, 'MATH1A', '2015', 7, 'CORRECT'),
  (4, 'MATH1A', '2015', 8, 'CORRECT'),
  (4, 'MATH1A', '2015', 9, 'CORRECT'),
  (4, 'MATH1A', '2015', 10, 'CORRECT'),
  (4, 'MATH1A', '2015', 11, 'CORRECT'),
  (4, 'MATH1A', '2015', 12, 'INCORRECT'),
  (4, 'MATH1A', '2015', 13, 'INCORRECT'),
  (4, 'MATH1A', '2015', 14, 'CORRECT'),
  (4, 'MATH1A', '2015', 15, 'CORRECT'),
  (4, 'MATH1A', '2015', 16, 'INCORRECT'),
  (4, 'MATH1A', '2015', 17, 'INCORRECT'),
  (4, 'MATH1A', '2015', 18, 'CORRECT'),
  (4, 'MATH1A', '2015', 19, 'CORRECT'),
  (4, 'MATH1A', '2015', 20, 'CORRECT'),
  (4, 'MATH1A', '2015', 21, 'CORRECT'),
  (4, 'MATH1A', '2015', 22, 'CORRECT'),
  (4, 'MATH1A', '2015', 23, 'CORRECT'),
  (4, 'MATH1A', '2015', 24, 'INCORRECT'),
  (4, 'MATH1A', '2015', 25, 'INCORRECT'),
  (4, 'MATH1A', '2015', 26, 'SKIPPED'),
  (4, 'MATH1A', '2015', 27, 'SKIPPED'),
  (4, 'MATH1A', '2015', 28, 'SKIPPED'),
  (4, 'MATH1A', '2015', 29, 'SKIPPED'),
  (4, 'MATH1A', '2015', 30, 'SKIPPED'),
  (4, 'MATH1A', '2015', 31, 'SKIPPED'),
  (4, 'MATH1A', '2015', 32, 'SKIPPED'),
  (4, 'MATH1A', '2015', 33, 'CORRECT'),
  (4, 'MATH1A', '2015', 34, 'CORRECT'),
  (4, 'MATH1A', '2015', 35, 'CORRECT'),
  (4, 'MATH1A', '2015', 36, 'CORRECT'),
  (4, 'MATH1A', '2015', 37, 'INCORRECT'),
  (4, 'MATH1A', '2015', 38, 'INCORRECT');

-- 仮でカード用データの挿入
-- INSERT INTO tests (user_id, subject, year, score, percentage, date, memo)
-- VALUES
-- (1, 'READING', '2017', 100, 50, '2025-03-26', 'この日は調子が悪かったんだ。'),
-- (1, 'READING', '2019', 140, 70, '2025-05-26', 'この日は調子が悪かったんだ。'),
-- (1, 'READING', '2020', 160, 80, '2025-06-26', 'この日は調子が悪かったんだ。'),
-- (1, 'READING', '2021', 180, 90, '2025-07-26', 'この日は調子が悪かったんだ。'),
-- (1, 'READING', '2022', 160, 80, '2025-08-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2017', 50, 50, '2025-03-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2018', 60, 60, '2025-04-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2019', 70, 70, '2025-05-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2020', 80, 80, '2025-06-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2021', 90, 90, '2025-07-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH1A', '2022', 80, 80, '2025-08-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2017', 50, 50, '2025-03-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2018', 60, 60, '2025-04-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2019', 70, 70, '2025-05-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2020', 80, 80, '2025-06-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2021', 90, 90, '2025-07-26', 'この日は調子が悪かったんだ。'),
-- (1, 'MATH2B', '2022', 80, 80, '2025-08-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2017', 50, 50, '2025-03-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2018', 60, 60, '2025-04-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2019', 70, 70, '2025-05-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2020', 80, 80, '2025-06-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2021', 90, 90, '2025-07-26', 'この日は調子が悪かったんだ。'),
-- (1, 'CHEMISTRY', '2022', 80, 80, '2025-08-26', 'この日は調子が悪かったんだ。');

INSERT INTO tests_target (user_id, subject, target_percentage, target_month, target_memo)
VALUES
(1, 'READING', 30, '2025-01', 'この日はいい点が取れそうだ。'),
(1, 'READING', 40, '2025-02', 'この日はいい点が取れそうだ。'),
(1, 'READING', 50, '2025-03', 'この日はいい点が取れそうだ。'),
(1, 'READING', 60, '2025-04', 'この日はいい点が取れそうだ。'),
(1, 'READING', 70, '2025-05', 'この日はいい点が取れそうだ。'),
(1, 'READING', 80, '2025-06', 'この日はいい点が取れそうだ。'),
(1, 'READING', 90, '2025-07', 'この日はいい点が取れそうだ。'),
(1, 'READING', 80, '2025-08', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 30, '2025-01', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 40, '2025-02', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 50, '2025-03', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 60, '2025-04', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 70, '2025-05', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 80, '2025-06', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 90, '2025-07', 'この日はいい点が取れそうだ。'),
(1, 'MATH1A', 80, '2025-08', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 30, '2025-01', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 40, '2025-02', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 50, '2025-03', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 60, '2025-04', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 70, '2025-05', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 80, '2025-06', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 90, '2025-07', 'この日はいい点が取れそうだ。'),
(1, 'MATH2B', 80, '2025-08', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 30, '2025-01', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 40, '2025-02', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 50, '2025-03', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 60, '2025-04', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 70, '2025-05', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 80, '2025-06', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 90, '2025-07', 'この日はいい点が取れそうだ。'),
(1, 'CHEMISTRY', 80, '2025-08', 'この日はいい点が取れそうだ。');

-- ユーザー1が他のユーザーをフォロー
INSERT INTO user_follows (follower_id, following_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1),
(4, 1),
(1, 4);


-- トランザクションをコミット
COMMIT;