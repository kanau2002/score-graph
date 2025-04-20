import { pool } from "@/lib/db";
import { Subject, TestResult } from "@/type/testType";
import {
  CardAllDataRaw,
  CardCreateResponse,
  CardDeleteResponse,
  CardUpdateResponse,
} from "../../type/cardType";

export class CardRepository {
  async fetchCardData(userId: number, subject: Subject) {
    try {
      const query = `
        SELECT 
          id,
          subject,
          final_score_target,
          final_score_lowest,
          memo
        FROM cards
        WHERE user_id = $1 AND subject = $2
      `;

      const result = await pool.query(query, [userId, subject]);

      // 結果がない場合はデフォルト値を返す
      if (result.rows.length === 0) {
        return {
          subject,
          finalScoreTarget: 80, // デフォルト値
          finalScoreLowest: 88, // デフォルト値
          memo: "",
        };
      }

      // 結果がある場合はその値を返す
      const card = result.rows[0];
      return {
        subject: card.subject,
        finalScoreTarget: card.final_score_target,
        finalScoreLowest: card.final_score_lowest,
        memo: card.memo || "",
      };
    } catch (error) {
      console.error("科目カードデータ取得エラー:", error);
      // エラー時もデフォルト値を返す
      return {
        subject,
        finalScoreTarget: 80,
        finalScoreLowest: 60,
        memo: "",
      };
    }
  }

  // 科目カードを作成するメソッド
  async createCard(data: {
    userId: number;
    subject: Subject;
    finalScoreTarget: number;
    finalScoreLowest: number;
    memo: string;
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
    memo: string;
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

  // testsテーブルからデータを取得するメソッド
  async fetchCardAllDatasRaw(userId: number): Promise<CardAllDataRaw[]> {
    const query = `
    SELECT 
      c.id,
      c.subject,
      c.final_score_target,
      c.final_score_lowest,
      c.memo,
      CASE 
        WHEN COUNT(t.id) = 0 THEN '[]'::json
        ELSE json_agg(
          json_build_object(
            'id', t.id,
            'date', to_char(t.date, 'YYYY/MM/DD'),
            'year', t.year,
            'percentage', t.percentage,
            'memo', t.memo
          ) ORDER BY t.date DESC
        )
      END AS "testResults"
    FROM 
      cards c
    LEFT JOIN 
      tests t ON c.subject = t.subject AND c.user_id = t.user_id
    WHERE 
      c.user_id = $1
    GROUP BY 
      c.id, c.subject, c.final_score_target, c.final_score_lowest, c.memo
  `;

    try {
      const result = await pool.query(query, [userId]);

      const cardAllDatasRaw: CardAllDataRaw[] = result.rows.map((row) => ({
        subject: row.subject as Subject,
        finalScoreTarget: row.final_score_target,
        finalScoreLowest: row.final_score_lowest,
        memo: row.memo,
        testResults: row.testResults,
        answeredYears: row.testResults.map((testResult: TestResult) =>
          Number(testResult.year)
        ),
      }));

      return cardAllDatasRaw;
    } catch (error) {
      console.error("科目カードデータ取得エラー:", error);
      throw error;
    }
  }
}
