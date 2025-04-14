"use client";

import React, { useState } from "react";
import { Subject } from "@/type/testType";
import { TargetData } from "@/type/targetType";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // トースト通知用（必要に応じてインストール）
import { ROUTES } from "@/constants";
import { displaySubjectName } from "@/lib/display";

type Props = {
  subject: Subject;
  targetMonthTemplate: string[];
  existingData: Record<string, TargetData>;
};

// 月の表示用フォーマット
const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");
  return `${year}年${monthNum}月`;
};

export default function TargetUpsert({
  subject,
  targetMonthTemplate,
  existingData,
}: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // フォーム入力値の状態
  const [formValues, setFormValues] = useState<{
    [month: string]: {
      targetPercentage: number;
      targetMemo: string;
    };
  }>(() => {
    // 既存データからフォーム初期値を設定
    const initialValues: {
      [month: string]: { targetPercentage: number; targetMemo: string };
    } = {};

    targetMonthTemplate.forEach((month) => {
      if (existingData[month]) {
        initialValues[month] = {
          targetPercentage: existingData[month].targetPercentage,
          targetMemo: existingData[month].targetMemo,
        };
      } else {
        initialValues[month] = {
          targetPercentage: 70, // デフォルト値
          targetMemo: "",
        };
      }
    });

    return initialValues;
  });

  // 入力値を更新する関数
  const handleInputChange = (
    month: string,
    field: "targetPercentage" | "targetMemo",
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [field]: field === "targetPercentage" ? Number(value) : value,
      },
    }));
  };

  // データを保存する関数
  const handleSubmit = async (month: string) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/target", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          targetPercentage: formValues[month].targetPercentage,
          targetMonth: month,
          targetMemo: formValues[month].targetMemo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`${formatMonth(month)}の目標を保存しました`);
        // 既存データを更新
        existingData[month] = {
          ...existingData[month],
          id: result.targetId,
          userId: 1, // ダミー値
          subject,
          targetPercentage: formValues[month].targetPercentage,
          targetMonth: month,
          targetMemo: formValues[month].targetMemo,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // アクティブな月をリセット
        setActiveMonth(null);
      } else {
        toast.error(
          `保存エラー: ${result.error || "不明なエラーが発生しました"}`
        );
      }
    } catch (error) {
      console.error("目標保存中にエラーが発生しました:", error);
      toast.error("保存中に問題が発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // カードページに戻る
  const handleBack = () => {
    router.push(`${ROUTES.MYPAGE}?tab=cards`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-16">
      <h2 className="text-lg font-semibold mb-4">
        {displaySubjectName(subject)}の目標設定
      </h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          各月の目標を設定してください。目標は後からいつでも変更できます。
        </p>
      </div>

      <div className="space-y-6">
        {targetMonthTemplate.map((month) => (
          <div key={month} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">{formatMonth(month)}</h3>

              {existingData[month] ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  設定済み
                </span>
              ) : (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  未設定
                </span>
              )}
            </div>

            {activeMonth === month ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    目標正答率 (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formValues[month].targetPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        month,
                        "targetPercentage",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メモ
                  </label>
                  <textarea
                    value={formValues[month].targetMemo}
                    onChange={(e) =>
                      handleInputChange(month, "targetMemo", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    rows={3}
                    placeholder="目標達成のためのメモや戦略など"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveMonth(null)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                    disabled={isSubmitting}
                  >
                    キャンセル
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit(month)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "保存中..." : "保存"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {existingData[month] ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 mr-2">
                        目標正答率:
                      </span>
                      <span className="text-sm">
                        {formValues[month].targetPercentage}%
                      </span>
                    </div>

                    {formValues[month].targetMemo && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          メモ:
                        </span>
                        <p className="text-sm text-gray-700 mt-1">
                          {formValues[month].targetMemo}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    この月の目標はまだ設定されていません。
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setActiveMonth(month)}
                  className="mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                >
                  {existingData[month] ? "編集" : "設定する"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
        >
          カード一覧に戻る
        </button>
      </div>
    </div>
  );
}
