import { pool } from "@/lib/db";
import { UserData, UserUpdateResponse } from "@/type/userType";

export class UserRepository {
  // プロフィールデータの取得
  async fetchUserData(): Promise<UserData> {
    const query = `
      SELECT 
        u.id, 
        u.user_name, 
        u.memo,
        u.targetUniversity_1,
        u.targetUniversity_2,
        u.targetUniversity_3,
        u.thumbnail_url as "thumbnailUrl"
      FROM 
        users u
      WHERE 
        u.id = 1
    `;

    try {
      const result = await pool.query(query);

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

      const userData: UserData = {
        userName: result.rows[0].user_name,
        targetUniversities: targetUniversities,
        memo: result.rows[0].memo,
        thumbnailUrl: result.rows[0].thumbnailUrl,
      };

      return userData;
    } catch (error) {
      console.error("プロフィールデータ取得エラー:", error);
      throw error;
    }
  }

  // プロフィール情報の更新
  async updateUserData(data: {
    userId: number;
    userName: string;
    targetUniversities: string[];
    memo: string;
    thumbnailUrl?: string;
  }): Promise<UserUpdateResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      // usersテーブルを更新
      await pool.query(
        `UPDATE users
       SET 
        user_name = $1,
        targetUniversity_1 = $2,
        targetUniversity_2 = $3,
        targetUniversity_3 = $4,
        memo = $5,
        thumbnail_url = $6,
        updated_at = CURRENT_TIMESTAMP
       WHERE 
        id = $7`,
        [
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
}
