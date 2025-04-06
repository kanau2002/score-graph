// src/core/news/repositories/infra.ts
import { pool } from "@/lib/db";
import { NewsItem, NewsPaginationResult, NewsQueryParams } from "./type";


export class NewsRepository {
  // ニュース一覧を取得するメソッド（ページネーションとカテゴリフィルタリング対応）
  async fetchNews(params: NewsQueryParams): Promise<NewsPaginationResult> {
    const { category, page = 1, perPage = 9 } = params;

    try {
      // カテゴリーのリストを取得
      const categoriesQuery = `
        SELECT DISTINCT category FROM news ORDER BY category
      `;
      const categoriesResult = await pool.query(categoriesQuery);
      const categories = categoriesResult.rows.map((row) => row.category);

      // WHERE句の条件を動的に構築
      let whereClause = "";
      const queryParams: any[] = [];

      if (category && category !== "all") {
        whereClause = "WHERE category = $1";
        queryParams.push(category);
      }

      // 総件数を取得
      const countQuery = `
        SELECT COUNT(*) FROM news ${whereClause}
      `;
      const countResult = await pool.query(countQuery, queryParams);
      const totalItems = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalItems / perPage);

      // ニュース記事を取得
      const offset = (page - 1) * perPage;
      const newsQuery = `
        SELECT 
          id, title, excerpt, content, 
          to_char(date, 'YYYY年MM月DD日') as date, 
          category,
          to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as created_at,
          to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as updated_at
        FROM news
        ${whereClause}
        ORDER BY date DESC, id DESC
        LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
      `;

      const newsResult = await pool.query(newsQuery, [
        ...queryParams,
        perPage,
        offset,
      ]);

      return {
        news: newsResult.rows,
        totalPages,
        totalItems,
        categories,
      };
    } catch (error) {
      console.error("ニュース一覧取得エラー:", error);
      throw error;
    }
  }

  // 特定のニュース記事を取得するメソッド
  async fetchNewsById(id: number): Promise<NewsItem | null> {
    try {
      const query = `
        SELECT 
          id, title, content, excerpt, 
          to_char(date, 'YYYY年MM月DD日') as date, 
          category,
          to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as created_at,
          to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as updated_at
        FROM news
        WHERE id = $1
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("ニュース記事取得エラー:", error);
      throw error;
    }
  }
}
