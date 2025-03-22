// src/core/profile/profileService.ts
import { testDatas } from "./repositories/data";
import { ProfileRepository } from "./repositories/infra";
import { ProfileData, CardData, AnsweredData, TestData } from "./type";

class ProfileService {
  private repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  // プロフィール情報の取得
  async fetchProfileData(): Promise<ProfileData> {
    return this.repository.fetchProfileData();
  }

  // 科目カード情報の取得
  async fetchCardDatas(): Promise<CardData[]> {
    return this.repository.fetchCardDatas();
  }

  // テスト構造情報の取得
  async fetchTestStructure(subject: string, year: number): Promise<TestData> {
    const testData = testDatas.find(
      (testData) => testData.subject === subject && testData.year === year
    );
    if (!testData) {
      throw new Error(`Test data not found for subject: ${subject}, year: ${year}`);
    }
    return testData;
  }

  // 生徒のテスト結果データの取得
  async fetchStudentData(subject: string, year: number): Promise<AnsweredData> {
    return this.repository.fetchStudentData(subject, year);
  }

  // フレンドのテスト結果データの取得
  async fetchFriendsData(
    subject: string,
    year: number
  ): Promise<AnsweredData[]> {
    return this.repository.fetchFriendsData(subject, year);
  }
}

// シングルトンとしてエクスポート
export const profileService = new ProfileService();
