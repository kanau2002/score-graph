// src/app/(pages)/news/_components/CategoryFilter.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
};

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">カテゴリー</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`${pathname}?category=all`}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          すべて
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`${pathname}?category=${category}`}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
