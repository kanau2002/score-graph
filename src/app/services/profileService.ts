//src/app/services/profileService.ts
// 仮のサービス層実装（実際のDB接続などは実装によって異なります）

import {
  StudentData,
  Friend,
  TestData,
} from "@/app/(pages)/profile/[subject]/page";

// モックデータ
const mockStudentData: StudentData = {
  name: "あなた",
  score: 150,
  percentage: 75,
  targetPercentage: 70,
  date: "2024/01/26",
  memo: "今回は実力が出せなかっただけなんだ。本当の実力はこんなもんじゃないよ。",
  sectionTotals: {
    1: 12, // 大問1の小計
    2: 47, // 大問2の小計
    3: 17, // 大問3の小計
    4: 35, // 大問4の小計
    5: 18, // 大問5の小計
    6: 30, // 大問6の小計
  },
  sectionPercentages: {
    1: 86,
    2: 100,
    3: 74,
    4: 88,
    5: 60,
    6: 83,
  },
  targetSectionTotals: {
    1: 12, // 大問1の小計目標
    2: 30, // 大問2の小計目標
    3: 18, // 大問3の小計目標
    4: 25, // 大問4の小計目標
    5: 18, // 大問5の小計目標
    6: 25, // 大問6の小計目標
  },
  targetSectionPercentages: {
    1: 86,
    2: 64,
    3: 78,
    4: 63,
    5: 60,
    6: 69,
  },
  answers: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 3,
    6: 3,
    7: 2,
    8: 3,
    9: 2,
    10: 1,
    11: 4,
    12: 1,
    13: 3,
    14: 1,
    15: 3,
    16: 3,
    17: 3,
    18: 3,
    19: 2,
    20: 4,
    21: 2,
    22: 3,
    23: 2,
    24: 2,
    25: 4,
    26: 8,
    27: 2,
    30: 1,
    31: 2,
    32: 4,
    33: 2,
    34: 3,
    35: 1,
    36: 4,
    37: 4,
    38: 2,
    39: 3,
    40: 4,
    41: 3,
    42: 2,
    43: 2,
    44: 2,
    45: 4,
    46: 4,
    47: 2,
    48: 1,
    49: 1,
    50: 2,
    51: 4,
    52: 3,
    53: 4,
    54: 1,
  },
};

const mockFriendsData: Friend[] = [
  {
    id: 1,
    name: "大貫しもん",
    score: 144,
    percentage: 72,
    targetPercentage: 80,
    date: "2024/01/26",
    memo: "今回は体調がすぐれなかった。",
    sectionTotals: {
      1: 12, // 大問1の小計
      2: 38, // 大問2の小計
      3: 17, // 大問3の小計
      4: 35, // 大問4の小計
      5: 18, // 大問5の小計
      6: 30, // 大問6の小計
    },
    sectionPercentages: {
      1: 86,
      2: 81,
      3: 74,
      4: 88,
      5: 60,
      6: 83,
    },
    targetSectionTotals: {
      1: 12, // 大問1の小計目標
      2: 30, // 大問2の小計目標
      3: 18, // 大問3の小計目標
      4: 25, // 大問4の小計目標
      5: 18, // 大問5の小計目標
      6: 25, // 大問6の小計目標
    },
    targetSectionPercentages: {
      1: 86,
      2: 64,
      3: 78,
      4: 63,
      5: 60,
      6: 69,
    },
    answers: {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 4,
      6: 3,
      7: 1,
      8: 3,
      9: 2,
      10: 1,
      11: 4,
      12: 1,
      13: 3,
      14: 1,
      15: 3,
      16: 3,
      17: 3,
      18: 3,
      19: 2,
      20: 4,
      21: 2,
      22: 3,
      23: 1,
      24: 2,
      25: 2,
      26: 8,
      27: 2,
      30: 1,
      31: 2,
      32: 4,
      33: 2,
      34: 2,
      35: 2,
      36: 4,
      37: 4,
      38: 2,
      39: 3,
      40: 4,
      41: 3,
      42: 2,
      43: 1,
      44: 2,
      45: 3,
      46: 4,
      47: 2,
      48: 1,
      49: 1,
      50: 2,
      51: 4,
      52: 3,
      53: 3,
      54: 1,
    },
  },
  {
    id: 2,
    name: "磯辺恵美理",
    score: 200,
    percentage: 100,
    targetPercentage: 100,
    date: "2024/01/27",
    memo: "満点取れて安心した。",
    sectionTotals: {
      1: 14, // 大問1の小計
      2: 47, // 大問2の小計
      3: 23, // 大問3の小計
      4: 40, // 大問4の小計
      5: 30, // 大問5の小計
      6: 36, // 大問6の小計
    },
    sectionPercentages: {
      1: 100,
      2: 100,
      3: 100,
      4: 100,
      5: 100,
      6: 100,
    },
    targetSectionTotals: {
      1: 14, // 大問1の小計目標
      2: 47, // 大問2の小計目標
      3: 23, // 大問3の小計目標
      4: 40, // 大問4の小計目標
      5: 30, // 大問5の小計目標
      6: 36, // 大問6の小計目標
    },
    targetSectionPercentages: {
      1: 100,
      2: 100,
      3: 100,
      4: 100,
      5: 100,
      6: 100,
    },
    answers: {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 4,
      6: 3,
      7: 2,
      8: 3,
      9: 2,
      10: 1,
      11: 4,
      12: 1,
      13: 3,
      14: 1,
      15: 3,
      16: 3,
      17: 3,
      18: 3,
      19: 2,
      20: 4,
      21: 2,
      22: 3,
      23: 2,
      24: 2,
      25: 4,
      26: 8,
      27: 2,
      30: 1,
      31: 3,
      32: 4,
      33: 2,
      34: 3,
      35: 2,
      36: 4,
      37: 4,
      38: 2,
      39: 3,
      40: 4,
      41: 3,
      42: 2,
      43: 2,
      44: 1,
      45: 3,
      46: 4,
      47: 2,
      48: 1,
      49: 1,
      50: 2,
      51: 4,
      52: 2,
      53: 3,
      54: 1,
    },
  },
  {
    id: 3,
    name: "藤岡優仁",
    score: 156,
    percentage: 78,
    targetPercentage: 90,
    date: "2024/01/28",
    memo: "英語長文ポラリス1を音読した成果が出てよかった。",
    sectionTotals: {
      1: 12, // 大問1の小計
      2: 47, // 大問2の小計
      3: 17, // 大問3の小計
      4: 40, // 大問4の小計
      5: 24, // 大問5の小計
      6: 30, // 大問6の小計
    },
    sectionPercentages: {
      1: 86,
      2: 100,
      3: 74,
      4: 100,
      5: 80,
      6: 83,
    },
    targetSectionTotals: {
      1: 12, // 大問1の小計目標
      2: 30, // 大問2の小計目標
      3: 18, // 大問3の小計目標
      4: 25, // 大問4の小計目標
      5: 18, // 大問5の小計目標
      6: 25, // 大問6の小計目標
    },
    targetSectionPercentages: {
      1: 86,
      2: 64,
      3: 78,
      4: 63,
      5: 60,
      6: 69,
    },
    answers: {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 3,
      6: 3,
      7: 2,
      8: 3,
      9: 2,
      10: 1,
      11: 4,
      12: 1,
      13: 3,
      14: 1,
      15: 3,
      16: 3,
      17: 3,
      18: 3,
      19: 2,
      20: 4,
      21: 2,
      22: 3,
      23: 2,
      24: 2,
      25: 4,
      26: 8,
      27: 2,
      30: 1,
      31: 2,
      32: 4,
      33: 2,
      34: 3,
      35: 2,
      36: 4,
      37: 4,
      38: 2,
      39: 3,
      40: 4,
      41: 3,
      42: 2,
      43: 2,
      44: 2,
      45: 3,
      46: 4,
      47: 2,
      48: 1,
      49: 1,
      50: 2,
      51: 4,
      52: 3,
      53: 4,
      54: 1,
    },
  },
];

// const mockTestData2015: TestData = {
//   subjectName: "英語",
//   year: 2015,
//   maxScore: 200,
//   testStructure: [
//     {
//       section: 1,
//       questions: [
//         { questionNumber: 1, score: 2, correctAnswer: 2 },
//         { questionNumber: 2, score: 2, correctAnswer: 1 },
//         { questionNumber: 3, score: 2, correctAnswer: 1 },
//         { questionNumber: 4, score: 2, correctAnswer: 2 },
//         { questionNumber: 5, score: 2, correctAnswer: 4 },
//         { questionNumber: 6, score: 2, correctAnswer: 4 },
//         { questionNumber: 7, score: 2, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 14 },
//     },
//     {
//       section: 2,
//       questions: [
//         { questionNumber: 8, score: 2, correctAnswer: 1 },
//         { questionNumber: 9, score: 2, correctAnswer: 3 },
//         { questionNumber: 10, score: 2, correctAnswer: 3 },
//         { questionNumber: 11, score: 2, correctAnswer: 2 },
//         { questionNumber: 12, score: 2, correctAnswer: 1 },
//         { questionNumber: 13, score: 2, correctAnswer: 3 },
//         { questionNumber: 14, score: 2, correctAnswer: 1 },
//         { questionNumber: 15, score: 2, correctAnswer: 4 },
//         { questionNumber: 16, score: 2, correctAnswer: 2 },
//         { questionNumber: 17, score: 2, correctAnswer: 4 },
//         { questionNumber: 18, score: 4, correctAnswer: 5 },
//         { questionNumber: 19, score: 4, correctAnswer: 6 },
//         { questionNumber: 20, score: 4, correctAnswer: 5 },
//         { questionNumber: 21, score: 4, correctAnswer: 1 },
//         { questionNumber: 22, score: 4, correctAnswer: 4 },
//         { questionNumber: 23, score: 4, correctAnswer: 5 },
//         { questionNumber: 24, score: 4, correctAnswer: 7 },
//         { questionNumber: 25, score: 4, correctAnswer: 6 },
//         { questionNumber: 26, score: 4, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 44 },
//     },
//     {
//       section: 3,
//       questions: [
//         { questionNumber: 27, score: 4, correctAnswer: 4 },
//         { questionNumber: 28, score: 4, correctAnswer: 2 },
//         { questionNumber: 29, score: 5, correctAnswer: 2 },
//         { questionNumber: 30, score: 5, correctAnswer: 4 },
//         { questionNumber: 31, score: 5, correctAnswer: 1 },
//         { questionNumber: 32, score: 6, correctAnswer: 2 },
//         { questionNumber: 33, score: 6, correctAnswer: 2 },
//         { questionNumber: 34, score: 6, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 41 },
//     },
//     {
//       section: 4,
//       questions: [
//         { questionNumber: 35, score: 5, correctAnswer: 4 },
//         { questionNumber: 36, score: 5, correctAnswer: 1 },
//         { questionNumber: 37, score: 5, correctAnswer: 2 },
//         { questionNumber: 38, score: 5, correctAnswer: 2 },
//         { questionNumber: 39, score: 5, correctAnswer: 2 },
//         { questionNumber: 40, score: 5, correctAnswer: 3 },
//         { questionNumber: 41, score: 5, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 35 },
//     },
//     {
//       section: 5,
//       questions: [
//         { questionNumber: 42, score: 6, correctAnswer: 3 },
//         { questionNumber: 43, score: 6, correctAnswer: 3 },
//         { questionNumber: 44, score: 6, correctAnswer: 4 },
//         { questionNumber: 45, score: 6, correctAnswer: 4 },
//         { questionNumber: 46, score: 6, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 30 },
//     },
//     {
//       section: 6,
//       questions: [
//         { questionNumber: 47, score: 6, correctAnswer: 4 },
//         { questionNumber: 48, score: 6, correctAnswer: 2 },
//         { questionNumber: 49, score: 6, correctAnswer: 2 },
//         { questionNumber: 50, score: 6, correctAnswer: 2 },
//         { questionNumber: 51, score: 6, correctAnswer: 1 },
//         { questionNumber: 52, score: 6, correctAnswer: 3 },
//         { questionNumber: 53, score: 6, correctAnswer: 1 },
//         { questionNumber: 54, score: 6, correctAnswer: 2 },
//         { questionNumber: 55, score: 6, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 36 },
//     },
//   ],
// };

// const mockTestData2016: TestData = {
//   subjectName: "英語",
//   year: 2016,
//   maxScore: 200,
//   testStructure: [
//     {
//       section: 1,
//       questions: [
//         { questionNumber: 1, score: 2, correctAnswer: 2 },
//         { questionNumber: 2, score: 2, correctAnswer: 4 },
//         { questionNumber: 3, score: 2, correctAnswer: 2 },
//         { questionNumber: 4, score: 2, correctAnswer: 3 },
//         { questionNumber: 5, score: 2, correctAnswer: 3 },
//         { questionNumber: 6, score: 2, correctAnswer: 4 },
//         { questionNumber: 7, score: 2, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 14 },
//     },
//     {
//       section: 2,
//       questions: [
//         { questionNumber: 8, score: 2, correctAnswer: 1 },
//         { questionNumber: 9, score: 2, correctAnswer: 1 },
//         { questionNumber: 10, score: 2, correctAnswer: 2 },
//         { questionNumber: 11, score: 2, correctAnswer: 4 },
//         { questionNumber: 12, score: 2, correctAnswer: 2 },
//         { questionNumber: 13, score: 2, correctAnswer: 1 },
//         { questionNumber: 14, score: 2, correctAnswer: 4 },
//         { questionNumber: 15, score: 2, correctAnswer: 3 },
//         { questionNumber: 16, score: 2, correctAnswer: 1 },
//         { questionNumber: 17, score: 2, correctAnswer: 4 },
//         { questionNumber: 18, score: 4, correctAnswer: 5 },
//         { questionNumber: 19, score: 4, correctAnswer: 1 },
//         { questionNumber: 20, score: 4, correctAnswer: 3 },
//         { questionNumber: 21, score: 4, correctAnswer: 5 },
//         { questionNumber: 22, score: 4, correctAnswer: 4 },
//         { questionNumber: 23, score: 4, correctAnswer: 6 },
//         { questionNumber: 24, score: 4, correctAnswer: 2 },
//         { questionNumber: 25, score: 4, correctAnswer: 2 },
//         { questionNumber: 26, score: 4, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 44 },
//     },
//     {
//       section: 3,
//       questions: [
//         { questionNumber: 27, score: 4, correctAnswer: 4 },
//         { questionNumber: 28, score: 4, correctAnswer: 2 },
//         { questionNumber: 29, score: 5, correctAnswer: 1 },
//         { questionNumber: 30, score: 5, correctAnswer: 2 },
//         { questionNumber: 31, score: 5, correctAnswer: 1 },
//         { questionNumber: 32, score: 6, correctAnswer: 4 },
//         { questionNumber: 33, score: 6, correctAnswer: 4 },
//         { questionNumber: 34, score: 6, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 41 },
//     },
//     {
//       section: 4,
//       questions: [
//         { questionNumber: 35, score: 5, correctAnswer: 2 },
//         { questionNumber: 36, score: 5, correctAnswer: 1 },
//         { questionNumber: 37, score: 5, correctAnswer: 3 },
//         { questionNumber: 38, score: 5, correctAnswer: 2 },
//         { questionNumber: 39, score: 5, correctAnswer: 2 },
//         { questionNumber: 40, score: 5, correctAnswer: 3 },
//         { questionNumber: 41, score: 5, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 35 },
//     },
//     {
//       section: 5,
//       questions: [
//         { questionNumber: 42, score: 6, correctAnswer: 2 },
//         { questionNumber: 43, score: 6, correctAnswer: 3 },
//         { questionNumber: 44, score: 6, correctAnswer: 2 },
//         { questionNumber: 45, score: 6, correctAnswer: 3 },
//         { questionNumber: 46, score: 6, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 30 },
//     },
//     {
//       section: 6,
//       questions: [
//         { questionNumber: 47, score: 6, correctAnswer: 1 },
//         { questionNumber: 48, score: 6, correctAnswer: 3 },
//         { questionNumber: 49, score: 6, correctAnswer: 1 },
//         { questionNumber: 50, score: 6, correctAnswer: 3 },
//         { questionNumber: 51, score: 6, correctAnswer: 3 },
//         { questionNumber: 52, score: 6, correctAnswer: 3 },
//         { questionNumber: 53, score: 6, correctAnswer: 1 },
//         { questionNumber: 54, score: 6, correctAnswer: 4 },
//         { questionNumber: 55, score: 6, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 36 },
//     },
//   ],
// };

// const mockTestData2017: TestData = {
//   subjectName: "英語",
//   year: 2017,
//   maxScore: 200,
//   testStructure: [
//     {
//       section: 1,
//       questions: [
//         { questionNumber: 1, score: 2, correctAnswer: 4 },
//         { questionNumber: 2, score: 2, correctAnswer: 3 },
//         { questionNumber: 3, score: 2, correctAnswer: 4 },
//         { questionNumber: 4, score: 2, correctAnswer: 2 },
//         { questionNumber: 5, score: 2, correctAnswer: 1 },
//         { questionNumber: 6, score: 2, correctAnswer: 2 },
//         { questionNumber: 7, score: 2, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 14 },
//     },
//     {
//       section: 2,
//       questions: [
//         { questionNumber: 8, score: 2, correctAnswer: 1 },
//         { questionNumber: 9, score: 2, correctAnswer: 2 },
//         { questionNumber: 10, score: 2, correctAnswer: 4 },
//         { questionNumber: 11, score: 2, correctAnswer: 1 },
//         { questionNumber: 12, score: 2, correctAnswer: 2 },
//         { questionNumber: 13, score: 2, correctAnswer: 3 },
//         { questionNumber: 14, score: 2, correctAnswer: 4 },
//         { questionNumber: 15, score: 2, correctAnswer: 1 },
//         { questionNumber: 16, score: 2, correctAnswer: 3 },
//         { questionNumber: 17, score: 2, correctAnswer: 1 },
//         { questionNumber: 18, score: 4, correctAnswer: 2 },
//         { questionNumber: 19, score: 4, correctAnswer: 6 },
//         { questionNumber: 20, score: 4, correctAnswer: 5 },
//         { questionNumber: 21, score: 4, correctAnswer: 1 },
//         { questionNumber: 22, score: 4, correctAnswer: 6 },
//         { questionNumber: 23, score: 4, correctAnswer: 2 },
//         { questionNumber: 24, score: 4, correctAnswer: 5 },
//         { questionNumber: 25, score: 4, correctAnswer: 2 },
//         { questionNumber: 26, score: 4, correctAnswer: 7 },
//       ],
//       sectionTotal: { score: 44 },
//     },
//     {
//       section: 3,
//       questions: [
//         { questionNumber: 27, score: 4, correctAnswer: 2 },
//         { questionNumber: 28, score: 4, correctAnswer: 3 },
//         { questionNumber: 29, score: 5, correctAnswer: 3 },
//         { questionNumber: 30, score: 5, correctAnswer: 2 },
//         { questionNumber: 31, score: 5, correctAnswer: 3 },
//         { questionNumber: 32, score: 6, correctAnswer: 3 },
//         { questionNumber: 33, score: 6, correctAnswer: 4 },
//         { questionNumber: 34, score: 6, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 41 },
//     },
//     {
//       section: 4,
//       questions: [
//         { questionNumber: 35, score: 5, correctAnswer: 3 },
//         { questionNumber: 36, score: 5, correctAnswer: 1 },
//         { questionNumber: 37, score: 5, correctAnswer: 4 },
//         { questionNumber: 38, score: 5, correctAnswer: 2 },
//         { questionNumber: 39, score: 5, correctAnswer: 4 },
//         { questionNumber: 40, score: 5, correctAnswer: 2 },
//         { questionNumber: 41, score: 5, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 35 },
//     },
//     {
//       section: 5,
//       questions: [
//         { questionNumber: 42, score: 6, correctAnswer: 1 },
//         { questionNumber: 43, score: 6, correctAnswer: 2 },
//         { questionNumber: 44, score: 6, correctAnswer: 4 },
//         { questionNumber: 45, score: 6, correctAnswer: 1 },
//         { questionNumber: 46, score: 6, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 30 },
//     },
//     {
//       section: 6,
//       questions: [
//         { questionNumber: 47, score: 6, correctAnswer: 4 },
//         { questionNumber: 48, score: 6, correctAnswer: 2 },
//         { questionNumber: 49, score: 6, correctAnswer: 4 },
//         { questionNumber: 50, score: 6, correctAnswer: 4 },
//         { questionNumber: 51, score: 6, correctAnswer: 1 },
//         { questionNumber: 52, score: 6, correctAnswer: 4 },
//         { questionNumber: 53, score: 6, correctAnswer: 2 },
//         { questionNumber: 54, score: 6, correctAnswer: 3 },
//         { questionNumber: 55, score: 6, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 36 },
//     },
//   ],
// };

const mockTestData2018: TestData = {
  subjectName: "英語",
  year: 2018,
  maxScore: 200,
  testStructure: [
    {
      section: 1,
      questions: [
        { questionNumber: 1, score: 2, correctAnswer: 4 },
        { questionNumber: 2, score: 2, correctAnswer: 3 },
        { questionNumber: 3, score: 2, correctAnswer: 2 },
        { questionNumber: 4, score: 2, correctAnswer: 1 },
        { questionNumber: 5, score: 2, correctAnswer: 4 },
        { questionNumber: 6, score: 2, correctAnswer: 3 },
        { questionNumber: 7, score: 2, correctAnswer: 2 },
      ],
      sectionTotal: { score: 14 },
    },
    {
      section: 2,
      questions: [
        { questionNumber: 8, score: 2, correctAnswer: 3 },
        { questionNumber: 9, score: 2, correctAnswer: 2 },
        { questionNumber: 10, score: 2, correctAnswer: 1 },
        { questionNumber: 11, score: 2, correctAnswer: 4 },
        { questionNumber: 12, score: 2, correctAnswer: 1 },
        { questionNumber: 13, score: 2, correctAnswer: 3 },
        { questionNumber: 14, score: 2, correctAnswer: 1 },
        { questionNumber: 15, score: 2, correctAnswer: 3 },
        { questionNumber: 16, score: 2, correctAnswer: 3 },
        { questionNumber: 17, score: 2, correctAnswer: 3 },
        { questionNumber: 18, score: 2, correctAnswer: 3 },
        { questionNumber: 19, score: 4, correctAnswer: 2 },
        { questionNumber: 20, score: 4, correctAnswer: 4 },
        { questionNumber: 21, score: 4, correctAnswer: 2 },
        { questionNumber: 22, score: 4, correctAnswer: 3 },
        { questionNumber: 23, score: 4, correctAnswer: 2 },
        { questionNumber: 24, score: 5, correctAnswer: 2 },
        { questionNumber: 25, score: 5, correctAnswer: 4 },
        { questionNumber: 26, score: 5, correctAnswer: 8 },
      ],
      sectionTotal: { score: 47 },
    },
    {
      section: 3,
      questions: [
        { questionNumber: 27, score: 5, correctAnswer: 2 },
        { questionNumber: 30, score: 6, correctAnswer: 1 },
        { questionNumber: 31, score: 6, correctAnswer: 3 },
        { questionNumber: 32, score: 6, correctAnswer: 4 },
      ],
      sectionTotal: { score: 23 },
    },
    {
      section: 4,
      questions: [
        { questionNumber: 33, score: 5, correctAnswer: 2 },
        { questionNumber: 34, score: 5, correctAnswer: 3 },
        { questionNumber: 35, score: 5, correctAnswer: 2 },
        { questionNumber: 36, score: 5, correctAnswer: 4 },
        { questionNumber: 37, score: 5, correctAnswer: 4 },
        { questionNumber: 38, score: 5, correctAnswer: 2 },
        { questionNumber: 39, score: 5, correctAnswer: 3 },
        { questionNumber: 40, score: 5, correctAnswer: 4 },
      ],
      sectionTotal: { score: 40 },
    },
    {
      section: 5,
      questions: [
        { questionNumber: 41, score: 6, correctAnswer: 3 },
        { questionNumber: 42, score: 6, correctAnswer: 2 },
        { questionNumber: 43, score: 6, correctAnswer: 2 },
        { questionNumber: 44, score: 6, correctAnswer: 1 },
        { questionNumber: 45, score: 6, correctAnswer: 3 },
      ],
      sectionTotal: { score: 30 },
    },
    {
      section: 6,
      questions: [
        { questionNumber: 46, score: 6, correctAnswer: 4 },
        { questionNumber: 47, score: 6, correctAnswer: 2 },
        { questionNumber: 48, score: 6, correctAnswer: 1 },
        { questionNumber: 49, score: 6, correctAnswer: 1 },
        { questionNumber: 50, score: 6, correctAnswer: 2 },
        { questionNumber: 51, score: 6, correctAnswer: 4 },
        { questionNumber: 52, score: null, correctAnswer: 2 },
        { questionNumber: 53, score: null, correctAnswer: 3 },
        { questionNumber: 54, score: null, correctAnswer: 1 },
      ],
      sectionTotal: { score: 36 },
    },
  ],
};

// const mockTestData2019: TestData = {
//   subjectName: "英語",
//   year: 2019,
//   maxScore: 200,
//   testStructure: [
//     {
//       section: 1,
//       questions: [
//         { questionNumber: 1, score: 2, correctAnswer: 2 },
//         { questionNumber: 2, score: 2, correctAnswer: 1 },
//         { questionNumber: 3, score: 2, correctAnswer: 2 },
//         { questionNumber: 4, score: 2, correctAnswer: 3 },
//         { questionNumber: 5, score: 2, correctAnswer: 2 },
//         { questionNumber: 6, score: 2, correctAnswer: 2 },
//         { questionNumber: 7, score: 2, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 14 },
//     },
//     {
//       section: 2,
//       questions: [
//         { questionNumber: 8, score: 2, correctAnswer: 2 },
//         { questionNumber: 9, score: 2, correctAnswer: 3 },
//         { questionNumber: 10, score: 2, correctAnswer: 1 },
//         { questionNumber: 11, score: 2, correctAnswer: 2 },
//         { questionNumber: 12, score: 2, correctAnswer: 4 },
//         { questionNumber: 13, score: 2, correctAnswer: 3 },
//         { questionNumber: 14, score: 2, correctAnswer: 3 },
//         { questionNumber: 15, score: 2, correctAnswer: 2 },
//         { questionNumber: 16, score: 2, correctAnswer: 4 },
//         { questionNumber: 17, score: 2, correctAnswer: 4 },
//         { questionNumber: 18, score: 4, correctAnswer: 2 },
//         { questionNumber: 19, score: 4, correctAnswer: 5 },
//         { questionNumber: 20, score: 4, correctAnswer: 6 },
//         { questionNumber: 21, score: 4, correctAnswer: 2 },
//         { questionNumber: 22, score: 4, correctAnswer: 2 },
//         { questionNumber: 23, score: 4, correctAnswer: 6 },
//         { questionNumber: 24, score: 5, correctAnswer: 6 },
//         { questionNumber: 25, score: 5, correctAnswer: 2 },
//         { questionNumber: 26, score: 5, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 47 },
//     },
//     {
//       section: 3,
//       questions: [
//         { questionNumber: 27, score: 5, correctAnswer: 1 },
//         { questionNumber: 28, score: 5, correctAnswer: 2 },
//         { questionNumber: 29, score: 5, correctAnswer: 4 },
//         { questionNumber: 30, score: 6, correctAnswer: 1 },
//         { questionNumber: 31, score: 6, correctAnswer: 3 },
//         { questionNumber: 32, score: 6, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 33 },
//     },
//     {
//       section: 4,
//       questions: [
//         { questionNumber: 33, score: 5, correctAnswer: 2 },
//         { questionNumber: 34, score: 5, correctAnswer: 4 },
//         { questionNumber: 35, score: 5, correctAnswer: 2 },
//         { questionNumber: 36, score: 5, correctAnswer: 3 },
//         { questionNumber: 37, score: 5, correctAnswer: 3 },
//         { questionNumber: 38, score: 5, correctAnswer: 2 },
//         { questionNumber: 39, score: 5, correctAnswer: 2 },
//         { questionNumber: 40, score: 5, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 40 },
//     },
//     {
//       section: 5,
//       questions: [
//         { questionNumber: 41, score: 6, correctAnswer: 1 },
//         { questionNumber: 42, score: 6, correctAnswer: 2 },
//         { questionNumber: 43, score: 6, correctAnswer: 1 },
//         { questionNumber: 44, score: 6, correctAnswer: 3 },
//         { questionNumber: 45, score: 6, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 30 },
//     },
//     {
//       section: 6,
//       questions: [
//         { questionNumber: 46, score: 6, correctAnswer: 2 },
//         { questionNumber: 47, score: 6, correctAnswer: 3 },
//         { questionNumber: 48, score: 6, correctAnswer: 4 },
//         { questionNumber: 49, score: 6, correctAnswer: 1 },
//         { questionNumber: 50, score: 6, correctAnswer: 4 },
//         { questionNumber: 51, score: 6, correctAnswer: 1 },
//         { questionNumber: 52, score: 6, correctAnswer: 4 },
//         { questionNumber: 53, score: 6, correctAnswer: 2 },
//         { questionNumber: 54, score: 6, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 36 },
//     },
//   ],
// };

// const mockTestData2020: TestData = {
//   subjectName: "英語",
//   year: 2020,
//   maxScore: 200,
//   testStructure: [
//     {
//       section: 1,
//       questions: [
//         { questionNumber: 1, score: 2, correctAnswer: 2 },
//         { questionNumber: 2, score: 2, correctAnswer: 3 },
//         { questionNumber: 3, score: 2, correctAnswer: 4 },
//         { questionNumber: 4, score: 2, correctAnswer: 2 },
//         { questionNumber: 5, score: 2, correctAnswer: 1 },
//         { questionNumber: 6, score: 2, correctAnswer: 1 },
//         { questionNumber: 7, score: 2, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 14 },
//     },
//     {
//       section: 2,
//       questions: [
//         { questionNumber: 8, score: 2, correctAnswer: 3 },
//         { questionNumber: 9, score: 2, correctAnswer: 1 },
//         { questionNumber: 10, score: 2, correctAnswer: 3 },
//         { questionNumber: 11, score: 2, correctAnswer: 3 },
//         { questionNumber: 12, score: 2, correctAnswer: 1 },
//         { questionNumber: 13, score: 2, correctAnswer: 1 },
//         { questionNumber: 14, score: 2, correctAnswer: 1 },
//         { questionNumber: 15, score: 2, correctAnswer: 4 },
//         { questionNumber: 16, score: 2, correctAnswer: 2 },
//         { questionNumber: 17, score: 2, correctAnswer: 1 },
//         { questionNumber: 18, score: 4, correctAnswer: 4 },
//         { questionNumber: 19, score: 4, correctAnswer: 2 },
//         { questionNumber: 20, score: 4, correctAnswer: 4 },
//         { questionNumber: 21, score: 4, correctAnswer: 3 },
//         { questionNumber: 22, score: 4, correctAnswer: 5 },
//         { questionNumber: 23, score: 4, correctAnswer: 2 },
//         { questionNumber: 24, score: 5, correctAnswer: 3 },
//         { questionNumber: 25, score: 5, correctAnswer: 1 },
//         { questionNumber: 26, score: 5, correctAnswer: 3 },
//       ],
//       sectionTotal: { score: 47 },
//     },
//     {
//       section: 3,
//       questions: [
//         { questionNumber: 27, score: 5, correctAnswer: 2 },
//         { questionNumber: 28, score: 5, correctAnswer: 2 },
//         { questionNumber: 29, score: 5, correctAnswer: 2 },
//         { questionNumber: 30, score: 6, correctAnswer: 3 },
//         { questionNumber: 31, score: 6, correctAnswer: 3 },
//         { questionNumber: 32, score: 6, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 33 },
//     },
//     {
//       section: 4,
//       questions: [
//         { questionNumber: 33, score: 5, correctAnswer: 4 },
//         { questionNumber: 34, score: 5, correctAnswer: 4 },
//         { questionNumber: 35, score: 5, correctAnswer: 2 },
//         { questionNumber: 36, score: 5, correctAnswer: 4 },
//         { questionNumber: 37, score: 5, correctAnswer: 1 },
//         { questionNumber: 38, score: 5, correctAnswer: 1 },
//         { questionNumber: 39, score: 5, correctAnswer: 2 },
//         { questionNumber: 40, score: 5, correctAnswer: 4 },
//       ],
//       sectionTotal: { score: 40 },
//     },
//     {
//       section: 5,
//       questions: [
//         { questionNumber: 41, score: 6, correctAnswer: 1 },
//         { questionNumber: 42, score: 6, correctAnswer: 4 },
//         { questionNumber: 43, score: 6, correctAnswer: 4 },
//         { questionNumber: 44, score: 6, correctAnswer: 2 },
//         { questionNumber: 45, score: 6, correctAnswer: 2 },
//       ],
//       sectionTotal: { score: 30 },
//     },
//     {
//       section: 6,
//       questions: [
//         { questionNumber: 46, score: 6, correctAnswer: 1 },
//         { questionNumber: 47, score: 6, correctAnswer: 3 },
//         { questionNumber: 48, score: 6, correctAnswer: 2 },
//         { questionNumber: 49, score: 6, correctAnswer: 4 },
//         { questionNumber: 50, score: 6, correctAnswer: 2 },
//         { questionNumber: 51, score: 6, correctAnswer: 2 },
//         { questionNumber: 52, score: 6, correctAnswer: 4 },
//         { questionNumber: 53, score: 6, correctAnswer: 3 },
//         { questionNumber: 54, score: 6, correctAnswer: 1 },
//       ],
//       sectionTotal: { score: 36 },
//     },
//   ],
// };

class ProfileService {
  // 生徒データを取得するメソッド
  async fetchStudentData(subject: string, year: number): Promise<StudentData> {
    // 実際のDBクエリに置き換える
    console.log(`Fetching student data for ${subject} ${year}`);
    // ここでは簡易的なモックデータを返す
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStudentData), 100);
    });
  }

  // フレンドデータを取得するメソッド
  async fetchFriendsData(subject: string, year: number): Promise<Friend[]> {
    // 実際のDBクエリに置き換える
    console.log(`Fetching friends data for ${subject} ${year}`);
    // ここでは簡易的なモックデータを返す
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFriendsData), 100);
    });
  }

  // テスト構造を取得するメソッド
  async fetchTestStructure(subject: string, year: number): Promise<TestData> {
    // 実際のDBクエリに置き換える
    console.log(`Fetching test structure for ${subject} ${year}`);
    // ここでは簡易的なモックデータを返す
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTestData2018), 100);
    });
  }

  // レーダーチャートデータ（生徒）を取得するメソッド
  async fetchStudentRaderChartData(subject: string, year: number) {
    // これは実際には必要ないかもしれないが、将来的な拡張のために残しておく
    const studentData = await this.fetchStudentData(subject, year);
    return {
      sectionPercentages: studentData.sectionPercentages,
      targetSectionPercentages: studentData.targetSectionPercentages,
    };
  }

  // レーダーチャートデータ（フレンド）を取得するメソッド
  async fetchFriendRaderChartData(subject: string, year: number) {
    // これは実際には必要ないかもしれないが、将来的な拡張のために残しておく
    const friendsData = await this.fetchFriendsData(subject, year);
    return friendsData.map((friend) => ({
      id: friend.id,
      name: friend.name,
      sectionPercentages: friend.sectionPercentages,
      targetSectionPercentages: friend.targetSectionPercentages,
    }));
  }
}

// シングルトンインスタンスをエクスポート
export const profileService = new ProfileService();
