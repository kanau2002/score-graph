"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Subject } from "@/type/testType";
import { displaySubjectName } from "../../_components/TestResultCard";
import { ROUTES } from "@/constants";

type Props = {
  subject: Subject;
};

export default function CardCreate({ subject }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: subject,
    finalScoreTarget: 75,
    finalScoreLowest: 60,
    memo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "finalScoreTarget" || name === "finalScoreLowest") {
      // 数値項目は範囲内に制限
      const numValue = Math.min(100, Math.max(0, parseInt(value) || 0));
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 最低点が目標点を超えないかチェック
      if (formData.finalScoreLowest > formData.finalScoreTarget) {
        setError("最低点は目標点以下である必要があります");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/cards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // 作成成功時、プロフィールページにリダイレクト
        router.push(`${ROUTES.MYPAGE}`);
        router.refresh(); // キャッシュを更新
      } else {
        setError(data.error || "カードの作成に失敗しました");
      }
    } catch (err) {
      setError("サーバーとの通信中にエラーが発生しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">科目カード作成</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-4"
      >
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            科目 *
          </label>
          <div className="p-2">
            <p>{displaySubjectName(subject)}</p>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="finalScoreTarget"
            className="block text-sm font-medium mb-1"
          >
            目標点 (%) *
          </label>
          <input
            type="number"
            id="finalScoreTarget"
            name="finalScoreTarget"
            min="0"
            max="100"
            value={formData.finalScoreTarget}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="finalScoreLowest"
            className="block text-sm font-medium mb-1"
          >
            最低点 (%) *
          </label>
          <input
            type="number"
            id="finalScoreLowest"
            name="finalScoreLowest"
            min="0"
            max="100"
            value={formData.finalScoreLowest}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            目標点より低い値を設定してください
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="memo" className="block text-sm font-medium mb-1">
            メモ
          </label>
          <textarea
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md resize-none"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-md"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
          >
            {isSubmitting ? "作成中..." : "作成する"}
          </button>
        </div>
      </form>
    </div>
  );
}
