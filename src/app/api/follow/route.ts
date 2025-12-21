// src/app/api/follow/route.ts
import { followService } from "@/core/Service/followService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // クエリパラメータに基づいて処理を分岐
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");

    if (type === "following") {
      // フォロー中ユーザー一覧を取得
      const following = await followService.fetchFollowing();
      return NextResponse.json(following);
    } else {
      // デフォルトは相互フォローユーザーを返す
      const mutualFollows = await followService.fetchMutualFollows();
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { message: "有効なユーザーIDを指定してください" },
        { status: 400 }
      );
    }

    await followService.followUser(userId);
    return NextResponse.json({ message: "フォローしました" });
  } catch (error) {
    console.error("フォローエラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { message: "有効なユーザーIDを指定してください" },
        { status: 400 }
      );
    }

    await followService.unfollowUser(userId);
    return NextResponse.json({ message: "フォロー解除しました" });
  } catch (error) {
    console.error("フォロー解除エラー:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
