// src/app/api/follow/route.ts
import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/core/Service/mypageService";

export async function GET(request: NextRequest) {
  try {
    // クエリパラメータに基づいて処理を分岐
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    if (type === "following") {
      // フォロー中ユーザー一覧を取得
      const following = await profileService.fetchFollowing();
      return NextResponse.json(following);
    } else {
      // デフォルトは相互フォローユーザーを返す
      const mutualFollows = await profileService.fetchMutualFollows();
      return NextResponse.json(mutualFollows);
    }
  } catch (error) {
    console.error("フォロー情報取得エラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { message: "有効なユーザーIDを指定してください" },
        { status: 400 }
      );
    }

    await profileService.followUser(userId);
    return NextResponse.json({ message: "フォローしました" });
  } catch (error) {
    console.error("フォローエラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { message: "有効なユーザーIDを指定してください" },
        { status: 400 }
      );
    }

    await profileService.unfollowUser(userId);
    return NextResponse.json({ message: "フォロー解除しました" });
  } catch (error) {
    console.error("フォロー解除エラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
