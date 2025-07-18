"use client";
import { ROUTES } from "@/constants";
import Link from "next/link";
import React from "react";
// import Image from "next/image";
import { LockKeyhole, LogIn, Newspaper, Send, X } from "lucide-react";
import { HomeIcon, UsersRound, SquareUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  setIsOpen?: (isOpen: boolean) => void;
};

export default function Navigation({ setIsOpen }: Props) {
  const { logout, user, loading } = useAuth();
  const router = useRouter();

  const navItems = [
    {
      label: "ホーム",
      href: ROUTES.HOME,
      icon: HomeIcon,
      activeIcon: HomeIcon,
    },
    {
      label: "ニュース",
      href: ROUTES.NEWS,
      icon: Newspaper,
      activeIcon: Newspaper,
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-400/60 p-4 text-white backdrop-blur-lg">
      {setIsOpen && (
        <div className="mb-6 flex justify-end standalone-nav-top-adjust">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X className="size-6" />
          </button>
        </div>
      )}
      <div className="mx-2 mt-4 mb-6">
        {/* <Image
          src="/score-graph.png"
          alt="ScoreGraphロゴ"
          width={150}
          height={50}
          className="mr-4"
        /> */}
        <h1 className="text-2xl font-bold font-serif">ScoreGraph</h1>
      </div>
      <nav className="">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 rounded-lg p-2"
                onClick={() => setIsOpen?.(false)}
              >
                {React.createElement(item.icon, { className: "size-6" })}
                <span>{item.label}</span>
              </Link>
              <hr className="border-1 border-white opacity-30" />
            </li>
          ))}
          <li>
            <button
              className="flex items-center space-x-3 rounded-lg p-2 w-full"
              onClick={() => {
                if (loading) {
                  return;
                }
                if (!user) {
                  alert("ログイン後に見れます");
                  return;
                }
                setIsOpen?.(false);
                router.push(ROUTES.MYPAGE);
              }}
            >
              <SquareUserRound className="size-6" />
              <span>マイページ</span>
              {!user && <LockKeyhole className="size-5 ml-auto" />}
            </button>
            <hr className="border-1 border-white opacity-30" />
          </li>
          <li>
            <button
              className="flex items-center space-x-3 rounded-lg p-2 w-full focus:outline-none"
              onClick={() => {
                if (loading) {
                  return;
                }
                if (!user) {
                  return alert("ログイン後に見れます");
                }
                setIsOpen?.(false);
                return router.push(ROUTES.FRIEND);
              }}
            >
              <UsersRound className="size-6" />
              <span>フレンド</span>
              {!user && <LockKeyhole className="size-5 ml-auto" />}
            </button>
            <hr className="border-1 border-white opacity-30" />
          </li>
          <li>
            <Link
              href={ROUTES.CONTACT}
              className="flex items-center space-x-3 rounded-lg p-2"
              onClick={() => setIsOpen?.(false)}
            >
              <Send className="size-6" />
              <span>お問い合わせ</span>
            </Link>
            <hr className="border-1 border-white opacity-30" />
          </li>
          <li>
            <button
              className="flex items-center space-x-3 rounded-lg p-2 w-full focus:outline-none"
              onClick={() => {
                if (loading) {
                  return;
                }
                if (!user) {
                  // ログイン処理と画面遷移
                  setIsOpen?.(false);
                  router.push(ROUTES.LOGIN);
                  return;
                } else {
                  // ログアウト処理と画面遷移
                  setIsOpen?.(false);
                  alert("ログアウトに成功しました。ログインページへ移動します。");
                  return logout();
                }
              }}
            >
              {!user ? (
                <>
                  <LogIn className="size-6" />
                  <span>ログイン</span>
                </>
              ) : (
                <>
                  <LogOut className="size-6" />
                  <span>ログアウト</span>
                </>
              )}
            </button>
            <hr className="border-1 border-white opacity-30" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
