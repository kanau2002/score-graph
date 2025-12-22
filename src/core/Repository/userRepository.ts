import { pool } from "@/lib/db";
import { FollowUser } from "@/type/followType";
import { ProfileData, ProfileUpdateResponse } from "@/type/userType";

export class UserRepository {
  // プロフィールデータの取得
  async fetchProfileData(userId: number): Promise<ProfileData> {
    try {
      const result = await pool.query(
        `
      SELECT 
        u.id, 
        u.full_name, 
        u.user_name, 
        u.memo,
        u.targetUniversity_1,
        u.targetUniversity_2,
        u.targetUniversity_3,
        u.thumbnail_url as "thumbnailUrl"
      FROM 
        users u
      WHERE 
        u.id = $1
    `,
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error("プロフィールデータが見つかりません");
      }

      // 志望大学データを配列に変換
      const targetUniversities = [];
      if (result.rows[0].targetuniversity_1)
        targetUniversities.push(result.rows[0].targetuniversity_1);
      if (result.rows[0].targetuniversity_2)
        targetUniversities.push(result.rows[0].targetuniversity_2);
      if (result.rows[0].targetuniversity_3)
        targetUniversities.push(result.rows[0].targetuniversity_3);

      const profileData: ProfileData = {
        userId: result.rows[0].id,
        fullName: result.rows[0].full_name,
        userName: result.rows[0].user_name,
        targetUniversities: targetUniversities,
        memo: result.rows[0].memo,
        thumbnailUrl: result.rows[0].thumbnailUrl,
      };

      return profileData;
    } catch (error) {
      console.error("プロフィールデータ取得エラー:", error);
      throw error;
    }
  }

  // プロフィール情報の更新
  async updateProfileData(data: {
    userId: number;
    fullName: string;
    userName: string;
    targetUniversities: string[];
    memo: string;
    thumbnailUrl?: string;
  }): Promise<ProfileUpdateResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      // usersテーブルを更新
      await pool.query(
        `UPDATE users
       SET 
        full_name = $1,
        user_name = $2,
        targetUniversity_1 = $3,
        targetUniversity_2 = $4,
        targetUniversity_3 = $5,
        memo = $6,
        thumbnail_url = $7,
        updated_at = CURRENT_TIMESTAMP
       WHERE 
        id = $8`,
        [
          data.fullName,
          data.userName,
          data.targetUniversities[0] || null,
          data.targetUniversities[1] || null,
          data.targetUniversities[2] || null,
          data.memo,
          data.thumbnailUrl || null,
          data.userId,
        ]
      );

      // トランザクションコミット
      await pool.query("COMMIT");

      return { success: true };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("プロフィール更新エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
  // そのユーザーが卒業済みか否かの取得
  async fetchIsGraduated(userId: number): Promise<boolean> {
    const result = await pool.query(
      `SELECT is_graduated FROM users WHERE id = $1;`,
      [userId]
    );
    return result.rows[0];
  }

  // ユーザー検索機能
  // ユーザーID検索機能
  async searchUserById(
    targetUid: number,
    userId: number
  ): Promise<FollowUser | null> {
    const query = `
      SELECT id, user_name as "userName"
      FROM users
      WHERE 
        id = $1 AND id != $2
    `;

    try {
      const result = await pool.query(query, [targetUid, userId]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("ユーザーID検索エラー:", error);
      throw error;
    }
  }
}
