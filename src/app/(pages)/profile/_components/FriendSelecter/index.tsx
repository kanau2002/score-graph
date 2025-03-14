//src/app/(pages)/profile/_components/FriendSelecter/index.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FriendSelectorProps {
  friendsData: Friend[];
  selectedFriend: Friend | null;
  onFriendSelect: (friendId: string) => void;
}

export interface Friend {
  id: number;
  name: string;
  score: number;
  percentage: number;
  targetPercentage?: number;
  date: string;
  memo?: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  targetSectionTotals?: {
    [sectionIndex: number]: number;
  };
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: number;
  };
}

const FriendSelector: React.FC<FriendSelectorProps> = ({
  friendsData,
  selectedFriend,
  onFriendSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (friendId: string) => {
    onFriendSelect(friendId);
    setIsOpen(false);
  };

  return (
    <>
      <div className="px-4 pb-4" ref={dropdownRef}>
        <div className="relative">
          {/* セレクトトリガー */}
          <button
            type="button"
            className="w-full bg-white border border-gray-300 rounded-md p-2 text-left flex justify-between items-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={selectedFriend ? "text-gray-900" : "text-gray-500"}
            >
              {selectedFriend ? selectedFriend.name : "フレンドを選択"}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* ドロップダウンメニュー */}
          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 py-1 max-h-60 overflow-auto">
              <ul className="py-1">
                <li>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => handleSelect("none")}
                  >
                    フレンドを選択
                  </button>
                </li>
                {friendsData.map((friend) => (
                  <li key={friend.id}>
                    <button
                      type="button"
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                        selectedFriend?.id === friend.id
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                      onClick={() => handleSelect(friend.id.toString())}
                    >
                      {friend.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendSelector;
