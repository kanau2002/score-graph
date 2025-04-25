import { newsService } from "@/core/Service/newsService";
import { Metadata } from "next";
import CategoryFilter from "../../../../components/(news)/CategoryFilter";
import NewsList from "../../../../components/(news)/NewsList";
import Pagination from "../../../../components/(news)/Pagination";

export const metadata: Metadata = {
  title: "ニュース一覧 | サイト名",
  description: "最新のニュースと更新情報をご覧いただけます。",
};

type Props = {
  searchParams: {
    category?: string;
    page?: string;
  };
};

export default async function NewsPage({ searchParams }: Props) {
  // URLクエリパラメータからカテゴリとページ番号を取得
  const category = searchParams?.category || "all";
  const currentPage = Number(searchParams?.page) || 1;
  // ニュースデータの取得
  const { news, totalPages, categories } = await newsService.getNews(
    category,
    currentPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ニュース</h1>

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
