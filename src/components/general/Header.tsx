"use client";
import { useState } from "react";
import Image from "next/image";
import { CgMenu, CgProfile } from "react-icons/cg";
import Navigation from "./Navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { UsersRound } from "lucide-react";

export default function Header() {
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
      <header className="fixed z-[11] flex w-full items-center justify-between bg-white p-3 text-xs text-gray-400 shadow-sm h-16 standalone:h-22">
        <Image
          src="/score-graph.png"
          alt="ScoreGraphロゴ"
          width={150}
          height={50}
          className="mr-4"
        />
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(ROUTES.FRIEND)}
            className={`relative flex flex-col items-center ${
              user ? "" : "hidden"
            }`}
          >
            <UsersRound className="text-2xl" />
            フレンド
          </button>

          <button onClick={handleLogin} className="flex flex-col items-center">
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
