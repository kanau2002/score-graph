// src/app/hooks/useFollow.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface FollowUser {
  id: number;
  userName: string;
}

// 相互フォロー機能のカスタムフック（簡略版）
export function useFollow() {
  const [mutualFollows, setMutualFollows] = useState<FollowUser[]>([]);
  const [following, setFollowing] = useState<FollowUser[]>([]); // 検索結果のフォロー状態判定に必要
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 相互フォローユーザーを取得
  const fetchMutualFollows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/follow");
      setMutualFollows(response.data);
    } catch (err) {
      setError("相互フォローユーザーの取得に失敗しました");
      console.error("相互フォローユーザー取得エラー:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // フォロー中ユーザーを取得（内部機能として必要）
  const fetchFollowing = useCallback(async () => {
    try {
      const response = await axios.get("/api/follow?type=following");
      setFollowing(response.data);
    } catch (err) {
      console.error("フォロー中ユーザー取得エラー:", err);
      // ここではUIにエラー表示しない
    }
  }, []);

  // ユーザーをフォローする
  const followUser = useCallback(
    async (userId: number) => {
      setLoading(true);
      setError(null);
      try {
        await axios.post("/api/follow", { userId });
        // フォロー後にリストを更新
        await Promise.all([fetchFollowing(), fetchMutualFollows()]);
      } catch (err) {
        setError("フォローに失敗しました");
        console.error("フォローエラー:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFollowing, fetchMutualFollows]
  );

  // フォローを解除する
  const unfollowUser = useCallback(
    async (userId: number) => {
      setLoading(true);
      setError(null);
      try {
        await axios.delete("/api/follow", { data: { userId } });
        // フォロー解除後にリストを更新
        await Promise.all([fetchFollowing(), fetchMutualFollows()]);
      } catch (err) {
        setError("フォロー解除に失敗しました");
        console.error("フォロー解除エラー:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFollowing, fetchMutualFollows]
  );

  // 初期ロード時に相互フォローユーザーとフォロー中ユーザーを取得
  useEffect(() => {
    fetchMutualFollows();
    fetchFollowing(); // 検索結果でのフォロー状態表示に必要
  }, [fetchMutualFollows, fetchFollowing]);

  return {
    mutualFollows,
    following, // 検索結果のフォロー状態判定用に残す
    loading,
    error,
    fetchMutualFollows,
    followUser,
    unfollowUser,
  };
}
