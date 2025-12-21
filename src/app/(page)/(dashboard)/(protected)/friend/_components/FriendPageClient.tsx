"use client";
import { useState, useEffect } from "react";
import { UserRound, Search } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants";

interface User {
  id: number;
  userName: string;
}

interface Props {
  followersNotFollowingBack: User[];
  mutualFollows: User[];
}

export default function FriendPageClient({
  followersNotFollowingBack: initialFollowersNotFollowingBack,
  mutualFollows: initialMutualFollows,
}: Props) {
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchError, setSearchError] = useState("");
  const [followersNotFollowingBack, setFollowersNotFollowingBack] = useState(
    initialFollowersNotFollowingBack
  );
  const [mutualFollows, setMutualFollows] = useState(initialMutualFollows);
  const [loading, setLoading] = useState(false);

  const handleFollow = async (userId: number) => {
    setLoading(true);
    try {
      await fetch(`/api/follows/${userId}`, { method: "POST" });

      const followedUser = followersNotFollowingBack.find(
        (u) => u.id === userId
      );
      setFollowersNotFollowingBack((prev) =>
        prev.filter((u) => u.id !== userId)
      );
      if (followedUser) setMutualFollows((prev) => [...prev, followedUser]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId: number) => {
    setLoading(true);
    try {
      await fetch(`/api/follows/${userId}`, { method: "DELETE" });
      setMutualFollows((prev) => prev.filter((u) => u.id !== userId));
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (id: string) => {
    if (!id.trim()) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      setSearchError("ユーザーIDは数値で入力してください");
      setSearchResults([]);
      return;
    }

    setSearchError("");
    try {
      const response = await fetch(`/api/users/search?id=${userId}`);

      if (!response.ok) {
        setSearchError("ユーザーが見つかりませんでした");
        setSearchResults([]);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      if (data.length === 0) {
        setSearchError("ユーザーが見つかりませんでした");
      }
    } catch {
      setSearchError("検索中にエラーが発生しました");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    performSearch(searchId);
  }, [searchId]);

  const isFollowing = (userId: number) =>
    mutualFollows.some((user) => user.id === userId);

  const UserItem = ({
    user,
    action,
  }: {
    user: User;
    action: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between p-3">
      <Link
        href={`${ROUTES.PERSONAL}/${user.id}`}
        className="flex items-center"
      >
        <UserRound className="w-6 h-6 mr-2" />
        {user.userName}
        <span className="text-gray-500">（ID: {user.id}）</span>
      </Link>
      {action}
    </div>
  );

  return (
    <>
      {/* ユーザー検索 */}
      <div className="h-40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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

        {searchError && (
          <div className="text-red-400 text-center text-sm mt-4">
            {searchError}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-2 mt-6">
            {searchResults.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                action={
                  isFollowing(user.id) ? (
                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="text-gray-500 px-3 py-1 border rounded text-sm"
                      disabled={loading}
                    >
                      フォロー解除
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(user.id)}
                      className="text-blue-500 px-3 py-1 border rounded text-sm"
                      disabled={loading}
                    >
                      フォローする
                    </button>
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* フォロー申請受信 */}
      {followersNotFollowingBack.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold mb-2">フレンド申請されました</h2>
          <div className="space-y-2">
            {followersNotFollowingBack.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                action={
                  <button
                    onClick={() => handleFollow(user.id)}
                    className="text-blue-500 px-3 py-1 border border-blue-500 rounded text-sm hover:bg-blue-50"
                    disabled={loading}
                  >
                    フォローバック
                  </button>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* フレンドリスト */}
      <div className="mt-8">
        <h2 className="font-bold mb-2">フレンド</h2>
        <div className="space-y-2">
          {mutualFollows.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              相互フォローしているユーザーはいません
            </p>
          ) : (
            mutualFollows.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                action={
                  <button
                    onClick={() => handleUnfollow(user.id)}
                    className="text-gray-500 px-3 py-1 border rounded text-sm"
                    disabled={loading}
                  >
                    フォロー解除
                  </button>
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
