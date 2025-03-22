// src/core/profile/repositories/infra.ts
import { pool } from "@/lib/db";
import { ProfileData, CardData, AnsweredData, Subject, Answer } from "../type";

export class ProfileRepository {
  // プロフィールデータの取得
  async fetchProfileData(): Promise<ProfileData> {
    const query = `
      SELECT 
        u.id, 
        u.user_name, 
        u.memo,
        u.targetUniversity_1,
        u.targetUniversity_2,
        u.targetUniversity_3
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

      const profileData: ProfileData = {
        userName: result.rows[0].user_name,
        targetUniversities: targetUniversities,
        memo: result.rows[0].memo,
      };

      return profileData;
    } catch (error) {
      console.error("プロフィールデータ取得エラー:", error);
      throw error;
    }
  }

  // 科目カードデータの取得
  async fetchCardDatas(): Promise<CardData[]> {
    const query = `
      SELECT 
        us.id,
        us.subject,
        us.final_score_target,
        us.final_score_lowest,
        us.memo,
        json_agg(
          json_build_object(
            'id', t.id,
            'date', to_char(t.date, 'YYYY/MM/DD'),
            'year', t.year,
            'targetScore', t.target_percentage,
            'studentScore', t.percentage,
            'memo', t.memo
          ) ORDER BY t.date DESC
        ) AS test_results
      FROM 
        user_subject us
      JOIN 
        tests t ON us.subject = t.subject AND us.user_id = t.user_id
      WHERE 
        us.user_id = 1
      GROUP BY 
        us.id, us.subject, us.final_score_target, us.final_score_lowest, us.memo
    `;

    try {
      const result = await pool.query(query);

      const cardDatas: CardData[] = result.rows.map((row) => ({
        subject: row.subject as Subject,
        finalScoreTarget: row.final_score_target,
        finalScoreLowest: row.final_score_lowest,
        memo: row.memo,
        testResults: row.test_results,
      }));

      return cardDatas;
    } catch (error) {
      console.error("科目カードデータ取得エラー:", error);
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
        t.target_percentage,
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
          1, t.target_score_section1,
          2, t.target_score_section2,
          3, t.target_score_section3,
          4, t.target_score_section4,
          5, t.target_score_section5,
          6, t.target_score_section6
        ) AS target_section_totals,
        json_build_object(
          1, t.target_percentage_section1,
          2, t.target_percentage_section2,
          3, t.target_percentage_section3,
          4, t.target_percentage_section4,
          5, t.target_percentage_section5,
          6, t.target_percentage_section6
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
      const targetSectionTotals = this.filterNullValues(
        row.target_section_totals
      );
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
        targetSectionTotals: targetSectionTotals,
        targetSectionPercentages: targetSectionPercentages,
        answers: this.parseAnswers(row.answers || {}),
      };

      return studentData;
    } catch (error) {
      console.error("生徒のテスト結果データ取得エラー:", error);
      throw error;
    }
  }

  // フレンドのテスト結果データの取得
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
        t.target_percentage,
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
          1, t.target_score_section1,
          2, t.target_score_section2,
          3, t.target_score_section3,
          4, t.target_score_section4,
          5, t.target_score_section5,
          6, t.target_score_section6
        ) AS target_section_totals,
        json_build_object(
          1, t.target_percentage_section1,
          2, t.target_percentage_section2,
          3, t.target_percentage_section3,
          4, t.target_percentage_section4,
          5, t.target_percentage_section5,
          6, t.target_percentage_section6
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
      WHERE 
        t.subject = $1 AND t.year = $2 AND u.id != 1
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
        const targetSectionTotals = this.filterNullValues(
          row.target_section_totals
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
          targetSectionTotals: targetSectionTotals,
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
}
