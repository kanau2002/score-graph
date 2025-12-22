import { userService } from "@/core/Service/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // URLからクエリパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { message: "ユーザーIDを指定してください" },
      { status: 400 }
    );
  }

  // ユーザーIDが数値かどうかチェック
  const targetUid = parseInt(userId, 10);
  if (isNaN(targetUid)) {
    return NextResponse.json(
      { message: "ユーザーIDは数値で指定してください" },
      { status: 400 }
    );
  }

  try {
    // プロフィールサービスを使用してユーザーを検索
    const user = await userService.searchUserById(targetUid);

    if (!user) {
      return NextResponse.json(
        { message: "指定されたIDのユーザーは見つかりませんでした" },
        { status: 404 }
      );
    }

    // 単一のユーザーでも配列として返す（フロントエンドとの一貫性のため）
    return NextResponse.json([user]);
  } catch (error) {
    console.error("ユーザー検索エラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
