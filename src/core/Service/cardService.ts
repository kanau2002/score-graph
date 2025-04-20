import { ChartData, Subject, TestResult } from "@/type/testType";
import {
  CardAllData,
  CardCreateResponse,
  CardData,
  CardDeleteResponse,
  CardUpdateResponse,
} from "../../type/cardType";
import { CardRepository } from "../Repository/cardRepository";
import { targetRepository } from "../Repository/targetRepository";
import { testStructureDatas } from "@/constants/TestStructureData";
import { MonthlyTarget } from "@/type/targetType";
import { getCurrentUserId } from "@/lib/auth";

class CardService {
  private repository: CardRepository;

  constructor() {
    this.repository = new CardRepository();
  }

  async fetchCardData(subject: Subject): Promise<CardData> {
    const userId = await getCurrentUserId();
    return await this.repository.fetchCardData(userId, subject);
  }

  /**
   * 科目カードを作成する
   * @param data 科目カードのデータ
   */
  async createCard(data: CardData): Promise<CardCreateResponse> {
    const userId = await getCurrentUserId();
    try {
      // バリデーション
      if (!this.validateCardData(data)) {
        return {
          success: false,
          error: "入力データが無効です。必須項目を入力してください。",
        };
      }

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
   * 科目カードを更新する
   * @param data 更新する科目カードのデータ
   */
  async updateCard(data: CardData): Promise<CardUpdateResponse> {
    const userId = await getCurrentUserId();
    try {
      // バリデーション
      if (!this.validateCardData(data)) {
        return {
          success: false,
          error: "入力データが無効です。必須項目を入力してください。",
        };
      }

      // 実際のアプリでは認証情報からユーザーIDを取得する

      // リポジトリを呼び出してデータを更新
      return await this.repository.updateCard({
        userId,
        ...data,
      });
    } catch (error) {
      console.error("科目カード更新処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "カード更新中にエラーが発生しました",
      };
    }
  }

  /**
   * 利用可能な（まだカードが作成されていない）科目の一覧を取得する
   */
  async fetchUnAnsweredSubjects(): Promise<Subject[]> {
    const userId = await getCurrentUserId();
    try {
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
  private validateCardData(data: CardData): boolean {
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

  /**
   * 科目カードとそれに関連するデータを削除する
   * @param subject 削除する科目
   */
  async deleteCard(subject: Subject): Promise<CardDeleteResponse> {
    const userId = await getCurrentUserId();
    try {
      // 入力検証
      if (!subject) {
        return {
          success: false,
          error: "科目が指定されていません。",
        };
      }

      // リポジトリを呼び出してデータを削除
      return await this.repository.deleteCard(userId, subject);
    } catch (error) {
      console.error("科目カード削除処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "カード削除中にエラーが発生しました",
      };
    }
  }

  // 科目カード情報の取得（更新版）
  async fetchCardAllDatas(): Promise<CardAllData[]> {
    const userId = await getCurrentUserId();
    // 基本データの取得
    const cardAllDatasRaw = await this.repository.fetchCardAllDatasRaw(userId);

    // 各科目ごとに月次目標データを取得
    const cardAllDatas: CardAllData[] = await Promise.all(
      cardAllDatasRaw.map(async (data) => {
        // 未回答年度の取得
        const unAnsweredYears = this.getUnAnsweredYears(
          data.subject,
          data.answeredYears
        );

        // 月次目標データの取得
        const monthlyTargets = await targetRepository.fetchMonthlyTargets(
          data.subject,
          userId
        );

        // テスト結果と月次目標を統合したチャートデータの生成
        const chartData = this.integrateChartData(
          data.testResults,
          monthlyTargets
        );

        return {
          subject: data.subject,
          finalScoreTarget: data.finalScoreTarget,
          finalScoreLowest: data.finalScoreLowest,
          memo: data.memo,
          testResults: data.testResults,
          unAnsweredYears: unAnsweredYears,
          chartData: chartData,
        };
      })
    );

    return cardAllDatas;
  }

  // 未回答年度を計算するヘルパーメソッド
  private getUnAnsweredYears(
    subject: Subject,
    answeredYears: number[]
  ): number[] {
    const allYears: number[] = testStructureDatas
      .filter((testStructureData) => testStructureData.subject === subject)
      .map((testStructureData) => testStructureData.year);

    return allYears.filter((year) => !answeredYears.includes(year));
  }

  // テスト結果と月次目標データを統合するヘルパーメソッド
  private integrateChartData(
    testResults: TestResult[],
    monthlyTargets: MonthlyTarget[]
  ): ChartData[] {
    // 月別データを格納するためのマップ
    const monthlyDataMap = new Map<string, ChartData>();

    // 1. テスト結果データを処理
    testResults.forEach((result: TestResult) => {
      const date = new Date(result.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const monthKey = `${year}/${month.toString().padStart(2, "0")}`;

      monthlyDataMap.set(monthKey, {
        month: monthKey,
        percentage: result.percentage,
      });
    });

    // 2. 月次目標データを統合
    if (monthlyTargets && monthlyTargets.length > 0) {
      monthlyTargets.forEach((target) => {
        // target.targetMonth はフォーマット "YYYY-MM" で保存されていると仮定
        const [year, month] = target.targetMonth.split("-");
        const monthKey = `${year}/${month.padStart(2, "0")}`;

        if (monthlyDataMap.has(monthKey)) {
          // 既存のエントリがある場合は目標値を追加
          const existingData = monthlyDataMap.get(monthKey)!;
          existingData.targetPercentage = target.targetPercentage;
          monthlyDataMap.set(monthKey, existingData);
        } else {
          // テスト結果のないエントリを作成
          monthlyDataMap.set(monthKey, {
            month: monthKey,
            targetPercentage: target.targetPercentage,
          });
        }
      });
    }

    // マップの値を配列に変換し、日付でソート
    return Array.from(monthlyDataMap.values()).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }
}

// シングルトンインスタンスをエクスポート
export const cardService = new CardService();
