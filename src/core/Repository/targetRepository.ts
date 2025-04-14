import { pool } from "@/lib/db";
import { Subject } from "@/type/testType";
import {
  TargetData,
  TargetSaveData,
  TargetUpsertResponse,
} from "../../type/targetType";

export class TargetRepository {
  // ターゲットデータを保存（新規または更新）するメソッド
  async upsertTarget(data: TargetSaveData): Promise<TargetUpsertResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      const query = `
        INSERT INTO tests_target 
          (user_id, subject, target_percentage, target_month, target_memo)
        VALUES 
          ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id, subject, target_month)
        DO UPDATE SET
          target_percentage = $3,
          target_memo = $5,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id
      `;

      const result = await pool.query(query, [
        data.userId,
        data.subject,
        data.targetPercentage,
        data.targetMonth,
        data.targetMemo || null,
      ]);

      // トランザクションコミット
      await pool.query("COMMIT");

      return {
        success: true,
        targetId: result.rows[0]?.id,
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("目標データ保存エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  // 科目と月に基づいて既存のターゲットデータを取得するメソッド
  async fetchTargetData(
    userId: number,
    subject: Subject,
    targetMonth: string
  ): Promise<TargetData | null> {
    try {
      const query = `
        SELECT 
          id,
          user_id,
          subject,
          target_percentage,
          target_month,
          target_memo,
          created_at,
          updated_at
        FROM 
          tests_target
        WHERE 
          user_id = $1 AND
          subject = $2 AND
          target_month = $3
      `;

      const result = await pool.query(query, [userId, subject, targetMonth]);

      if (result.rows.length === 0) {
        return null;
      }

      const targetData = result.rows[0];

      return {
        id: targetData.id,
        userId: targetData.user_id,
        subject: targetData.subject,
        targetPercentage: targetData.target_percentage,
        targetMonth: targetData.target_month,
        targetMemo: targetData.target_memo || "",
        createdAt: targetData.created_at,
        updatedAt: targetData.updated_at,
      };
    } catch (error) {
      console.error("目標データ取得エラー:", error);
      return null;
    }
  }

  // 指定した科目の全ての月のデータを取得するメソッド
  async fetchAllTargetDataBySubject(
    userId: number,
    subject: Subject
  ): Promise<TargetData[]> {
    try {
      const query = `
        SELECT 
          id,
          user_id,
          subject,
          target_percentage,
          target_month,
          target_memo,
          created_at,
          updated_at
        FROM 
          tests_target
        WHERE 
          user_id = $1 AND
          subject = $2
        ORDER BY
          target_month ASC
      `;

      const result = await pool.query(query, [userId, subject]);

      return result.rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        subject: row.subject,
        targetPercentage: row.target_percentage,
        targetMonth: row.target_month,
        targetMemo: row.target_memo || "",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.error("科目別目標データ取得エラー:", error);
      return [];
    }
  }

  // tests_targetテーブルから月次目標を取得するメソッド
  async fetchMonthlyTargets(subject: Subject): Promise<
    Array<{
      targetMonth: string;
      targetPercentage: number;
    }>
  > {
    const query = `
    SELECT 
      target_month,
      target_percentage
    FROM 
      tests_target
    WHERE 
      user_id = 1 AND subject = $1
    ORDER BY
      target_month
  `;

    try {
      const result = await pool.query(query, [subject]);

      return result.rows.map((row) => ({
        targetMonth: row.target_month,
        targetPercentage: row.target_percentage,
      }));
    } catch (error) {
      console.error("月次目標データ取得エラー:", error);
      throw error;
    }
  }
}

export const targetRepository = new TargetRepository();
