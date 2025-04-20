import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/core/Service/authService";
import { setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 必須項目の検証
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "メールアドレスとパスワードを入力してください",
        },
        { status: 400 }
      );
    }

    // ログイン処理
    const result = await authService.login({ email, password });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      );
    }

    // トークンをクッキーに設定
    if (result.token) {
      await setAuthCookie(result.token);
    }

    // ユーザー情報も一緒に返す
    return NextResponse.json({
      success: true,
      userId: result.userId,
      user: {
        id: result.userId,
        userName: result.userName || "ユーザー", // ユーザー名も返す
      },
    });
  } catch (error) {
    console.error("ログインAPIエラー:", error);
    return NextResponse.json(
      { success: false, error: "ログイン処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
