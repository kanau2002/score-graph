// src/core/cards/cardType.ts
import { Subject } from "../profile/type";

export interface CardCreateData {
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

export interface CardDeleteResponse {
  success: boolean;
  deletedCardId?: number;
  error?: string;
}
