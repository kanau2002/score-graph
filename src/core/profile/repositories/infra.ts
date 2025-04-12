import { pool } from "@/lib/db";
import {
  AnsweredData,
  Subject,
  Answer,
  CardAllDataRaw,
  TestSubmissionData,
  TestSubmissionResult,
  TestResult,
} from "../type";
import { FollowUser } from "@/type/followType";

export class ProfileRepository {
  // testsテーブルからデータを取得するメソッド
  async fetchCardAllDatasRaw(): Promise<CardAllDataRaw[]> {
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
      c.user_id = 1
    GROUP BY 
      c.id, c.subject, c.final_score_target, c.final_score_lowest, c.memo
  `;

    try {
      const result = await pool.query(query);

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
  // 生徒のテスト結果データの取得
  async fetchStudentData(subject: string, year: string): Promise<AnsweredData> {
    const query = `
      SELECT 
        t.id,
        'あなた' as name,
        t.score,
        t.percentage,
        tt.target_percentage,
        to_char(t.date, 'YYYY/MM/DD') as "date",
        t.memo,
        json_build_object(
          1, t.score_section1,
          2, t.score_section2,
          3, t.score_section3,
          4, t.score_section4,
          5, t.score_section5,
          6, t.score_section6
        ) AS section_totals,
        json_build_object(
          1, t.percentage_section1,
          2, t.percentage_section2,
          3, t.percentage_section3,
          4, t.percentage_section4,
          5, t.percentage_section5,
          6, t.percentage_section6
        ) AS section_percentages,
        json_build_object(
          1, tt.target_percentage_section1,
          2, tt.target_percentage_section2,
          3, tt.target_percentage_section3,
          4, tt.target_percentage_section4,
          5, tt.target_percentage_section5,
          6, tt.target_percentage_section6
        ) AS target_section_percentages,
        (
          SELECT json_object_agg(
            question_number, 
            answer::text
          )
          FROM test_answer
          WHERE user_id = t.user_id AND subject = t.subject AND year = t.year
        ) AS answers
      FROM 
        tests t
      LEFT JOIN
        tests_target tt ON 
          t.user_id = tt.user_id AND 
          t.subject = tt.subject AND 
          to_char(t.date, 'YYYY-MM') = tt.target_month
      WHERE 
        t.subject = $1 AND t.year = $2 AND t.user_id = 1
      LIMIT 1
    `;

    try {
      const result = await pool.query(query, [subject, year]);

      if (result.rows.length === 0) {
        throw new Error(
          `生徒のテスト結果データが見つかりません: ${subject} ${year}`
        );
      }

      const row = result.rows[0];

      // NULL値を除去するためにオブジェクトをフィルタリング
      const sectionTotals = this.filterNullValues(row.section_totals);
      const sectionPercentages = this.filterNullValues(row.section_percentages);
      const targetSectionPercentages = this.filterNullValues(
        row.target_section_percentages
      );

      const studentData: AnsweredData = {
        id: row.id,
        name: row.name,
        score: row.score,
        percentage: row.percentage,
        targetPercentage: row.target_percentage,
        date: row.date,
        memo: row.memo,
        sectionTotals: sectionTotals,
        sectionPercentages: sectionPercentages,
        targetSectionPercentages: targetSectionPercentages,
        answers: this.parseAnswers(row.answers || {}),
      };

      return studentData;
    } catch (error) {
      console.error("生徒のテスト結果データ取得エラー:", error);
      throw error;
    }
  }

  // 相互フォローしているフレンドのテスト結果データのみを取得
  async fetchFriendsData(
    subject: string,
    year: string
  ): Promise<AnsweredData[]> {
    const query = `
      SELECT 
        t.id,
        u.user_name as name,
        t.score,
        t.percentage,
        tt.target_percentage,
        to_char(t.date, 'YYYY/MM/DD') as date,
        t.memo,
        json_build_object(
          1, t.score_section1,
          2, t.score_section2,
          3, t.score_section3,
          4, t.score_section4,
          5, t.score_section5,
          6, t.score_section6
        ) AS section_totals,
        json_build_object(
          1, t.percentage_section1,
          2, t.percentage_section2,
          3, t.percentage_section3,
          4, t.percentage_section4,
          5, t.percentage_section5,
          6, t.percentage_section6
        ) AS section_percentages,
        json_build_object(
          1, tt.target_percentage_section1,
          2, tt.target_percentage_section2,
          3, tt.target_percentage_section3,
          4, tt.target_percentage_section4,
          5, tt.target_percentage_section5,
          6, tt.target_percentage_section6
        ) AS target_section_percentages,
        (
          SELECT json_object_agg(
            question_number, 
            answer::text
          )
          FROM test_answer
          WHERE user_id = t.user_id AND subject = t.subject AND year = t.year
        ) AS answers
      FROM 
        tests t
      JOIN
        users u ON t.user_id = u.id
      LEFT JOIN
        tests_target tt ON 
          t.user_id = tt.user_id AND 
          t.subject = tt.subject AND 
          to_char(t.date, 'YYYY-MM') = tt.target_month
      WHERE 
        t.subject = $1 
        AND t.year = $2 
        AND u.id != 1
        AND EXISTS (
          -- 相互フォロー関係のチェック：現在のユーザーがフォローしており、かつ相手にもフォローされている
          SELECT 1 FROM friend_follow f1
          JOIN friend_follow f2 ON f1.following_id = f2.follower_id AND f1.follower_id = f2.following_id
          WHERE f1.follower_id = 1 AND f1.following_id = u.id
        )
      ORDER BY
        u.user_name
    `;

    try {
      const result = await pool.query(query, [subject, year]);

      const friendsData: AnsweredData[] = result.rows.map((row) => {
        // NULL値を除去するためにオブジェクトをフィルタリング
        const sectionTotals = this.filterNullValues(row.section_totals);
        const sectionPercentages = this.filterNullValues(
          row.section_percentages
        );
        const targetSectionPercentages = this.filterNullValues(
          row.target_section_percentages
        );

        return {
          id: row.id,
          name: row.name,
          score: row.score,
          percentage: row.percentage,
          targetPercentage: row.target_percentage,
          date: row.date,
          memo: row.memo,
          sectionTotals: sectionTotals,
          sectionPercentages: sectionPercentages,
          targetSectionPercentages: targetSectionPercentages,
          answers: this.parseAnswers(row.answers || {}),
        };
      });

      return friendsData;
    } catch (error) {
      console.error("フレンドのテスト結果データ取得エラー:", error);
      throw error;
    }
  }

  // テスト結果と解答データを削除するメソッド
  async deleteTestResult(
    userId: number,
    subject: string,
    year: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      // 1. test_answerテーブルからレコードを削除
      await pool.query(
        `DELETE FROM test_answer 
       WHERE user_id = $1 AND subject = $2 AND year = $3`,
        [userId, subject, year]
      );

      // 2. testsテーブルからレコードを削除
      const deleteResult = await pool.query(
        `DELETE FROM tests 
       WHERE user_id = $1 AND subject = $2 AND year = $3
       RETURNING id`,
        [userId, subject, year]
      );

      // トランザクションコミット
      await pool.query("COMMIT");

      // 削除が成功したかどうかをチェック
      const deleted =
        deleteResult.rowCount != null && deleteResult.rowCount > 0;

      return {
        success: deleted,
        error: deleted ? undefined : "削除対象のレコードが見つかりませんでした",
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("テスト結果削除エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

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

  // 解答データの変換処理（文字列から適切な型に変換）
  private parseAnswers(rawAnswers: Record<string, string>): {
    [questionNumber: number]: Answer;
  } {
    const result: { [questionNumber: number]: Answer } = {};

    for (const [key, value] of Object.entries(rawAnswers)) {
      const questionNumber = parseInt(key);

      // 文字列値をAnswer型に変換
      switch (value) {
        case "1":
          result[questionNumber] = Answer.ONE;
          break;
        case "2":
          result[questionNumber] = Answer.TWO;
          break;
        case "3":
          result[questionNumber] = Answer.THREE;
          break;
        case "4":
          result[questionNumber] = Answer.FOUR;
          break;
        case "5":
          result[questionNumber] = Answer.FIVE;
          break;
        case "6":
          result[questionNumber] = Answer.SIX;
          break;
        case "7":
          result[questionNumber] = Answer.SEVEN;
          break;
        case "CORRECT":
          result[questionNumber] = Answer.CORRECT;
          break;
        case "INCORRECT":
          result[questionNumber] = Answer.INCORRECT;
          break;
        case "SKIPPED":
          result[questionNumber] = Answer.SKIPPED;
          break;
        default:
          console.warn(
            `Unknown answer value: ${value} for question ${questionNumber}`
          );
          // デフォルトでは何らかの適切な値を設定
          result[questionNumber] = Answer.SKIPPED;
      }
    }

    return result;
  }

  // テスト回答の保存
  async saveTestAnswers(
    data: TestSubmissionData
  ): Promise<TestSubmissionResult> {
    try {
      // トランザクション開始
      await pool.query("BEGIN");

      // 1. testsテーブルに基本情報を挿入
      const testResult = await pool.query(
        `INSERT INTO tests 
          (user_id, subject, year, score, percentage, date, memo, 
          score_section1, score_section2, score_section3, score_section4, score_section5, score_section6,
          percentage_section1, percentage_section2, percentage_section3, percentage_section4, percentage_section5, percentage_section6)
         VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
         ON CONFLICT (user_id, subject, year)
         DO UPDATE SET
          score = $4,
          percentage = $5,
          date = $6,
          memo = $7,
          score_section1 = $8,
          score_section2 = $9,
          score_section3 = $10,
          score_section4 = $11,
          score_section5 = $12,
          score_section6 = $13,
          percentage_section1 = $14,
          percentage_section2 = $15,
          percentage_section3 = $16,
          percentage_section4 = $17,
          percentage_section5 = $18,
          percentage_section6 = $19,
          updated_at = CURRENT_TIMESTAMP
         RETURNING id`,
        [
          data.userId,
          data.subject,
          data.year.toString(),
          data.score,
          data.percentage,
          data.date,
          data.memo || "",
          data.sectionTotals[1] || null,
          data.sectionTotals[2] || null,
          data.sectionTotals[3] || null,
          data.sectionTotals[4] || null,
          data.sectionTotals[5] || null,
          data.sectionTotals[6] || null,
          data.sectionPercentages[1] || null,
          data.sectionPercentages[2] || null,
          data.sectionPercentages[3] || null,
          data.sectionPercentages[4] || null,
          data.sectionPercentages[5] || null,
          data.sectionPercentages[6] || null,
        ]
      );

      const testId = testResult.rows[0]?.id;

      // 2. 解答データをtest_answerテーブルに挿入（順番に処理）
      for (const [questionNumber, answer] of Object.entries(data.answers)) {
        await pool.query(
          `INSERT INTO test_answer (user_id, subject, year, question_number, answer)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (user_id, subject, year, question_number)
           DO UPDATE SET answer = $5, updated_at = CURRENT_TIMESTAMP`,
          [
            data.userId,
            data.subject,
            data.year.toString(),
            questionNumber,
            answer,
          ]
        );
      }

      // トランザクションコミット
      await pool.query("COMMIT");

      return {
        success: true,
        testId,
      };
    } catch (error) {
      // エラー発生時はロールバック
      await pool.query("ROLLBACK");
      console.error("テスト回答保存エラー:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
