"use client";

import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, Newspaper, CircleUserRound } from "lucide-react";
import { ROUTES } from "@/constants";
import { useAuth } from "@/context/AuthContext";

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  console.log("pathname", pathname);

  // 各ルートのアクティブ状態を判定
  const isHomeActive = pathname.startsWith(ROUTES.HOME);
  const isNewsActive = pathname.startsWith(ROUTES.NEWS);
  const isMypageActive = pathname.startsWith(ROUTES.MYPAGE);

  return (
    <div className="fixed bottom-0 left-0 z-11 w-full h-20 bg-white border-t border-gray-200 px-4 pb-8 text-gray-700">
      <div className="grid h-full grid-cols-3 mx-auto max-w-xl">
        <button
          onClick={() => {
            router.push(ROUTES.HOME);
          }}
          className="flex flex-col items-center justify-center focus:outline-none"
        >
          <HomeIcon
            className={`w-7 h-7 ${isHomeActive ? "font-bold" : ""}`}
            strokeWidth={isHomeActive ? 2.5 : 1.5}
          />
        </button>
        <button
          onClick={() => {
            router.push(ROUTES.NEWS);
          }}
          className="flex flex-col items-center justify-center focus:outline-none"
        >
          <Newspaper
            className={`w-7 h-7 ${isNewsActive ? "font-bold" : ""}`}
            strokeWidth={isNewsActive ? 2.5 : 1.5}
          />
        </button>
        <button
          onClick={() => {
            // まだロード中の場合は何もしない
            if (loading) {
              return;
            }
            // ユーザーがログインしていない場合
            if (!user) {
              alert("ログイン後に見れます");
              return;
            }
            // ログインしている場合のみ遷移
            router.push(ROUTES.MYPAGE);
          }}
          className="flex flex-col items-center justify-center focus:outline-none"
        >
          <CircleUserRound
            className={`w-7 h-7 ${
              isMypageActive ? "font-bold" : "font-normal"
            }`}
            strokeWidth={isMypageActive ? 2.5 : 1.5}
          />
        </button>
      </div>
    </div>
  );
}
