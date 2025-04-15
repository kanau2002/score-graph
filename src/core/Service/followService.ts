import { FollowUser } from "@/type/followType";
import { FollowRepository } from "../Repository/followRepository";

class FollowService {
  private repository: FollowRepository;

  constructor() {
    this.repository = new FollowRepository();
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

export const followService = new FollowService();
