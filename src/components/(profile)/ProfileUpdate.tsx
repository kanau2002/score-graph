"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { ProfileData, ProfileUpdateData } from "@/type/userType";
import { ROUTES } from "@/constants";
import BackMypageLink from "../general/BackMypageLink";

interface ProfileEditFormProps {
  initialData: ProfileData;
}

export default function ProfileUpdate({ initialData }: ProfileEditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileUpdateData>({
    fullName: initialData.fullName,
    userName: initialData.userName,
    targetUniversities: [...initialData.targetUniversities],
    memo: initialData.memo,
    thumbnailUrl: initialData.thumbnailUrl,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ターゲット大学の配列が3未満の場合は空の文字列で埋める
  while (formData.targetUniversities.length < 3) {
    formData.targetUniversities.push("");
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUniversityChange = (index: number, value: string) => {
    const newUniversities = [...formData.targetUniversities];
    newUniversities[index] = value;
    setFormData({ ...formData, targetUniversities: newUniversities });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // 更新成功時、プロフィールページにリダイレクト
        router.push(ROUTES.MYPAGE);
        router.refresh(); // キャッシュを更新
      } else {
        setError(data.error || "更新に失敗しました");
      }
    } catch (err) {
      setError("サーバーとの通信中にエラーが発生しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-4 text-gray-700 mb-24"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}
      <h1 className="text-xl font-bold mb-6">プロフィール編集</h1>
      <div className="mb-4">
        <div className="w-24 h-24 relative mx-auto mb-2">
          {formData.thumbnailUrl ? (
            <Image
              src={formData.thumbnailUrl}
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <CircleUserRound className="w-full h-full" />
          )}
        </div>
        <p className="text-xs text-gray-500 text-center">
          ※画像アップロード機能は現在実装中です
        </p>
      </div>

      <div className="mb-2">
        <label htmlFor="fullName" className="block text-sm mb-1">
          氏名 *<span className="text-gray-500 text-xs">（正式名：10文字以内）</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm mb-1">
          ニックネーム<span className="text-gray-500 text-xs">（公開用：10文字以内）</span>
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">志望校</label>
        {[0, 1, 2].map((index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={formData.targetUniversities[index] || ""}
              onChange={(e) => handleUniversityChange(index, e.target.value)}
              placeholder={`志望校 ${index + 1}`}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="memo" className="block text-sm mb-1">
          自己紹介
        </label>
        <textarea
          id="memo"
          name="memo"
          value={formData.memo}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="flex justify-between p-2">
        <BackMypageLink />
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-blue-500 font-bold"
        >
          {isSubmitting ? "保存中..." : "完了"}
        </button>
      </div>
    </form>
  );
}
