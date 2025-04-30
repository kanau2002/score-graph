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
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href={`${pathname}?category=all`}
          className={`px-4 py-1 text-sm bg-white rounded-full ${
            activeCategory === "all" ? "border border-gray-500" : ""
          }`}
        >
          すべて
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`${pathname}?category=${category}`}
            className={`px-4 py-1 text-sm bg-white rounded-full ${
              activeCategory === category ? "border border-gray-500" : ""
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
