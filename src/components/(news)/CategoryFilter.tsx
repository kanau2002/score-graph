"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryFilterProps = {
  categoryNames: string[];
  currentCategory: string | null;
};

export default function CategoryFilter({
  categoryNames,
  currentCategory,
}: CategoryFilterProps) {
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href={`${pathname}`}
          className={`px-4 py-1 text-sm bg-white rounded-full ${
            currentCategory === null ? "" : "border border-gray-500"
          }`}
        >
          すべて
        </Link>

        {categoryNames.map((categoryName) => (
          <Link
            key={categoryName}
            href={`${pathname}?category=${categoryName}`}
            className={`px-4 py-1 text-sm bg-white rounded-full ${
              currentCategory === null ? "" : "border border-gray-500"
            }`}
          >
            {categoryName}
          </Link>
        ))}
      </div>
    </div>
  );
}
