import { testStructureDataMap } from "@/constants/TestStructureData";
import { TestRepository } from "../Repository/testRepository";
import {
  AnsweredData,
  TestData,
  TestSubmissionData,
  TestSubmissionResult,
} from "@/type/testType";
import { getAuthCookie, getCurrentUserId } from "@/lib/auth";

class TestService {
  private repository: TestRepository;

  constructor() {
    this.repository = new TestRepository();
  }

  // テスト構造情報の取得
  async fetchTestStructureData(
    subject: string,
    year: number
  ): Promise<TestData> {
    // O(1)でMapから取得
    const key = `${subject}_${year}`;
    const testStructureData = testStructureDataMap.get(
      key as Parameters<typeof testStructureDataMap.get>[0]
    );

    if (!testStructureData) {
      throw new Error(
        `Test data not found for subject: ${subject}, year: ${year}`
      );
    }
    // readonly型をTestData型にキャスト（データは不変なので安全）
    return testStructureData as unknown as TestData;
  }

  // 生徒のテスト結果データの取得
  async fetchTestResultStudentAtMy(
    subject: string,
    year: number
  ): Promise<AnsweredData> {
    const userId = await getCurrentUserId();
    const result = await this.repository.fetchTestResult(
      subject,
      year.toString(),
      userId
    );
    if (result === null) {
      throw new Error("データが取得できませんでした。");
    }
    return result;
  }

  async fetchTestResultStudentAtHome(
    subject: string,
    year: number
  ): Promise<AnsweredData[] | []> {
    if ((await getAuthCookie()) === undefined) {
      return [];
    }
    const userId = await getCurrentUserId();
    const result = await this.repository.fetchTestResult(
      subject,
      year.toString(),
      userId
    );
    if (result === null) {
      return [];
    }
    return [result];
  }

  // 先輩のテスト結果データの取得
  async fetchTestResultSenior(
    subject: string,
    year: number,
    uid: number
  ): Promise<AnsweredData> {
    const result = await this.repository.fetchTestResult(
      subject,
      year.toString(),
      uid
    );
    if (result === null) {
      throw new Error("データが取得できませんでした。");
    }
    return result;
  }

  // 相互フォローしているフレンドのテスト結果データの取得
  async fetchFriendsData(
    subject: string,
    year: number
  ): Promise<AnsweredData[] | []> {
    const userId = await getCurrentUserId();
    return this.repository.fetchFriendsData(subject, year.toString(), userId);
  }

  /**
   * テスト結果と解答データを削除する
   */
  async deleteTestResult(
    subject: string,
    year: number
  ): Promise<{ success: boolean; error?: string }> {
    const userId = await getCurrentUserId();

    try {
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

  /**
   * テストの回答を保存する
   */
  async saveTestAnswers(
    data: Omit<TestSubmissionData, "userId">
  ): Promise<TestSubmissionResult> {
    const userId = await getCurrentUserId();
    try {
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
}

export const testService = new TestService();
