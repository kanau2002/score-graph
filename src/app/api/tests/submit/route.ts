import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/core/Service/mypageService";

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを解析
    const requestBody = await request.json();

    // データ検証
    if (
      !requestBody.subject ||
      !requestBody.year ||
      requestBody.score === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "必須フィールドが不足しています（subject, year, score）",
        },
        { status: 400 }
      );
    }

    // profileServiceを使ってデータを保存
    const result = await profileService.saveTestAnswers(requestBody);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "テスト結果の保存に失敗しました",
          error: result.error,
        },
        { status: 500 }
      );
    }

    // 成功レスポンス
    return NextResponse.json({
      success: true,
      testId: result.testId,
      message: "テスト結果が正常に保存されました",
    });
  } catch (error) {
    console.error("API処理中にエラーが発生しました:", error);
    return NextResponse.json(
      {
        success: false,
        message: "テスト結果の処理中にエラーが発生しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
