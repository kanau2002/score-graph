// src/core/cards/cardService.ts
import { Subject } from "@/core/profile/type";
import { CardCreateData, CardCreateResponse } from "./cardType";
import { CardRepository } from "./cardRepository";

class CardService {
  private repository: CardRepository;

  constructor() {
    this.repository = new CardRepository();
  }

  /**
   * 科目カードを作成する
   * @param data 科目カードのデータ
   */
  async createCard(data: CardCreateData): Promise<CardCreateResponse> {
    try {
      // バリデーション
      if (!this.validateCardData(data)) {
        return {
          success: false,
          error: "入力データが無効です。必須項目を入力してください。",
        };
      }

      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // リポジトリを呼び出してデータを保存
      return await this.repository.createCard({
        userId,
        ...data,
      });
    } catch (error) {
      console.error("科目カード作成処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "カード作成中にエラーが発生しました",
      };
    }
  }

  /**
   * 利用可能な（まだカードが作成されていない）科目の一覧を取得する
   */
  async fetchUnAnsweredSubjects(): Promise<Subject[]> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      return await this.repository.fetchUnAnsweredSubjects(userId);
    } catch (error) {
      console.error("利用可能な科目取得処理でエラーが発生しました:", error);
      return [];
    }
  }

  /**
   * 入力データを検証する
   * @param data 科目カードのデータ
   */
  private validateCardData(data: CardCreateData): boolean {
    // 必須項目のチェック
    if (
      !data.subject ||
      data.finalScoreTarget === undefined ||
      data.finalScoreLowest === undefined
    ) {
      return false;
    }

    // 値の範囲チェック
    if (data.finalScoreTarget < 0 || data.finalScoreTarget > 100) {
      return false;
    }

    if (data.finalScoreLowest < 0 || data.finalScoreLowest > 100) {
      return false;
    }

    // 目標点が最低点以上であることを確認
    if (data.finalScoreLowest > data.finalScoreTarget) {
      return false;
    }

    return true;
  }
}

// シングルトンインスタンスをエクスポート
export const cardService = new CardService();
