//src/core/target/targetType.ts
import { Subject } from "./testType";

export interface TargetSaveData {
  userId: number;
  subject: Subject;
  targetPercentage: number;
  targetMonth: string;
  targetMemo: string;
}

export interface TargetUpsertResponse {
  success: boolean;
  targetId?: number;
  error?: string;
}

// 月次目標の型定義
export interface MonthlyTarget {
  targetMonth: string;
  targetPercentage: number;
}
export interface TargetData {
  id: number;
  userId: number;
  subject: Subject;
  targetPercentage: number;
  targetMonth: string;
  targetMemo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TargetUpsertData {
  existing: Record<string, TargetData>;
  success: boolean;
  error?: string;
}
