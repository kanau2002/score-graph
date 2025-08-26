"use client";
import { useState } from "react";
import { CgMenu, CgProfile } from "react-icons/cg";
import Navigation from "./Navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { UsersRound } from "lucide-react";

export default function Header({ isBadge }: { isBadge: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (user) {
      return alert("すでにログインしています");
    }
    return router.push(ROUTES.LOGIN);
  };

  return (
    <div className="relative">
      <header className="fixed z-[11] flex w-full items-center items-end justify-between bg-white p-3 text-xs text-gray-700 shadow-sm h-16">
        <h1 className="text-2xl font-bold font-serif ml-2">ScoreGraph</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(ROUTES.FRIEND)}
            className={`flex flex-col items-center relative ${
              user ? "" : "hidden"
            }`}
          >
            <UsersRound className="text-2xl" />
            フレンド
            <div
              className={`${
                isBadge ? "" : "hidden"
              } absolute top-0 right-1 bg-red-500 rounded-full w-2 h-2 border border-gray-200`}
            ></div>
          </button>

          <button
            onClick={handleLogin}
            className={`flex flex-col items-center ${user ? "hidden" : ""}`}
          >
            <CgProfile className="text-2xl" />
            ログイン
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center"
          >
            <CgMenu className="text-2xl" />
            メニュー
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-12 backdrop-blur"
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
