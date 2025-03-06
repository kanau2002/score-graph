'use client'
import { useRouter } from 'next/navigation'
import { LuSlidersHorizontal } from 'react-icons/lu'
import { Select, SelectItem } from '@nextui-org/react'

type Props = {
  category_name: string
  categoriesName: string[]
}

export default function CategoryFilter({
  category_name,
  categoriesName,
}: Props) {
  const router = useRouter()

  const handleCategoryChange = (newCategory: string) => {
    const categoryPath = newCategory === 'ALL' ? '' : newCategory
    router.push(`/news/${categoryPath}?pageId=1`)
  }

  return (
    <>
      <Select
        startContent={<LuSlidersHorizontal style={{ color: '#F39700' }} />}
        placeholder={
          category_name === 'ALL'
            ? 'カテゴリーを選択してください'
            : category_name
        }
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleCategoryChange(e.target.value)
        }
        className="md:max-w-xs"
        classNames={{
          trigger: 'bg-white',
        }}
        radius="sm"
      >
        {categoriesName.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
