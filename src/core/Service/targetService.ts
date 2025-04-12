import { Subject } from "@/core/profile/type";
import {
  TargetSaveData,
  TargetUpsertResponse,
  TargetData,
  TargetUpsertData,
} from "../../type/targetType";
import { TargetRepository } from "../Repository/targetRepository";

class TargetService {
  private repository: TargetRepository;

  constructor() {
    this.repository = new TargetRepository();
  }

  /**
   * 目標データを保存する（新規または更新）
   * @param data 目標データ
   */
  async upsertTarget(
    data: Omit<TargetSaveData, "userId">
  ): Promise<TargetUpsertResponse> {
    try {
      // バリデーション
      if (!this.validateTargetData(data)) {
        return {
          success: false,
          error: "入力データが無効です。必須項目を入力してください。",
        };
      }

      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // リポジトリを呼び出してデータを保存
      return await this.repository.upsertTarget({
        userId,
        ...data,
      });
    } catch (error) {
      console.error("目標データ保存処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "目標データ保存中にエラーが発生しました",
      };
    }
  }

  /**
   * 特定の科目と月の目標データを取得する
   * @param subject 科目
   * @param targetMonth 目標月
   */
  async fetchTargetData(
    subject: Subject,
    targetMonth: string
  ): Promise<TargetData | null> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      return await this.repository.fetchTargetData(
        userId,
        subject,
        targetMonth
      );
    } catch (error) {
      console.error("目標データ取得処理でエラーが発生しました:", error);
      return null;
    }
  }

  /**
   * 特定の科目の目標データ入力のための情報を取得する
   * @param subject 科目
   */
  async fetchTargetUpsertData(subject: string): Promise<TargetUpsertData> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // 科目の型チェック
      if (!this.isValidSubject(subject)) {
        return {
          existing: {},
          success: false,
          error: "無効な科目が指定されました",
        };
      }

      // 科目に関連する全ての目標データを取得
      const allTargetData = await this.repository.fetchAllTargetDataBySubject(
        userId,
        subject as Subject
      );

      // 月ごとの既存データをマッピング
      const existingData: Record<string, TargetData> = {};

      allTargetData.forEach((data) => {
        existingData[data.targetMonth] = data;
      });

      return {
        existing: existingData,
        success: true,
      };
    } catch (error) {
      console.error("目標データ取得処理でエラーが発生しました:", error);
      return {
        existing: {},
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "データ取得中にエラーが発生しました",
      };
    }
  }

  /**
   * 入力データを検証する
   * @param data 目標データ
   */
  private validateTargetData(data: Omit<TargetSaveData, "userId">): boolean {
    // 必須項目のチェック
    if (
      !data.subject ||
      data.targetPercentage === undefined ||
      !data.targetMonth
    ) {
      return false;
    }

    // 値の範囲チェック
    if (data.targetPercentage < 0 || data.targetPercentage > 100) {
      return false;
    }

    return true;
  }

  /**
   * 有効な科目かどうかをチェック
   * @param subject 検証する科目
   */
  private isValidSubject(subject: string): boolean {
    // Subjectのすべての値を取得する
    const subjectValues = Object.values(Subject);

    // 入力された値が有効な科目かをチェック
    return subjectValues.includes(subject as Subject);
  }
}

// シングルトンインスタンスをエクスポート
export const targetService = new TargetService();
