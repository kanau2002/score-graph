//app/components/general/Header/index.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { CgMenu, CgProfile } from "react-icons/cg";
import Navigation from "../Navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  /**
   * TODO: 後でServiceから取得するように修正する(その際HeaderをServerComponent化する必要が出てくるはず)
   */
  const isNew = true;

  const handleLogout = async () => {
    await logout();
    // ログアウト後はログインページにリダイレクト
    window.location.href = ROUTES.LOGIN;
  };

  return (
    <div className="relative">
      <header className="fixed top-0 z-[11] flex w-full items-center justify-between bg-white p-3 text-xs text-gray-400 shadow-sm">
        <Image
          src="/score-graph.png"
          alt="ScoreGraphロゴ"
          width={150}
          height={50}
          className="mr-4"
        />
        <div className="flex items-center gap-4">
          <button className="relative flex flex-col items-center">
            <div className="relative">
              <FaRegHeart className="text-2xl" />
              {/* 赤い点（通知バッジ） */}
              {isNew && (
                <span className="absolute right-0 top-0 size-3 rounded-full border-2 bg-red-500"></span>
              )}
            </div>
            <p>お知らせ</p>
          </button>

          <div className="flex flex-col items-center">
            <CgProfile className="text-2xl" />
            {user ? (
              <button onClick={handleLogout}>ログアウト</button>
            ) : (
              <Link href={ROUTES.LOGIN}>ログイン</Link>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center md:hidden"
          >
            <CgMenu className="text-2xl" />
            <p>メニュー</p>
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-12 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-[12] transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Navigation setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
