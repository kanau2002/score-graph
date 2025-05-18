import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/core/Service/authService";
import { setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    // 必須項目の検証
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: "すべての項目を入力してください" },
        { status: 400 }
      );
    }

    // メールアドレスの形式を簡易チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    // パスワードの長さをチェック
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "パスワードは6文字以上で入力してください" },
        { status: 400 }
      );
    }

    // 新規ユーザー登録処理
    const result = await authService.signup({ email, password, fullName });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // トークンをクッキーに設定
    if (result.token) {
      await setAuthCookie(result.token);
    }

    return NextResponse.json({
      success: true,
      userId: result.userId,
    });
  } catch (error) {
    console.error("ユーザー登録APIエラー:", error);
    return NextResponse.json(
      { success: false, error: "登録処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
