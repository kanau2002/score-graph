"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Subject } from "@/type/testType";
import { CardData } from "@/type/cardType";
import { displaySubjectName } from "@/lib/display";

type Props = {
  subject: Subject;
  initialCardData: CardData;
};

export default function CardUpdate({ subject, initialCardData }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // フォーム状態
  const [formData, setFormData] = useState<{
    finalScoreTarget: number;
    finalScoreLowest: number;
    memo: string;
  }>({
    finalScoreTarget: initialCardData.finalScoreTarget,
    finalScoreLowest: initialCardData.finalScoreLowest,
    memo: initialCardData.memo || "",
  });

  // フォーム入力の処理
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "memo" ? value : Number(value),
    }));
  };

  // フォーム送信の処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // 最低限のバリデーション
      if (formData.finalScoreLowest > formData.finalScoreTarget) {
        throw new Error("合格目標点は合格最低点より高く設定してください");
      }

      // データ送信
      const response = await fetch("/api/cards/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          finalScoreTarget: formData.finalScoreTarget,
          finalScoreLowest: formData.finalScoreLowest,
          memo: formData.memo,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "カード更新に失敗しました");
      }

      // 更新成功時、カード一覧ページにリダイレクト
      router.back();
      router.refresh(); // キャッシュを更新
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "不明なエラーが発生しました"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-4 text-gray-700"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <h2 className="text-lg font-semibold mb-4">
        {displaySubjectName(subject)}
      </h2>

      <div className="mb-4">
        <label
          htmlFor="finalScoreTarget"
          className="block text-sm font-medium mb-1 flex"
        >
          合格目標点 (0-100) *
          <div className="text-xs text-gray-500 ml-auto">
            ※ 合格最低点の1.1倍が目安
          </div>
        </label>
        <input
          type="number"
          id="finalScoreTarget"
          name="finalScoreTarget"
          min="0"
          max="100"
          value={formData.finalScoreTarget}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="finalScoreLowest"
          className="block text-sm font-medium mb-1"
        >
          合格最低点 (0-100) *
        </label>
        <input
          type="number"
          id="finalScoreLowest"
          name="finalScoreLowest"
          min="0"
          max="100"
          value={formData.finalScoreLowest}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="memo" className="block text-sm mb-1">
          メモ
        </label>
        <textarea
          id="memo"
          name="memo"
          rows={4}
          value={formData.memo}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
          placeholder="この科目に関するメモを入力してください..."
        />
      </div>

      <div className="flex justify-between p-2">
        <button type="button" onClick={() => router.back()}>
          キャンセル
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="text-blue-500 font-bold"
        >
          {submitting ? "保存中..." : "完了"}
        </button>
      </div>
    </form>
  );
}
