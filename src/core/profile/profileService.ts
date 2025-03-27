// src/core/profile/profileService.ts
import { testDatas } from "./repositories/data";
import { ProfileRepository } from "./repositories/infra";
import { ProfileData, CardData, AnsweredData, TestData } from "./type";

interface FollowUser {
  id: number;
  userName: string;
}

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

  // 相互フォロー関連の機能追加

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

  // 自分をフォローしているユーザー一覧を取得
  async fetchFollowers(): Promise<FollowUser[]> {
    // 現在のユーザーID（この実装では固定で1）
    const currentUserId = 1;
    return this.repository.fetchFollowers(currentUserId);
  }
}

// シングルトンとしてエクスポート
export const profileService = new ProfileService();
