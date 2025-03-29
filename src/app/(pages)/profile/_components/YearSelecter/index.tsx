// src/app/(pages)/profile/_components/YearSelecter/index.tsx
import React, { useState, useRef, useEffect } from "react";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Subject } from "@/core/profile/type";

interface Props {
  subject: Subject;
  unAnsweredYears: number[];
}

const YearSelecter: React.FC<Props> = ({ subject, unAnsweredYears }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
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
    setSelectedYear(year);
    setIsOpen(false);
    // 選択された年に基づいてページ遷移
    router.push(`/profile/testCreate?subject=${subject}&year=${year}`);
  };

  return (
    <div className="relative p-2 ml-auto" ref={dropdownRef}>
      {/* SquarePlusボタン */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <SquarePlus className="w-6 h-6" />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute z-10 right-0 w-24 bg-white border border-gray-200 rounded-md shadow-lg mt-1 p-1 max-h-60 overflow-auto">
          <ul className="py-1">
            {unAnsweredYears.map((year) => (
              <li key={year}>
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                    selectedYear === year ? "bg-gray-100 font-medium" : ""
                  }`}
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
};

export default YearSelecter;
