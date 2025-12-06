import { NewsRepository } from "../Repository/newsRepository";
import { NewsItem } from "../../type/newsType";

class NewsService {
  private repository: NewsRepository;

  constructor() {
    this.repository = new NewsRepository();
  }

  /**
   * ニュース一覧を取得する
   * @param category カテゴリ（nullの場合は全て）
   * @param page ページ番号（デフォルト: 1）
   * @param perPage 1ページあたりの表示件数（デフォルト: 9）
   */
  async getNews(category: string | null, page: number): Promise<NewsItem[]> {
    try {
      const offset = (page - 1) * 9;
      const limit = 9;

      return await this.repository.fetchNews(category, limit, offset);
    } catch (error) {
      console.error("ニュース取得エラー:", error);
      // エラーが発生した場合は空のデータを返す
      return [];
    }
  }

  async getTotalPages(category: string | null) {
    const totalItems: number = await this.repository.countAllItems(category);
    const totalPages = Math.ceil(totalItems / 9);
    return totalPages;
  }

  async getCategoryNames() {
    return await this.repository.fetchCategoryNames();
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
