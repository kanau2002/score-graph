// src/app/(pages)/news/page.tsx
import { Metadata } from "next";
import NewsPage from "./_components/NewsPage";

export const metadata: Metadata = {
  title: "ニュース一覧 | サイト名",
  description: "最新のニュースと更新情報をご覧いただけます。",
};

// SearchParamsの型定義
type SearchParams = {
  category?: string;
  page?: string;
};

export default function NewsPageContainer({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // URLクエリパラメータからカテゴリとページ番号を取得
  const category = searchParams?.category || "all";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ニュース</h1>
      <NewsPage category={category} currentPage={currentPage} />
    </div>
  );
}
