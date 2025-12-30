import { ChartData, Subject, TestResult } from "@/type/testType";
import {
  CardAllData,
  CardCreateResponse,
  CardData,
  CardDeleteResponse,
  CardUpdateResponse,
} from "../../type/cardType";
import { CardRepository } from "../Repository/cardRepository";
import { TargetRepository } from "../Repository/targetRepository";
import { yearsBySubjectMap } from "@/constants/TestStructureData";
import { MonthlyTarget } from "@/type/targetType";
import { getCurrentUserId } from "@/lib/auth";
import { UserRepository } from "../Repository/userRepository";
import { followService } from "./followService";
import { userService } from "./userService";

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

  // 科目カード情報の取得（マイページ向け）
  async fetchCardAllDatasAtMypage(): Promise<CardAllData[]> {
    const userId = await getCurrentUserId();
    // 基本データの取得
    const profileData = await new UserRepository().fetchProfileData(userId);
    const cardAllDatasRaw = await this.repository.fetchCardAllDatasByUserRaw(
      userId
    );

    // 各科目ごとに月次目標データを取得
    const cardAllDatas: CardAllData[] = await Promise.all(
      cardAllDatasRaw.map(async (data) => {
        // 未回答年度の取得
        const answeredYears = data.testResults.map((a) => Number(a.year));
        const unAnsweredYears = this.getUnAnsweredYears(
          data.subject,
          answeredYears
        );

        // 月次目標データの取得
        const monthlyTargets = await new TargetRepository().fetchMonthlyTargets(
          data.subject,
          data.userId
        );

        return {
          subject: data.subject,
          finalScoreTarget: data.finalScoreTarget,
          finalScoreLowest: data.finalScoreLowest,
          memo: data.memo,
          testResults: data.testResults,
          unAnsweredYears: unAnsweredYears,
          chartData: this.createChartData(data.testResults, monthlyTargets),
          profileData: profileData,
        };
      })
    );

    return cardAllDatas;
  }

  // 科目カード情報の取得（マイページ向け）
  async fetchCardAllDatasAtPersonal(userId: number): Promise<CardAllData[]> {
    // 卒業生でない場合、相互フォローでなければ空配列を返す
    // 卒業生か否か
    const isGraduated = await userService.fetchIsGraduated(userId);
    if (!isGraduated) {
      // 相互フォローか否か
      const { isFollowing, isFollower } = await followService.checkFollowStatus(
        userId
      );
      if (!(isFollowing && isFollower)) return [];
    }

    // 基本データの取得
    const profileData = await new UserRepository().fetchProfileData(userId);
    const cardAllDatasRaw = await this.repository.fetchCardAllDatasByUserRaw(
      userId
    );

    // 各科目ごとに月次目標データを取得
    const cardAllDatas: CardAllData[] = await Promise.all(
      cardAllDatasRaw.map(async (data) => {
        return {
          subject: data.subject,
          finalScoreTarget: data.finalScoreTarget,
          finalScoreLowest: data.finalScoreLowest,
          memo: data.memo,
          testResults: data.testResults,
          unAnsweredYears: [], // personalページでは不要
          chartData: this.createChartData(data.testResults), // 目標データなしで呼び出し
          profileData: profileData,
        };
      })
    );

    return cardAllDatas;
  }

  // 科目カード情報の取得（ホームページ向け - 最適化版）
  async fetchCardAllDatas(): Promise<CardAllData[]> {
    // 基本データの取得
    const cardAllDatasRaw = await this.repository.fetchCardAllDatasAtHomeRaw(5);

    // 各科目ごとにデータを処理（目標データは取得しない）
    const cardAllDatas: CardAllData[] = await Promise.all(
      cardAllDatasRaw.map(async (data) => {
        // ホームページでは目標データは使用しないため、monthlyTargetsはnullで指定
        return {
          subject: data.subject,
          finalScoreTarget: data.finalScoreTarget,
          finalScoreLowest: data.finalScoreLowest,
          memo: data.memo,
          testResults: data.testResults,
          unAnsweredYears: [], // ホームページでは不要
          chartData: this.createChartData(data.testResults), // 目標データなしで呼び出し
          profileData: await new UserRepository().fetchProfileData(data.userId),
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
    // O(1)でMapから科目の全年度を取得
    const allYears = yearsBySubjectMap.get(subject) ?? [];

    // answeredYearsをSetに変換してO(1)検索に最適化
    const answeredSet = new Set(answeredYears);
    return allYears.filter((year) => !answeredSet.has(year));
  }

  /**
   * チャートデータを作成する汎用メソッド
   * @param testResults テスト結果データ
   * @param monthlyTargets 月次目標データ（オプショナル）
   * @returns 整形されたチャートデータ
   */
  private createChartData(
    testResults: TestResult[],
    monthlyTargets?: MonthlyTarget[]
  ): ChartData[] {
    // 月別データを格納するためのマップ
    const monthlyDataMap = new Map<string, ChartData>();

    // テスト結果データを処理
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

    // 月次目標データが指定されている場合は統合
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
