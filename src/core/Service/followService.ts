import { FollowUser } from "@/type/followType";
import { FollowRepository } from "../Repository/followRepository";
import { getAuthCookie, getCurrentUserId } from "@/lib/auth";

class FollowService {
  private repository: FollowRepository;

  constructor() {
    this.repository = new FollowRepository();
  }

  // ユーザーIDによる検索
  async searchUserById(targetUid: number): Promise<FollowUser | null> {
    const userId = await getCurrentUserId();
    return this.repository.searchUserById(targetUid, userId);
  }

  // ユーザーをフォローする
  async followUser(targetUserId: number): Promise<void> {
    const userId = await getCurrentUserId();
    return this.repository.followUser(userId, targetUserId);
  }

  // ユーザーのフォローを解除する
  async unfollowUser(targetUserId: number): Promise<void> {
    const userId = await getCurrentUserId();
    return this.repository.unfollowUser(userId, targetUserId);
  }

  // 相互フォローしているユーザー一覧を取得
  async fetchMutualFollows(): Promise<FollowUser[]> {
    const userId = await getCurrentUserId();
    return this.repository.fetchMutualFollows(userId);
  }

  // 自分がフォローしているユーザー一覧を取得
  async fetchFollowing(): Promise<FollowUser[]> {
    const userId = await getCurrentUserId();
    return this.repository.fetchFollowing(userId);
  }

  // フォロー状態をチェックする
  async checkFollowStatus(
    targetUserId: number
  ): Promise<{ isFollowing: boolean; isFollower: boolean }> {
    const userId = await getCurrentUserId();
    return this.repository.checkFollowStatus(userId, targetUserId);
  }

  // 自分をフォローしてくれているが、自分はまだフォローし返していない人の一覧を取得
  async fetchFollowersNotFollowingBack(): Promise<FollowUser[]> {
    const userId = await getCurrentUserId();
    return this.repository.fetchFollowersNotFollowingBack(userId);
  }

  // 自分をフォローしてくれているが、自分はまだフォローし返していない人がいるかチェック
  async isFollowersNotFollowingBack(): Promise<boolean> {
    const token = await getAuthCookie();
    if (!token) {
      return false;
    } else {
      const userId = await getCurrentUserId();
      const followersNotFollowingBack =
        await this.repository.fetchFollowersNotFollowingBack(userId);
      return followersNotFollowingBack.length > 0;
    }
  }
}

export const followService = new FollowService();
