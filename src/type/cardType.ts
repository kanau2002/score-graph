import { Subject } from "../core/profile/type";

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
