//src/core/target/targetType.ts
import { Subject } from "../profile/type";

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
