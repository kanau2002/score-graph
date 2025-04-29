"use client";
import React, { useState, useEffect } from "react";
import { useFollow } from "@/app/hooks/useFollow";
import axios from "axios";
import { CircleUserRound, Search } from "lucide-react";

interface User {
  id: number;
  userName: string;
}

export default function FriendPage() {
  // ユーザー検索関連の状態
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
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

  // 検索処理関数
  const performSearch = async (id: string) => {
    if (!id.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    // 入力が数値かどうかチェック
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      setSearchError("ユーザーIDは数値で入力してください");
      setSearchResults([]);
      return;
    }

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
      setSearchResults([]);
    }
  };

  // 検索IDが変わるたびに検索実行（debounceなし）
  useEffect(() => {
    if (searchId) {
      performSearch(searchId);
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [searchId]);

  // 初期データ読み込み
  useEffect(() => {
    fetchMutualFollows();
  }, [fetchMutualFollows]);

  // ユーザーがすでにフォロー中かチェック
  const isFollowing = (userId: number): boolean => {
    return following.some((user) => user.id === userId);
  };

  return (
    <div className="max-w-md mx-auto text-gray-700 bg-white rounded-lg p-4 mb-6">
      {/* ユーザー検索セクション */}

      <div className="h-40">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ユーザーIDで検索..."
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* エラーメッセージ */}
        {searchError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {searchError}
          </div>
        )}

        {/* 検索結果 */}
        {searchResults.length > 0 && (
          <div className="space-y-2 mt-6">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center">
                  <CircleUserRound className="w-6 h-6 mr-2" />
                  {user.userName}
                  <span className="text-gray-500">（ID: {user.id}）</span>
                </div>

                {isFollowing(user.id) ? (
                  <button
                    onClick={() => unfollowUser(user.id)}
                    className="text-gray-500 px-3 py-1 border rounded text-sm"
                    disabled={loading}
                  >
                    フォロー解除
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(user.id)}
                    className="text-blue-500 px-3 py-1 border rounded text-sm"
                    disabled={loading}
                  >
                    フォローする
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 相互フォローユーザーセクション */}

      <h2 className="font-bold mb-2">フレンド</h2>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 相互フォローユーザーリスト */}
      <div className="space-y-2">
        {mutualFollows.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            相互フォローしているユーザーはいません
          </p>
        ) : (
          mutualFollows.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center">
                <CircleUserRound className="w-6 h-6 mr-2" />
                {user.userName}
                <span className="text-gray-500">（ID: {user.id}）</span>
              </div>
              <button
                onClick={() => unfollowUser(user.id)}
                className="text-gray-500 px-3 py-1 border rounded text-sm"
                disabled={loading}
              >
                フォロー解除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
