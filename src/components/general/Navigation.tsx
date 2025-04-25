"use client";
import { ROUTES } from "@/constants";
import Link from "next/link";
import React from "react";
import { Newspaper, X } from "lucide-react";
import {
  HomeIcon,
  UsersRound,
  CircleUserRound,
  Tally1,
  Heart,
  Settings,
} from "lucide-react";

type Props = {
  setIsOpen?: (isOpen: boolean) => void;
};

export default function Navigation({ setIsOpen }: Props) {
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
    {
      label: "フレンド",
      href: ROUTES.FRIEND,
      icon: UsersRound,
      activeIcon: UsersRound,
    },
    {
      label: "マイページ",
      href: ROUTES.MYPAGE,
      icon: CircleUserRound,
      activeIcon: CircleUserRound,
    },
    {
      label: "",
      href: "",
      icon: Tally1,
      activeIcon: Tally1,
    },
    {
      label: "通知",
      href: ROUTES.HEART,
      icon: Heart,
      activeIcon: Heart,
    },
    {
      label: "設定",
      href: ROUTES.SETTING,
      icon: Settings,
      activeIcon: Settings,
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-400 p-4 text-white">
      {setIsOpen && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200"
          >
            <X className="size-6" />
          </button>
        </div>
      )}
      <nav className="">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-500"
                onClick={() => setIsOpen?.(false)}
              >
                {React.createElement(item.icon, { className: "size-6" })}
                <span>{item.label}</span>
              </Link>
              <hr className="border-1 border-white opacity-30" />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
