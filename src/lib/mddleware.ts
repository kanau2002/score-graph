// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";
import { ROUTES } from "../constants";

// 認証が必要なパス
const PROTECTED_PATHS = [
  ROUTES.FRIEND,
  ROUTES.MYPAGE,
  ROUTES.PROFILE_UPDATE,
  ROUTES.PROFILE_UPDATE,
  ROUTES.CARD_CREATE,
];

// 認証不要のパス（認証済みならリダイレクト）
const AUTH_PATHS = [ROUTES.HOME, ROUTES.NEWS, ROUTES.LOGIN];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  // 保護されたパスへのアクセスをチェック
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // 認証ページへのアクセスをチェック
  const isAuthPath = AUTH_PATHS.some((path) => pathname === path);

  // トークンがない場合は認証ページにリダイレクト（保護されたパスの場合）
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // トークンがあるが無効な場合は認証ページにリダイレクト（保護されたパスの場合）
  if (token) {
    const payload = verifyToken(token);
    if (!payload && isProtectedPath) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    // 認証済みユーザーが認証ページにアクセスした場合はマイページにリダイレクト
    if (payload && isAuthPath) {
      return NextResponse.redirect(new URL(ROUTES.MYPAGE, request.url));
    }
  }

  return NextResponse.next();
}

// 対象のパスを指定
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
