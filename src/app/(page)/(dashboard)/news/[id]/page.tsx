import { Metadata } from "next";
import Link from "next/link";
import { newsService } from "@/core/Service/newsService";
import { notFound } from "next/navigation";
import RichContent from "../../../../../components/(news)/RichContent";

type NewsDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const newsId = parseInt(params.id);
  const newsItem = await newsService.getNewsById(newsId);

  if (!newsItem) {
    return {
      title: "ニュースが見つかりません",
    };
  }

  return {
    title: `${newsItem.title} | ニュース | サイト名`,
    description: newsItem.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsId = parseInt(params.id);
  const newsItem = await newsService.getNewsById(newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            ニュース一覧に戻る
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                {newsItem.category}
              </span>
              <span className="ml-3 text-gray-500">{newsItem.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              {newsItem.title}
            </h1>

            {/* リッチコンテンツコンポーネントを使用 */}
            <RichContent content={newsItem.content} />
          </div>
        </article>
      </div>
    </div>
  );
}
