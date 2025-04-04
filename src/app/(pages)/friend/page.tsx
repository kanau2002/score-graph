"use client";
import React, { useState, useEffect } from "react";
import { useFollow } from "@/app/hooks/useFollow";
import axios from "axios";
import { CircleUserRound } from "lucide-react";

interface User {
  id: number;
  userName: string;
}

export default function FriendPage() {
  // ユーザー検索関連の状態
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // フォロー管理関連の状態
  const {
    mutualFollows,
    following,
    loading,
    error,
    fetchMutualFollows,
    followUser,
    unfollowUser,
  } = useFollow();

  // 初期データ読み込み
  useEffect(() => {
    fetchMutualFollows();
  }, [fetchMutualFollows]);

  // ユーザーID検索処理
  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError("ユーザーIDを入力してください");
      return;
    }

    // 入力が数値かどうかチェック
    const userId = parseInt(searchId, 10);
    if (isNaN(userId)) {
      setSearchError("ユーザーIDは数値で入力してください");
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // ユーザーID検索API
      const response = await axios.get(
        `/api/users/search?id=${encodeURIComponent(userId)}`
      );
      setSearchResults(response.data);

      // 結果がなかった場合のエラーメッセージ
      if (response.data.length === 0) {
        setSearchError("指定されたIDのユーザーは見つかりませんでした");
      }
    } catch (error) {
      console.error("ユーザー検索エラー:", error);
      // axiosエラーからメッセージを取得
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setSearchError(error.response.data.message);
      } else {
        setSearchError("ユーザーの検索中にエラーが発生しました");
      }
    } finally {
      setIsSearching(false);
    }
  };

  // ユーザーがすでにフォロー中かチェック
  const isFollowing = (userId: number): boolean => {
    return following.some((user) => user.id === userId);
  };

  return (
    <div className="max-w-md mx-auto p-2">
      {/* ユーザー検索セクション */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">ユーザー検索</h2>

        <div className="flex mb-4">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ユーザーIDで検索..."
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-none"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            {isSearching ? "検索中..." : "検索"}
          </button>
        </div>

        {/* エラーメッセージ */}
        {searchError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {searchError}
          </div>
        )}

        {/* 検索結果 */}
        {searchResults.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">検索結果</h3>
            <div className="space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <CircleUserRound className="w-6 h-6" />
                    <span className="font-medium ml-2">{user.userName}</span>
                    <span className="text-gray-500">（ID: {user.id}）</span>
                  </div>

                  {isFollowing(user.id) ? (
                    <button
                      onClick={() => unfollowUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      disabled={loading}
                    >
                      フォロー解除
                    </button>
                  ) : (
                    <button
                      onClick={() => followUser(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      disabled={loading}
                    >
                      フォローする
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フレンド管理セクション - 相互フォローのみ */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">相互フォローユーザー</h2>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* ローディング表示 */}
        {loading ? (
          <div className="text-center py-4">
            <svg
              className="animate-spin h-6 w-6 text-blue-500 mx-auto"
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
          </div>
        ) : (
          // 相互フォローユーザーリスト
          <div className="space-y-2">
            {mutualFollows.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                相互フォローしているユーザーはいません
              </p>
            ) : (
              mutualFollows.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <CircleUserRound className="w-6 h-6" />
                    <span className="font-medium ml-2">{user.userName}</span>
                    <span className="text-gray-500">（ID: {user.id}）</span>
                  </div>
                  <button
                    onClick={() => unfollowUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    disabled={loading}
                  >
                    フォロー解除
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
