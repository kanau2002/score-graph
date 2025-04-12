// src/app/(pages)/news/_components/NewsPage.tsx
import { newsService } from "@/core/Service/newsService";
import CategoryFilter from "./CategoryFilter";
import NewsList from "./NewsList";
import Pagination from "./Pagination";

type NewsPageProps = {
  category: string;
  currentPage: number;
};

export default async function NewsPage({
  category,
  currentPage,
}: NewsPageProps) {
  // ニュースデータの取得
  const { news, totalPages, categories } = await newsService.getNews(
    category,
    currentPage
  );

  return (
    <div>
      <CategoryFilter categories={categories} activeCategory={category} />
      <NewsList news={news} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        category={category}
      />
    </div>
  );
}
