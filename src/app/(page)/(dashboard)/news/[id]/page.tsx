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
    title: `${newsItem.title} | ニュース | サイト名`,
    description: newsItem.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsId = parseInt((await params).id);
  const newsData = await newsService.getNewsById(newsId);

  if (!newsData) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 text-gray-700">
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
  );
}
