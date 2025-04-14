import { NextResponse } from "next/server";
import { targetService } from "@/core/Service/targetService";
import { Subject } from "@/type/testType";

export async function POST(request: Request) {
  try {
    // リクエストボディからデータを取得
    const body = await request.json();
    const { subject, targetPercentage, targetMonth, targetMemo } = body;

    // 入力バリデーション
    if (!subject || targetPercentage === undefined || !targetMonth) {
      return NextResponse.json(
        { success: false, error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    // 値の範囲チェック
    if (targetPercentage < 0 || targetPercentage > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "目標パーセンテージは0〜100の範囲で指定してください",
        },
        { status: 400 }
      );
    }

    // targetServiceを使用して目標データを保存
    const result = await targetService.upsertTarget({
      subject: subject as Subject,
      targetPercentage,
      targetMonth,
      targetMemo: targetMemo || "",
    });

    if (result.success) {
      // 保存成功
      return NextResponse.json({
        success: true,
        targetId: result.targetId,
      });
    } else {
      // 保存失敗
      return NextResponse.json(
        {
          success: false,
          error: result.error || "目標データの保存に失敗しました",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // エラーハンドリング
    console.error("目標データ保存中にエラーが発生しました:", error);

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

export async function GET(request: Request) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const targetMonth = searchParams.get("targetMonth");

    // 科目は必須
    if (!subject) {
      return NextResponse.json(
        { success: false, error: "科目が指定されていません" },
        { status: 400 }
      );
    }

    // 特定の月の目標データを取得する場合
    if (targetMonth) {
      const targetData = await targetService.fetchTargetData(
        subject as Subject,
        targetMonth
      );

      if (targetData) {
        return NextResponse.json({
          success: true,
          data: targetData,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "指定された目標データが見つかりませんでした",
          },
          { status: 404 }
        );
      }
    }
    // 科目に関する全ての目標データを取得する場合
    else {
      const targetUpsertData = await targetService.fetchTargetUpsertData(
        subject
      );

      if (targetUpsertData.success) {
        return NextResponse.json({
          success: true,
          existing: targetUpsertData.existing,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: targetUpsertData.error || "データの取得に失敗しました",
          },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("目標データ取得中にエラーが発生しました:", error);

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
