import { testStructureDatas } from "@/constants/TestStructureData";
import { TestRepository } from "../Repository/testRepository";
import {
  AnsweredData,
  TestData,
  TestSubmissionData,
  TestSubmissionResult,
} from "@/type/testType";
import { getCurrentUserId } from "@/lib/auth";

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
    const testStructureData = testStructureDatas.find(
      (testStructureData) =>
        testStructureData.subject === subject && testStructureData.year === year
    );
    if (!testStructureData) {
      throw new Error(
        `Test data not found for subject: ${subject}, year: ${year}`
      );
    }
    return testStructureData;
  }

  // 生徒のテスト結果データの取得
  async fetchStudentData(subject: string, year: number): Promise<AnsweredData> {
    const userId = await getCurrentUserId();
    return this.repository.fetchStudentData(subject, year.toString(), userId);
  }

  // 相互フォローしているフレンドのテスト結果データの取得
  async fetchFriendsData(
    subject: string,
    year: number
  ): Promise<AnsweredData[]> {
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
