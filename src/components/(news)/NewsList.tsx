import Link from "next/link";
import { NewsItem } from "@/type/newsType";
import { ROUTES } from "@/constants";

type NewsListProps = {
  newsDatas: NewsItem[];
};

export default function NewsList({ newsDatas }: NewsListProps) {
  if (newsDatas.length === 0) {
    return (
      <div className="text-center py-10">該当するニュースはありません</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 text-gray-700 md:gap-4">
      {newsDatas.map((newaData) => (
        <Link
          href={`${ROUTES.NEWS}/${newaData.id}`}
          key={newaData.id}
          className="overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-lg mb-2 line-clamp-2 font-bold">
              {newaData.title}
            </h3>
            <p className="text-gray-500 mb-3 line-clamp-2 text-sm">
              {newaData.excerpt}
            </p>
            <div className="flex newaDatas-center text-gray-500 text-xs gap-4">
              {newaData.date}
              <span>{newaData.category}</span>
            </div>
          </div>
          <div className="border-b border-gray-300 my-3 md:hidden"></div>
        </Link>
      ))}
    </div>
  );
}
