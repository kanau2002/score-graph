import { NextRequest, NextResponse } from "next/server";
import { contactService } from "@/core/Service/contactService";
import { ContactSubmitData } from "@/type/contactType";

export async function POST(req: NextRequest) {
  try {
    const data: ContactSubmitData = await req.json();

    // 基本的なバリデーションのみ
    if (!data.message?.trim()) {
      return NextResponse.json(
        { success: false, error: "メッセージを入力してください" },
        { status: 400 }
      );
    }

    const result = await contactService.submitContact(data);

    if (result.success) {
      return NextResponse.json({ success: true, contactId: result.contactId });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("お問い合わせAPI処理エラー:", error);
    return NextResponse.json(
      { success: false, error: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
