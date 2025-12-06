// src/core/news/repositories/infra.ts
import { pool } from "@/lib/db";
import { NewsItem } from "../../type/newsType";

export class NewsRepository {
  async fetchNews(
    category: string | null,
    limit: number,
    offset: number
  ): Promise<NewsItem[]> {
    try {
      const whereClause = category ? `WHERE category = '${category}'` : "";

      const result = await pool.query(
        `
        SELECT 
          id, title, excerpt, content, 
          to_char(date, 'YYYY年MM月DD日'), 
          category,
          to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
          to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
        FROM news
        ${whereClause}
        ORDER BY date DESC, id DESC
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      );

      return result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        content: row.content,
        excerpt: row.excerpt,
        date: row.date,
        category: row.category,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      throw new Error("ニュースの取得に失敗しました");
    }
  }

  async countAllItems(category: string | null): Promise<number> {
    try {
      const whereClause = category ? `WHERE category = '${category}'` : "";
      const result = await pool.query(
        `
        SELECT COUNT(*) FROM news ${whereClause}
      `
      );

      return Number(result.rows[0].count);
    } catch (error) {
      console.error("Error counting news items:", error);
      throw new Error("ニュースのカウントに失敗しました");
    }
  }

  async fetchCategoryNames(): Promise<string[]> {
    try {
      const result = await pool.query(
        "SELECT DISTINCT category FROM news ORDER BY category"
      );
      return result.rows.map((row) => row.category);
    } catch (error) {
      console.error("Error fetching category names:", error);
      throw new Error("カテゴリの取得に失敗しました");
    }
  }

  // 特定のニュース記事を取得するメソッド
  async fetchNewsById(id: number): Promise<NewsItem> {
    try {
      const result = await pool.query(
        `
        SELECT 
          id, title, content, excerpt, 
          to_char(date, 'YYYY年MM月DD日'), 
          category,
          to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
          to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
        FROM news
        WHERE id = $1
      `,
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error(`ニュース記事が見つかりません (ID: ${id})`);
      }

      return {
        id: result.rows[0].id,
        title: result.rows[0].title,
        content: result.rows[0].content,
        excerpt: result.rows[0].excerpt,
        date: result.rows[0].date,
        category: result.rows[0].category,
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at,
      };
    } catch (error) {
      console.error("Error fetching news by id:", error);
      if (error instanceof Error && error.message.includes("見つかりません")) {
        throw error;
      }
      throw new Error("ニュース記事の取得に失敗しました");
    }
  }
}
