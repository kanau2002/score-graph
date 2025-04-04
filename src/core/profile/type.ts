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
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  SKIPPED = "SKIPPED",
}

export interface SectionPercentages {
  [sectionIndex: number]: number;
}

export interface RaderChartData {
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
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: Answer;
  };
}

export interface TestResult {
  id: number;
  date: string;
  year: number;
  percentage: number;
  memo: string;
}

// 月次目標の型定義
export interface MonthlyTarget {
  targetMonth: string;
  targetPercentage: number;
}

export interface ChartData {
  month: string;
  percentage?: number;
  targetPercentage?: number;
}

export interface ProfileData {
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl: string;
}

export interface CardDataRaw {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo: string;
  testResults: TestResult[];
  answeredYears: number[];
}
// CardData型に統合済みチャートデータを追加
export interface CardData {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo: string;
  testResults: TestResult[];
  unAnsweredYears: number[];
  chartData: ChartData[]; // 統合済みのチャートデータ
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

export type TestSubmissionData = {
  userId: number;
  subject: Subject;
  year: number;
  score: number;
  percentage: number;
  date: string;
  memo?: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: Answer;
  };
};

export type TestSubmissionResult = {
  success: boolean;
  testId?: number;
  error?: string;
};

export interface ProfileUpdateData {
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl?: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
}
