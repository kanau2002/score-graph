"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  category: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  category,
}: PaginationProps) {
  const pathname = usePathname();

  // ページネーションの表示範囲を計算（改善版）
  const getPageRange = () => {
    const delta = 2; // 現在のページの前後に表示するページ数
    const range: (number | string)[] = [];

    // まず、現在のページの周辺のページ番号を追加
    const startPage = Math.max(1, currentPage - delta);
    const endPage = Math.min(totalPages, currentPage + delta);

    // 先頭ページの処理
    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) {
        range.push("...");
      }
    }

    // 中央の連続したページ
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // 末尾ページの処理
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        range.push("...");
      }
      range.push(totalPages);
    }

    return range;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-1 mt-8">
      {/* 前のページボタン */}
      {currentPage > 1 ? (
        <Link
          href={`${pathname}?category=${category}&page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          前へ
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-white border border-gray-200 rounded-md cursor-not-allowed">
          前へ
        </span>
      )}

      {/* ページ番号 */}
      {getPageRange().map((page, index) =>
        typeof page === "number" ? (
          <Link
            key={index}
            href={`${pathname}?category=${category}&page=${page}`}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* 次のページボタン */}
      {currentPage < totalPages ? (
        <Link
          href={`${pathname}?category=${category}&page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          次へ
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-white border border-gray-200 rounded-md cursor-not-allowed">
          次へ
        </span>
      )}
    </div>
  );
}
