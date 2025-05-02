import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Subject } from "@/type/testType";
import { ROUTES } from "@/constants";

type Props = {
  subject: Subject;
  unAnsweredYears: number[];
};

export default function YearSelecter({ subject, unAnsweredYears }: Props) {
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

  const handleSelect = (year: number) => {
    setIsOpen(false);
    // 選択された年に基づいてページ遷移
    router.push(`${ROUTES.TEST_CREATE}/${subject}/${year}`);
  };

  return (
    <div className="relative p-2 text-gray-700" ref={dropdownRef}>
      {/* SquarePlusボタン */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <Plus className="w-6 h-6" />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div
          className="absolute z-10 right-10 bottom-0 w-24 bg-white border border-gray-200 rounded-lg shadow p-1 max-h-60 overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="py-1 px-2 text-xs text-gray-500 border-b border-gray-100">
            入力する<br></br>回答の年度
          </div>
          <ul className="py-1">
            {unAnsweredYears.map((year) => (
              <li key={year}>
                <button
                  type="button"
                  className={
                    "w-full px-3 py-2 text-sm text-left rounded"
                  }
                  onClick={() => handleSelect(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
