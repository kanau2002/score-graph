//src/app/(mypage)/news/_components/MainContents.tsx
import CategoryFilter from './CategoryFilter'
import Paginate from './Paginate'
import Link from 'next/link'
import Image from 'next/image'
import { News } from '@/core/news/object/news'

type Props = {
  totalPage: number
  newsList: News[]
  categoriesName: string[]
  category_name: string
  pageId: string
}
export default function MainContents({
  totalPage,
  newsList,
  categoriesName,
  category_name,
  pageId,
}: Props) {
  return (
    <div className="flex h-full min-h-screen flex-col bg-[#FDF4EC]">
      {/* ページヘッダー */}
      <div className="mb-3 md:flex md:items-center md:justify-between">
        <h2 className="mb-2 text-xl font-bold text-orange-500 md:mb-0">
          新着情報一覧
        </h2>
        <CategoryFilter
          category_name={category_name}
          categoriesName={categoriesName}
        />
      </div>

      {/* 記事一覧 */}
      <div className="grid gap-2">
        {newsList.map((news: News) => (
          <Link href={`/news/article/${news.id}`} key={news.id}>
            <div className="flex gap-3 overflow-hidden rounded-lg bg-white p-2">
              {/* ニュースのサムネイル画像 */}
              <div className="h-full w-1/6">
                <Image
                  src={news.thumbnail_url}
                  width={400}
                  height={200}
                  alt={news.title}
                  className="h-full w-auto rounded-lg"
                />
              </div>
              {/* テキスト情報部分 */}
              <div className="flex w-5/6 flex-col justify-between text-xs">
                <div className="">
                  <h3 className="my-1 text-base md:text-lg md:font-semibold">
                    {news.title}
                  </h3>
                  <p className="hidden md:block">{news.description}...</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-3">{news.createdAt}</p>
                  <p className="rounded-full bg-gray-100 px-3">
                    {news.category_name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ページネーション */}
      <div className="mt-4 flex justify-center pb-4">
        <Paginate
          category_name={category_name}
          totalPage={totalPage}
          pageId={pageId}
        />
      </div>
    </div>
  )
}
