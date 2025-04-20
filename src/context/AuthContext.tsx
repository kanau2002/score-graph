"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  userName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    userName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 現在のユーザー情報を取得する関数
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      // 正常な場合のみユーザー情報を設定
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          return true;
        } else {
          setUser(null);
        }
      } else {
        // 401などのエラーの場合はnullにする
        setUser(null);
      }
    } catch (error) {
      console.error("ユーザー情報取得エラー:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // 初期化時にユーザー情報を取得
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ログイン
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // レスポンスにユーザー情報が含まれている場合は直接設定
        if (data.user) {
          setUser(data.user);
          return { success: true };
        }

        // ユーザー情報がレスポンスに含まれていない場合は再取得
        const userFetched = await fetchCurrentUser();
        return { success: userFetched };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("ログインエラー:", error);
      return { success: false, error: "ログイン処理中にエラーが発生しました" };
    }
  };

  // 新規登録
  const register = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName }),
      });

      const data = await response.json();

      if (data.success) {
        // レスポンスにユーザー情報が含まれている場合は直接設定
        if (data.user) {
          setUser(data.user);
          return { success: true };
        }

        // ユーザー情報がレスポンスに含まれていない場合は再取得
        const userFetched = await fetchCurrentUser();
        return { success: userFetched };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("ユーザー登録エラー:", error);
      return { success: false, error: "登録処理中にエラーが発生しました" };
    }
  };

  // ログアウト
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
