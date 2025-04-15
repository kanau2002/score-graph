// src/app/api/cards/delete/route.ts
import { NextResponse } from "next/server";
import { Subject } from "@/type/testType";
import { cardService } from "@/core/card/cardService";

export async function DELETE(request: Request) {
  try {
    // リクエストボディからsubjectを取得
    const body = await request.json();
    const { subject } = body;

    // 入力バリデーション
    if (!subject) {
      return NextResponse.json(
        { success: false, error: "科目が指定されていません" },
        { status: 400 }
      );
    }

    // cardServiceを使用してカードを削除
    const result = await cardService.deleteCard(subject as Subject);

    if (result.success) {
      // 削除成功
      return NextResponse.json({
        success: true,
        deletedCardId: result.deletedCardId,
      });
    } else {
      // 削除失敗
      return NextResponse.json(
        {
          success: false,
          error: result.error || "カードの削除に失敗しました",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // エラーハンドリング
    console.error("カード削除中にエラーが発生しました:", error);

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
