"use client";

import React, { useState } from "react";
import { Subject } from "@/type/testType";
import { TargetData } from "@/type/targetType";
import { toast } from "react-hot-toast";
import { displaySubjectName } from "@/lib/display";
import BackMypageLink from "../general/BackMypageLink";

type Props = {
  subject: Subject;
  targetMonthTemplate: string[];
  existingData: Record<string, TargetData>;
};

const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");
  return `${year}年${monthNum}月`;
};

export default function TargetUpsert({
  subject,
  targetMonthTemplate,
  existingData,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<{
    [month: string]: {
      targetPercentage: number;
      targetMemo: string;
    };
  }>(() => {
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
          targetPercentage: 70,
          targetMemo: "",
        };
      }
    });

    return initialValues;
  });

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

  const handleEdit = (month: string) => {
    setEditingMonth(month);
  };

  const handleCancel = (month: string) => {
    // 編集前の値に戻す
    if (existingData[month]) {
      setFormValues((prev) => ({
        ...prev,
        [month]: {
          targetPercentage: existingData[month].targetPercentage,
          targetMemo: existingData[month].targetMemo,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [month]: {
          targetPercentage: 70,
          targetMemo: "",
        },
      }));
    }
    setEditingMonth(null);
  };

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
        existingData[month] = {
          ...existingData[month],
          id: result.targetId,
          userId: 1,
          subject,
          targetPercentage: formValues[month].targetPercentage,
          targetMonth: month,
          targetMemo: formValues[month].targetMemo,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setEditingMonth(null);
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

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-16 text-gray-700">
      <h2 className="text-lg font-bold mb-4">
        折れ線グラフ（目標）
        <span className="ml-4">{displaySubjectName(subject)}</span>
      </h2>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">
          折れ線グラフを作成します。目標にする「%」を設定してください。目標は後からいつでも変更できます。
        </p>
      </div>

      {targetMonthTemplate.map((month) => (
        <div key={month}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">{formatMonth(month)}</h3>

            <button
              onClick={() => handleEdit(month)}
              className={
                "text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-500"
              }
              disabled={editingMonth === month}
            >
              {editingMonth === month ? "編集中" : "設定する"}
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block mb-1">目標（%）</label>
              {editingMonth === month ? (
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="0"
                  max="100"
                  value={formValues[month].targetPercentage}
                  onChange={(e) =>
                    handleInputChange(month, "targetPercentage", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                />
              ) : (
                <p className="px-3 py-2 font-bold text-blue-500">
                  {formValues[month].targetPercentage}%
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-500">メモ</label>
              {editingMonth === month ? (
                <textarea
                  value={formValues[month].targetMemo}
                  onChange={(e) =>
                    handleInputChange(month, "targetMemo", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                  rows={3}
                  placeholder="例）時間制限は設けず、現状どれくらいの精度で解けるのか確認することがテーマです。..."
                />
              ) : (
                <p className="px-3 pt-2">
                  {formValues[month].targetMemo || (
                    <span className="text-gray-400 text-sm">未記入</span>
                  )}
                </p>
              )}
            </div>

            {editingMonth === month && (
              <div className="flex justify-end gap-4 mr-2">
                <button
                  type="button"
                  onClick={() => handleCancel(month)}
                  className="text-gray-500 text-sm"
                  disabled={isSubmitting}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(month)}
                  className="text-blue-500 font-bold text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "保存中..." : "完了"}
                </button>
              </div>
            )}
          </div>
          <div className="border-b border-gray-300 my-6"></div>
        </div>
      ))}

      <div className="p-2 mt-6">
        <BackMypageLink />
      </div>
    </div>
  );
}
