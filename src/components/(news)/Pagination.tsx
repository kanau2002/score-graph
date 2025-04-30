"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="flex justify-center items-center space-x-1 mt-8 text-gray-700">
      {/* 前のページボタン */}
      {currentPage > 1 ? (
        <Link href={`${pathname}?category=${category}&page=${currentPage - 1}`}>
          <ChevronLeft className="size-8" />
        </Link>
      ) : (
        <span>
          <ChevronLeft className="size-8" />
        </span>
      )}

      {/* ページ番号 */}
      {getPageRange().map((page, index) =>
        typeof page === "number" ? (
          <Link
            key={index}
            href={`${pathname}?category=${category}&page=${page}`}
            className={`w-8 h-8 flex justify-center items-center text-sm border rounded-lg ${
              currentPage === page
                ? "font-bold border-2"
                : ""
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="text-gray-500">
            {page}
          </span>
        )
      )}

      {/* 次のページボタン */}
      {currentPage < totalPages ? (
        <Link href={`${pathname}?category=${category}&page=${currentPage + 1}`}>
          <ChevronRight className="size-8" />
        </Link>
      ) : (
        <span>
          <ChevronRight className="size-8" />
        </span>
      )}
    </div>
  );
}
