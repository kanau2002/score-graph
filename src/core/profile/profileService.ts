import { testDatas } from "./repositories/data";
import { ProfileRepository } from "./repositories/infra";
import {
  ProfileData,
  CardAllData,
  AnsweredData,
  TestData,
  FollowUser,
  TestSubmissionData,
  TestSubmissionResult,
  Subject,
  MonthlyTarget,
  ChartData,
  TestResult,
  ProfileUpdateData,
  ProfileUpdateResponse,
} from "./type";

class ProfileService {
  private repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  // プロフィール情報の取得
  async fetchProfileData(): Promise<ProfileData> {
    return this.repository.fetchProfileData();
  }

  // プロフィール情報の更新
  async updateProfileData(
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // repositoryを呼び出してデータを更新
      const result = await this.repository.updateProfileData({
        ...data,
        userId,
      });

      return result;
    } catch (error) {
      console.error("プロフィール更新処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "プロフィール更新中にエラーが発生しました",
      };
    }
  }

  // テスト構造情報の取得
  async fetchTestStructure(subject: string, year: number): Promise<TestData> {
    const testData = testDatas.find(
      (testData) => testData.subject === subject && testData.year === year
    );
    if (!testData) {
      throw new Error(
        `Test data not found for subject: ${subject}, year: ${year}`
      );
    }
    return testData;
  }

  // 生徒のテスト結果データの取得
  async fetchStudentData(subject: string, year: number): Promise<AnsweredData> {
    return this.repository.fetchStudentData(subject, year.toString());
  }

  // 相互フォローしているフレンドのテスト結果データの取得
  async fetchFriendsData(
    subject: string,
    year: number
  ): Promise<AnsweredData[]> {
    return this.repository.fetchFriendsData(subject, year.toString());
  }

  /**
   * テスト結果と解答データを削除する
   */
  async deleteTestResult(
    subject: string,
    year: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // repositoryを呼び出してデータを削除
      const result = await this.repository.deleteTestResult(
        userId,
        subject,
        year.toString()
      );

      return result;
    } catch (error) {
      console.error("テスト結果の削除処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "テスト結果の削除中にエラーが発生しました",
      };
    }
  }

  // ユーザーIDによる検索
  async searchUserById(userId: number): Promise<FollowUser | null> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.searchUserById(userId, currentUserId);
  }

  // ユーザーをフォローする
  async followUser(targetUserId: number): Promise<void> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.followUser(currentUserId, targetUserId);
  }

  // ユーザーのフォローを解除する
  async unfollowUser(targetUserId: number): Promise<void> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.unfollowUser(currentUserId, targetUserId);
  }

  // 相互フォローしているユーザー一覧を取得
  async fetchMutualFollows(): Promise<FollowUser[]> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.fetchMutualFollows(currentUserId);
  }

  // 自分がフォローしているユーザー一覧を取得
  async fetchFollowing(): Promise<FollowUser[]> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.fetchFollowing(currentUserId);
  }

  // フォロー状態をチェックする
  async checkFollowStatus(
    targetUserId: number
  ): Promise<{ isFollowing: boolean; isFollower: boolean }> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.checkFollowStatus(currentUserId, targetUserId);
  }

  /**
   * テストの回答を保存する
   */
  async saveTestAnswers(
    data: Omit<TestSubmissionData, "userId">
  ): Promise<TestSubmissionResult> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // repositoryを呼び出してデータを保存
      const result = await this.repository.saveTestAnswers({
        ...data,
        userId,
      });

      return result;
    } catch (error) {
      console.error("テスト回答の保存処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "テスト回答の保存中にエラーが発生しました",
      };
    }
  }

  /**
   * テストの目標を設定する
   */
  async saveTestTargets(data: {
    subject: Subject;
    targetPercentage: number;
    targetMonth: string;
    targetMemo?: string;
    targetSectionPercentages: Record<number, number>;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      // 実際のアプリでは認証情報からユーザーIDを取得する
      const userId = 1; // デフォルトのユーザーID

      // repositoryを呼び出してデータを保存
      const result = await this.repository.saveTestTargets({
        ...data,
        userId,
      });

      return result;
    } catch (error) {
      console.error("テスト目標の設定処理でエラーが発生しました:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "テスト目標の設定中にエラーが発生しました",
      };
    }
  }

  /**
   * テストの目標を取得する
   */
  async fetchTestTarget(
    subject: string,
    targetMonth: string
  ): Promise<{
    targetPercentage: number;
    targetMonth: string;
    targetMemo?: string;
    targetSectionPercentages: Record<number, number>;
  } | null> {
    try {
      return await this.repository.fetchTestTarget(subject, targetMonth);
    } catch (error) {
      console.error("テスト目標の取得処理でエラーが発生しました:", error);
      throw error;
    }
  }

  // 科目カード情報の取得（更新版）
  async fetchCardAllDatas(): Promise<CardAllData[]> {
    // 基本データの取得
    const cardAllDatasRaw = await this.repository.fetchCardAllDatasRaw();

    // 各科目ごとに月次目標データを取得
    const cardAllDatas: CardAllData[] = await Promise.all(
      cardAllDatasRaw.map(async (data) => {
        // 未回答年度の取得
        const unAnsweredYears = this.getUnAnsweredYears(
          data.subject,
          data.answeredYears
        );

        // 月次目標データの取得
        const monthlyTargets = await this.repository.fetchMonthlyTargets(
          data.subject
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
    const allYears: number[] = testDatas
      .filter((testData) => testData.subject === subject)
      .map((testData) => testData.year);

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

export const profileService = new ProfileService();
