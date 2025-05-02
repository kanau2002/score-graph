"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants";
import Image from "next/image";
import BackHomeButton from "@/components/general/BackHomeButton";
import { UserRoundPlus } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // クエリパラメータから登録完了メッセージを取得
  const registeredMessage = searchParams.get("registered")
    ? "アカウント登録が完了しました。ログインしてください。"
    : null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // 入力検証
    if (!formData.email || !formData.password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // ログイン成功時、マイページにリダイレクト
        router.push(ROUTES.MYPAGE);
      } else {
        setError(result.error || "ログインに失敗しました");
      }
    } catch (err) {
      setError("ログイン処理中にエラーが発生しました");
      console.error("ログインエラー:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-6 p-4 w-full"
      onSubmit={handleSubmit}
    >
      <Image
        src="/graph.png"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto mb-2"
      />
      <h1 className="text-center text-2xl font-bold">ログイン</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {registeredMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-green-700">{registeredMessage}</p>
        </div>
      )}

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

      <div>
        <label htmlFor="password" className="text-sm">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/60 focus:outline-none mt-1"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="border-2 rounded-lg px-3 py-1 font-bold text-sm"
        >
          {loading ? "処理中..." : "LOGIN"}
        </button>
      </div>

      <Link
        href={ROUTES.REGISTER}
        className="text-sm mt-6 flex items-center justify-center gap-2"
      >
        初めての方はこちら
        <UserRoundPlus className="size-5" />
      </Link>
      <BackHomeButton />
    </form>
  );
}
