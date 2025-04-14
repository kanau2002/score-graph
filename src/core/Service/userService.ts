import {
  ProfileData,
  ProfileUpdateData,
  ProfileUpdateResponse,
} from "@/type/userType";
import { UserRepository } from "../Repository/userRepository";

// 実際のアプリでは認証情報からユーザーIDを取得する
const userId = 1; // デフォルトのユーザーID
class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  // プロフィール情報の取得
  async fetchProfileData(): Promise<ProfileData> {
    return this.repository.fetchProfileData(userId);
  }

  // プロフィール情報の更新
  async updateProfileData(
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse> {
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
}

export const userService = new UserService();
