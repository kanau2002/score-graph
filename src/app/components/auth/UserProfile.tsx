"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!user) {
    return <div>認証されていません</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">ユーザー情報</h2>
      <p>ID: {user.id}</p>
      <p>ユーザー名: {user.userName}</p>
    </div>
  );
}
