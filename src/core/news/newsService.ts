// src/core/news/newsService.ts

import { NewsRepository } from "./newsRepository";
import { NewsItem, NewsPaginationResult } from "./type";



class NewsService {
  private repository: NewsRepository;

  constructor() {
    this.repository = new NewsRepository();
  }

  /**
   * ニュース一覧を取得する
   * @param category カテゴリ（指定なしの場合は全て）
   * @param page ページ番号（デフォルト: 1）
   * @param perPage 1ページあたりの表示件数（デフォルト: 9）
   */
  async getNews(
    category: string = "all",
    page: number = 1,
    perPage: number = 9
  ): Promise<NewsPaginationResult> {
    try {
      // 入力値の検証
      const validPage = Math.max(1, page); // 1未満は1に設定
      const validPerPage = Math.min(50, Math.max(1, perPage)); // 1〜50の範囲に制限

      return await this.repository.fetchNews({
        category: category === "all" ? undefined : category,
        page: validPage,
        perPage: validPerPage,
      });
    } catch (error) {
      console.error("ニュース取得エラー:", error);
      // エラーが発生した場合は空のデータを返す
      return {
        news: [],
        totalPages: 0,
        totalItems: 0,
        categories: [],
      };
    }
  }

  /**
   * 特定のニュース記事を取得する
   * @param id ニュースID
   */
  async getNewsById(id: number): Promise<NewsItem | null> {
    try {
      // 入力値の検証
      if (!id || isNaN(id) || id <= 0) {
        return null;
      }

      return await this.repository.fetchNewsById(id);
    } catch (error) {
      console.error("ニュース記事取得エラー:", error);
      return null;
    }
  }
}

// シングルトンインスタンスをエクスポート
export const newsService = new NewsService();
