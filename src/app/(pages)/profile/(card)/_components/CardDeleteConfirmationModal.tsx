"use client";
import { Subject } from "@/core/profile/type";
import { displaySubjectName } from "../../_components/TestResultCard";

// 削除確認モーダルコンポーネント
export const CardDeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  subject,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subject: Subject;
  isDeleting: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* バックドロップ */}
      <div
        className="fixed inset-0 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* モーダルコンテンツ */}
      <div className="bg-white rounded-lg p-6 w-80 max-w-md z-10 relative shadow">
        <h3 className="text-lg mb-3 text-red-600 text-center">本当に削除しますか？</h3>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">{displaySubjectName(subject)}</span>{" "}
          のカードと全ての関連データを削除します。
        </p>

        <p className="mb-6 text-sm text-gray-500">
          この操作は元に戻せません。今まで入力したテスト結果、目標設定、科目データが全て削除されます。
        </p>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
            onClick={onClose}
            disabled={isDeleting}
          >
            キャンセル
          </button>

          <button
            type="button"
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                削除中...
              </span>
            ) : (
              "削除する"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
