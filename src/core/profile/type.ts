//src/core/profile/type.ts
import { TooltipProps } from "recharts";

export enum Subject {
  READING = "READING",
  MATH1A = "MATH1A",
  MATH2B = "MATH2B",
  CHEMISTRY = "CHEMISTRY",
  BIOLOGY = "BIOLOGY",
}

export enum Answer {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  SKIPPED = "SKIPPED",
}

// テストのベース情報
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Test {
  id: string; // UUID または自動生成ID
  subject: Subject;
  year: number;
  maxScore: number;
}

// セクション情報
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Section {
  id: string;
  testId: string; // 外部キー
  sectionNumber: number;
  totalScore: number;
}

// 質問情報
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Question {
  id: string;
  sectionId: string; // 外部キー
  questionNumber: number;
  score: number | null;
  correctAnswer: number | null;
}

export interface SectionPercentages {
  [sectionIndex: number]: number;
}

export interface ChartDataPoint {
  subject: string;
  score: number;
  target?: number;
  fullMark: number;
}

export interface StudentData {
  name: string;
  score: number;
  percentage: number;
  sectionPercentages: SectionPercentages;
  targetSectionPercentages?: SectionPercentages;
}

export interface SectionRadarChartProps {
  data: ChartDataPoint[];
  color?: string;
  targetColor?: string;
  size?: number;
  showTarget?: boolean;
}

export interface StudentRadarChartProps {
  studentData: StudentData;
}

export interface FriendRadarChartProps {
  friendData: StudentData;
}

// カスタムツールチップの型定義
export type CustomTooltipType = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name?: string;
    payload?: {
      subject: Subject;
      score: number;
      target?: number;
    };
  }>;
};

export interface TestData {
  subject: Subject;
  year: number;
  maxScore: number;
  testStructure: {
    section: number;
    questions: {
      questionNumber: number;
      score: number | null;
      correctAnswer: number | null;
    }[];
    sectionTotal: {
      score: number;
    };
  }[];
}

// 型定義
export interface TestScore {
  questionNumber: number;
  score: number | null;
  correctAnswer: number | null;
}

export interface AnsweredData {
  id: number;
  name: string;
  score: number;
  percentage: number;
  targetPercentage?: number;
  date: string;
  memo?: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  targetSectionTotals?: {
    [sectionIndex: number]: number;
  };
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: Answer;
  };
}

//TestResultCard

export interface TestResult {
  id: number;
  date: string;
  year: string;
  targetScore: number;
  studentScore: number;
  memo: string;
}
export interface ProfileData {
  userName: string;
  targetUniversities: string[];
  memo: string;
}
export interface CardData {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo: string;
  testResults: TestResult[];
}

//TestResultClient
// テストセクションの型定義（クライアント側で扱う拡張型）
export interface ClientTestSection {
  section: number;
  questions: {
    questionNumber: number;
    score: number | null;
    correctAnswer: number | null;
    studentAnswer?: Answer;
    friendAnswer?: Answer;
  }[];
  sectionTotal: {
    score: number;
    studentTotal?: number;
    friendTotal?: number;
  };
}

export interface FollowUser {
  id: number;
  userName: string;
}

export interface FollowStatus {
  isFollowing: boolean;
  isFollowedBy: boolean;
  isMutual: boolean;
}

// API 用の型定義
export interface FollowRequest {
  userId: number;
  friendId: number;
}

export interface FollowResponse {
  success: boolean;
  isFollowing: boolean;
  isFollowedBy: boolean;
  isMutual: boolean;
}

export interface FollowsListResponse {
  following: FollowUser[];
  followers: FollowUser[];
  mutualFollows: FollowUser[];
}

// export {
//   SectionPercentages,
//   ChartDataPoint,
//   StudentData,
//   SectionRadarChartProps,
//   StudentRadarChartProps,
//   FriendRadarChartProps,
//   CustomTooltipType,
// };
