// src/core/profile/profileService.ts
import { testDatas } from "./repositories/data";
import { ProfileRepository } from "./repositories/infra";
import {
  ProfileData,
  CardData,
  AnsweredData,
  TestData,
  FollowUser,
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

  // 科目カード情報の取得
  async fetchCardDatas(): Promise<CardData[]> {
    const cardDatasRaw = await this.repository.fetchCardDatasRaw();

    const cardDatas: CardData[] = cardDatasRaw.map((cardDataRaw) => {
      const getUnAnsweredYears = (answeredYears: number[]) => {
        const allYears: number[] = testDatas
          .filter((testData) => testData.subject === cardDataRaw.subject)
          .map((testData) => testData.year);
        const unAnsweredYears: number[] = allYears.filter(
          (year) => !answeredYears.includes(year)
        );
        return unAnsweredYears;
      };
      // allYears = [2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025];
      // answeredYears = [2015, 2017, 2025];
      // unAnsweredYears = [2016, 2018, 2019, 2021, 2022, 2023, 2024];

      return {
        subject: cardDataRaw.subject,
        finalScoreTarget: cardDataRaw.finalScoreTarget,
        finalScoreLowest: cardDataRaw.finalScoreLowest,
        memo: cardDataRaw.memo,
        testResults: cardDataRaw.testResults,
        unAnsweredYears: getUnAnsweredYears(cardDataRaw.answeredYears),
      };
    });

    return cardDatas;
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
}

// シングルトンとしてエクスポート
export const profileService = new ProfileService();
