// src/app/api/dns-test/route.ts
import { NextResponse } from "next/server";
import { promises as dns } from "node:dns";

export async function GET() {
  try {
    console.log("DNSテスト開始...");

    // テストするホスト
    const testHost = "postgres.rgyearxvfiioltnpdldl.supabase.co";

    // DNS解決をテスト
    let dnsLookupResult: string[];
    try {
      console.log(`DNSルックアップ試行: ${testHost}`);
      dnsLookupResult = await dns
        .lookup(testHost, { all: true })
        .then((results) =>
          results.map(
            (r) => `${r.address} (${r.family === 6 ? "IPv6" : "IPv4"})`
          )
        );
    } catch (dnsError) {
      console.error("DNSルックアップエラー:", dnsError);
      dnsLookupResult = [
        `エラー: ${
          dnsError instanceof Error ? dnsError.message : String(dnsError)
        }`,
      ];
    }

    // 一般的なドメインも試す
    let googleResult: string[];
    try {
      console.log("DNSルックアップ試行: google.com");
      googleResult = await dns
        .lookup("google.com", { all: true })
        .then((results) =>
          results.map(
            (r) => `${r.address} (${r.family === 6 ? "IPv6" : "IPv4"})`
          )
        );
    } catch (googleError) {
      console.error("Google DNSルックアップエラー:", googleError);
      googleResult = [
        `エラー: ${
          googleError instanceof Error
            ? googleError.message
            : String(googleError)
        }`,
      ];
    }

    // Supabaseのドメインを試す
    let supabaseResult: string[];
    try {
      console.log("DNSルックアップ試行: supabase.co");
      supabaseResult = await dns
        .lookup("supabase.co", { all: true })
        .then((results) =>
          results.map(
            (r) => `${r.address} (${r.family === 6 ? "IPv6" : "IPv4"})`
          )
        );
    } catch (supabaseError) {
      console.error("Supabase DNSルックアップエラー:", supabaseError);
      supabaseResult = [
        `エラー: ${
          supabaseError instanceof Error
            ? supabaseError.message
            : String(supabaseError)
        }`,
      ];
    }

    // pingコマンドもどき
    const pingTest = async (host: string) => {
      const startTime = Date.now();
      try {
        // DNSルックアップを使ってテスト
        await dns.lookup(host);
        return { success: true, time: Date.now() - startTime };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };

    // 各ホストに対してpingテスト
    const postgresTest = await pingTest(testHost);
    const googleTest = await pingTest("google.com");
    const supabaseTest = await pingTest("supabase.co");

    return NextResponse.json({
      status: "success",
      message: "DNSテスト結果",
      dnsTests: {
        [testHost]: dnsLookupResult,
        "google.com": googleResult,
        "supabase.co": supabaseResult,
      },
      pingTests: {
        [testHost]: postgresTest,
        "google.com": googleTest,
        "supabase.co": supabaseTest,
      },
      networkInfo: {
        platform: process.platform,
        arch: process.arch,
        node: process.version,
      },
    });
  } catch (error) {
    console.error("DNSテストエラー:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "DNSテスト中にエラーが発生しました",
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
              }
            : String(error),
      },
      { status: 500 }
    );
  }
}
