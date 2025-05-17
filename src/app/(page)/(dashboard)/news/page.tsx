import { newsService } from "@/core/Service/newsService";
import { Metadata } from "next";
import CategoryFilter from "../../../../components/(news)/CategoryFilter";
import NewsList from "../../../../components/(news)/NewsList";
import Pagination from "../../../../components/(news)/Pagination";

export const metadata: Metadata = {
  title: "NEWS一覧 | サイト名",
  description: "最新のニュースと更新情報をご覧いただけます。",
};

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function NewsPage({ searchParams }: Props) {
  // URLクエリパラメータからカテゴリとページ番号を取得
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || "all";
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  // 個別NEWSデータを取得 (返り値：NewsPaginationResult型)
  const { news, totalPages, categories } = await newsService.getNews(
    category,
    currentPage
  );

  return (
    <div className="container mx-auto md:p-4 text-gray-700 mb-20">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h1 className="text-3xl font-bold mt-3 mb-6 text-center">NEWS</h1>
        <CategoryFilter categories={categories} activeCategory={category} />
        <NewsList newsDatas={news} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          category={category}
        />
      </div>
    </div>
  );
}
