import React, { useState, useRef, useEffect } from "react";
import { Ellipsis, Crosshair, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Subject } from "@/core/profile/type";

interface Props {
  subject: Subject;
}

const settingModalItems = [
  {
    id: 1,
    name: "目標を編集  ",
    icon: Crosshair,
    href: "targetEdit",
    isRed: false,
  },
  {
    id: 2,
    name: "カードを削除",
    icon: Trash2,
    href: "cardDelete",
    isRed: true,
  },
];

const SettingModal: React.FC<Props> = ({ subject }) => {
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

  const handleSelect = (href: string) => {
    setIsOpen(false);
    // 選択された年に基づいてページ遷移
    router.push(`/profile/${href}?subject=${subject}`);
  };

  return (
    <div className="relative p-2 ml-auto" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <Ellipsis className="w-5 h-5" />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute z-10 right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg mt-1 p-1 max-h-60 overflow-auto">
          <ul className="py-1">
            {settingModalItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`w-full px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-1 rounded ${
                      item.isRed ? "text-red-600" : ""
                    }`}
                    onClick={() => handleSelect(item.href)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingModal;
