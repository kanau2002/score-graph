// src/app/api/tests/delete/route.ts

import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/core/Service/mypageService";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");
    const year = searchParams.get("year");

    if (!subject || !year) {
      return NextResponse.json(
        { success: false, error: "科目と年度が必要です" },
        { status: 400 }
      );
    }

    const result = await profileService.deleteTestResult(
      subject,
      parseInt(year)
    );

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("テスト結果削除エラー:", error);
    return NextResponse.json(
      { success: false, error: "テスト結果の削除に失敗しました" },
      { status: 500 }
    );
  }
}
