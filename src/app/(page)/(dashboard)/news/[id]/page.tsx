import { Metadata } from "next";
import { newsService } from "@/core/Service/newsService";
import { notFound } from "next/navigation";
import RichContent from "../../../../../components/(news)/RichContent";
import BackNewsButton from "@/components/general/BackNewsButton";

type NewsDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const newsId = parseInt((await params).id);
  const newsItem = await newsService.getNewsById(newsId);

  if (!newsItem) {
    return {
      title: "ニュースが見つかりません",
    };
  }

  return {
    title: `${newsItem.title} | NEWS | ScoreGraph`,
    description: newsItem.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsId = parseInt((await params).id);
  // NEWS一覧データを取得 (返り値：NewsItem型、データが無ければ[]型)
  const newsData = await newsService.getNewsById(newsId);

  if (!newsData) {
    notFound();
  }

  return (
    <div className="container max-w-3xl mx-auto md:p-4 text-gray-700 mb-20">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <article className="overflow-hidden p-4">
          <h1 className="font-bold mb-4 text-xl">{newsData.title}</h1>
          <div className="flex items-center text-gray-500 text-xs gap-4 mb-4">
            {newsData.date}
            <span>{newsData.category}</span>
          </div>
          {/* リッチコンテンツコンポーネントを使用 */}
          <RichContent content={newsData.content} />
        </article>
        <BackNewsButton />
      </div>
    </div>
  );
}
