// src/app/api/profile/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/core/Service/mypageService";
import { ProfileUpdateData } from "@/type/testType";

export async function POST(req: NextRequest) {
  try {
    const data: ProfileUpdateData = await req.json();

    // データのバリデーション
    if (!data.userName) {
      return NextResponse.json(
        { success: false, error: "ユーザー名は必須です" },
        { status: 400 }
      );
    }

    // プロフィール更新処理を実行
    const result = await profileService.updateProfileData(data);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("プロフィール更新API処理エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
