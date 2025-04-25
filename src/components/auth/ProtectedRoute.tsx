"use client";

import { ROUTES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log(
        "ユーザーが認証されていないため、ログインページにリダイレクトします"
      );
      router.push(ROUTES.LOGIN);
    }
  }, [loading, user, router]);

  console.log("Protected Route - 認証状態:", { user, loading });

  // ローディング中はローディングインジケータを表示
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ユーザーが認証されていない場合は何も表示しない（リダイレクト中）
  if (!user) {
    return null;
  }

  // 認証されている場合は子コンポーネントを表示
  return <>{children}</>;
}
