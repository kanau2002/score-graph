"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SquarePlus } from "lucide-react";
import { Subject } from "@/type/testType";
import { displaySubjectName } from "@/lib/display";
import { ROUTES } from "@/constants";

interface Props {
  unAnsweredSubjects: Subject[];
}

const SubjectSelecter: React.FC<Props> = ({ unAnsweredSubjects }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelect = (subject: Subject) => {
    setIsOpen(false);
    // 選択された科目に基づいてページ遷移
    router.push(`${ROUTES.CARD_CREATE}/${subject}`);
  };

  if (unAnsweredSubjects.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative text-gray-700" ref={dropdownRef}>
        {/* Plusボタン */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <SquarePlus />
        </button>

        {/* ドロップダウンメニュー */}
        {isOpen && (
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
};

export default SubjectSelecter;
