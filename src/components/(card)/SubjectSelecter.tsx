"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SquarePlus } from "lucide-react";
import { Subject } from "@/type/testType";
import { displaySubjectName } from "@/lib/display";

type Props = {
  unAnsweredSubjects: Subject[];
};

function SubjectSelecter({ unAnsweredSubjects }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // クリックの外側をクリックするとドロップダウンを閉じる
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = async (subject: Subject) => {
    setIsOpen(false);
    setIsCreating(true);

    try {
      // デフォルト値でカードを作成
      const response = await fetch("/api/cards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          finalScoreTarget: 75,
          finalScoreLowest: 60,
          memo: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 作成成功時、ページをリフレッシュ
        router.refresh();
      }
    } catch (err) {
      console.error("カード作成エラー:", err);
    } finally {
      setIsCreating(false);
    }
  };

  if (unAnsweredSubjects.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative text-gray-700" ref={dropdownRef}>
        {/* Plusボタン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isCreating}
          className={`${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <SquarePlus />
        </button>

        {/* ローディング表示 */}
        {isCreating && (
          <div className="absolute z-10 right-22 bottom-14 w-34 bg-white border border-gray-200 rounded-lg shadow p-3">
            <div className="text-xs text-gray-500 text-center">
              カード作成中...
            </div>
          </div>
        )}

        {/* ドロップダウンメニュー */}
        {isOpen && !isCreating && (
          <div
            className="absolute z-10 right-22 bottom-14 w-34 bg-white border border-gray-200 rounded-lg shadow p-1 max-h-60 overflow-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="py-1 px-2 text-xs text-gray-500 border-b border-gray-100">
              追加する科目を選択
            </div>
            <ul className="py-1">
              {unAnsweredSubjects.map((subject) => (
                <li key={subject}>
                  <button
                    type="button"
                    className={
                      "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    }
                    onClick={() => handleSelect(subject)}
                  >
                    {displaySubjectName(subject)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SubjectSelecter;
