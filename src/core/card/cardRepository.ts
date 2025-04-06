import { pool } from "@/lib/db";
import { Subject } from "@/core/profile/type";
import { CardCreateResponse } from "./cardType";

export class CardRepository {
  // 科目カードを作成するメソッド
  async createCard(data: {
    userId: number;
    subject: Subject;
    finalScoreTarget: number;
    finalScoreLowest: number;
    memo?: string;
  }): Promise<CardCreateResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      const query = `
        INSERT INTO cards 
          (user_id, subject, final_score_target, final_score_lowest, memo)
        VALUES 
          ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id, subject)
        DO UPDATE SET
          final_score_target = $3,
          final_score_lowest = $4,
          memo = $5,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id
      `;

      const result = await pool.query(query, [
        data.userId,
        data.subject,
        data.finalScoreTarget,
        data.finalScoreLowest,
        data.memo || null,
      ]);

      // トランザクションコミット
      await pool.query("COMMIT");

      return {
        success: true,
        cardId: result.rows[0]?.id,
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("科目カード作成エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  // 利用可能な科目の一覧を取得するメソッド
  async fetchUnAnsweredSubjects(userId: number): Promise<Subject[]> {
    try {
      // すでに作成されている科目を取得
      const existingQuery = `
        SELECT subject 
        FROM cards 
        WHERE user_id = $1
      `;

      const existingResult = await pool.query(existingQuery, [userId]);
      const existingSubjects = existingResult.rows.map((row) => row.subject);

      // 全科目の一覧を取得
      const allSubjectsQuery = `
        SELECT unnest(enum_range(NULL::subject_enum)) AS subject
      `;

      const allSubjectsResult = await pool.query(allSubjectsQuery);
      const allSubjects = allSubjectsResult.rows.map(
        (row) => row.subject as Subject
      );

      // まだ作成されていない科目のみをフィルタリング
      const availableSubjects = allSubjects.filter(
        (subject) => !existingSubjects.includes(subject)
      );

      return availableSubjects;
    } catch (error) {
      console.error("利用可能な科目取得エラー:", error);
      return [];
    }
  }
}
