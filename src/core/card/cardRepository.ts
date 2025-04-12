import { pool } from "@/lib/db";
import { Subject } from "@/core/profile/type";
import {
  CardCreateResponse,
  CardDeleteResponse,
  CardUpdateResponse,
} from "./cardType";

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

  // 科目カードを更新するメソッド
  async updateCard(data: {
    userId: number;
    subject: Subject;
    finalScoreTarget: number;
    finalScoreLowest: number;
    memo?: string;
  }): Promise<CardUpdateResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      const query = `
        UPDATE cards 
        SET
          final_score_target = $3,
          final_score_lowest = $4,
          memo = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND subject = $2
        RETURNING id
      `;

      const result = await pool.query(query, [
        data.userId,
        data.subject,
        data.finalScoreTarget,
        data.finalScoreLowest,
        data.memo || null,
      ]);

      // 更新対象が存在しない場合
      if (result.rowCount === 0) {
        await pool.query("ROLLBACK");
        return {
          success: false,
          error: "指定された科目のカードが見つかりませんでした。",
        };
      }

      // トランザクションコミット
      await pool.query("COMMIT");

      return {
        success: true,
        cardId: result.rows[0]?.id,
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("科目カード更新エラー:", error);
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

  // 科目カードとそれに関連するデータを削除するメソッド
  async deleteCard(
    userId: number,
    subject: Subject
  ): Promise<CardDeleteResponse> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      // test_answerテーブルのレコードを削除
      const deleteAnswersQuery = `
        DELETE FROM test_answer
        WHERE user_id = $1 AND subject = $2
      `;
      await pool.query(deleteAnswersQuery, [userId, subject]);

      // testsテーブルのレコードを削除
      const deleteTestsQuery = `
        DELETE FROM tests
        WHERE user_id = $1 AND subject = $2
      `;
      await pool.query(deleteTestsQuery, [userId, subject]);

      // tests_targetテーブルのレコードを削除
      const deleteTargetsQuery = `
        DELETE FROM tests_target
        WHERE user_id = $1 AND subject = $2
      `;
      await pool.query(deleteTargetsQuery, [userId, subject]);

      // cardsテーブルのレコードを削除
      const deleteCardQuery = `
        DELETE FROM cards
        WHERE user_id = $1 AND subject = $2
        RETURNING id
      `;
      const cardResult = await pool.query(deleteCardQuery, [userId, subject]);

      // 削除されたカードが存在するか確認
      if (cardResult.rowCount === 0) {
        await pool.query("ROLLBACK");
        return {
          success: false,
          error: "指定された科目のカードが見つかりませんでした。",
        };
      }

      // トランザクションコミット
      await pool.query("COMMIT");

      return {
        success: true,
        deletedCardId: cardResult.rows[0]?.id,
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("科目カード削除エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
