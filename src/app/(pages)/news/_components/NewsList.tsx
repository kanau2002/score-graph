// src/app/(pages)/news/_components/NewsList.tsx
import Link from "next/link";
import { NewsItem } from "@/type/newsType";

type NewsListProps = {
  news: NewsItem[];
};

export default function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-10">該当するニュースはありません</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {news.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
              {item.category}
            </span>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {item.excerpt}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">{item.date}</span>
              <Link
                href={`/news/${item.id}`}
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                続きを読む
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
