import React, { useState, useRef, useEffect } from "react";
import { Ellipsis, Trash2, ChartSpline, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Subject } from "@/type/testType";
import { toast } from "react-hot-toast"; // トースト通知（必要に応じてインストール）
import { ROUTES } from "@/constants";
import { CardDeleteConfirmationModal } from "./CardDeleteConfirmationModal";

const settingModalItems = [
  {
    id: 1,
    name: "目標の設定",
    icon: ChartSpline,
    href: ROUTES.TARGET_UPSERT,
    isRed: false,
  },
  {
    id: 2,
    name: "カード編集",
    icon: SquarePen,
    href: ROUTES.CARD_UPDATE,
    isRed: false,
  },
  {
    id: 3,
    name: "カード削除",
    icon: Trash2,
    href: "", // 削除の場合は直接モーダルを表示するので空にする
    isRed: true,
    isDeleteAction: true, // 削除アクションフラグ
  },
];

interface Props {
  subject: Subject;
}

const SettingModal: React.FC<Props> = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleSelect = (href: string, isDeleteAction?: boolean) => {
    setIsOpen(false);

    if (isDeleteAction) {
      setIsDeleteModalOpen(true);
    } else if (href) {
      router.push(`${href}/${subject}`);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // API Route を使用してカード削除
      const response = await fetch("/api/cards/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("カードが正常に削除されました");
        setIsDeleteModalOpen(false);
        router.push(ROUTES.MYPAGE);
        // 必要に応じてページを更新
        router.refresh();
      } else {
        toast.error(
          `削除エラー: ${result.error || "不明なエラーが発生しました"}`
        );
      }
    } catch (error) {
      console.error("カード削除中にエラーが発生しました:", error);
      toast.error("カード削除中に問題が発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative p-2 ml-auto text-gray-700" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <Ellipsis className="w-5 h-5 text-gray-500" />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute z-10 right-11 top-0 w-36 bg-white border-gray-200 rounded-lg shadow mt-1 p-1 max-h-60 overflow-auto no-scrollbar">
          <ul className="py-1">
            {settingModalItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`w-full px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-1 rounded justify-between ${
                      item.isRed ? "text-red-500" : ""
                    }`}
                    onClick={() => handleSelect(item.href, item.isDeleteAction)}
                  >
                    {item.name}
                    <Icon className="w-5 h-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 削除確認モーダル */}
      <CardDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        subject={subject}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SettingModal;
