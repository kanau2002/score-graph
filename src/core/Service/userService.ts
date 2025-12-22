import {
  ProfileData,
  ProfileUpdateData,
  ProfileUpdateResponse,
} from "@/type/userType";
import { UserRepository } from "../Repository/userRepository";
import { getCurrentUserId } from "@/lib/auth";
import { FollowUser } from "@/type/followType";

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  // プロフィール情報の取得
  async fetchProfileData(userId: number): Promise<ProfileData> {
    return this.repository.fetchProfileData(userId);
  }

  // プロフィール情報の更新
  async updateProfileData(
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse> {
    const userId = await getCurrentUserId();
    try {
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

  // そのユーザーが卒業済みか否かの取得
  async fetchIsGraduated(userId: number): Promise<boolean> {
    return this.repository.fetchIsGraduated(userId);
  }

  // ユーザーIDによる検索
  async searchUserById(targetUid: number): Promise<FollowUser | null> {
    const userId = await getCurrentUserId();
    return this.repository.searchUserById(targetUid, userId);
  }
}

export const userService = new UserService();
