import { ChartData, Subject, TestResult } from "./testType";

export interface CardData {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo?: string;
}

export interface CardCreateResponse {
  success: boolean;
  cardId?: number;
  error?: string;
}

export interface CardUpdateResponse {
  success: boolean;
  cardId?: number;
  error?: string;
}

export interface CardDeleteResponse {
  success: boolean;
  deletedCardId?: number;
  error?: string;
}

export interface CardAllDataRaw {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo?: string;
  testResults: TestResult[];
  answeredYears: number[];
}
// CardData型に統合済みチャートデータを追加
export interface CardAllData {
  subject: Subject;
  finalScoreTarget: number;
  finalScoreLowest: number;
  memo?: string;
  testResults: TestResult[];
  unAnsweredYears: number[];
  chartData: ChartData[]; // 統合済みのチャートデータ
}
