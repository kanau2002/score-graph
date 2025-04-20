import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "認証されていません" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return NextResponse.json(
      { success: false, error: "ユーザー情報の取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
