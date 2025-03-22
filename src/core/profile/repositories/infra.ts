// src/core/profile/repositories/infra.ts
import { pool } from "@/lib/db";
import {
  ProfileData,
  CardData,
  AnsweredData,
  Subject,
  Answer,
} from "../type";

export class ProfileRepository {
  // プロフィールデータの取得
  async fetchProfileData(): Promise<ProfileData> {
    const query = `
      SELECT 
        p.id, 
        p.user_name, 
        p.memo,
        array_agg(tu.university_name ORDER BY tu.display_order) AS target_universities
      FROM 
        profiles p
      JOIN 
        target_universities tu ON p.id = tu.profile_id
      WHERE 
        p.id = 1
      GROUP BY 
        p.id, p.user_name, p.memo
    `;

    try {
      const result = await pool.query(query);

      if (result.rows.length === 0) {
        throw new Error("プロフィールデータが見つかりません");
      }

      const profileData: ProfileData = {
        userName: result.rows[0].user_name,
        targetUniversities: result.rows[0].target_universities,
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
        sc.id,
        sc.subject,
        sc.final_score_target,
        sc.final_score_lowest,
        sc.memo,
        json_agg(
          json_build_object(
            'id', tr.id,
            'date', to_char(tr.date, 'YYYY/MM/DD'),
            'year', tr.year,
            'targetScore', tr.target_score,
            'studentScore', tr.student_score,
            'memo', tr.memo
          ) ORDER BY tr.date DESC
        ) AS test_results
      FROM 
        subject_cards sc
      JOIN 
        test_results tr ON sc.id = tr.subject_card_id
      WHERE 
        sc.profile_id = 1
      GROUP BY 
        sc.id, sc.subject, sc.final_score_target, sc.final_score_lowest, sc.memo
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

//   // テスト構造データの取得
//   async fetchTestStructure(subject: string, year: number): Promise<TestData> {
//     const query = `
//       SELECT 
//         t.id,
//         t.subject,
//         t.year,
//         t.max_score,
//         json_agg(
//           json_build_object(
//             'section', s.section_number,
//             'questions', (
//               SELECT json_agg(
//                 json_build_object(
//                   'questionNumber', q.question_number,
//                   'score', q.score,
//                   'correctAnswer', q.correct_answer
//                 ) ORDER BY q.question_number
//               )
//               FROM questions q
//               WHERE q.section_id = s.id
//             ),
//             'sectionTotal', json_build_object(
//               'score', s.total_score
//             )
//           ) ORDER BY s.section_number
//         ) AS test_structure
//       FROM 
//         tests t
//       JOIN 
//         sections s ON t.id = s.test_id
//       WHERE 
//         t.subject = $1 AND t.year = $2
//       GROUP BY 
//         t.id, t.subject, t.year, t.max_score
//     `;

//     try {
//       const result = await pool.query(query, [subject, year]);

//       if (result.rows.length === 0) {
//         throw new Error(`テスト構造データが見つかりません: ${subject} ${year}`);
//       }

//       const row = result.rows[0];
//       const testData: TestData = {
//         subject: row.subject as Subject,
//         year: row.year,
//         maxScore: row.max_score,
//         testStructure: row.test_structure,
//       };

//       return testData;
//     } catch (error) {
//       console.error("テスト構造データ取得エラー:", error);
//       throw error;
//     }
//   }

  // 生徒のテスト結果データの取得
  async fetchStudentData(subject: string, year: number): Promise<AnsweredData> {
    const query = `
      SELECT 
        ad.id,
        ad.name,
        ad.score,
        ad.percentage,
        ad.target_percentage,
        to_char(ad.date, 'YYYY/MM/DD') as date,
        ad.memo,
        (
          SELECT json_object_agg(section_number, score)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS section_totals,
        (
          SELECT json_object_agg(section_number, percentage)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS section_percentages,
        (
          SELECT json_object_agg(section_number, target_score)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS target_section_totals,
        (
          SELECT json_object_agg(section_number, target_percentage)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS target_section_percentages,
        (
          SELECT json_object_agg(
            question_number, 
            COALESCE(enum_answer::text, numeric_answer::text)
          )
          FROM answers
          WHERE answered_data_id = ad.id
        ) AS answers
      FROM 
        answered_data ad
      JOIN 
        tests t ON ad.test_id = t.id
      WHERE 
        t.subject = $1 AND t.year = $2 AND ad.profile_id = 1
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
      const studentData: AnsweredData = {
        id: row.id,
        name: row.name,
        score: row.score,
        percentage: row.percentage,
        targetPercentage: row.target_percentage,
        date: row.date,
        memo: row.memo,
        sectionTotals: row.section_totals || {},
        sectionPercentages: row.section_percentages || {},
        targetSectionTotals: row.target_section_totals || {},
        targetSectionPercentages: row.target_section_percentages || {},
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
    year: number
  ): Promise<AnsweredData[]> {
    const query = `
      SELECT 
        ad.id,
        ad.name,
        ad.score,
        ad.percentage,
        ad.target_percentage,
        to_char(ad.date, 'YYYY/MM/DD') as date,
        ad.memo,
        (
          SELECT json_object_agg(section_number, score)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS section_totals,
        (
          SELECT json_object_agg(section_number, percentage)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS section_percentages,
        (
          SELECT json_object_agg(section_number, target_score)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS target_section_totals,
        (
          SELECT json_object_agg(section_number, target_percentage)
          FROM section_scores
          WHERE answered_data_id = ad.id
        ) AS target_section_percentages,
        (
          SELECT json_object_agg(
            question_number, 
            COALESCE(enum_answer::text, numeric_answer::text)
          )
          FROM answers
          WHERE answered_data_id = ad.id
        ) AS answers
      FROM 
        answered_data ad
      JOIN 
        tests t ON ad.test_id = t.id
      JOIN
        friends f ON ad.name = f.name
      WHERE 
        t.subject = $1 AND t.year = $2
      ORDER BY
        ad.name
    `;

    try {
      const result = await pool.query(query, [subject, year]);

      const friendsData: AnsweredData[] = result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        score: row.score,
        percentage: row.percentage,
        targetPercentage: row.target_percentage,
        date: row.date,
        memo: row.memo,
        sectionTotals: row.section_totals || {},
        sectionPercentages: row.section_percentages || {},
        targetSectionTotals: row.target_section_totals || {},
        targetSectionPercentages: row.target_section_percentages || {},
        answers: this.parseAnswers(row.answers || {}),
      }));

      return friendsData;
    } catch (error) {
      console.error("フレンドのテスト結果データ取得エラー:", error);
      throw error;
    }
  }

  // 解答データの変換処理（数値または列挙型に変換）
  private parseAnswers(
    rawAnswers: Record<string, string>
  ): Record<number, number | Answer> {
    const result: Record<number, number | Answer> = {};

    for (const [key, value] of Object.entries(rawAnswers)) {
      const questionNumber = parseInt(key);

      // 数値の場合は数値型に、そうでない場合はAnswer型として扱う
      if (!isNaN(parseInt(value))) {
        result[questionNumber] = parseInt(value);
      } else {
        // 文字列をAnswer enum型に変換
        switch (value) {
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
    }

    return result;
  }
}
