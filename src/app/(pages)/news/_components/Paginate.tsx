//src/app/(mypage)/news/_components/Paginate.tsx
'use client'
import { Pagination } from '@nextui-org/react' // NextUIのPaginationを使用
import { useRouter } from 'next/navigation'

type Props = {
  category_name: string
  pageId: string
  totalPage: number
}

export default function Paginate({ category_name, pageId, totalPage }: Props) {
  const router = useRouter()
  // ページ変更の処理
  const handlePageChange = (event: number) => {
    const categoryPath = category_name === 'ALL' ? '' : category_name
    router.push(`/news/${categoryPath}?pageId=${event}`)
  }
  return (
    <Pagination
      total={totalPage}
      initialPage={1}
      page={Number(pageId)} //現在いるページ番号はnumber型で受け渡す仕様
      onChange={handlePageChange}
      showControls
      classNames={{
        cursor: 'bg-orange-500',
      }}
    />
  )
}
