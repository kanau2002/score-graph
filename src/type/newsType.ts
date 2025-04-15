export interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface NewsPaginationResult {
  news: NewsItem[];
  totalPages: number;
  totalItems: number;
  categories: string[];
}

export interface NewsQueryParams {
  category?: string;
  page?: number;
  perPage?: number;
}
