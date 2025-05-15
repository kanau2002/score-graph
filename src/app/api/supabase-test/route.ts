// src/app/api/supabase-test/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 直接ハードコードしたSupabase接続情報
const supabaseUrl = "https://rgyearxvfiioltnpdldl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneWVhcnh2Zmlpb2x0bnBkbGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTI2MTcsImV4cCI6MjA2Mjg2ODYxN30.t_6OiYkKt6cERF6YkbiA-jbLFir8Iu01pETRFiQwYxs";

export async function GET() {
  try {
    console.log("Supabaseダイレクトアクセステスト開始...");

    // Supabaseクライアントを初期化
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 簡単なクエリを実行
    console.log("Supabaseクエリ実行中...");
    const { data, error } = await supabase
      .from("users")
      .select("id, email, user_name")
      .limit(3);

    if (error) {
      throw error;
    }

    // 安全のためにメールアドレスをマスク
    const safeData = data?.map((user) => ({
      ...user,
      email: user.email
        ? `${user.email.slice(0, 3)}****@${user.email.split("@")[1]}`
        : null,
    }));

    return NextResponse.json({
      status: "success",
      message: "Supabaseに直接接続できました",
      dataCount: data?.length || 0,
      sampleData: safeData,
      supabaseInfo: {
        url: supabaseUrl,
        hasKey: !!supabaseKey,
      },
    });
  } catch (error) {
    console.error("Supabase接続エラー:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Supabaseへの接続に失敗しました",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
        supabaseInfo: {
          url: supabaseUrl,
          hasKey: !!supabaseKey,
        },
      },
      { status: 500 }
    );
  }
}
