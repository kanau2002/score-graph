import { newsService } from "@/core/Service/newsService";
import { Metadata } from "next";
import CategoryFilter from "../../../../components/(news)/CategoryFilter";
import NewsList from "../../../../components/(news)/NewsList";
import Pagination from "../../../../components/(news)/Pagination";

export const metadata: Metadata = {
  title: "NEWS一覧 | サイト名",
  description: "最新のニュースと更新情報をご覧いただけます。",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  // URLクエリパラメータからカテゴリとページ番号を取得
  const params = await searchParams;
  const category: string | null = params.category ?? null;
  const page: number = params.page ? Number(params.page) : 1;

  const totalPages = await newsService.getTotalPages(category);
  const categoryNames = await newsService.getCategoryNames();
  const news = await newsService.getNews(category, page);

  return (
    <div className="container mx-auto md:p-4 text-gray-700 mb-20">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h1 className="text-3xl font-bold mt-3 mb-6 text-center">NEWS</h1>
        <CategoryFilter categoryNames={categoryNames} currentCategory={category} />
        <NewsList newsDatas={news} />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          category={category}
        />
      </div>
    </div>
  );
}
