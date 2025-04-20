import { NextRequest, NextResponse } from "next/server";
import { Subject } from "@/type/testType";
import { cardService } from "@/core/Service/cardService";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 必要なフィールドのバリデーション
    if (
      !body.subject ||
      body.finalScoreTarget === undefined ||
      body.finalScoreLowest === undefined
    ) {
      return NextResponse.json(
        { success: false, error: "必須項目が未入力です" },
        { status: 400 }
      );
    }

    // サービスクラスを使用してカードを更新
    const result = await cardService.updateCard({
      subject: body.subject as Subject,
      finalScoreTarget: Number(body.finalScoreTarget),
      finalScoreLowest: Number(body.finalScoreLowest),
      memo: body.memo,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("カード更新APIエラー:", error);
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
