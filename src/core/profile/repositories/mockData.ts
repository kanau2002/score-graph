// //src/core/profile/repositories/mockData.ts
// // モックデータ

// import { Answer, AnsweredData, Subject } from "../type";

// const mockProfileData = {
//   userName: "植田佳和侑",
//   targetUniversities: [
//     "千葉大学-理学部-地球科学科",
//     "明治大学-農学部-農学科",
//     "東京農業大学-農学部-農学科",
//   ],
//   memo: "サッカー部の活動時間が長く、勉強時間が1日2時間程度しか取れていないため、内職をして時間を確保したり、過去問をもとに本当に必要なものを優先したりと工夫して勉強しています。",
// };

// const mockCardDatas = [
//   {
//     subject: Subject.READING,
//     finalScoreTarget: 84,
//     finalScoreLowest: 70,
//     memo: "英語は1月から英語長文ポラリス1の文を例文としてスラスラ言えるレベルをテーマに30分/日音読をしたことで伸びた気がします。",
//     testResults: [
//       {
//         id: 8,
//         date: "2024/08/01",
//         year: "2018",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 7,
//         date: "2024/07/01",
//         year: "2017",
//         targetScore: 70,
//         studentScore: 65,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 6,
//         date: "2024/06/01",
//         year: "2016",
//         targetScore: 85,
//         studentScore: 80,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 5,
//         date: "2024/05/01",
//         year: "2015",
//         targetScore: 90,
//         studentScore: 85,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 4,
//         date: "2024/04/01",
//         year: "2014",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 3,
//         date: "2024/03/01",
//         year: "2013",
//         targetScore: 60,
//         studentScore: 55,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 2,
//         date: "2024/02/01",
//         year: "2012",
//         targetScore: 40,
//         studentScore: 45,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 1,
//         date: "2024/01/01",
//         year: "2011",
//         targetScore: 10,
//         studentScore: 15,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//     ],
//   },
//   {
//     subject: Subject.MATH1A,
//     finalScoreTarget: 75,
//     finalScoreLowest: 60,
//     memo: "数1Aは基礎問を2周回したら70点台に乗りました。とてもおすすめなのでぜひやってみてください。",
//     testResults: [
//       {
//         id: 8,
//         date: "2024/08/01",
//         year: "2018",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 7,
//         date: "2024/07/01",
//         year: "2017",
//         targetScore: 70,
//         studentScore: 65,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 6,
//         date: "2024/06/01",
//         year: "2016",
//         targetScore: 85,
//         studentScore: 80,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 5,
//         date: "2024/05/01",
//         year: "2015",
//         targetScore: 90,
//         studentScore: 85,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 4,
//         date: "2024/04/01",
//         year: "2014",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 3,
//         date: "2024/03/01",
//         year: "2013",
//         targetScore: 60,
//         studentScore: 55,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 2,
//         date: "2024/02/01",
//         year: "2012",
//         targetScore: 40,
//         studentScore: 45,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 1,
//         date: "2024/01/01",
//         year: "2011",
//         targetScore: 10,
//         studentScore: 15,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//     ],
//   },
//   {
//     subject: Subject.MATH2B,
//     finalScoreTarget: 75,
//     finalScoreLowest: 60,
//     memo: "数2Bは基礎問を3周回したら70点台に乗りました。たくさん演習を積むことが大事だと思います。",
//     testResults: [
//       {
//         id: 8,
//         date: "2024/08/01",
//         year: "2018",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 7,
//         date: "2024/07/01",
//         year: "2017",
//         targetScore: 70,
//         studentScore: 65,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 6,
//         date: "2024/06/01",
//         year: "2016",
//         targetScore: 85,
//         studentScore: 80,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 5,
//         date: "2024/05/01",
//         year: "2015",
//         targetScore: 90,
//         studentScore: 85,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 4,
//         date: "2024/04/01",
//         year: "2014",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 3,
//         date: "2024/03/01",
//         year: "2013",
//         targetScore: 60,
//         studentScore: 55,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 2,
//         date: "2024/02/01",
//         year: "2012",
//         targetScore: 40,
//         studentScore: 45,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 1,
//         date: "2024/01/01",
//         year: "2011",
//         targetScore: 10,
//         studentScore: 15,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//     ],
//   },
//   {
//     subject: Subject.CHEMISTRY,
//     finalScoreTarget: 75,
//     finalScoreLowest: 65,
//     memo: "共通テストの化学は本当に難しいので目標の点数は低めに設定しました。",
//     testResults: [
//       {
//         id: 8,
//         date: "2024/08/01",
//         year: "2018",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 7,
//         date: "2024/07/01",
//         year: "2017",
//         targetScore: 70,
//         studentScore: 65,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 6,
//         date: "2024/06/01",
//         year: "2016",
//         targetScore: 85,
//         studentScore: 80,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 5,
//         date: "2024/05/01",
//         year: "2015",
//         targetScore: 90,
//         studentScore: 85,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 4,
//         date: "2024/04/01",
//         year: "2014",
//         targetScore: 80,
//         studentScore: 75,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 3,
//         date: "2024/03/01",
//         year: "2013",
//         targetScore: 60,
//         studentScore: 55,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 2,
//         date: "2024/02/01",
//         year: "2012",
//         targetScore: 40,
//         studentScore: 45,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//       {
//         id: 1,
//         date: "2024/01/01",
//         year: "2011",
//         targetScore: 10,
//         studentScore: 15,
//         memo: "この日は調子が悪かったのでしょうがなかった。",
//       },
//     ],
//   },
// ];

// const mockStudentData_Reading_2018: AnsweredData = {
//   id: 1,
//   name: "あなた",
//   score: 150,
//   percentage: 75,
//   targetPercentage: 70,
//   date: "2024/01/26",
//   memo: "今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。",
//   sectionTotals: {
//     1: 12, // 大問1の小計
//     2: 47, // 大問2の小計
//     3: 17, // 大問3の小計
//     4: 35, // 大問4の小計
//     5: 18, // 大問5の小計
//     6: 30, // 大問6の小計
//   },
//   sectionPercentages: {
//     1: 86,
//     2: 100,
//     3: 74,
//     4: 88,
//     5: 60,
//     6: 83,
//   },
//   targetSectionTotals: {
//     1: 12, // 大問1の小計目標
//     2: 30, // 大問2の小計目標
//     3: 18, // 大問3の小計目標
//     4: 25, // 大問4の小計目標
//     5: 18, // 大問5の小計目標
//     6: 25, // 大問6の小計目標
//   },
//   targetSectionPercentages: {
//     1: 86,
//     2: 64,
//     3: 78,
//     4: 63,
//     5: 60,
//     6: 69,
//   },
//   answers: {
//     1: 4,
//     2: 3,
//     3: 2,
//     4: 1,
//     5: 3,
//     6: 3,
//     7: 2,
//     8: 3,
//     9: 2,
//     10: 1,
//     11: 4,
//     12: 1,
//     13: 3,
//     14: 1,
//     15: 3,
//     16: 3,
//     17: 3,
//     18: 3,
//     19: 2,
//     20: 4,
//     21: 2,
//     22: 3,
//     23: 2,
//     24: 2,
//     25: 4,
//     26: 8,
//     27: 2,
//     30: 1,
//     31: 2,
//     32: 4,
//     33: 2,
//     34: 3,
//     35: 1,
//     36: 4,
//     37: 4,
//     38: 2,
//     39: 3,
//     40: 4,
//     41: 3,
//     42: 2,
//     43: 2,
//     44: 2,
//     45: 4,
//     46: 4,
//     47: 2,
//     48: 1,
//     49: 1,
//     50: 2,
//     51: 4,
//     52: 3,
//     53: 4,
//     54: 1,
//   },
// };

// const mockStudentData_Math1A_2015: AnsweredData = {
//   id: 1,
//   name: "あなた",
//   score: 86,
//   percentage: 86,
//   targetPercentage: 75,
//   date: "2024/01/26",
//   memo: "今回の数1Aは実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。",
//   sectionTotals: {
//     1: 17, // 大問1の小計
//     2: 22, // 大問2の小計
//     3: 13, // 大問3の小計
//     4: 17, // 大問4の小計
//     5: 0, // 大問5の小計
//     6: 17, // 大問6の小計
//   },
//   sectionPercentages: {
//     1: 85,
//     2: 88,
//     3: 87,
//     4: 85,
//     5: 0,
//     6: 85,
//   },
//   targetSectionTotals: {
//     1: 15, // 大問1の小計目標
//     2: 20, // 大問2の小計目標
//     3: 10, // 大問3の小計目標
//     4: 15, // 大問4の小計目標
//     5: 0, // 大問5の小計目標
//     6: 15, // 大問6の小計目標
//   },
//   targetSectionPercentages: {
//     1: 75,
//     2: 80,
//     3: 67,
//     4: 75,
//     5: 0,
//     6: 75,
//   },
//   answers: {
//     1: Answer.CORRECT,
//     2: Answer.CORRECT,
//     3: Answer.CORRECT,
//     4: Answer.CORRECT,
//     5: Answer.INCORRECT,
//     6: Answer.CORRECT,
//     7: Answer.CORRECT,
//     8: Answer.CORRECT,
//     9: Answer.CORRECT,
//     10: Answer.CORRECT,
//     11: Answer.CORRECT,
//     12: Answer.CORRECT,
//     13: Answer.INCORRECT,
//     14: Answer.CORRECT,
//     15: Answer.CORRECT,
//     16: Answer.CORRECT,
//     17: Answer.INCORRECT,
//     18: Answer.CORRECT,
//     19: Answer.CORRECT,
//     20: Answer.CORRECT,
//     21: Answer.CORRECT,
//     22: Answer.CORRECT,
//     23: Answer.CORRECT,
//     24: Answer.CORRECT,
//     25: Answer.INCORRECT,
//     26: Answer.SKIPPED,
//     27: Answer.SKIPPED,
//     28: Answer.SKIPPED,
//     29: Answer.SKIPPED,
//     30: Answer.SKIPPED,
//     31: Answer.SKIPPED,
//     32: Answer.SKIPPED,
//     33: Answer.CORRECT,
//     34: Answer.CORRECT,
//     35: Answer.CORRECT,
//     36: Answer.CORRECT,
//     37: Answer.CORRECT,
//     38: Answer.INCORRECT,
//   },
// };

// // const mockFriendsData_Reading_2018: Friend[] = [
// //   {
// //     id: 1,
// //     name: "大貫しもん",
// //     score: 144,
// //     percentage: 72,
// //     targetPercentage: 80,
// //     date: "2024/01/26",
// //     memo: "今回は体調がすぐれなかった。",
// //     sectionTotals: {
// //       1: 12, // 大問1の小計
// //       2: 38, // 大問2の小計
// //       3: 17, // 大問3の小計
// //       4: 35, // 大問4の小計
// //       5: 18, // 大問5の小計
// //       6: 30, // 大問6の小計
// //     },
// //     sectionPercentages: {
// //       1: 86,
// //       2: 81,
// //       3: 74,
// //       4: 88,
// //       5: 60,
// //       6: 83,
// //     },
// //     targetSectionTotals: {
// //       1: 12, // 大問1の小計目標
// //       2: 30, // 大問2の小計目標
// //       3: 18, // 大問3の小計目標
// //       4: 25, // 大問4の小計目標
// //       5: 18, // 大問5の小計目標
// //       6: 25, // 大問6の小計目標
// //     },
// //     targetSectionPercentages: {
// //       1: 86,
// //       2: 64,
// //       3: 78,
// //       4: 63,
// //       5: 60,
// //       6: 69,
// //     },
// //     answers: {
// //       1: 4,
// //       2: 3,
// //       3: 2,
// //       4: 1,
// //       5: 4,
// //       6: 3,
// //       7: 1,
// //       8: 3,
// //       9: 2,
// //       10: 1,
// //       11: 4,
// //       12: 1,
// //       13: 3,
// //       14: 1,
// //       15: 3,
// //       16: 3,
// //       17: 3,
// //       18: 3,
// //       19: 2,
// //       20: 4,
// //       21: 2,
// //       22: 3,
// //       23: 1,
// //       24: 2,
// //       25: 2,
// //       26: 8,
// //       27: 2,
// //       30: 1,
// //       31: 2,
// //       32: 4,
// //       33: 2,
// //       34: 2,
// //       35: 2,
// //       36: 4,
// //       37: 4,
// //       38: 2,
// //       39: 3,
// //       40: 4,
// //       41: 3,
// //       42: 2,
// //       43: 1,
// //       44: 2,
// //       45: 3,
// //       46: 4,
// //       47: 2,
// //       48: 1,
// //       49: 1,
// //       50: 2,
// //       51: 4,
// //       52: 3,
// //       53: 3,
// //       54: 1,
// //     },
// //   },
// //   {
// //     id: 2,
// //     name: "磯辺恵美理",
// //     score: 200,
// //     percentage: 100,
// //     targetPercentage: 100,
// //     date: "2024/01/27",
// //     memo: "満点取れて安心した。",
// //     sectionTotals: {
// //       1: 14, // 大問1の小計
// //       2: 47, // 大問2の小計
// //       3: 23, // 大問3の小計
// //       4: 40, // 大問4の小計
// //       5: 30, // 大問5の小計
// //       6: 36, // 大問6の小計
// //     },
// //     sectionPercentages: {
// //       1: 100,
// //       2: 100,
// //       3: 100,
// //       4: 100,
// //       5: 100,
// //       6: 100,
// //     },
// //     targetSectionTotals: {
// //       1: 14, // 大問1の小計目標
// //       2: 47, // 大問2の小計目標
// //       3: 23, // 大問3の小計目標
// //       4: 40, // 大問4の小計目標
// //       5: 30, // 大問5の小計目標
// //       6: 36, // 大問6の小計目標
// //     },
// //     targetSectionPercentages: {
// //       1: 100,
// //       2: 100,
// //       3: 100,
// //       4: 100,
// //       5: 100,
// //       6: 100,
// //     },
// //     answers: {
// //       1: 4,
// //       2: 3,
// //       3: 2,
// //       4: 1,
// //       5: 4,
// //       6: 3,
// //       7: 2,
// //       8: 3,
// //       9: 2,
// //       10: 1,
// //       11: 4,
// //       12: 1,
// //       13: 3,
// //       14: 1,
// //       15: 3,
// //       16: 3,
// //       17: 3,
// //       18: 3,
// //       19: 2,
// //       20: 4,
// //       21: 2,
// //       22: 3,
// //       23: 2,
// //       24: 2,
// //       25: 4,
// //       26: 8,
// //       27: 2,
// //       30: 1,
// //       31: 3,
// //       32: 4,
// //       33: 2,
// //       34: 3,
// //       35: 2,
// //       36: 4,
// //       37: 4,
// //       38: 2,
// //       39: 3,
// //       40: 4,
// //       41: 3,
// //       42: 2,
// //       43: 2,
// //       44: 1,
// //       45: 3,
// //       46: 4,
// //       47: 2,
// //       48: 1,
// //       49: 1,
// //       50: 2,
// //       51: 4,
// //       52: 2,
// //       53: 3,
// //       54: 1,
// //     },
// //   },
// //   {
// //     id: 3,
// //     name: "藤岡優仁",
// //     score: 156,
// //     percentage: 78,
// //     targetPercentage: 90,
// //     date: "2024/01/28",
// //     memo: "英語長文ポラリス1を音読した成果が出てよかった。",
// //     sectionTotals: {
// //       1: 12, // 大問1の小計
// //       2: 47, // 大問2の小計
// //       3: 17, // 大問3の小計
// //       4: 40, // 大問4の小計
// //       5: 24, // 大問5の小計
// //       6: 30, // 大問6の小計
// //     },
// //     sectionPercentages: {
// //       1: 86,
// //       2: 100,
// //       3: 74,
// //       4: 100,
// //       5: 80,
// //       6: 83,
// //     },
// //     targetSectionTotals: {
// //       1: 12, // 大問1の小計目標
// //       2: 30, // 大問2の小計目標
// //       3: 18, // 大問3の小計目標
// //       4: 25, // 大問4の小計目標
// //       5: 18, // 大問5の小計目標
// //       6: 25, // 大問6の小計目標
// //     },
// //     targetSectionPercentages: {
// //       1: 86,
// //       2: 64,
// //       3: 78,
// //       4: 63,
// //       5: 60,
// //       6: 69,
// //     },
// //     answers: {
// //       1: 4,
// //       2: 3,
// //       3: 2,
// //       4: 1,
// //       5: 3,
// //       6: 3,
// //       7: 2,
// //       8: 3,
// //       9: 2,
// //       10: 1,
// //       11: 4,
// //       12: 1,
// //       13: 3,
// //       14: 1,
// //       15: 3,
// //       16: 3,
// //       17: 3,
// //       18: 3,
// //       19: 2,
// //       20: 4,
// //       21: 2,
// //       22: 3,
// //       23: 2,
// //       24: 2,
// //       25: 4,
// //       26: 8,
// //       27: 2,
// //       30: 1,
// //       31: 2,
// //       32: 4,
// //       33: 2,
// //       34: 3,
// //       35: 2,
// //       36: 4,
// //       37: 4,
// //       38: 2,
// //       39: 3,
// //       40: 4,
// //       41: 3,
// //       42: 2,
// //       43: 2,
// //       44: 2,
// //       45: 3,
// //       46: 4,
// //       47: 2,
// //       48: 1,
// //       49: 1,
// //       50: 2,
// //       51: 4,
// //       52: 3,
// //       53: 4,
// //       54: 1,
// //     },
// //   },
// // ];

// const mockFriendsData_Math1A_2015: AnsweredData[] = [
//   {
//     id: 10,
//     name: "大貫しもん",
//     score: 86,
//     percentage: 86,
//     targetPercentage: 75,
//     date: "2024/01/26",
//     memo: "今回の数1Aは体調が悪くて大変だったけど目標点を越えられてよかった。",
//     sectionTotals: {
//       1: 17, // 大問1の小計
//       2: 22, // 大問2の小計
//       3: 13, // 大問3の小計
//       4: 17, // 大問4の小計
//       5: 0, // 大問5の小計
//       6: 17, // 大問6の小計
//     },
//     sectionPercentages: {
//       1: 85,
//       2: 88,
//       3: 87,
//       4: 85,
//       5: 0,
//       6: 85,
//     },
//     targetSectionTotals: {
//       1: 15, // 大問1の小計目標
//       2: 20, // 大問2の小計目標
//       3: 10, // 大問3の小計目標
//       4: 15, // 大問4の小計目標
//       5: 0, // 大問5の小計目標
//       6: 15, // 大問6の小計目標
//     },
//     targetSectionPercentages: {
//       1: 75,
//       2: 80,
//       3: 67,
//       4: 75,
//       5: 0,
//       6: 75,
//     },
//     answers: {
//       1: Answer.CORRECT,
//       2: Answer.CORRECT,
//       3: Answer.CORRECT,
//       4: Answer.CORRECT,
//       5: Answer.INCORRECT,
//       6: Answer.CORRECT,
//       7: Answer.CORRECT,
//       8: Answer.CORRECT,
//       9: Answer.CORRECT,
//       10: Answer.CORRECT,
//       11: Answer.CORRECT,
//       12: Answer.CORRECT,
//       13: Answer.INCORRECT,
//       14: Answer.CORRECT,
//       15: Answer.CORRECT,
//       16: Answer.CORRECT,
//       17: Answer.INCORRECT,
//       18: Answer.CORRECT,
//       19: Answer.CORRECT,
//       20: Answer.CORRECT,
//       21: Answer.CORRECT,
//       22: Answer.CORRECT,
//       23: Answer.CORRECT,
//       24: Answer.CORRECT,
//       25: Answer.INCORRECT,
//       26: Answer.SKIPPED,
//       27: Answer.SKIPPED,
//       28: Answer.SKIPPED,
//       29: Answer.SKIPPED,
//       30: Answer.SKIPPED,
//       31: Answer.SKIPPED,
//       32: Answer.SKIPPED,
//       33: Answer.CORRECT,
//       34: Answer.CORRECT,
//       35: Answer.CORRECT,
//       36: Answer.CORRECT,
//       37: Answer.CORRECT,
//       38: Answer.INCORRECT,
//     },
//   },
//   {
//     id: 11,
//     name: "磯辺恵美理",
//     score: 86,
//     percentage: 86,
//     targetPercentage: 75,
//     date: "2024/01/26",
//     memo: "数1Aは死ぬと思ってたけど思ったよりも点が取れて嬉しかった。",
//     sectionTotals: {
//       1: 17, // 大問1の小計
//       2: 22, // 大問2の小計
//       3: 13, // 大問3の小計
//       4: 17, // 大問4の小計
//       5: 0, // 大問5の小計
//       6: 17, // 大問6の小計
//     },
//     sectionPercentages: {
//       1: 85,
//       2: 88,
//       3: 87,
//       4: 85,
//       5: 0,
//       6: 85,
//     },
//     targetSectionTotals: {
//       1: 15, // 大問1の小計目標
//       2: 20, // 大問2の小計目標
//       3: 10, // 大問3の小計目標
//       4: 15, // 大問4の小計目標
//       5: 0, // 大問5の小計目標
//       6: 15, // 大問6の小計目標
//     },
//     targetSectionPercentages: {
//       1: 75,
//       2: 80,
//       3: 67,
//       4: 75,
//       5: 0,
//       6: 75,
//     },
//     answers: {
//       1: Answer.CORRECT,
//       2: Answer.CORRECT,
//       3: Answer.CORRECT,
//       4: Answer.CORRECT,
//       5: Answer.INCORRECT,
//       6: Answer.CORRECT,
//       7: Answer.CORRECT,
//       8: Answer.CORRECT,
//       9: Answer.CORRECT,
//       10: Answer.CORRECT,
//       11: Answer.CORRECT,
//       12: Answer.CORRECT,
//       13: Answer.INCORRECT,
//       14: Answer.CORRECT,
//       15: Answer.CORRECT,
//       16: Answer.CORRECT,
//       17: Answer.INCORRECT,
//       18: Answer.CORRECT,
//       19: Answer.CORRECT,
//       20: Answer.CORRECT,
//       21: Answer.CORRECT,
//       22: Answer.CORRECT,
//       23: Answer.CORRECT,
//       24: Answer.CORRECT,
//       25: Answer.INCORRECT,
//       26: Answer.SKIPPED,
//       27: Answer.SKIPPED,
//       28: Answer.SKIPPED,
//       29: Answer.SKIPPED,
//       30: Answer.SKIPPED,
//       31: Answer.SKIPPED,
//       32: Answer.SKIPPED,
//       33: Answer.CORRECT,
//       34: Answer.CORRECT,
//       35: Answer.CORRECT,
//       36: Answer.CORRECT,
//       37: Answer.CORRECT,
//       38: Answer.INCORRECT,
//     },
//   },
//   {
//     id: 12,
//     name: "藤岡優仁",
//     score: 86,
//     percentage: 86,
//     targetPercentage: 75,
//     date: "2024/01/26",
//     memo: "数1Aは基礎問2周しただけだけど結構点数取れてよかった。",
//     sectionTotals: {
//       1: 15, // 大問1の小計
//       2: 19, // 大問2の小計
//       3: 7, // 大問3の小計
//       4: 15, // 大問4の小計
//       5: 0, // 大問5の小計
//       6: 13, // 大問6の小計
//     },
//     sectionPercentages: {
//       1: 75,
//       2: 76,
//       3: 54,
//       4: 75,
//       5: 0,
//       6: 65,
//     },
//     targetSectionTotals: {
//       1: 15, // 大問1の小計目標
//       2: 20, // 大問2の小計目標
//       3: 10, // 大問3の小計目標
//       4: 15, // 大問4の小計目標
//       5: 0, // 大問5の小計目標
//       6: 15, // 大問6の小計目標
//     },
//     targetSectionPercentages: {
//       1: 75,
//       2: 80,
//       3: 67,
//       4: 75,
//       5: 0,
//       6: 75,
//     },
//     answers: {
//       1: Answer.CORRECT,
//       2: Answer.CORRECT,
//       3: Answer.CORRECT,
//       4: Answer.INCORRECT,
//       5: Answer.INCORRECT,
//       6: Answer.CORRECT,
//       7: Answer.CORRECT,
//       8: Answer.CORRECT,
//       9: Answer.CORRECT,
//       10: Answer.CORRECT,
//       11: Answer.CORRECT,
//       12: Answer.INCORRECT,
//       13: Answer.INCORRECT,
//       14: Answer.CORRECT,
//       15: Answer.CORRECT,
//       16: Answer.INCORRECT,
//       17: Answer.INCORRECT,
//       18: Answer.CORRECT,
//       19: Answer.CORRECT,
//       20: Answer.CORRECT,
//       21: Answer.CORRECT,
//       22: Answer.CORRECT,
//       23: Answer.CORRECT,
//       24: Answer.INCORRECT,
//       25: Answer.INCORRECT,
//       26: Answer.SKIPPED,
//       27: Answer.SKIPPED,
//       28: Answer.SKIPPED,
//       29: Answer.SKIPPED,
//       30: Answer.SKIPPED,
//       31: Answer.SKIPPED,
//       32: Answer.SKIPPED,
//       33: Answer.CORRECT,
//       34: Answer.CORRECT,
//       35: Answer.CORRECT,
//       36: Answer.CORRECT,
//       37: Answer.INCORRECT,
//       38: Answer.INCORRECT,
//     },
//   },
// ];

// export {
//   mockProfileData,
//   mockCardDatas,
//   mockStudentData_Math1A_2015,
//   mockFriendsData_Math1A_2015,
//   mockStudentData_Reading_2018,
// };
