import { cardService } from "@/core/Service/cardService";
import { CardData } from "@/type/cardType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: CardData = await req.json();

    // データのバリデーション
    if (!data.subject) {
      return NextResponse.json(
        { success: false, error: "科目は必須です" },
        { status: 400 }
      );
    }

    if (
      data.finalScoreTarget === undefined ||
      data.finalScoreLowest === undefined
    ) {
      return NextResponse.json(
        { success: false, error: "目標点と最低点は必須です" },
        { status: 400 }
      );
    }

    // カード作成処理を実行
    const result = await cardService.createCard(data);

    if (result.success) {
      return NextResponse.json({ success: true, cardId: result.cardId });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("科目カード作成API処理エラー:", error);
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
