import { pool } from "@/lib/db";
import { FollowUser } from "@/type/followType";

export class FollowRepository {
  // フォロー関連操作のメソッド

  // ユーザーをフォローする
  async followUser(userId: number, targetUserId: number): Promise<void> {
    const query = `
      INSERT INTO friend_follow (follower_id, following_id) 
      VALUES ($1, $2)
      ON CONFLICT (follower_id, following_id) DO NOTHING
    `;

    try {
      await pool.query(query, [userId, targetUserId]);
    } catch (error) {
      console.error("ユーザーフォローエラー:", error);
      throw error;
    }
  }

  // ユーザーのフォローを解除する
  async unfollowUser(userId: number, targetUserId: number): Promise<void> {
    const query = `
      DELETE FROM friend_follow
      WHERE follower_id = $1 AND following_id = $2
    `;

    try {
      await pool.query(query, [userId, targetUserId]);
    } catch (error) {
      console.error("フォロー解除エラー:", error);
      throw error;
    }
  }

  // 相互フォローしているユーザー一覧を取得
  async fetchMutualFollows(userId: number): Promise<FollowUser[]> {
    const query = `
      SELECT u.id, u.user_name as "userName"
      FROM users u
      JOIN friend_follow f1 ON f1.following_id = u.id
      JOIN friend_follow f2 ON f2.follower_id = u.id
      WHERE f1.follower_id = $1 AND f2.following_id = $1
      ORDER BY u.user_name
    `;

    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("相互フォローユーザー取得エラー:", error);
      throw error;
    }
  }

  // 自分がフォローしているユーザー一覧を取得
  async fetchFollowing(userId: number): Promise<FollowUser[]> {
    const query = `
      SELECT u.id, u.user_name as "userName"
      FROM users u
      JOIN friend_follow f ON f.following_id = u.id
      WHERE f.follower_id = $1
      ORDER BY u.user_name
    `;

    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("フォロー中ユーザー取得エラー:", error);
      throw error;
    }
  }

  // ユーザー検索機能
  // ユーザーID検索機能
  async searchUserById(
    userId: number,
    currentUserId: number
  ): Promise<FollowUser | null> {
    const query = `
      SELECT id, user_name as "userName"
      FROM users
      WHERE 
        id = $1 AND id != $2
    `;

    try {
      const result = await pool.query(query, [userId, currentUserId]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("ユーザーID検索エラー:", error);
      throw error;
    }
  }

  // フォロー状態をチェック
  async checkFollowStatus(
    userId: number,
    targetUserId: number
  ): Promise<{ isFollowing: boolean; isFollower: boolean }> {
    const query = `
      SELECT 
        EXISTS (SELECT 1 FROM friend_follow WHERE follower_id = $1 AND following_id = $2) as is_following,
        EXISTS (SELECT 1 FROM friend_follow WHERE follower_id = $2 AND following_id = $1) as is_follower
    `;

    try {
      const result = await pool.query(query, [userId, targetUserId]);

      return {
        isFollowing: result.rows[0].is_following,
        isFollower: result.rows[0].is_follower,
      };
    } catch (error) {
      console.error("フォロー状態チェックエラー:", error);
      throw error;
    }
  }

  // NULL値をフィルタリングするヘルパーメソッド
  private filterNullValues(
    obj: Record<string, number | null>
  ): Record<number, number> {
    const filtered: Record<number, number> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== null) {
        filtered[Number(key)] = value as number;
      }
    }

    return filtered;
  }
}
