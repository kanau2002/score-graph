"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants";
import Image from "next/image";
import { LogIn } from "lucide-react";
import BackHomeLink from "../general/BackHomeLink";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // 入力検証
    if (!formData.userName || !formData.email || !formData.password) {
      setError("すべての項目を入力してください");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    if (formData.password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      return;
    }

    try {
      setLoading(true);
      const result = await register(
        formData.email,
        formData.password,
        formData.userName
      );

      if (result.success) {
        // 登録成功時、マイページにリダイレクト
        router.push(ROUTES.MYPAGE);
      } else {
        setError(result.error || "登録に失敗しました");
      }
    } catch (err) {
      setError("登録処理中にエラーが発生しました");
      console.error("登録エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-4 w-full space-y-6 text-gray-500"
      onSubmit={handleSubmit}
    >
      <Image
        src="/graph.png"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto mb-2"
      />
      <h1 className="text-center text-2xl font-bold mb-4">新規登録</h1>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-2">
        <label htmlFor="userName" className="text-sm mb-1">
          ユーザー名
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          required
          value={formData.userName}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/60 focus:outline-none mt-1"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="text-sm">
          メールアドレス
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/60 focus:outline-none mt-1"
        />
      </div>

      <div className="mb-1">
        <label htmlFor="password" className="text-sm">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/60 focus:outline-none mt-1"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm">
          パスワード（確認）
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/60 focus:outline-none mt-1"
        />
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="border-2 rounded-lg px-3 py-1 font-bold text-sm"
        >
          {loading ? "処理中..." : "登録する"}
        </button>
      </div>

      <Link
        href={ROUTES.LOGIN}
        className="text-sm mt-6 flex items-center justify-center gap-2"
      >
        既にアカウントをお持ちの方
        <LogIn className="size-5" />
      </Link>
      <BackHomeLink />
    </form>
  );
}
